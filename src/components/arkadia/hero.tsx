"use client";

import { motion } from "framer-motion";
import { Phone, ChevronDown, Star } from "lucide-react";
import { clinicStats } from "./clinic-data";

export function Hero() {
  const title = "Аркадия";

  const scrollToNext = () => {
    const el = document.getElementById("about");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-arkadia-cream pt-20 md:pt-24">
      {/* Декоративный фоновый паттерн */}
      <div
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(30, 58, 95, 0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 100% 100%, rgba(184, 148, 95, 0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center min-h-[calc(100svh-6rem)] py-10">
          {/* Левая колонка — текст */}
          <div className="order-2 lg:order-1">
            {/* Рейтинг сверху */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-arkadia-paper border border-arkadia-navy/10 shadow-soft mb-7"
            >
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="h-3.5 w-3.5 fill-arkadia-gold text-arkadia-gold"
                  />
                ))}
              </div>
              <span className="font-body text-xs text-arkadia-graphite">
                <strong className="font-semibold">{clinicStats.rating}</strong> · {clinicStats.reviewsCount} отзывов на 2ГИС
              </span>
            </motion.div>

            {/* Маленькая метка */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="h-px w-8 bg-arkadia-navy/40" />
              <span className="font-body text-xs uppercase tracking-[0.25em] text-arkadia-navy font-medium">
                стоматологическая клиника
              </span>
            </motion.div>

            {/* Главное название */}
            <h1 className="font-display font-bold text-arkadia-graphite text-[18vw] leading-[0.95] sm:text-[14vw] md:text-[12vw] lg:text-[9vw] tracking-tight">
              {title.split("").map((letter, i) => (
                <span
                  key={i}
                  className="animate-letter-soft inline-block"
                  style={{ animationDelay: `${0.3 + i * 0.06}s` }}
                >
                  {letter}
                </span>
              ))}
            </h1>

            {/* Подзаголовок */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-5 font-body text-lg md:text-xl text-arkadia-slate leading-relaxed max-w-xl text-pretty"
            >
              Семь филиалов в Санкт-Петербурге · с 1989 года ·
              для всей семьи — от детской стоматологии до имплантации.
            </motion.p>

            {/* Кнопки */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            >
              <button
                onClick={scrollToNext}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-arkadia-navy hover:bg-arkadia-navy-dark text-arkadia-paper font-body text-sm font-medium transition-colors duration-200"
              >
                Записаться на приём
              </button>
              <a
                href={`tel:${clinicStats.mainPhone.replace(/[^\d+]/g, "")}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-arkadia-paper hover:bg-arkadia-bone text-arkadia-graphite border border-arkadia-navy/15 font-body text-sm font-medium transition-colors duration-200"
              >
                <Phone className="h-3.5 w-3.5" />
                {clinicStats.mainPhone}
              </a>
            </motion.div>

            {/* Маленькая статистика снизу */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-10 flex items-center gap-6 md:gap-8 text-arkadia-slate"
            >
              <div>
                <p className="font-display text-2xl font-semibold text-arkadia-graphite">
                  {clinicStats.yearsActive}
                </p>
                <p className="font-body text-xs mt-0.5">лет клинике</p>
              </div>
              <div className="h-8 w-px bg-arkadia-navy/15" />
              <div>
                <p className="font-display text-2xl font-semibold text-arkadia-graphite">
                  {clinicStats.branchesCount}
                </p>
                <p className="font-body text-xs mt-0.5">филиалов</p>
              </div>
              <div className="h-8 w-px bg-arkadia-navy/15" />
              <div>
                <p className="font-display text-2xl font-semibold text-arkadia-graphite">
                  {clinicStats.reviewsCount}
                </p>
                <p className="font-body text-xs mt-0.5">отзывов</p>
              </div>
            </motion.div>
          </div>

          {/* Правая колонка — фото */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] rounded-2xl lg:rounded-3xl overflow-hidden shadow-soft-lg">
              <img
                src="/arkadia/real/nevsky_c7a08508.jpg"
                alt="Интерьер клиники «Аркадия» на Невском проспекте"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-arkadia-navy/30 via-transparent to-transparent" />

              {/* Плавающая плашка с адресом */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="absolute bottom-4 left-4 right-4 sm:left-5 sm:right-5 sm:bottom-5 bg-arkadia-paper/95 backdrop-blur-sm rounded-xl p-4 shadow-soft-md"
              >
                <p className="font-body text-[10px] uppercase tracking-wider text-arkadia-navy font-medium">
                  главный филиал
                </p>
                <p className="font-display text-base font-semibold text-arkadia-graphite mt-1">
                  Невский пр., 22
                </p>
                <p className="font-body text-xs text-arkadia-slate mt-0.5">
                  м. Невский проспект · 3 этаж
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Индикатор скролла */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          onClick={scrollToNext}
          className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 text-arkadia-slate hover:text-arkadia-navy transition-colors"
          aria-label="Листать вниз"
        >
          <span className="font-body text-[10px] uppercase tracking-[0.2em]">
            листайте
          </span>
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </motion.button>
      </div>
    </section>
  );
}
