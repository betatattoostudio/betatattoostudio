"use client";

import { type MouseEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { WHATSAPP_URL } from "../lib/images";

const links = [
  { label: "Galeri", href: "#board" },
  { label: "Sanatçılarımız", href: "#artist" },
  { label: "Stiller", href: "#styles" },
  { label: "Fikirden Mürekkebe", href: "#process" },
  { label: "İletişim", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const handleAnchorClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith("#")) return;

    event.preventDefault();
    setOpen(false);

    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;

    const offset = href === "#hero" ? 0 : window.innerWidth < 768 ? -72 : -88;
    const easing = (t: number) => 1 - Math.pow(1 - t, 3);

    window.history.pushState(null, "", href);

    if (window.betaLenis) {
      window.betaLenis.scrollTo(target, {
        offset,
        duration: 1.25,
        easing,
      });
      return;
    }

    const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY + offset);
    window.scrollTo({ top, behavior: "smooth" });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-md bg-[rgba(10,10,10,0.7)] border-b border-[var(--border)]"
            : "bg-transparent"
        }`}
      >
        <div
          className="mx-auto flex items-center justify-between"
          style={{
            maxWidth: "var(--container-max)",
            padding: "1rem var(--container-px)",
          }}
        >
          <a
            href="#hero"
            onClick={(event) => handleAnchorClick(event, "#hero")}
            aria-label="Beta Tattoo Studio — Ana Sayfa"
          >
            <Image
              src="/beta-logo.png"
              alt="Beta Tattoo Studio"
              width={44}
              height={44}
              priority
            />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={(event) => handleAnchorClick(event, l.href)}
                className="text-sm text-[var(--fg)]/80 hover:text-[var(--fg)] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-pill btn-light"
            >
              Randevu Al
            </a>
          </div>

          <button
            aria-label="Menüyü Aç"
            className="md:hidden text-[var(--fg)]"
            onClick={() => setOpen(true)}
          >
            <Menu size={26} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] bg-[var(--bg)] flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="flex items-center justify-between"
              style={{ padding: "1rem var(--container-px)" }}
            >
              <Image
                src="/beta-logo.png"
                alt="Beta Tattoo Studio"
                width={40}
                height={40}
              />
              <button
                aria-label="Menüyü Kapat"
                onClick={() => setOpen(false)}
                className="text-[var(--fg)]"
              >
                <X size={28} />
              </button>
            </div>
            <nav className="flex-1 flex flex-col items-center justify-center gap-6">
              {links.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={(event) => handleAnchorClick(event, l.href)}
                  className="font-display text-center text-[clamp(2rem,9vw,2.75rem)] leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="btn-pill btn-light mt-4"
              >
                Randevu Al
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
