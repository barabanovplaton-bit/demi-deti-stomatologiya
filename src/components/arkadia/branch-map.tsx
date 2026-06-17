"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Clock, X, Navigation } from "lucide-react";
import { branches } from "./clinic-data";

// Координаты филиалов на стилизованной карте Петербурга
// (в процентах от ширины/высоты SVG viewBox 800x500)
const branchCoords: Record<string, { x: number; y: number }> = {
  nevsky: { x: 380, y: 200 },      // Центральный — Невский
  zagorodny: { x: 360, y: 260 },   // Центральный — Загородный (чуть южнее)
  lomonosova: { x: 320, y: 230 },  // Центральный — Ломоносова (западнее)
  vasilievsky: { x: 230, y: 220 }, // Василеостровский
  shuvalovsky: { x: 150, y: 80 },  // Приморский — север
  rybatsky: { x: 620, y: 380 },    // Фрунзенский — юго-восток
};

export function BranchMap() {
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const selectedBranch = selected
    ? branches.find((b) => b.id === selected)
    : null;

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
            className="inline-block px-3 py-1 rounded-full bg-arkadia-blue/10 text-arkadia-blue text-xs font-medium mb-4"
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
            Шесть точек на карте Петербурга
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 font-body text-base md:text-lg text-arkadia-slate max-w-2xl leading-relaxed"
          >
            Нажмите на точку — увидите адрес, телефон и часы работы. Можно
            перетаскивать карту и увеличивать.
          </motion.p>
        </div>

        {/* Карта */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl overflow-hidden border border-arkadia-graphite/10 shadow-soft-lg bg-arkadia-mist"
        >
          <div className="relative aspect-[4/3] md:aspect-[16/9]">
            <StylizedMap
              branches={branches}
              coords={branchCoords}
              selected={selected}
              hovered={hovered}
              onSelect={setSelected}
              onHover={setHovered}
            />
          </div>

          {/* Легенда */}
          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-arkadia-graphite/10">
            <span className="flex h-2 w-2 rounded-full bg-arkadia-blue animate-dot-pulse" />
            <span className="font-body text-xs text-arkadia-graphite">
              6 филиалов
            </span>
          </div>
        </motion.div>

        {/* Сетка филиалов под картой */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {branches.map((branch, i) => (
            <motion.button
              key={branch.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.05 }}
              onClick={() => setSelected(branch.id)}
              className={`text-left p-4 rounded-xl border transition-all duration-300 ${
                selected === branch.id
                  ? "bg-arkadia-blue text-white border-arkadia-blue shadow-soft-md"
                  : "bg-white border-arkadia-graphite/8 hover:border-arkadia-blue/30 hover:shadow-soft"
              }`}
            >
              <p className={`font-display text-sm font-semibold ${
                selected === branch.id ? "text-white" : "text-arkadia-graphite"
              }`}>
                {branch.name}
              </p>
              <p className={`mt-1 font-body text-xs ${
                selected === branch.id ? "text-white/80" : "text-arkadia-slate"
              }`}>
                {branch.metro}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Модалка с детальной информацией о филиале */}
      <AnimatePresence>
        {selectedBranch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <div className="absolute inset-0 bg-arkadia-graphite/40 backdrop-blur-md" />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.97, opacity: 0, y: 6 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-2xl bg-arkadia-paper p-6 md:p-8 shadow-soft-lg"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 flex items-center justify-center h-9 w-9 rounded-lg bg-arkadia-mist text-arkadia-slate hover:text-arkadia-blue transition-colors"
                aria-label="Закрыть"
              >
                <X className="h-4 w-4" />
              </button>

              <span className="inline-block px-2.5 py-1 rounded-full bg-arkadia-blue/10 text-arkadia-blue text-[11px] font-medium mb-3">
                Филиал
              </span>

              <h3 className="font-display text-2xl md:text-3xl font-bold text-arkadia-graphite">
                {selectedBranch.name}
              </h3>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-arkadia-blue/10 text-arkadia-blue flex-shrink-0">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-body text-xs text-arkadia-slate">Адрес</p>
                    <p className="font-body text-sm text-arkadia-graphite font-medium">
                      {selectedBranch.address}
                    </p>
                    <p className="font-body text-xs text-arkadia-slate mt-0.5">
                      м. {selectedBranch.metro} · {selectedBranch.district} район
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-arkadia-blue/10 text-arkadia-blue flex-shrink-0">
                    <Phone className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-body text-xs text-arkadia-slate">Телефон</p>
                    <a
                      href={`tel:${selectedBranch.phone.replace(/[^\d+]/g, "")}`}
                      className="font-body text-sm text-arkadia-blue font-medium hover:underline"
                    >
                      {selectedBranch.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-arkadia-blue/10 text-arkadia-blue flex-shrink-0">
                    <Clock className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-body text-xs text-arkadia-slate">Часы работы</p>
                    <p className="font-body text-sm text-arkadia-graphite">
                      {selectedBranch.hours}
                    </p>
                  </div>
                </div>
              </div>

              <a
                href={`https://yandex.ru/maps/?text=${encodeURIComponent(
                  `Аркадия стоматология ${selectedBranch.address}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-arkadia-mist text-arkadia-blue font-body text-sm font-medium hover:bg-arkadia-sky transition-colors"
              >
                <Navigation className="h-3.5 w-3.5" />
                Построить маршрут в Яндекс.Картах
              </a>

              <button
                onClick={() => {
                  setSelected(null);
                  setTimeout(() => {
                    const el = document.getElementById("contact");
                    el?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }, 200);
                }}
                className="mt-3 w-full px-4 py-3 rounded-xl bg-arkadia-blue text-white font-body text-sm font-medium hover:bg-arkadia-blue-soft transition-colors"
              >
                Записаться в этот филиал
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function StylizedMap({
  branches,
  coords,
  selected,
  hovered,
  onSelect,
  onHover,
}: {
  branches: typeof import("./clinic-data").branches;
  coords: Record<string, { x: number; y: number }>;
  selected: string | null;
  hovered: string | null;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}) {
  return (
    <svg
      viewBox="0 0 800 500"
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Фон — молочно-голубой */}
      <rect width="800" height="500" fill="#EEF2FF" />

      {/* Сетка */}
      <g opacity="0.4">
        {Array.from({ length: 16 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 50}
            y1="0"
            x2={i * 50}
            y2="500"
            stroke="#0000fa"
            strokeWidth="0.5"
            opacity="0.1"
          />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={i * 50}
            x2="800"
            y2={i * 50}
            stroke="#0000fa"
            strokeWidth="0.5"
            opacity="0.1"
          />
        ))}
      </g>

      {/* Суша — стилизованный контур Петербурга */}
      {/* Левый берег (с Васильевским островом) */}
      <path
        d="M 50 100
           L 200 80
           L 280 120
           L 250 180
           L 180 220
           L 220 280
           L 280 320
           L 320 380
           L 380 420
           L 450 440
           L 500 430
           L 550 410
           L 600 380
           L 650 340
           L 700 280
           L 720 220
           L 700 150
           L 650 100
           L 580 70
           L 500 60
           L 400 55
           L 300 60
           L 200 65
           L 100 80
           Z"
        fill="#FFFFFF"
        stroke="#0000fa"
        strokeWidth="1.5"
        opacity="0.9"
      />

      {/* Васильевский остров — отдельный */}
      <path
        d="M 180 180
           L 280 170
           L 290 220
           L 270 260
           L 200 265
           L 170 230
           Z"
        fill="#FFFFFF"
        stroke="#0000fa"
        strokeWidth="1.5"
        opacity="0.9"
      />

      {/* Петроградская сторона */}
      <path
        d="M 250 130
           L 350 125
           L 360 175
           L 280 185
           L 240 160
           Z"
        fill="#FFFFFF"
        stroke="#0000fa"
        strokeWidth="1.5"
        opacity="0.9"
      />

      {/* Реки — Нева */}
      <path
        d="M 0 200 Q 200 220 400 195 Q 600 175 800 200"
        stroke="#0000fa"
        strokeWidth="6"
        fill="none"
        opacity="0.25"
        strokeLinecap="round"
      />
      <path
        d="M 350 0 Q 340 150 360 250 Q 380 350 370 500"
        stroke="#0000fa"
        strokeWidth="5"
        fill="none"
        opacity="0.25"
        strokeLinecap="round"
      />

      {/* Подписи районов */}
      <text
        x="380"
        y="240"
        className="font-body"
        style={{ fontSize: "10px", fill: "#475569", opacity: 0.5 }}
      >
        Центральный
      </text>
      <text
        x="220"
        y="225"
        className="font-body"
        style={{ fontSize: "9px", fill: "#475569", opacity: 0.5 }}
      >
        В.О.
      </text>
      <text
        x="140"
        y="70"
        className="font-body"
        style={{ fontSize: "9px", fill: "#475569", opacity: 0.5 }}
      >
        Приморский
      </text>
      <text
        x="600"
        y="400"
        className="font-body"
        style={{ fontSize: "9px", fill: "#475569", opacity: 0.5 }}
      >
        Фрунзенский
      </text>

      {/* Точки филиалов */}
      {branches.map((branch) => {
        const coord = coords[branch.id];
        if (!coord) return null;
        const isSelected = selected === branch.id;
        const isHovered = hovered === branch.id;

        return (
          <g
            key={branch.id}
            onClick={() => onSelect(branch.id)}
            onMouseEnter={() => onHover(branch.id)}
            onMouseLeave={() => onHover(null)}
            style={{ cursor: "pointer" }}
          >
            {/* Пульсация вокруг активной точки */}
            {isSelected && (
              <motion.circle
                cx={coord.x}
                cy={coord.y}
                r="18"
                fill="none"
                stroke="#0000fa"
                strokeWidth="2"
                initial={{ r: 18, opacity: 0.6 }}
                animate={{ r: 32, opacity: 0 }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            )}

            {/* Внешний круг */}
            <circle
              cx={coord.x}
              cy={coord.y}
              r={isSelected ? 14 : (isHovered ? 12 : 10)}
              fill={isSelected ? "#0000fa" : "#FFFFFF"}
              stroke="#0000fa"
              strokeWidth="2.5"
              style={{ transition: "all 0.3s ease" }}
            />

            {/* Внутренняя точка */}
            <circle
              cx={coord.x}
              cy={coord.y}
              r={isSelected ? 4 : 3}
              fill={isSelected ? "#FFFFFF" : "#0000fa"}
              style={{ transition: "all 0.3s ease" }}
            />

            {/* Подпись при наведении */}
            {isHovered && !isSelected && (
              <g>
                <rect
                  x={coord.x - 50}
                  y={coord.y - 38}
                  width="100"
                  height="22"
                  rx="11"
                  fill="#0F172A"
                  opacity="0.9"
                />
                <text
                  x={coord.x}
                  y={coord.y - 23}
                  textAnchor="middle"
                  className="font-body"
                  style={{ fontSize: "11px", fill: "#FFFFFF", fontWeight: 500 }}
                >
                  {branch.name}
                </text>
              </g>
            )}
          </g>
        );
      })}

      {/* Заголовок карты — стилизованный компас */}
      <g transform="translate(720, 50)" opacity="0.4">
        <circle cx="0" cy="0" r="20" fill="none" stroke="#0000fa" strokeWidth="1" />
        <path d="M 0 -15 L 3 0 L 0 15 L -3 0 Z" fill="#0000fa" />
        <text x="0" y="-25" textAnchor="middle" className="font-display" style={{ fontSize: "9px", fill: "#0000fa", fontWeight: 600 }}>
          С
        </text>
      </g>
    </svg>
  );
}
