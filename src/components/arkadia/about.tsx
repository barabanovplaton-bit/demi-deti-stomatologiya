"use client";

import { motion } from "framer-motion";
import { history, clinicStats } from "./clinic-data";

export function About() {
  return (
    <section
      id="about"
      className="relative bg-arkadia-cream py-20 md:py-32 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        {/* Заголовок секции */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-arkadia-navy/8 text-arkadia-navy text-xs font-medium mb-4">
            О клинике
          </span>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-arkadia-graphite leading-[1.1] tracking-tight max-w-3xl text-balance">
            С 1989 года — <span className="text-arkadia-navy">страна счастливых людей</span>
          </h2>
        </motion.div>

        {/* Вводный текст */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid lg:grid-cols-[1fr_1.3fr] gap-8 md:gap-12 mb-16 md:mb-20"
        >
          <p className="font-body text-base md:text-lg text-arkadia-slate leading-relaxed">
            Название «Аркадия» в переводе с греческого означает «страна
            счастливых людей». Клиника получила его в 1991 году — и с тех
            пор не меняла ни имени, ни принципа: лечить спокойно, без
            спешки, с уважением к каждому пациенту.
          </p>
          <p className="font-body text-base md:text-lg text-arkadia-graphite/85 leading-relaxed">
            Сегодня Аркадия — это семь филиалов по Петербургу, десятки
            врачей, тысячи пациентов, которые возвращаются поколениями.
            Рейтинг 4.9 на 2ГИС — подтверждение того, что тридцать пять лет
            работы не прошли зря.
          </p>
        </motion.div>

        {/* Таймлайн */}
        <div className="relative">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-body text-xs uppercase tracking-[0.25em] text-arkadia-navy font-medium mb-8"
          >
            История клиники
          </motion.p>

          <div className="relative pl-6 md:pl-8 border-l-2 border-arkadia-navy/15">
            {history.timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pb-10 last:pb-0"
              >
                {/* Точка */}
                <span className="absolute -left-[31px] md:-left-[39px] top-1.5 flex h-4 w-4 md:h-5 md:w-5 items-center justify-center rounded-full bg-arkadia-navy ring-4 ring-arkadia-cream">
                  <span className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-arkadia-paper" />
                </span>

                <p className="font-display text-xl md:text-2xl font-bold text-arkadia-navy">
                  {item.year}
                </p>
                <p className="mt-2 font-body text-sm md:text-base text-arkadia-slate leading-relaxed max-w-2xl">
                  {item.event}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Сетка ключевых метрик */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: clinicStats.yearsActive, label: "лет клинике", sub: "с 1989 года" },
            { value: clinicStats.branchesCount, label: "филиалов", sub: "по Петербургу" },
            { value: clinicStats.rating, label: "рейтинг 2ГИС", sub: "из 5" },
            { value: clinicStats.reviewsCount, label: "отзывов", sub: "от пациентов" },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-2xl bg-arkadia-paper border border-arkadia-navy/8 p-5 md:p-6 shadow-soft"
            >
              <p className="font-display text-3xl md:text-4xl font-bold text-arkadia-navy leading-none">
                {stat.value}
              </p>
              <p className="mt-2.5 font-body text-sm text-arkadia-graphite font-medium">
                {stat.label}
              </p>
              <p className="font-body text-xs text-arkadia-slate mt-0.5">
                {stat.sub}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
