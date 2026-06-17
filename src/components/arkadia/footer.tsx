"use client";

import { motion } from "framer-motion";
import { Phone, MapPin } from "lucide-react";
import { branches, clinicStats } from "./clinic-data";

export function Footer() {
  return (
    <footer className="relative bg-arkadia-graphite text-arkadia-paper pt-16 md:pt-20 pb-8 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Верхний блок */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 pb-12 border-b border-arkadia-paper/10">
          {/* Логотип + слоган */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-arkadia-navy text-arkadia-paper font-display text-lg font-semibold">
                А
              </span>
              <div>
                <p className="font-display text-base font-semibold">
                  Аркадия
                </p>
                <p className="font-body text-[10px] text-arkadia-paper/60 mt-0.5">
                  стоматология · с 1989
                </p>
              </div>
            </div>
            <p className="font-body text-sm text-arkadia-paper/70 leading-relaxed">
              «Аркадия» — страна счастливых людей.
              <br />
              Стоматологическая клиника в Петербурге.
            </p>
          </div>

          {/* Телефон */}
          <div>
            <p className="font-body text-[10px] uppercase tracking-[0.25em] text-arkadia-gold/80 mb-4">
              Единый номер
            </p>
            <a
              href={`tel:${clinicStats.mainPhone.replace(/[^\d+]/g, "")}`}
              className="font-display text-3xl font-bold text-arkadia-paper hover:text-arkadia-gold transition-colors"
            >
              {clinicStats.mainPhone}
            </a>
            <p className="mt-3 font-body text-xs text-arkadia-paper/60">
              Пн–Сб 10:00–20:00 · Вс 10:00–19:00
            </p>
            <a
              href="https://2gis.ru/spb/firm/5348552838510576"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block font-body text-xs text-arkadia-paper/80 hover:text-arkadia-gold transition-colors"
            >
              4.9 ★ на 2ГИС · 216 отзывов →
            </a>
          </div>

          {/* Соцсети + сайт */}
          <div>
            <p className="font-body text-[10px] uppercase tracking-[0.25em] text-arkadia-gold/80 mb-4">
              Контакты
            </p>
            <a
              href={`https://${clinicStats.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block font-body text-sm text-arkadia-paper hover:text-arkadia-gold transition-colors mb-2"
            >
              {clinicStats.website}
            </a>
            <a
              href="https://vk.com/aklinika"
              target="_blank"
              rel="noopener noreferrer"
              className="block font-body text-sm text-arkadia-paper hover:text-arkadia-gold transition-colors"
            >
              ВКонтакте · vk.com/aklinika
            </a>
          </div>
        </div>

        {/* Все филиалы */}
        <div className="py-10 border-b border-arkadia-paper/10">
          <p className="font-body text-[10px] uppercase tracking-[0.25em] text-arkadia-gold/80 mb-6">
            Все филиалы · {branches.length} адресов
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
            {branches.map((b, i) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="flex items-start justify-between gap-3 pb-3 border-b border-arkadia-paper/8"
              >
                <div className="flex-1">
                  <p className="font-body text-sm font-medium text-arkadia-paper">
                    {b.name}
                  </p>
                  <p className="font-body text-xs text-arkadia-paper/55 mt-0.5 flex items-start gap-1">
                    <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                    {b.address}
                  </p>
                </div>
                <a
                  href={`tel:${b.phone.replace(/[^\d+]/g, "")}`}
                  className="font-body text-xs text-arkadia-gold hover:text-arkadia-paper transition-colors whitespace-nowrap flex items-center gap-1 mt-0.5"
                >
                  <Phone className="h-3 w-3" />
                  {b.phone}
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Нижний бар */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-arkadia-paper/50 text-center md:text-left">
            © 1989 — {new Date().getFullYear()} · Стоматологическая клиника «Аркадия» ·
            Санкт-Петербург
          </p>
          <p className="font-body text-[10px] uppercase tracking-[0.2em] text-arkadia-paper/35">
            Лицензия · ЛО-78-01-009999
          </p>
        </div>

        {/* Подпись разработчика */}
        <div className="mt-6 text-center">
          <p className="font-body text-[10px] uppercase tracking-[0.25em] text-arkadia-paper/25">
            Концепт-сайт · подготовлен как инициативный проект
          </p>
        </div>
      </div>
    </footer>
  );
}
