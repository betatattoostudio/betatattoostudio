"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IgIcon from "./IgIcon";
import { INSTAGRAM_URL } from "../lib/images";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!footerRef.current || !wordmarkRef.current) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.set(wordmarkRef.current, {
        x: reducedMotion ? 0 : -28,
        autoAlpha: reducedMotion ? 1 : 0.45,
        filter: reducedMotion ? "blur(0px)" : "blur(10px)",
      });

      if (reducedMotion) return;

      gsap.to(wordmarkRef.current, {
        x: 0,
        autoAlpha: 0.95,
        filter: "blur(0px)",
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          end: "bottom bottom",
          scrub: 1.2,
        },
      });
    },
    { scope: footerRef },
  );

  return (
    <footer ref={footerRef} className="relative w-full border-t border-[var(--border)] pt-16">
      <div
        className="mx-auto flex flex-col gap-10"
        style={{
          maxWidth: "var(--container-max)",
          padding: "0 var(--container-px)",
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
          >
            <IgIcon size={18} />
            <span>@betatattoo.studio</span>
          </a>
          <p className="font-mono-label text-[var(--muted)]">
            Maltepe · İstanbul · Türkiye
          </p>
        </div>

        <p className="text-xs text-[var(--muted-2)]">
          © 2026 Beta Tattoo Studio. Tüm hakları saklıdır.
        </p>
      </div>

      <div
        aria-hidden
        ref={wordmarkRef}
        className="font-display select-none leading-[0.85] text-center mt-8 overflow-hidden whitespace-nowrap will-change-transform"
        style={{
          fontSize: "clamp(4rem, 18vw, 16rem)",
          fontWeight: 800,
          background:
            "linear-gradient(180deg, rgba(245,245,240,0.95) 0%, rgba(245,245,240,0.1) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        BETA TATTOO★
      </div>
    </footer>
  );
}
