"use client";

import { useRef, Suspense, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";

// Динамический импорт 3D-зуба (только на клиенте)
const Tooth3D = dynamic(
  () => import("./tooth-3d").then((mod) => mod.Tooth3D),
  { ssr: false, loading: () => null }
);

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // При скролле — зуб уезжает вниз, текст затухает
  const toothY = useTransform(scrollYProgress, [0, 1], ["0vh", "80vh"]);
  const toothRotate = useTransform(scrollYProgress, [0, 1], [0, 35]);
  const toothScale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.4], ["0vh", "-20vh"]);

  const scrollToNext = () => {
    const el = document.getElementById("about");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden bg-arkadia-blue"
    >
      {/* Декоративный фон — сетка */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Радиальный градиент сверху для глубины */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(67, 56, 202, 0.4) 0%, transparent 70%)",
        }}
      />

      {/* 3D-зуб */}
      <motion.div
        style={{ y: toothY, rotate: toothRotate, scale: toothScale }}
        className="absolute inset-0 z-10 flex items-center justify-center"
      >
        <div className="relative w-full h-full">
          <Suspense fallback={null}>
            <Tooth3D />
          </Suspense>
        </div>
      </motion.div>

      {/* Гравировка «Аркадия» поверх зуба */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 2.4 }}
          className="font-display font-bold text-white text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-center px-4"
          style={{
            textShadow:
              "0 4px 24px rgba(0,0,0,0.45), 0 1px 0 rgba(0,0,0,0.3), 0 -1px 0 rgba(255,255,255,0.15)",
          }}
        >
          АРКАДИЯ
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.9 }}
          className="mt-5 font-body text-xs sm:text-sm uppercase tracking-[0.4em] text-white/85 text-center"
        >
          страна счастливых людей
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 3.2 }}
          className="mt-8 h-px w-24 bg-white/40 origin-center"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3.4 }}
          className="mt-5 font-body text-xs text-white/70 max-w-md text-center px-6 leading-relaxed"
        >
          Стоматология в Петербурге. Шесть филиалов.
          <br className="hidden sm:block" />
          Тридцать пять лет, которые не прошли зря.
        </motion.p>
      </motion.div>

      {/* Подсказка скролла */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 3.6 }}
        onClick={scrollToNext}
        style={{ opacity: textOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors"
        aria-label="Листайте вниз"
      >
        <span className="font-body text-[10px] uppercase tracking-[0.3em]">
          листайте
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 2 L8 14 M3 9 L8 14 L13 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.span>
      </motion.button>

      {/* Рейтинг сверху — появляется после загрузки */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.6 }}
        style={{ opacity: textOpacity }}
        className="absolute top-24 left-1/2 -translate-x-1/2 z-30 hidden md:flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
      >
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <svg
              key={s}
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="#D4A537"
            >
              <path d="M12 2 L14.5 9 L22 9 L16 14 L18 22 L12 17 L6 22 L8 14 L2 9 L9.5 9 Z" />
            </svg>
          ))}
        </div>
        <span className="font-body text-xs text-white/90">
          <strong className="font-semibold">4.9</strong> · 216 отзывов на 2ГИС
        </span>
      </motion.div>
    </section>
  );
}
