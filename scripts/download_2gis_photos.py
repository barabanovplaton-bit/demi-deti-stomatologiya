#!/usr/bin/env python3
"""
Скачивает реальные фотографии клиники «Аркадия» с 2GIS CDN.
Извлекает URL из HTML файлов, скачивает большие версии (656x340 и больше).
"""
import os
import re
import urllib.request
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

UPLOAD_DIR = Path("/home/z/my-project/upload")
OUTPUT_DIR = Path("/home/z/my-project/public/arkadia/real")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Паттерн для 2GIS photo CDN URL
PHOTO_PATTERN = re.compile(
    r'https?://i\d+\.photo\.2gis\.com/[^\s"\'<>]+\.jpg',
    re.IGNORECASE
)

# Маппинг файлов к филиалам для красивых имён
def get_branch_name(filename: str) -> str:
    name = filename.lower()
    if "невский" in name or "nevsky" in name:
        return "nevsky"
    elif "загородный" in name:
        return "zagorodny"
    elif "ломоносова" in name:
        return "lomonosova"
    elif "нахимова" in name or "васильев" in name:
        return "vasilievsky"
    elif "шуваловский" in name or "атмосфера" in name:
        return "shuvalovsky"
    elif "шлиссельбургский" in name or "рыбацк" in name:
        return "rybatsky"
    return "main"


def download_image(url: str, output_path: Path) -> bool:
    """Скачивает картинку, возвращает True при успехе."""
    try:
        req = urllib.request.Request(
            url,
            headers={
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://2gis.ru/',
                'Accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
            }
        )
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
            if len(data) < 3000:  # пропускаем слишком маленькие (иконки)
                return False
            with open(output_path, 'wb') as f:
                f.write(data)
            return True
    except Exception as e:
        print(f"  ! Failed: {url[:80]}... - {e}")
        return False


def collect_urls_from_all_files():
    """Собирает все URL из всех HTML файлов."""
    all_urls_by_branch = {}
    
    for html_file in sorted(UPLOAD_DIR.glob("*.html")):
        branch = get_branch_name(html_file.name)
        
        with open(html_file, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        urls = set(PHOTO_PATTERN.findall(content))
        # Убираем URL с экранированными кавычками
        urls = {u.replace('&quot;', '') for u in urls}
        # Берём только крупные версии (656x или больше)
        big_urls = [u for u in urls if re.search(r'_(656x|820x|1024x|1280x|1920x|origin)', u)]
        # Если больших нет — берём любые
        if not big_urls:
            big_urls = list(urls)
        
        if branch not in all_urls_by_branch:
            all_urls_by_branch[branch] = []
        all_urls_by_branch[branch].extend(big_urls)
    
    return all_urls_by_branch


def main():
    print("🔍 Собираю URL фотографий из HTML файлов 2ГИС...")
    urls_by_branch = collect_urls_from_all_files()
    
    total_urls = sum(len(v) for v in urls_by_branch.values())
    print(f"Найдено URL: {total_urls} по {len(urls_by_branch)} филиалам")
    for branch, urls in urls_by_branch.items():
        print(f"  {branch}: {len(urls)} фото")
    
    # Скачиваем
    print(f"\n⬇️  Скачиваю фотографии...")
    tasks = []
    
    with ThreadPoolExecutor(max_workers=8) as pool:
        for branch, urls in urls_by_branch.items():
            seen_ids = set()
            for url in urls:
                # Извлекаем ID фото из URL для дедупликации
                match = re.search(r'/([a-f0-9\-]+)_', url)
                if not match:
                    continue
                photo_id = match.group(1)
                if photo_id in seen_ids:
                    continue
                seen_ids.add(photo_id)
                
                out_path = OUTPUT_DIR / f"{branch}_{photo_id[:8]}.jpg"
                if out_path.exists():
                    continue
                
                tasks.append((url, out_path))
        
        print(f"Уникальных фото к скачиванию: {len(tasks)}")
        
        saved = 0
        for future in as_completed([pool.submit(download_image, url, path) for url, path in tasks]):
            if future.result():
                saved += 1
                if saved % 5 == 0:
                    print(f"  ✓ Скачано {saved}...")
    
    print(f"\n{'='*60}")
    print(f"Всего сохранено: {saved} фотографий")
    print(f"Папка: {OUTPUT_DIR}")
    
    # Выводим что получилось
    print(f"\n📁 Финальный список:")
    for branch in sorted(set(p.name.split('_')[0] for p in OUTPUT_DIR.glob('*.jpg'))):
        files = sorted(OUTPUT_DIR.glob(f"{branch}_*.jpg"))
        print(f"  {branch}: {len(files)} фото")
        for f in files[:3]:
            print(f"    - {f.name} ({f.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
