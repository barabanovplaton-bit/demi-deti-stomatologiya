"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { history } from "./clinic-data";

export function HistoryTrail() {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = history.timeline.length;

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Координаты точек на тропинке — извилистая
  // Распределены по горизонтали, с разной высотой
  const points = [
    { x: 50, y: 220 },   // 1989 — низ
    { x: 200, y: 110 },  // 1991 — верх
    { x: 400, y: 180 },  // 2002 — середина
    { x: 580, y: 90 },   // 2004 — верх
    { x: 750, y: 160 },  // 2024 — середина
  ];

  // Расчёт длины пути пропорционально разнице лет
  const yearDiffs = [];
  for (let i = 1; i < history.timeline.length; i++) {
    const prev = parseInt(history.timeline[i - 1].year);
    const curr = parseInt(history.timeline[i].year);
    yearDiffs.push(curr - prev);
  }

  // SVG path — извилистая кривая через все точки
  const pathD = points
    .map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = points[i - 1];
      const cp1x = prev.x + (p.x - prev.x) * 0.5;
      const cp1y = prev.y + (p.y - prev.y) * 0.1;
      const cp2x = prev.x + (p.x - prev.x) * 0.5;
      const cp2y = p.y + (prev.y - p.y) * 0.1;
      return `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p.x} ${p.y}`;
    })
    .join(" ");

  const currentItem = history.timeline[currentStep];

  return (
    <section
      id="history"
      className="relative bg-arkadia-mist py-20 md:py-32 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16 text-center"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-arkadia-blue/10 text-arkadia-blue text-xs font-medium mb-4">
            История клиники
          </span>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-arkadia-graphite leading-[1.1] tracking-tight max-w-3xl mx-auto text-balance">
            Тридцать пять лет по{" "}
            <span className="text-arkadia-blue">одной тропинке</span>
          </h2>
          <p className="mt-5 font-body text-base text-arkadia-slate max-w-xl mx-auto leading-relaxed">
            Идите по тропинке шаг за шагом — каждый шаг, как год в истории
            клиники.
          </p>
        </motion.div>

        {/* SVG-тропинка с точками */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-3xl mx-auto"
        >
          <svg
            viewBox="0 0 800 280"
            className="w-full h-auto"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Фоновая тропинка (серая, вся) */}
            <path
              d={pathD}
              stroke="#0000fa20"
              strokeWidth="2"
              strokeDasharray="6 8"
              strokeLinecap="round"
            />

            {/* Прорисованная часть тропинки (до текущего шага) */}
            {currentStep > 0 && (
              <motion.path
                d={pathD}
                stroke="#0000fa"
                strokeWidth="2.5"
                strokeDasharray="6 8"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{
                  pathLength: points
                    .slice(0, currentStep + 1)
                    .reduce((acc, _, i, arr) => {
                      if (i === 0) return 0;
                      const p1 = points[i - 1];
                      const p2 = points[i];
                      return acc + Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
                    }, 0) / 900,
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            )}

            {/* Точки */}
            {points.map((p, i) => {
              const isPassed = i <= currentStep;
              const isCurrent = i === currentStep;
              return (
                <g key={i}>
                  {/* Метка года */}
                  <text
                    x={p.x}
                    y={p.y - 24}
                    textAnchor="middle"
                    className={`font-display font-bold transition-colors duration-300 ${
                      isPassed ? "fill-arkadia-blue" : "fill-arkadia-ash"
                    }`}
                    style={{ fontSize: "16px" }}
                  >
                    {history.timeline[i].year}
                  </text>

                  {/* Внешний круг точки */}
                  <motion.circle
                    cx={p.x}
                    cy={p.y}
                    r={isCurrent ? 14 : (isPassed ? 8 : 6)}
                    fill={isCurrent ? "#0000fa" : (isPassed ? "#0000fa" : "white")}
                    stroke={isPassed ? "#0000fa" : "#94A3B8"}
                    strokeWidth="2"
                    animate={{
                      r: isCurrent ? [14, 16, 14] : (isPassed ? 8 : 6),
                    }}
                    transition={{
                      duration: 2,
                      repeat: isCurrent ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Внутренняя точка */}
                  {isCurrent && (
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="4"
                      fill="white"
                    />
                  )}

                  {/* Пульсация вокруг активной точки */}
                  {isCurrent && (
                    <motion.circle
                      cx={p.x}
                      cy={p.y}
                      r="14"
                      fill="none"
                      stroke="#0000fa"
                      strokeWidth="2"
                      initial={{ r: 14, opacity: 0.6 }}
                      animate={{ r: 28, opacity: 0 }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                  )}
                </g>
              );
            })}
          </svg>
        </motion.div>

        {/* Карточка текущего события */}
        <div className="mt-10 md:mt-14 max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-2xl bg-white border border-arkadia-graphite/8 p-6 md:p-8 shadow-soft"
            >
              {/* Год крупно */}
              <p className="font-display text-5xl md:text-6xl font-bold text-arkadia-blue leading-none">
                {currentItem.year}
              </p>

              {/* Линия */}
              <div className="mt-4 h-px w-16 bg-arkadia-blue/30" />

              {/* Текст события */}
              <p className="mt-5 font-body text-base md:text-lg text-arkadia-graphite leading-relaxed">
                {currentItem.event}
              </p>

              {/* Номер шага */}
              <span className="absolute top-6 right-6 font-body text-xs text-arkadia-ash">
                {currentStep + 1} / {totalSteps}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Кнопки управления */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center justify-center h-11 w-11 rounded-full bg-white border border-arkadia-graphite/10 text-arkadia-graphite hover:border-arkadia-blue hover:text-arkadia-blue disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Предыдущий шаг"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <button
            onClick={nextStep}
            disabled={currentStep === totalSteps - 1}
            className="flex items-center gap-2 px-6 h-11 rounded-full bg-arkadia-blue text-white font-body text-sm font-medium hover:bg-arkadia-blue-soft disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Следующий шаг
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Подсказка */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-center font-body text-xs text-arkadia-slate"
        >
          или просто листайте дальше — тропинка никуда не убежит
        </motion.p>
      </div>
    </section>
  );
}
