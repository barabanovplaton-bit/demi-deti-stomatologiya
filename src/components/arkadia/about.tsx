"use client";

import { motion } from "framer-motion";
import { clinicStats } from "./clinic-data";

export function About() {
  return (
    <section
      id="about"
      className="relative bg-arkadia-paper py-20 md:py-32 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-arkadia-blue/10 text-arkadia-blue text-xs font-medium mb-4">
            О клинике
          </span>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-arkadia-graphite leading-[1.1] tracking-tight max-w-3xl text-balance">
            «Аркадия» — это{" "}
            <span className="text-arkadia-blue">«страна счастливых людей»</span>
          </h2>
        </motion.div>

        {/* Текст */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid lg:grid-cols-[1fr_1.3fr] gap-8 md:gap-12"
        >
          <p className="font-body text-base md:text-lg text-arkadia-slate leading-relaxed">
            Так переводится с греческого название клиники, которое она получила
            в 1991 году. Прежде она называлась проще — «Кооператив Стоматолог»,
            одна из первых частных стоматологий Ленинграда, открытая в 1989-м.
          </p>
          <p className="font-body text-base md:text-lg text-arkadia-graphite/85 leading-relaxed">
            Сегодня Аркадия — это шесть филиалов по Петербургу, десятки врачей,
            тысячи пациентов, которые возвращаются поколениями. Рейтинг 4.9 на
            2ГИС — не маркетинг, а тридцать пять лет работы без спешки и без
            лишних манипуляций.
          </p>
        </motion.div>

        {/* Метрики */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
        >
          {[
            { value: clinicStats.yearsActive, label: "лет клинике", sub: "с 1989 года" },
            { value: clinicStats.branchesCount, label: "филиалов", sub: "по Петербургу" },
            { value: clinicStats.rating, label: "рейтинг 2ГИС", sub: "из 5" },
            { value: clinicStats.reviewsCount, label: "отзывов", sub: "от пациентов" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl bg-arkadia-mist border border-arkadia-graphite/5 p-5 md:p-6"
            >
              <p className="font-display text-3xl md:text-4xl font-bold text-arkadia-blue leading-none">
                {stat.value}
              </p>
              <p className="mt-2.5 font-body text-sm text-arkadia-graphite font-medium">
                {stat.label}
              </p>
              <p className="font-body text-xs text-arkadia-slate mt-0.5">
                {stat.sub}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
