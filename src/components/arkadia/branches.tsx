"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock } from "lucide-react";
import { branches } from "./clinic-data";

export function Branches() {
  return (
    <section
      id="branches"
      className="relative bg-arkadia-paper py-20 md:py-32 overflow-hidden"
    >
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
            Филиалы
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-arkadia-graphite leading-[1.1] tracking-tight max-w-3xl text-balance"
          >
            Семь филиалов в Петербурге
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 font-body text-base md:text-lg text-arkadia-slate max-w-2xl leading-relaxed"
          >
            От Невского до Рыбацкого — выберите ближайший. Везде работают
            по одним стандартам, везде принимают запись по единному номеру.
          </motion.p>
        </div>

        {/* Сетка филиалов */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {branches.map((branch, i) => (
            <motion.article
              key={branch.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group rounded-2xl bg-arkadia-cream border border-arkadia-navy/8 overflow-hidden hover:shadow-soft-md hover:-translate-y-0.5 transition-all duration-300"
            >
              {/* Фото филиала */}
              <div className="relative aspect-[16/10] overflow-hidden bg-arkadia-mist">
                <img
                  src={branch.photo}
                  alt={`Филиал «Аркадия» ${branch.name}`}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Номер филиала */}
                <span className="absolute top-3 left-3 flex h-7 px-2.5 items-center justify-center rounded-lg bg-arkadia-paper/95 backdrop-blur-sm font-display text-xs font-semibold text-arkadia-navy">
                  № {i + 1}
                </span>
              </div>

              {/* Контент */}
              <div className="p-5 md:p-6">
                <h3 className="font-display text-lg md:text-xl font-semibold text-arkadia-graphite">
                  {branch.name}
                </h3>

                <div className="mt-3 space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-arkadia-navy/60 mt-0.5 flex-shrink-0" />
                    <span className="font-body text-sm text-arkadia-graphite/90">
                      {branch.address}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-arkadia-navy/60 mt-0.5 flex-shrink-0" />
                    <span className="font-body text-xs text-arkadia-slate">
                      {branch.hours}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 pt-2 mt-2 border-t border-arkadia-navy/8">
                    <Phone className="h-4 w-4 text-arkadia-navy/60 flex-shrink-0" />
                    <a
                      href={`tel:${branch.phone.replace(/[^\d+]/g, "")}`}
                      className="font-body text-sm font-medium text-arkadia-navy hover:text-arkadia-navy-dark transition-colors"
                    >
                      {branch.phone}
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}

          {/* Дополнительная карточка — единый номер */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-2xl bg-arkadia-navy text-arkadia-paper p-6 md:p-8 flex flex-col justify-between"
          >
            <div>
              <p className="font-body text-xs uppercase tracking-wider text-arkadia-paper/70 mb-3">
                Единый номер
              </p>
              <p className="font-body text-sm text-arkadia-paper/85 leading-relaxed">
                Не знаете, какой филиал выбрать? Позвоните — администратор
                подберёт ближайший и удобный по времени.
              </p>
            </div>
            <a
              href="tel:+78126034050"
              className="mt-5 inline-flex items-center gap-2 font-display text-2xl md:text-3xl font-bold text-arkadia-paper hover:text-arkadia-gold transition-colors"
            >
              603-40-50
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
