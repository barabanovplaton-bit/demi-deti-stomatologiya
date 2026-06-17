"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { useComingSoon } from "./coming-soon-modal";
import { clinicStats } from "./clinic-data";

const navItems = [
  { id: "about", label: "О клинике", scrollTo: true },
  { id: "branches", label: "Филиалы", scrollTo: true },
  { id: "services", label: "Услуги", scrollTo: false },
  { id: "doctors", label: "Врачи", scrollTo: false },
  { id: "reviews", label: "Отзывы", scrollTo: false },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { open } = useComingSoon();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Блокируем скролл body когда открыто мобильное меню
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = (item: { id: string; scrollTo: boolean }) => {
    if (item.scrollTo) {
      const el = document.getElementById(item.id);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      open(item.id);
    }
    setMobileOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileOpen(false);
  };

  const handleAppointment = () => {
    const el = document.getElementById("contact");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-arkadia-cream/90 backdrop-blur-md border-b border-arkadia-navy/8 py-2.5"
            : "bg-transparent py-4"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-8">
          {/* Логотип */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2.5"
            aria-label="Аркадия — на главную"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-arkadia-navy text-arkadia-paper font-display text-lg font-semibold group-hover:bg-arkadia-navy-dark transition-colors duration-200">
              А
            </span>
            <div className="flex flex-col leading-none">
              <span className="font-display text-base font-semibold tracking-tight text-arkadia-graphite">
                Аркадия
              </span>
              <span className="font-body text-[10px] text-arkadia-slate mt-0.5">
                стоматология · с 1989
              </span>
            </div>
          </button>

          {/* Десктоп-навигация */}
          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className="ink-underline font-body text-sm text-arkadia-graphite/85 hover:text-arkadia-navy transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Правая часть — телефон и кнопка */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${clinicStats.mainPhone.replace(/[^\d+]/g, "")}`}
              className="flex items-center gap-2 font-body text-sm font-medium text-arkadia-graphite hover:text-arkadia-navy transition-colors duration-200"
            >
              <Phone className="h-3.5 w-3.5" />
              {clinicStats.mainPhone}
            </a>
            <button
              onClick={handleAppointment}
              className="font-body text-sm font-medium text-arkadia-paper bg-arkadia-navy hover:bg-arkadia-navy-dark transition-colors duration-200 px-5 py-2.5 rounded-xl"
            >
              Записаться
            </button>
          </div>

          {/* Мобильное меню — кнопка */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden flex items-center justify-center h-10 w-10 rounded-xl bg-arkadia-navy/8 text-arkadia-navy"
            aria-label="Открыть меню"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </motion.header>

      {/* Мобильное меню */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] md:hidden bg-arkadia-cream"
          >
            {/* Шапка */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-arkadia-navy/10">
              <div className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-arkadia-navy text-arkadia-paper font-display text-lg font-semibold">
                  А
                </span>
                <div className="flex flex-col leading-none">
                  <span className="font-display text-base font-semibold text-arkadia-graphite">
                    Аркадия
                  </span>
                  <span className="font-body text-[10px] text-arkadia-slate mt-0.5">
                    стоматология · с 1989
                  </span>
                </div>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center h-10 w-10 rounded-xl bg-arkadia-navy/8 text-arkadia-navy"
                aria-label="Закрыть меню"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Навигация */}
            <nav className="flex flex-col px-4 py-6 gap-1 overflow-y-auto h-[calc(100vh-80px)]">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.4 }}
                  onClick={() => handleNavClick(item)}
                  className="text-left font-display text-2xl font-medium text-arkadia-graphite py-3.5 border-b border-arkadia-navy/8"
                >
                  {item.label}
                </motion.button>
              ))}

              {/* Телефон */}
              <motion.a
                href={`tel:${clinicStats.mainPhone.replace(/[^\d+]/g, "")}`}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + navItems.length * 0.06, duration: 0.4 }}
                className="flex items-center gap-2.5 mt-6 font-body text-base text-arkadia-navy"
              >
                <Phone className="h-4 w-4" />
                {clinicStats.mainPhone}
              </motion.a>

              {/* Кнопка */}
              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + (navItems.length + 1) * 0.06, duration: 0.4 }}
                onClick={handleAppointment}
                className="mt-5 font-body text-sm font-medium text-arkadia-paper bg-arkadia-navy py-4 rounded-xl"
              >
                Записаться на приём
              </motion.button>

              {/* Рейтинг */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05 + (navItems.length + 2) * 0.06, duration: 0.4 }}
                className="mt-6 flex items-center gap-3 px-4 py-3 rounded-xl bg-arkadia-mist/50"
              >
                <span className="font-display text-lg font-semibold text-arkadia-navy">
                  4.9
                </span>
                <div className="flex flex-col">
                  <span className="font-body text-xs text-arkadia-graphite">
                    рейтинг на 2ГИС
                  </span>
                  <span className="font-body text-[11px] text-arkadia-slate">
                    216 отзывов
                  </span>
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
