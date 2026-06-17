"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services } from "./clinic-data";
import { useComingSoon } from "./coming-soon-modal";

export function Services() {
  const { open } = useComingSoon();

  return (
    <section className="relative bg-arkadia-cream py-20 md:py-32 overflow-hidden">
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
            От детского стоматолога до имплантации. Точные цены на каждую
            процедуру — после осмотра и составления плана лечения.
          </motion.p>
        </div>

        {/* Сетка услуг */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {services.map((service, i) => (
            <motion.button
              key={service.id}
              onClick={() => open("services")}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
              className="group text-left rounded-2xl bg-arkadia-paper border border-arkadia-navy/8 p-5 md:p-6 hover:shadow-soft-md hover:-translate-y-0.5 hover:border-arkadia-navy/20 transition-all duration-300"
            >
              {/* Номер */}
              <div className="flex items-start justify-between mb-4">
                <span className="font-display text-xs font-semibold text-arkadia-navy tracking-wider">
                  {service.num}
                </span>
                <ArrowUpRight className="h-4 w-4 text-arkadia-ash group-hover:text-arkadia-navy group-hover:rotate-12 transition-all duration-300" />
              </div>

              {/* Заголовок */}
              <h3 className="font-display text-lg md:text-xl font-semibold text-arkadia-graphite mb-2 group-hover:text-arkadia-navy transition-colors">
                {service.title}
              </h3>

              {/* Описание */}
              <p className="font-body text-sm text-arkadia-slate leading-relaxed">
                {service.text}
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
          className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => open("prices")}
            className="font-body text-sm font-medium text-arkadia-navy hover:text-arkadia-navy-dark transition-colors"
          >
            Смотреть прайс-лист →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
