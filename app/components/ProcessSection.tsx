'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeartPulse, MessageCircle, PenTool, Syringe } from 'lucide-react';
import SectionCTA from './SectionCTA';

gsap.registerPlugin(ScrollTrigger);

type Side = 'left' | 'right';

type Point = {
  x: number;
  y: number;
};

type Pin = Point & {
  side: Side;
};

const STEP_Y = [0.1, 0.36, 0.62, 0.88];

const steps = [
  {
    Icon: MessageCircle,
    n: '01',
    title: 'Fikri Paylaş',
    body: 'Instagram DM üzerinden fikrini ve referanslarını gönder. Vücut bölgesi, boyut ve stil tercihini paylaş.',
  },
  {
    Icon: PenTool,
    n: '02',
    title: 'Tasarıma Dönüştür',
    body: 'Hakan, tasarımı sıfırdan çizer. Birlikte revize ederiz; sana özel, tek bir kompozisyon ortaya çıkar.',
  },
  {
    Icon: Syringe,
    n: '03',
    title: 'Dövme Seansı',
    body: 'Randevu günü stüdyoya gel. Steril ortam, premium ekipman ve kahve. Seans öncesi son yerleşim onayı.',
  },
  {
    Icon: HeartPulse,
    n: '04',
    title: 'Bakımı Koru',
    body: 'Aftercare talimatlarını adım adım anlatırız. İlk haftalarda iyileşme takibi DM üzerinden yapılır.',
  },
];

const f = (n: number) => n.toFixed(1);

function smoothPath(points: Point[], tension = 0.82) {
  if (points.length < 2) return '';

  let d = `M ${f(points[0].x)},${f(points[0].y)}`;

  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;

    const cp1 = {
      x: p1.x + ((p2.x - p0.x) / 6) * tension,
      y: p1.y + ((p2.y - p0.y) / 6) * tension,
    };
    const cp2 = {
      x: p2.x - ((p3.x - p1.x) / 6) * tension,
      y: p2.y - ((p3.y - p1.y) / 6) * tension,
    };

    d += ` C ${f(cp1.x)},${f(cp1.y)} ${f(cp2.x)},${f(cp2.y)} ${f(p2.x)},${f(p2.y)}`;
  }

  return d;
}

function connectorPath(pin: Pin, length: number) {
  const dir = pin.side === 'right' ? 1 : -1;
  const endX = pin.x + dir * length;

  return [
    `M ${f(pin.x)},${f(pin.y)}`,
    `C ${f(pin.x + dir * length * 0.35)},${f(pin.y)}`,
    `${f(endX - dir * length * 0.2)},${f(pin.y)}`,
    `${f(endX)},${f(pin.y)}`,
  ].join(' ');
}

function buildLayout(w: number, h: number) {
  const compact = w < 760;
  const centerX = compact ? Math.max(28, Math.min(44, w * 0.1)) : w * 0.5;
  const sway = compact ? 0 : Math.min(72, w * 0.058);

  const pins: Pin[] = STEP_Y.map((y, i) => {
    const side: Side = compact || i % 2 === 0 ? 'right' : 'left';
    const dir = side === 'right' ? 1 : -1;

    return {
      x: centerX + dir * sway,
      y: y * h,
      side,
    };
  });

  const pathPoints = [
    {
      x: compact ? centerX : centerX - sway * 0.35,
      y: h * 0.015,
    },
    ...pins,
    {
      x: compact ? centerX : centerX + sway * 0.25,
      y: h * 0.985,
    },
  ];

  return {
    compact,
    pins,
    pathD: smoothPath(pathPoints, compact ? 0.55 : 0.9),
    connectorLength: compact
      ? Math.max(24, Math.min(34, w * 0.08))
      : Math.min(56, w * 0.045),
  };
}

function progressAtPoint(path: SVGPathElement, target: Point) {
  const total = path.getTotalLength();
  let bestLength = 0;
  let bestDistance = Number.POSITIVE_INFINITY;
  const coarseSamples = 180;

  for (let i = 0; i <= coarseSamples; i += 1) {
    const length = (total * i) / coarseSamples;
    const point = path.getPointAtLength(length);
    const distance = Math.hypot(point.x - target.x, point.y - target.y);

    if (distance < bestDistance) {
      bestDistance = distance;
      bestLength = length;
    }
  }

  const windowSize = total / coarseSamples;
  const start = Math.max(0, bestLength - windowSize);
  const end = Math.min(total, bestLength + windowSize);

  for (let i = 0; i <= 48; i += 1) {
    const length = start + ((end - start) * i) / 48;
    const point = path.getPointAtLength(length);
    const distance = Math.hypot(point.x - target.x, point.y - target.y);

    if (distance < bestDistance) {
      bestDistance = distance;
      bestLength = length;
    }
  }

  return total === 0 ? 0 : bestLength / total;
}

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const pathGlowRef = useRef<SVGPathElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pinRefs = useRef<(SVGCircleElement | null)[]>([]);
  const connectorRefs = useRef<(SVGPathElement | null)[]>([]);
  const mobileLineRef = useRef<HTMLSpanElement>(null);
  const mobileDotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [dims, setDims] = useState({ w: 1000, h: 1180 });

  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const update = () => {
      const r = el.getBoundingClientRect();

      if (r.width <= 0 || r.height <= 0) return;

      setDims((prev) => {
        if (Math.abs(prev.w - r.width) < 1 && Math.abs(prev.h - r.height) < 1) {
          return prev;
        }

        return { w: r.width, h: r.height };
      });
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  const { compact, connectorLength, pathD, pins } = buildLayout(dims.w, dims.h);
  const pinRadius = compact ? 7 : Math.max(7, Math.min(11, dims.w * 0.008));

  useGSAP(
    () => {
      const content = contentRef.current;
      const path = pathRef.current;
      const glowPath = pathGlowRef.current;

      const cards = cardRefs.current.filter((el): el is HTMLDivElement =>
        Boolean(el),
      );
      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      if (!content) return;

      if (compact) {
        const dots = mobileDotRefs.current.filter((el): el is HTMLSpanElement =>
          Boolean(el),
        );

        gsap.set(cards, {
          autoAlpha: reducedMotion ? 1 : 0,
          y: reducedMotion ? 0 : 24,
        });
        gsap.set(dots, {
          scale: reducedMotion ? 1 : 0,
        });
        if (mobileLineRef.current) {
          gsap.set(mobileLineRef.current, {
            scaleY: reducedMotion ? 1 : 0,
            transformOrigin: 'top center',
          });
        }

        if (reducedMotion) return;

        const mobileTl = gsap.timeline({
          scrollTrigger: {
            trigger: content,
            start: 'top 74%',
            end: 'bottom 40%',
            scrub: 0.85,
            invalidateOnRefresh: true,
          },
        });

        if (mobileLineRef.current) {
          mobileTl.to(
            mobileLineRef.current,
            {
              scaleY: 1,
              ease: 'none',
              duration: 1,
            },
            0,
          );
        }

        steps.forEach((_, i) => {
          const at = i / steps.length + 0.08;

          mobileTl
            .to(
              mobileDotRefs.current[i],
              {
                scale: 1,
                ease: 'back.out(2.2)',
                duration: 0.08,
              },
              at,
            )
            .to(
              cardRefs.current[i],
              {
                autoAlpha: 1,
                y: 0,
                ease: 'power3.out',
                duration: 0.12,
              },
              at + 0.02,
            );
        });

        requestAnimationFrame(() => ScrollTrigger.refresh());
        return;
      }

      if (!path) return;

      const lineTargets = [path, glowPath].filter((el): el is SVGPathElement =>
        Boolean(el),
      );
      const connectors = connectorRefs.current.filter(
        (el): el is SVGPathElement => Boolean(el),
      );
      const lineLength = path.getTotalLength();

      lineTargets.forEach((el) => {
        gsap.set(el, {
          strokeDasharray: lineLength,
          strokeDashoffset: reducedMotion ? 0 : lineLength,
        });
      });

      connectors.forEach((el) => {
        const length = el.getTotalLength();
        gsap.set(el, {
          strokeDasharray: length,
          strokeDashoffset: reducedMotion ? 0 : length,
        });
      });

      pins.forEach((pin, i) => {
        const marker = pinRefs.current[i];
        if (!marker) return;

        gsap.set(marker, {
          scale: reducedMotion ? 1 : 0,
          svgOrigin: `${pin.x} ${pin.y}`,
        });
      });

      gsap.set(cards, {
        autoAlpha: reducedMotion ? 1 : 0,
        y: reducedMotion ? 0 : 22,
      });

      if (reducedMotion) return;

      const pinProgress = pins.map((pin) => progressAtPoint(path, pin));
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: content,
          start: 'top 68%',
          end: 'bottom 42%',
          scrub: 0.85,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        lineTargets,
        {
          strokeDashoffset: 0,
          ease: 'none',
          duration: 1,
        },
        0,
      );

      pinProgress.forEach((progress, i) => {
        const at = Math.max(0, progress - 0.015);

        tl.to(
          pinRefs.current[i],
          {
            scale: 1,
            ease: 'back.out(2.4)',
            duration: 0.055,
          },
          at,
        );
        tl.to(
          connectorRefs.current[i],
          {
            strokeDashoffset: 0,
            ease: 'power1.out',
            duration: 0.065,
          },
          progress,
        );
        tl.to(
          cardRefs.current[i],
          {
            autoAlpha: 1,
            y: 0,
            ease: 'power3.out',
            duration: 0.075,
          },
          progress + 0.018,
        );
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    { scope: sectionRef, dependencies: [dims.w, dims.h], revertOnUpdate: true },
  );

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative w-full"
      style={{
        paddingTop: 'var(--section-py)',
        paddingBottom: 'var(--section-py)',
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: 'var(--container-max)',
          padding: '0 var(--container-px)',
        }}
      >
        <div className="mx-auto mb-14 max-w-2xl text-center md:mb-18">
          <h2
            className="font-display leading-[1]"
            style={{ fontSize: 'var(--text-section)', fontWeight: 600 }}
          >
            Fikirden <br /> Mürekkebe
          </h2>
        </div>

        <div
          ref={contentRef}
          className="relative w-full"
          style={{ minHeight: compact ? undefined : 'clamp(940px, 110vw, 1280px)' }}
        >
          {compact ? (
            <div className="relative mx-auto flex max-w-xl flex-col gap-5 pl-8">
              <span
                ref={mobileLineRef}
                aria-hidden
                className="absolute left-[10px] top-4 bottom-4 w-[3px] rounded-full bg-[#e8333a]"
                style={{ boxShadow: '0 0 18px rgba(232,51,58,0.28)' }}
              />
              {steps.map((step, i) => (
                <div key={step.n} className="relative">
                  <span
                    ref={(el) => {
                      mobileDotRefs.current[i] = el;
                    }}
                    aria-hidden
                    className="absolute -left-[29px] top-7 h-4 w-4 rounded-full bg-[#e8333a]"
                    style={{
                      boxShadow: '0 0 18px rgba(232,51,58,0.68)',
                    }}
                  />
                  <div
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    className="p-5"
                    style={{
                      background: 'rgba(17, 17, 17, 0.92)',
                      border: '1px solid var(--border)',
                      borderRadius: 8,
                      boxShadow: '0 18px 54px rgba(0,0,0,0.42)',
                      willChange: 'transform, opacity',
                    }}
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <span
                        className="font-mono-label"
                        style={{ fontSize: '0.74rem', color: 'var(--muted)' }}
                      >
                        {step.n}
                      </span>
                      <step.Icon
                        size={15}
                        strokeWidth={1.9}
                        style={{ color: 'var(--fg)' }}
                      />
                    </div>
                    <h3
                      className="font-display mb-2 leading-tight"
                      style={{
                        fontSize: 'clamp(1.12rem, 1.7vw, 1.48rem)',
                        fontWeight: 600,
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--muted)' }}
                    >
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <svg
                viewBox={`0 0 ${dims.w} ${dims.h}`}
                className="absolute inset-0 h-full w-full pointer-events-none"
                style={{ zIndex: 1, overflow: 'hidden' }}
              >
                <defs>
                  <filter
                    id="process-line-glow"
                    x="-45%"
                    y="-45%"
                    width="190%"
                    height="190%"
                  >
                    <feGaussianBlur stdDeviation={7} result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <path
                  ref={pathGlowRef}
                  d={pathD}
                  fill="none"
                  stroke="#e8333a"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={12}
                  opacity="0.28"
                  filter="url(#process-line-glow)"
                />
                <path
                  ref={pathRef}
                  d={pathD}
                  fill="none"
                  stroke="#e8333a"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3.4}
                />

                {pins.map((pin, i) => (
                  <g key={`pin-${i}`}>
                    <path
                      ref={(el) => {
                        connectorRefs.current[i] = el;
                      }}
                      d={connectorPath(pin, connectorLength)}
                      fill="none"
                      stroke="#e8333a"
                      strokeLinecap="round"
                      strokeWidth={2.2}
                      opacity="0.72"
                    />
                    <circle
                      ref={(el) => {
                        pinRefs.current[i] = el;
                      }}
                      cx={pin.x}
                      cy={pin.y}
                      r={pinRadius}
                      fill="#e8333a"
                      style={{
                        filter: 'drop-shadow(0 0 10px rgba(232,51,58,0.72))',
                      }}
                    />
                  </g>
                ))}
              </svg>

              {steps.map((step, i) => {
                const pin = pins[i];
                const cardOffset = connectorLength + 22;
                const cardPosition =
                  pin.side === 'right'
                    ? {
                        left: pin.x + cardOffset,
                        width: 'clamp(260px, 32vw, 390px)',
                      }
                    : {
                        right: dims.w - pin.x + cardOffset,
                        width: 'clamp(260px, 32vw, 390px)',
                      };

                return (
                  <div
                    key={step.n}
                    className="absolute"
                    style={{
                      top: pin.y,
                      zIndex: 10,
                      transform: 'translateY(-50%)',
                      ...cardPosition,
                    }}
                  >
                    <div
                      ref={(el) => {
                        cardRefs.current[i] = el;
                      }}
                      className="p-5 md:p-6"
                      style={{
                        background: 'rgba(17, 17, 17, 0.92)',
                        border: '1px solid var(--border)',
                        borderRadius: 8,
                        boxShadow: '0 18px 54px rgba(0,0,0,0.58)',
                        transformOrigin:
                          pin.side === 'right' ? 'left center' : 'right center',
                        willChange: 'transform, opacity',
                      }}
                    >
                      <div className="mb-3 flex items-center gap-3">
                        <span
                          className="font-mono-label"
                          style={{ fontSize: '0.74rem', color: 'var(--muted)' }}
                        >
                          {step.n}
                        </span>
                        <step.Icon
                          size={15}
                          strokeWidth={1.9}
                          style={{ color: 'var(--fg)' }}
                        />
                      </div>
                      <h3
                        className="font-display mb-2 leading-tight"
                        style={{
                          fontSize: 'clamp(1.12rem, 1.7vw, 1.48rem)',
                          fontWeight: 600,
                        }}
                      >
                        {step.title}
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: 'var(--muted)' }}
                      >
                        {step.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        <SectionCTA className="mt-12 md:mt-16" />
      </div>
    </section>
  );
}
