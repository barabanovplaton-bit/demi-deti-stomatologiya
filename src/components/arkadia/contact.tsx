"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { Send, Phone, MapPin, Clock } from "lucide-react";
import { branches, clinicStats } from "./clinic-data";

export function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [branch, setBranch] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      toast.error("Заполните имя и телефон");
      return;
    }
    setSending(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setSending(false);
    toast.success("Заявка принята", {
      description: "Администратор перезвонит в течение часа.",
    });
    setName("");
    setPhone("");
    setBranch("");
    setMessage("");
  };

  return (
    <section
      id="contact"
      className="relative bg-arkadia-paper py-20 md:py-32 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 md:gap-16 items-start">
          {/* Левая колонка — текст + контакты */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-3 py-1 rounded-full bg-arkadia-navy/8 text-arkadia-navy text-xs font-medium mb-4"
            >
              Запись на приём
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-arkadia-graphite leading-[1.1] tracking-tight text-balance"
            >
              Запишитесь на приём
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-5 font-body text-base md:text-lg text-arkadia-slate leading-relaxed max-w-lg"
            >
              Оставьте заявку — администратор перезвонит в течение часа,
              подберёт филиал и удобное время. Или позвоните напрямую.
            </motion.p>

            {/* Контактные блоки */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 space-y-3"
            >
              <a
                href={`tel:${clinicStats.mainPhone.replace(/[^\d+]/g, "")}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-arkadia-cream border border-arkadia-navy/8 hover:border-arkadia-navy/20 transition-colors"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-arkadia-navy text-arkadia-paper flex-shrink-0">
                  <Phone className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-body text-xs text-arkadia-slate">
                    Единый номер
                  </p>
                  <p className="font-display text-base font-semibold text-arkadia-graphite">
                    {clinicStats.mainPhone}
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-arkadia-cream border border-arkadia-navy/8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-arkadia-navy text-arkadia-paper flex-shrink-0">
                  <Clock className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-body text-xs text-arkadia-slate">
                    Часы работы
                  </p>
                  <p className="font-display text-base font-semibold text-arkadia-graphite">
                    Пн–Сб 10:00–20:00 · Вс 10:00–19:00
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-arkadia-cream border border-arkadia-navy/8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-arkadia-navy text-arkadia-paper flex-shrink-0">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-body text-xs text-arkadia-slate">
                    Филиалов в городе
                  </p>
                  <p className="font-display text-base font-semibold text-arkadia-graphite">
                    {clinicStats.branchesCount} адресов в Петербурге
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Правая колонка — форма */}
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="rounded-2xl bg-arkadia-cream border border-arkadia-navy/8 p-6 md:p-8 shadow-soft"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              <div>
                <label
                  htmlFor="name"
                  className="font-body text-xs font-medium text-arkadia-graphite mb-1.5 block"
                >
                  Имя
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Как к вам обращаться"
                  className="w-full bg-arkadia-paper border border-arkadia-navy/15 rounded-xl py-3 px-4 text-arkadia-graphite placeholder:text-arkadia-ash font-body text-sm focus:outline-none focus:border-arkadia-navy focus:ring-2 focus:ring-arkadia-navy/10 transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="font-body text-xs font-medium text-arkadia-graphite mb-1.5 block"
                >
                  Телефон
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 (___) ___-__-__"
                  className="w-full bg-arkadia-paper border border-arkadia-navy/15 rounded-xl py-3 px-4 text-arkadia-graphite placeholder:text-arkadia-ash font-body text-sm focus:outline-none focus:border-arkadia-navy focus:ring-2 focus:ring-arkadia-navy/10 transition-all"
                />
              </div>
            </div>

            <div className="mt-4 md:mt-5">
              <label
                htmlFor="branch"
                className="font-body text-xs font-medium text-arkadia-graphite mb-1.5 block"
              >
                Филиал
              </label>
              <select
                id="branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full bg-arkadia-paper border border-arkadia-navy/15 rounded-xl py-3 px-4 text-arkadia-graphite font-body text-sm focus:outline-none focus:border-arkadia-navy focus:ring-2 focus:ring-arkadia-navy/10 transition-all cursor-pointer appearance-none"
              >
                <option value="">Не выбран — администратор подберёт</option>
                {branches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} — {b.address}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4 md:mt-5">
              <label
                htmlFor="message"
                className="font-body text-xs font-medium text-arkadia-graphite mb-1.5 block"
              >
                Комментарий{" "}
                <span className="text-arkadia-ash font-normal">
                  — необязательно
                </span>
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                placeholder="Что вас беспокоит, удобное время для визита…"
                className="w-full bg-arkadia-paper border border-arkadia-navy/15 rounded-xl py-3 px-4 text-arkadia-graphite placeholder:text-arkadia-ash font-body text-sm focus:outline-none focus:border-arkadia-navy focus:ring-2 focus:ring-arkadia-navy/10 transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-arkadia-navy hover:bg-arkadia-navy-dark text-arkadia-paper font-body text-sm font-medium transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {sending ? "Отправляем…" : "Отправить заявку"}
              {!sending && <Send className="h-3.5 w-3.5" />}
            </button>

            <p className="mt-4 font-body text-[11px] text-arkadia-ash text-center leading-relaxed">
              Нажимая «Отправить», вы соглашаетесь на обработку персональных
              данных.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
