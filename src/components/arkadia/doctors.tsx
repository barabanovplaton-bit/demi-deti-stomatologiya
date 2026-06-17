"use client";

import { motion } from "framer-motion";
import { doctors } from "./clinic-data";
import { useComingSoon } from "./coming-soon-modal";

export function Doctors() {
  const { open } = useComingSoon();

  return (
    <section className="relative bg-arkadia-paper py-20 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Заголовок */}
        <div className="mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 rounded-full bg-arkadia-navy/8 text-arkadia-navy text-xs font-medium mb-4"
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
            Взрослые и детские стоматологи всех направлений. Терапия,
            хирургия, ортодонтия, протезирование, имплантация, пародонтология.
          </motion.p>
        </div>

        {/* Сетка врачей */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {doctors.map((doc, i) => (
            <motion.button
              key={i}
              onClick={() => open("doctors")}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group text-left rounded-2xl bg-arkadia-cream border border-arkadia-navy/8 p-6 md:p-7 hover:shadow-soft-md hover:-translate-y-0.5 hover:border-arkadia-navy/20 transition-all duration-300"
            >
              {/* Аватар-монограмма */}
              <div className="mb-5 flex items-center gap-4">
                <div className="relative h-14 w-14 md:h-16 md:w-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-arkadia-navy to-arkadia-navy-light text-arkadia-paper">
                  <span className="font-display text-xl font-semibold">
                    {doc.initials}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-arkadia-graphite group-hover:text-arkadia-navy transition-colors">
                    {doc.name}
                  </h3>
                  <p className="font-body text-xs text-arkadia-slate mt-1 leading-tight">
                    {doc.role}
                  </p>
                </div>
              </div>

              {/* Цитата */}
              <p className="font-body text-sm italic text-arkadia-graphite/80 leading-relaxed pl-3 border-l-2 border-arkadia-navy/20">
                {doc.quote}
              </p>

              <p className="mt-5 font-body text-[11px] uppercase tracking-wider text-arkadia-navy/70 font-medium">
                {doc.since}
              </p>
            </motion.button>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 md:mt-12 text-center"
        >
          <button
            onClick={() => open("doctors")}
            className="font-body text-sm font-medium text-arkadia-navy hover:text-arkadia-navy-dark transition-colors"
          >
            Вся команда врачей →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
