#!/usr/bin/env python3
"""
Извлекает все изображения из HTML файлов 2ГИС, конвертирует в JPG/PNG,
сохраняет в /home/z/my-project/public/arkadia/real/
"""
import os
import re
import base64
from pathlib import Path
from urllib.parse import unquote

UPLOAD_DIR = Path("/home/z/my-project/upload")
OUTPUT_DIR = Path("/home/z/my-project/public/arkadia/real")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Паттерны для поиска изображений
DATA_URI_PATTERN = re.compile(
    r'data:image/(jpeg|jpg|png|webp);base64,([A-Za-z0-9+/=\s]+)',
    re.MULTILINE
)
SRC_PATTERN = re.compile(
    r'<img[^>]+src="([^"]+)"',
    re.IGNORECASE
)
SRCSET_PATTERN = re.compile(
    r'srcset="([^"]+)"',
    re.IGNORECASE
)

total_saved = 0

for html_file in sorted(UPLOAD_DIR.glob("*.html")):
    file_size = html_file.stat().st_size
    
    # Читаем содержимое
    try:
        with open(html_file, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
    except Exception as e:
        print(f"  ! Can't read {html_file.name}: {e}")
        continue
    
    print(f"\n📄 {html_file.name[:60]}... ({file_size // 1024} KB)")
    
    # Получаем короткое имя для файлов
    short_name = html_file.stem[:50].strip()
    # Удаляем невидимые символы
    short_name = re.sub(r'[\u200b-\u200f\ufeff]', '', short_name)
    short_name = re.sub(r'[^\w\s-]', '', short_name)
    short_name = short_name.strip().replace(' ', '_')[:40]
    if not short_name:
        short_name = "branch"
    
    # 1. Ищем data: URI (base64)
    base64_images = DATA_URI_PATTERN.findall(content)
    print(f"   data:image base64 found: {len(base64_images)}")
    
    saved_here = 0
    for idx, (ext, b64data) in enumerate(base64_images):
        try:
            # Очищаем base64 от пробелов и переносов
            clean_b64 = re.sub(r'\s+', '', b64data)
            if len(clean_b64) < 1000:  # пропускаем мелкие иконки
                continue
            
            img_bytes = base64.b64decode(clean_b64)
            if len(img_bytes) < 2000:  # пропускаем слишком маленькие
                continue
            
            ext_map = {'jpeg': 'jpg', 'jpg': 'jpg', 'png': 'png', 'webp': 'webp'}
            file_ext = ext_map.get(ext, 'jpg')
            out_path = OUTPUT_DIR / f"{short_name}_{saved_here + 1:02d}.{file_ext}"
            
            with open(out_path, 'wb') as f:
                f.write(img_bytes)
            
            saved_here += 1
            total_saved += 1
            print(f"   ✓ Saved: {out_path.name} ({len(img_bytes) // 1024} KB)")
        except Exception as e:
            print(f"   ! Failed to decode image {idx}: {e}")
    
    if saved_here == 0:
        print(f"   (no usable base64 images)")

print(f"\n{'='*60}")
print(f"Всего сохранено изображений: {total_saved}")
print(f"Папка: {OUTPUT_DIR}")
