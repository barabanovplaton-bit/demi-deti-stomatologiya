"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services } from "./clinic-data";
import { useComingSoon } from "./coming-soon-modal";

// SVG-заглушки для услуг — в едином стиле (линейный минимализм)
const serviceIcons: Record<string, JSX.Element> = {
  therapy: (
    <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7">
      <path d="M24 8 C 18 8 14 12 14 18 C 14 22 16 24 16 28 C 16 32 14 36 14 38 C 14 40 16 40 18 38 C 20 36 20 32 22 32 C 24 32 24 36 26 36 C 28 36 28 32 30 32 C 32 32 32 36 34 38 C 36 40 38 40 38 38 C 38 36 36 32 36 28 C 36 24 38 22 38 18 C 38 12 34 8 28 8 C 26 8 26 10 24 10 C 22 10 22 8 24 8 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
    </svg>
  ),
  surgery: (
    <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7">
      <path d="M14 14 L34 34 M34 14 L14 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  ),
  prosthetics: (
    <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7">
      <path d="M12 24 C 12 18 16 14 20 14 C 22 14 24 16 24 20 C 24 16 26 14 28 14 C 32 14 36 18 36 24 C 36 30 32 34 28 34 C 26 34 24 32 24 28 C 24 32 22 34 20 34 C 16 34 12 30 12 24 Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  ),
  implantation: (
    <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7">
      <path d="M24 8 L24 32 M18 14 L30 14 M20 20 L28 20 M22 26 L26 26 M24 32 L22 40 M24 32 L26 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  orthodontics: (
    <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7">
      <path d="M8 24 L40 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="12" y="20" width="6" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <rect x="21" y="20" width="6" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <rect x="30" y="20" width="6" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  ),
  pediatrics: (
    <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7">
      <circle cx="24" cy="18" r="6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M16 30 C 16 26 20 24 24 24 C 28 24 32 26 32 30 L32 36 L16 36 Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  ),
  diagnostics: (
    <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7">
      <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M24 14 L24 24 L32 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  hygiene: (
    <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7">
      <path d="M24 8 L26 16 L24 24 L22 16 Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
      <path d="M16 28 L32 28 L30 40 L18 40 Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
      <path d="M20 32 L28 32 M21 36 L27 36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
};

export function Services() {
  const { open } = useComingSoon();

  return (
    <section className="relative bg-arkadia-mist py-20 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Заголовок */}
        <div className="mb-10 md:mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 rounded-full bg-arkadia-blue/10 text-arkadia-blue text-xs font-medium mb-4"
          >
            Услуги
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-arkadia-graphite leading-[1.1] tracking-tight max-w-3xl text-balance"
          >
            Восемь направлений лечения
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 font-body text-base md:text-lg text-arkadia-slate max-w-2xl leading-relaxed"
          >
            От детского стоматолога до имплантации. Цены — после осмотра и
            плана лечения.
          </motion.p>
        </div>

        {/* Сетка услуг — 2 колонки на мобиле, 4 на десктопе */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {services.map((service, i) => (
            <motion.button
              key={service.id}
              onClick={() => open("services")}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
              className="group text-left rounded-2xl bg-white border border-arkadia-graphite/8 p-4 md:p-6 hover:shadow-soft-md hover:-translate-y-0.5 hover:border-arkadia-blue/20 transition-all duration-300"
            >
              {/* Иконка + номер */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-xl bg-arkadia-blue/8 text-arkadia-blue group-hover:bg-arkadia-blue group-hover:text-white transition-colors duration-300">
                  {serviceIcons[service.id]}
                </div>
                <span className="font-display text-xs font-semibold text-arkadia-ash tracking-wider">
                  {service.num}
                </span>
              </div>

              {/* Заголовок */}
              <h3 className="font-display text-base md:text-lg font-semibold text-arkadia-graphite mb-2 group-hover:text-arkadia-blue transition-colors">
                {service.title}
              </h3>

              {/* Описание */}
              <p className="font-body text-xs md:text-sm text-arkadia-slate leading-relaxed line-clamp-3">
                {service.text}
              </p>

              {/* Стрелка */}
              <div className="mt-4 flex items-center gap-1 text-arkadia-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-body text-xs font-medium">Подробнее</span>
                <ArrowUpRight className="h-3 w-3" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
