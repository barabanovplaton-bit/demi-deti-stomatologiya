"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-arkadia-blue"
        >
          <div className="relative">
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Левая диагональ А */}
              <motion.path
                d="M 30 100 L 60 20"
                stroke="#FFFFFF"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              {/* Правая диагональ А */}
              <motion.path
                d="M 60 20 L 90 100"
                stroke="#FFFFFF"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
              />
              {/* Перекладина А */}
              <motion.path
                d="M 42 70 L 78 70"
                stroke="#FFFFFF"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.1, ease: "easeInOut" }}
              />
            </svg>

            {/* Текст снизу */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-6 whitespace-nowrap font-body text-[10px] uppercase tracking-[0.4em] text-white/70"
            >
              Аркадия
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
