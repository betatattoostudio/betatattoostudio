'use client';

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { X } from 'lucide-react';
import SectionCTA from './SectionCTA';
import { styleGalleries } from '../lib/images';

gsap.registerPlugin(ScrollTrigger);

const styles = [
  {
    n: '01',
    key: 'realism',
    title: 'Realism',
    body: 'Fotoğraf gerçekliğinde, derinlikli ve dokulu çalışmalar.',
  },
  {
    n: '02',
    key: 'color-realism',
    title: 'Color Realism',
    body: 'Canlı, kalıcı renkler. Modern pigmentlerle yıllara dayanan parlaklık.',
  },
  {
    n: '03',
    key: 'minimal',
    title: 'Minimal',
    body: 'Sade, net ve anlamı yüksek küçük ölçekli çalışmalar.',
  },
  {
    n: '04',
    key: 'linework',
    title: 'Çizgisel',
    body: 'Temiz çizgi, dengeli kompozisyon ve grafik anlatım.',
  },
  {
    n: '05',
    key: 'cover-up',
    title: 'Cover Up',
    body: 'Eski dövmenizi yeniden tasarlayıp, sevdiğiniz bir esere dönüştürün.',
  },
];

export default function StylesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const accentRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const activeStyle = styles.find((s) => s.key === activeKey) ?? null;
  const galleryImages = activeKey ? (styleGalleries[activeKey] ?? []) : [];
  const activeImage = galleryImages[activeImageIndex] ?? galleryImages[0];
  const closeGallery = () => {
    setActiveKey(null);
    setActiveImageIndex(0);
  };

  useEffect(() => {
    if (activeKey) {
      window.betaLenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      window.betaLenis?.start();
      document.body.style.overflow = '';
    }
    return () => {
      window.betaLenis?.start();
      document.body.style.overflow = '';
    };
  }, [activeKey]);

  useGSAP(
    () => {
      const cards = cardRefs.current.filter((el): el is HTMLDivElement =>
        Boolean(el),
      );
      const titles = titleRefs.current.filter((el): el is HTMLHeadingElement =>
        Boolean(el),
      );
      const accents = accentRefs.current.filter((el): el is HTMLSpanElement =>
        Boolean(el),
      );
      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      if (!headingRef.current || cards.length === 0) return;

      gsap.set(accents, {
        scaleX: reducedMotion ? 1 : 0,
        transformOrigin: 'left center',
      });
      gsap.set(cards, {
        borderColor: 'rgba(255,255,255,0.08)',
        boxShadow: '0 0 0 rgba(0,0,0,0)',
      });

      if (reducedMotion) return;

      gsap.from(headingRef.current.children, {
        autoAlpha: 0,
        y: 24,
        filter: 'blur(8px)',
        duration: 0.8,
        stagger: 0.09,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
        },
      });

      gsap.from(cards, {
        autoAlpha: 0,
        y: 46,
        scale: 0.96,
        filter: 'blur(12px)',
        duration: 0.9,
        stagger: 0.11,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 66%',
        },
      });

      const focusTl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 58%',
          end: 'bottom 46%',
          scrub: 0.75,
        },
      });

      cards.forEach((card, i) => {
        const title = titles[i];
        const accent = accents[i];
        const at = i * 0.24;

        focusTl
          .to(
            card,
            {
              y: -8,
              borderColor: 'rgba(255,255,255,0.34)',
              boxShadow:
                '0 22px 70px rgba(0,0,0,0.58), inset 0 0 0 1px rgba(255,255,255,0.04)',
              duration: 0.16,
            },
            at,
          )
          .to(title, { color: 'rgba(245,245,240,0.95)', duration: 0.16 }, at)
          .to(accent, { scaleX: 1, duration: 0.16 }, at)
          .to(
            card,
            {
              y: 0,
              borderColor: 'rgba(255,255,255,0.08)',
              boxShadow: '0 0 0 rgba(0,0,0,0)',
              duration: 0.18,
            },
            at + 0.16,
          )
          .to(title, { color: 'var(--fg)', duration: 0.18 }, at + 0.16)
          .to(accent, { scaleX: 0, duration: 0.18 }, at + 0.16);
      });
    },
    { scope: sectionRef },
  );

  return (
    <>
      <section
        id="styles"
        ref={sectionRef}
        className="relative w-full"
        style={{ padding: 'var(--section-py) 0' }}
      >
        <div
          className="mx-auto"
          style={{
            maxWidth: 'var(--container-max)',
            padding: '0 var(--container-px)',
          }}
        >
          <div
            ref={headingRef}
            className="mx-auto mb-12 max-w-2xl text-center md:mb-16"
          >
            <h2
              className="font-display mt-3 leading-[1]"
              style={{ fontSize: 'var(--text-section)', fontWeight: 600 }}
            >
              Dövme Stilleri
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {styles.map((s) => {
              const previews = (styleGalleries[s.key] ?? []).slice(0, 3);

              return (
                <button
                  key={s.n}
                  ref={(el) => {
                    cardRefs.current[Number(s.n) - 1] =
                      el as HTMLDivElement | null;
                  }}
                  onClick={() => {
                    setActiveImageIndex(0);
                    setActiveKey(s.key);
                  }}
                  className="group relative flex flex-col overflow-hidden rounded-md border bg-[var(--bg-2)] p-5 text-left transition-colors duration-300 hover:border-[rgba(255,255,255,0.25)] cursor-pointer xl:p-4"
                  style={{
                    minHeight: 340,
                    willChange: 'transform, opacity, filter',
                  }}
                >
                  <span
                    ref={(el) => {
                      accentRefs.current[Number(s.n) - 1] = el;
                    }}
                    className="pointer-events-none absolute left-0 top-0 h-px w-full"
                    style={{
                      background:
                        'linear-gradient(90deg, rgba(232,51,58,0), rgba(232,51,58,0.95), rgba(232,51,58,0))',
                    }}
                  />
                  <h3
                    ref={(el) => {
                      titleRefs.current[Number(s.n) - 1] = el;
                    }}
                    className="font-display text-[var(--fg)] leading-[0.95]"
                    style={{ fontSize: 'clamp(1.9rem, 2.7vw, 2.55rem)', fontWeight: 600 }}
                  >
                    {s.title}
                  </h3>
                  <p className="mt-4 text-[var(--muted)] text-sm leading-relaxed">
                    {s.body}
                  </p>

                  <div className="mt-auto pt-7">
                    <div className="grid grid-cols-3 gap-2">
                      {previews.map((img) => (
                        <div
                          key={img.src}
                          className="relative overflow-hidden rounded-sm bg-[#1a1a1a]"
                          style={{ aspectRatio: '3/4' }}
                        >
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            sizes="(max-width: 768px) 28vw, 110px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      ))}
                    </div>
                    <p
                      className="font-mono-label mt-4 text-[var(--muted)] transition-colors duration-300 group-hover:text-[var(--fg)]"
                      style={{ fontSize: '0.62rem' }}
                    >
                      Galeriyi Aç
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <SectionCTA className="mt-12 md:mt-16" />
        </div>
      </section>

      {/* Backdrop */}
      <AnimatePresence>
        {activeKey && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50 cursor-pointer"
            style={{ background: 'rgba(6,6,6,0.92)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeGallery}
          />
        )}
      </AnimatePresence>

      {/* Gallery panel */}
      <AnimatePresence>
        {activeKey && activeStyle && activeImage && (
          <motion.div
            key={activeKey}
            className="fixed inset-0 z-[51] flex items-center justify-center pointer-events-none p-4 md:p-6"
          >
            <motion.div
              className="pointer-events-auto relative w-full overflow-hidden"
              style={{
                maxWidth: 1180,
                maxHeight: '92svh',
                width: '100%',
                background: 'rgba(14,14,14,0.98)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 20,
              }}
              initial={{ opacity: 0, y: 48, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 32, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-6 py-5"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div>
                  <p className="font-mono-label text-[var(--muted)]" style={{ fontSize: '0.62rem' }}>
                    Stil Galerisi
                  </p>
                  <h3
                    className="font-display leading-tight mt-0.5"
                    style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', fontWeight: 600 }}
                  >
                    {activeStyle.title}
                  </h3>
                </div>
                <button
                  onClick={closeGallery}
                  className="flex items-center justify-center rounded-full transition-colors duration-200 hover:bg-[rgba(255,255,255,0.08)]"
                  style={{ width: 40, height: 40 }}
                  aria-label="Kapat"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="grid gap-4 p-4 md:grid-cols-[1fr_132px]">
                <div
                  className="relative overflow-hidden rounded-xl bg-[#050505]"
                  style={{ height: 'min(68svh, 720px)' }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeImage.src}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 0.985 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.985 }}
                      transition={{ duration: 0.22 }}
                    >
                      <Image
                        src={activeImage.src}
                        alt={activeImage.alt}
                        fill
                        sizes="(max-width: 768px) 92vw, 960px"
                        className="object-contain"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div data-lenis-prevent className="flex gap-2 overflow-x-auto pb-1 md:max-h-[68svh] md:flex-col md:overflow-y-auto md:overflow-x-hidden md:pb-0 md:pr-1" style={{ overscrollBehavior: 'contain' }}>
                  {galleryImages.map((img, i) => (
                    <button
                      key={img.src}
                      type="button"
                      onClick={() => setActiveImageIndex(i)}
                      className="relative h-20 w-16 shrink-0 overflow-hidden rounded-md border transition-opacity hover:opacity-90 md:h-[104px] md:w-full"
                      style={{
                        borderColor:
                          activeImageIndex === i
                            ? 'rgba(245,245,240,0.9)'
                            : 'rgba(255,255,255,0.12)',
                      }}
                      aria-label={`${activeStyle.title} görsel ${i + 1}`}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="132px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
