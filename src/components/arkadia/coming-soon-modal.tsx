"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

type ComingSoonContextValue = {
  open: (section: string) => void;
};

const ComingSoonContext = createContext<ComingSoonContextValue | null>(null);

export function useComingSoon() {
  const ctx = useContext(ComingSoonContext);
  if (!ctx) {
    throw new Error("useComingSoon must be used within ComingSoonProvider");
  }
  return ctx;
}

const sectionLabels: Record<string, { title: string; subtitle: string }> = {
  services: {
    title: "Услуги",
    subtitle: "Полный каталог направлений клиники с ценами",
  },
  clinics: {
    title: "Филиалы",
    subtitle: "Семь адресов в Петербурге с картой и схемой проезда",
  },
  doctors: {
    title: "Врачи",
    subtitle: "Команда специалистов с регалиями и опытом",
  },
  reviews: {
    title: "Отзывы",
    subtitle: "Все 216 отзывов пациентов на 2ГИС",
  },
  contacts: {
    title: "Контакты",
    subtitle: "Телефоны, адреса и форма записи",
  },
  appointment: {
    title: "Запись на приём",
    subtitle: "Выберите филиал, врача и удобное время",
  },
  prices: {
    title: "Цены",
    subtitle: "Прозрачный прайс по всем направлениям",
  },
};

export function ComingSoonProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [section, setSection] = useState<string>("services");

  const open = (s: string) => {
    setSection(s);
    setIsOpen(true);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Закрытие по Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const labels = sectionLabels[section] ?? {
    title: "Раздел",
    subtitle: "Страница в разработке",
  };

  return (
    <ComingSoonContext.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <div className="absolute inset-0 bg-arkadia-graphite/40 backdrop-blur-md" />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.97, opacity: 0, y: 6 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-2xl border border-arkadia-navy/15 bg-arkadia-paper p-8 md:p-10 shadow-soft-lg"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 text-arkadia-slate/60 hover:text-arkadia-navy transition-colors p-1.5 rounded-full hover:bg-arkadia-mist/50"
                aria-label="Закрыть"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="text-center">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-arkadia-navy/8 text-arkadia-navy text-xs font-medium">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-arkadia-navy opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-arkadia-navy" />
                  </span>
                  Готовится к запуску
                </span>

                <motion.h3
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="mt-5 font-display text-3xl md:text-4xl font-semibold text-arkadia-graphite tracking-tight"
                >
                  {labels.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="mt-3 font-body text-sm text-arkadia-slate leading-relaxed"
                >
                  {labels.subtitle}
                </motion.p>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="mx-auto mt-6 h-px w-16 origin-center bg-arkadia-navy/30"
                />

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="mt-6 font-body text-base text-arkadia-graphite/85 leading-relaxed"
                >
                  Раздел будет доступен в полном сайте клиники.
                  Записаться на приём можно по телефону или через форму на этой странице.
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  onClick={() => setIsOpen(false)}
                  className="mt-7 inline-flex items-center justify-center px-6 py-3 rounded-xl font-body text-sm font-medium text-arkadia-paper bg-arkadia-navy hover:bg-arkadia-navy-dark transition-colors duration-200"
                >
                  Понятно
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ComingSoonContext.Provider>
  );
}
