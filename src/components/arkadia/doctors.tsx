"use client";

import { motion } from "framer-motion";
import { doctors } from "./clinic-data";
import { useComingSoon } from "./coming-soon-modal";

// Стилизованные SVG-портреты — абстрактные, без лиц
// У каждого врача своя форма/композиция, но в одном стиле
const portraitStyle: Record<number, { bg: string; accent: string }> = {
  0: { bg: "#DBEAFE", accent: "#0000fa" },
  1: { bg: "#EEF2FF", accent: "#4338ca" },
  2: { bg: "#F8FAFC", accent: "#0000fa" },
  3: { bg: "#DBEAFE", accent: "#4338ca" },
  4: { bg: "#EEF2FF", accent: "#0000fa" },
  5: { bg: "#F8FAFC", accent: "#4338ca" },
};

function DoctorPortrait({ index, initials }: { index: number; initials: string }) {
  const style = portraitStyle[index % 6];

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Фон */}
      <rect width="200" height="200" fill={style.bg} />

      {/* Декоративные круги */}
      <circle cx="100" cy="80" r="60" fill="none" stroke={style.accent} strokeWidth="1" opacity="0.2" />
      <circle cx="100" cy="80" r="40" fill="none" stroke={style.accent} strokeWidth="1" opacity="0.3" />

      {/* Голова — стилизованная */}
      <circle cx="100" cy="80" r="28" fill={style.accent} opacity="0.9" />

      {/* Плечи — стилизованная дуга */}
      <path
        d="M 60 160 Q 100 120 140 160 L 140 200 L 60 200 Z"
        fill={style.accent}
        opacity="0.7"
      />

      {/* Инициалы по центру головы */}
      <text
        x="100"
        y="88"
        textAnchor="middle"
        className="font-display"
        style={{
          fontSize: "22px",
          fontWeight: 700,
          fill: "#FFFFFF",
        }}
      >
        {initials}
      </text>

      {/* Декоративные элементы */}
      <line x1="20" y1="180" x2="60" y2="180" stroke={style.accent} strokeWidth="1" opacity="0.3" />
      <line x1="140" y1="180" x2="180" y2="180" stroke={style.accent} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

export function Doctors() {
  const { open } = useComingSoon();

  return (
    <section className="relative bg-arkadia-paper py-20 md:py-32 overflow-hidden">
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
            Врачи
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-arkadia-graphite leading-[1.1] tracking-tight max-w-3xl text-balance"
          >
            Команда специалистов
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 font-body text-base md:text-lg text-arkadia-slate max-w-2xl leading-relaxed"
          >
            Взрослые и детские стоматологи всех направлений.
          </motion.p>
        </div>

        {/* Сетка врачей */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {doctors.map((doc, i) => (
            <motion.button
              key={i}
              onClick={() => open("doctors")}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group text-left rounded-2xl bg-arkadia-mist border border-arkadia-graphite/5 overflow-hidden hover:shadow-soft-md hover:-translate-y-0.5 transition-all duration-300"
            >
              {/* Портрет-заглушка */}
              <div className="aspect-square overflow-hidden">
                <DoctorPortrait index={i} initials={doc.initials} />
              </div>

              {/* Контент */}
              <div className="p-4 md:p-6">
                <h3 className="font-display text-base md:text-lg font-semibold text-arkadia-graphite group-hover:text-arkadia-blue transition-colors">
                  {doc.name}
                </h3>
                <p className="mt-1 font-body text-xs md:text-sm text-arkadia-slate leading-tight">
                  {doc.role}
                </p>

                {/* Цитата */}
                <p className="mt-3 font-body text-xs md:text-sm italic text-arkadia-graphite/75 leading-relaxed pl-2.5 border-l-2 border-arkadia-blue/20">
                  {doc.quote}
                </p>

                <p className="mt-3 font-body text-[10px] uppercase tracking-wider text-arkadia-blue/70 font-medium">
                  {doc.since}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
