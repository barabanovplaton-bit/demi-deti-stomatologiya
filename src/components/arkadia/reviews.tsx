"use client";

import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";
import { reviews, clinicStats } from "./clinic-data";
import { useComingSoon } from "./coming-soon-modal";

export function Reviews() {
  const { open } = useComingSoon();

  return (
    <section className="relative bg-arkadia-cream py-20 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Заголовок + рейтинг */}
        <div className="mb-12 md:mb-16 grid lg:grid-cols-[1fr_auto] gap-8 items-end">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-3 py-1 rounded-full bg-arkadia-navy/8 text-arkadia-navy text-xs font-medium mb-4"
            >
              Отзывы пациентов
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-arkadia-graphite leading-[1.1] tracking-tight max-w-3xl text-balance"
            >
              Что пишут пациенты
            </motion.h2>
          </div>

          {/* Блок с рейтингом 2ГИС */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl bg-arkadia-paper border border-arkadia-navy/8 p-5 md:p-6 shadow-soft flex items-center gap-5"
          >
            <div className="flex flex-col items-center">
              <p className="font-display text-4xl md:text-5xl font-bold text-arkadia-navy leading-none">
                {clinicStats.rating}
              </p>
              <div className="flex items-center gap-0.5 mt-1.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="h-3 w-3 fill-arkadia-gold text-arkadia-gold"
                  />
                ))}
              </div>
            </div>
            <div className="h-12 w-px bg-arkadia-navy/15" />
            <div>
              <p className="font-body text-sm font-medium text-arkadia-graphite">
                {clinicStats.reviewsCount} отзывов
              </p>
              <p className="font-body text-xs text-arkadia-slate mt-0.5">
                на 2ГИС
              </p>
              <a
                href="https://2gis.ru/spb/firm/5348552838510576"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 font-body text-xs text-arkadia-navy hover:text-arkadia-navy-dark transition-colors"
              >
                Смотреть все
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Сетка отзывов */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {reviews.map((review, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl bg-arkadia-paper border border-arkadia-navy/8 p-6 md:p-7 shadow-soft flex flex-col"
            >
              {/* Шапка отзыва */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="h-3.5 w-3.5 fill-arkadia-gold text-arkadia-gold"
                    />
                  ))}
                </div>
                <span className="font-body text-xs text-arkadia-slate">
                  {review.date}
                </span>
              </div>

              {/* Текст */}
              <p className="font-body text-sm md:text-base text-arkadia-graphite/85 leading-relaxed flex-1">
                «{review.text}»
              </p>

              {/* Подпись */}
              <div className="mt-5 pt-4 border-t border-arkadia-navy/8">
                <p className="font-display text-sm font-semibold text-arkadia-graphite">
                  {review.name}
                </p>
                <p className="font-body text-xs text-arkadia-slate mt-0.5">
                  {review.note}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 md:mt-12 text-center"
        >
          <button
            onClick={() => open("reviews")}
            className="font-body text-sm font-medium text-arkadia-navy hover:text-arkadia-navy-dark transition-colors"
          >
            Все отзывы на 2ГИС →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
