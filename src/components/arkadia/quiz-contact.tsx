"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Phone,
  Clock,
  MapPin,
  Send,
  X,
} from "lucide-react";
import { services, branches, clinicStats } from "./clinic-data";

type Step = 0 | 1 | 2 | 3 | 4 | 5;

const timeSlots = [
  { id: "morning", label: "Утро", time: "9:00 – 12:00" },
  { id: "day", label: "День", time: "12:00 – 15:00" },
  { id: "evening", label: "Вечер", time: "15:00 – 20:00" },
  { id: "any", label: "Любое", time: "как удобно" },
];

export function QuizContact() {
  const [step, setStep] = useState<Step>(0);
  const [direction, setDirection] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);

  const stepLabels = ["Услуга", "Филиал", "Время", "Контакты", "Готово"];

  const handleNext = () => {
    if (step === 0 && !selectedService) {
      toast.error("Выберите направление");
      return;
    }
    if (step === 1 && !selectedBranch) {
      toast.error("Выберите филиал");
      return;
    }
    if (step === 2 && !selectedTime) {
      toast.error("Выберите время");
      return;
    }
    if (step === 3 && (!name || !phone)) {
      toast.error("Заполните имя и телефон");
      return;
    }
    setDirection(1);
    if (step < 4) {
      setStep((step + 1) as Step);
    } else if (step === 3) {
      handleSubmit();
    }
  };

  const handleBack = () => {
    setDirection(-1);
    if (step > 0) {
      setStep((step - 1) as Step);
    }
  };

  const handleSubmit = async () => {
    setSending(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSending(false);
    setStep(4);
  };

  const handleReset = () => {
    setStep(0);
    setSelectedService(null);
    setSelectedBranch(null);
    setSelectedTime(null);
    setName("");
    setPhone("");
  };

  const selectedServiceObj = services.find((s) => s.id === selectedService);
  const selectedBranchObj = branches.find((b) => b.id === selectedBranch);
  const selectedTimeObj = timeSlots.find((t) => t.id === selectedTime);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
    }),
  };

  return (
    <section
      id="contact"
      className="relative bg-arkadia-paper py-20 md:py-32 overflow-hidden"
    >
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-10 text-center"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-arkadia-blue/10 text-arkadia-blue text-xs font-medium mb-4">
            Запись на приём
          </span>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-arkadia-graphite leading-[1.1] tracking-tight text-balance">
            Запишитесь за{" "}
            <span className="text-arkadia-blue">четыре шага</span>
          </h2>
          <p className="mt-4 font-body text-base text-arkadia-slate max-w-xl mx-auto">
            Это быстрее, чем звонить. Администратор перезвонит и подтвердит
            запись в течение часа.
          </p>
        </motion.div>

        {/* Карточка квиза */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-3xl bg-arkadia-mist border border-arkadia-graphite/8 p-6 md:p-10 shadow-soft-lg"
        >
          {/* Прогресс-бар */}
          {step < 4 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="font-body text-xs text-arkadia-slate uppercase tracking-wider">
                  Шаг {step + 1} из 4
                </span>
                <span className="font-body text-xs font-medium text-arkadia-blue">
                  {stepLabels[step]}
                </span>
              </div>
              <div className="relative h-1.5 w-full rounded-full bg-arkadia-graphite/8 overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-arkadia-blue rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((step + 1) / 4) * 100}%` }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          )}

          {/* Контент шага */}
          <div className="relative min-h-[280px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Шаг 0 — Услуга */}
                {step === 0 && (
                  <div>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-arkadia-graphite mb-5">
                      Что вас беспокоит?
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                      {services.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => setSelectedService(service.id)}
                          className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                            selectedService === service.id
                              ? "bg-arkadia-blue text-white border-arkadia-blue shadow-soft-md"
                              : "bg-white border-arkadia-graphite/8 hover:border-arkadia-blue/30 text-arkadia-graphite"
                          }`}
                        >
                          <p className="font-body text-xs md:text-sm font-medium leading-tight">
                            {service.title}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Шаг 1 — Филиал */}
                {step === 1 && (
                  <div>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-arkadia-graphite mb-5">
                      Выберите филиал
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {branches.map((branch) => (
                        <button
                          key={branch.id}
                          onClick={() => setSelectedBranch(branch.id)}
                          className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                            selectedBranch === branch.id
                              ? "bg-arkadia-blue text-white border-arkadia-blue shadow-soft-md"
                              : "bg-white border-arkadia-graphite/8 hover:border-arkadia-blue/30"
                          }`}
                        >
                          <p className={`font-display text-sm font-semibold ${
                            selectedBranch === branch.id ? "text-white" : "text-arkadia-graphite"
                          }`}>
                            {branch.name}
                          </p>
                          <p className={`mt-1 font-body text-xs ${
                            selectedBranch === branch.id ? "text-white/80" : "text-arkadia-slate"
                          }`}>
                            {branch.address}
                          </p>
                          <p className={`mt-0.5 font-body text-xs ${
                            selectedBranch === branch.id ? "text-white/70" : "text-arkadia-ash"
                          }`}>
                            м. {branch.metro}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Шаг 2 — Время */}
                {step === 2 && (
                  <div>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-arkadia-graphite mb-5">
                      Когда вам удобно?
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot.id}
                          onClick={() => setSelectedTime(slot.id)}
                          className={`p-4 rounded-xl border text-center transition-all duration-200 ${
                            selectedTime === slot.id
                              ? "bg-arkadia-blue text-white border-arkadia-blue shadow-soft-md"
                              : "bg-white border-arkadia-graphite/8 hover:border-arkadia-blue/30"
                          }`}
                        >
                          <p className={`font-display text-sm font-semibold ${
                            selectedTime === slot.id ? "text-white" : "text-arkadia-graphite"
                          }`}>
                            {slot.label}
                          </p>
                          <p className={`mt-1 font-body text-xs ${
                            selectedTime === slot.id ? "text-white/80" : "text-arkadia-slate"
                          }`}>
                            {slot.time}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Шаг 3 — Контакты */}
                {step === 3 && (
                  <div>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-arkadia-graphite mb-5">
                      Как вас зовут?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="font-body text-xs font-medium text-arkadia-graphite mb-1.5 block">
                          Имя
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Как к вам обращаться"
                          className="w-full bg-white border border-arkadia-graphite/10 rounded-xl py-3 px-4 text-arkadia-graphite placeholder:text-arkadia-ash font-body text-sm focus:outline-none focus:border-arkadia-blue focus:ring-2 focus:ring-arkadia-blue/15 transition-all"
                        />
                      </div>
                      <div>
                        <label className="font-body text-xs font-medium text-arkadia-graphite mb-1.5 block">
                          Телефон
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+7 (___) ___-__-__"
                          className="w-full bg-white border border-arkadia-graphite/10 rounded-xl py-3 px-4 text-arkadia-graphite placeholder:text-arkadia-ash font-body text-sm focus:outline-none focus:border-arkadia-blue focus:ring-2 focus:ring-arkadia-blue/15 transition-all"
                        />
                      </div>
                    </div>

                    {/* Сводка */}
                    <div className="mt-6 p-4 rounded-xl bg-white border border-arkadia-graphite/8">
                      <p className="font-body text-xs text-arkadia-slate uppercase tracking-wider mb-3">
                        Ваша заявка
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-arkadia-ash text-xs w-20">Услуга:</span>
                          <span className="text-arkadia-graphite font-medium">{selectedServiceObj?.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-arkadia-ash text-xs w-20">Филиал:</span>
                          <span className="text-arkadia-graphite font-medium">{selectedBranchObj?.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-arkadia-ash text-xs w-20">Время:</span>
                          <span className="text-arkadia-graphite font-medium">{selectedTimeObj?.label} ({selectedTimeObj?.time})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Шаг 4 — Успех */}
                {step === 4 && (
                  <div className="text-center py-8">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-arkadia-blue text-white mb-6"
                    >
                      <Check className="h-10 w-10" strokeWidth={3} />
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="font-display text-2xl md:text-3xl font-bold text-arkadia-graphite"
                    >
                      Заявка принята
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="mt-3 font-body text-base text-arkadia-slate max-w-md mx-auto"
                    >
                      Администратор перезвонит в течение часа и подтвердит
                      запись. Хорошего дня!
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      className="mt-6 inline-block px-4 py-2 rounded-full bg-arkadia-blue/8 text-arkadia-blue font-body text-xs"
                    >
                      {name} · {phone}
                    </motion.div>

                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                      onClick={handleReset}
                      className="mt-6 block mx-auto font-body text-sm text-arkadia-slate hover:text-arkadia-blue transition-colors"
                    >
                      Отправить ещё одну заявку
                    </motion.button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Кнопки управления */}
          {step < 4 && (
            <div className="mt-8 flex items-center justify-between gap-3">
              {step > 0 ? (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-arkadia-slate hover:bg-white hover:text-arkadia-graphite transition-colors font-body text-sm"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Назад
                </button>
              ) : (
                <div />
              )}

              <button
                onClick={handleNext}
                disabled={sending}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-arkadia-blue text-white font-body text-sm font-medium hover:bg-arkadia-blue-soft transition-colors disabled:opacity-60"
              >
                {step === 3 ? (
                  sending ? (
                    "Отправляем…"
                  ) : (
                    <>
                      Отправить заявку
                      <Send className="h-4 w-4" />
                    </>
                  )
                ) : (
                  <>
                    Далее
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </motion.div>

        {/* Альтернативный способ — звонок */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col items-center gap-3"
        >
          <p className="font-body text-xs text-arkadia-slate">
            или позвоните напрямую
          </p>
          <a
            href={`tel:${clinicStats.mainPhone.replace(/[^\d+]/g, "")}`}
            className="flex items-center gap-2 font-display text-2xl md:text-3xl font-bold text-arkadia-blue hover:text-arkadia-blue-soft transition-colors"
          >
            <Phone className="h-5 w-5" />
            {clinicStats.mainPhone}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
