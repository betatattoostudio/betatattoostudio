'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { heroImages, PHONE_URL } from '../lib/images';
import { whatsappHref } from '../lib/contact';
import { MessageCircle, Phone } from 'lucide-react';
import { stagger, wordReveal } from '../lib/motion';

const title = ['Tarzını', 'Bizimle', 'Yansıt'];

const desktopCards = [
  {
    rotateY: 75,
    w: 'clamp(80px,  5.6vw,  100px)',
    h: 'clamp(280px, 19vw, 360px)',
    z: 9,
    ty: 44,
  },
  {
    rotateY: 55,
    w: 'clamp(190px, 13.0vw, 244px)',
    h: 'clamp(250px, 17vw, 320px)',
    z: 8,
    ty: 24,
  },
  {
    rotateY: 22,
    w: 'clamp(178px, 12.2vw, 228px)',
    h: 'clamp(220px, 15vw, 285px)',
    z: 7,
    ty: 10,
  },
  {
    rotateY: 11,
    w: 'clamp(165px, 11.3vw, 210px)',
    h: 'clamp(200px, 14vw, 260px)',
    z: 6,
    ty: 2,
  },
  {
    rotateY: 0,
    w: 'clamp(150px, 10.2vw, 190px)',
    h: 'clamp(185px, 13vw, 240px)',
    z: 5,
    ty: 0,
  },
  {
    rotateY: -11,
    w: 'clamp(165px, 11.3vw, 210px)',
    h: 'clamp(200px, 14vw, 260px)',
    z: 6,
    ty: 2,
  },
  {
    rotateY: -22,
    w: 'clamp(178px, 12.2vw, 228px)',
    h: 'clamp(220px, 15vw, 285px)',
    z: 7,
    ty: 10,
  },
  {
    rotateY: -55,
    w: 'clamp(190px, 13.0vw, 244px)',
    h: 'clamp(250px, 17vw, 320px)',
    z: 8,
    ty: 24,
  },
  {
    rotateY: -75,
    w: 'clamp(80px,  5.6vw,  100px)',
    h: 'clamp(280px, 19vw, 360px)',
    z: 9,
    ty: 44,
  },
];

const marqueeImgs = [
  heroImages[0],
  heroImages[1],
  heroImages[2],
  heroImages[3],
  heroImages[4],
  heroImages[5],
];

const desktopImgs = [
  heroImages[0],
  heroImages[1],
  heroImages[2],
  heroImages[4],
  heroImages[5],
  heroImages[6],
  heroImages[0],
  heroImages[1],
  heroImages[2],
];

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen w-full overflow-hidden flex flex-col md:pb-[clamp(340px,26vw,500px)]"
      style={{
        paddingTop: 'clamp(4.4rem, 6.6vh, 5.6rem)',
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(72% 40% at 50% 14%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 60%), linear-gradient(180deg, #0c0c0b 0%, #080808 44%, #10100f 100%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-[4.8rem] h-72 pointer-events-none opacity-80"
        style={{
          background:
            'radial-gradient(35% 42% at 14% 64%, rgba(170,170,170,0.16) 0%, rgba(170,170,170,0) 68%), radial-gradient(38% 46% at 86% 62%, rgba(170,170,170,0.15) 0%, rgba(170,170,170,0) 70%), radial-gradient(44% 36% at 50% 76%, rgba(210,210,210,0.08) 0%, rgba(210,210,210,0) 72%)',
          filter: 'blur(18px)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-64 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(8,8,8,0) 0%, rgba(8,8,8,0.85) 55%, var(--bg) 100%)',
        }}
      />
      {/* Glow separator line */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px pointer-events-none"
        style={{
          background: 'rgba(255,255,255,0.07)',
          boxShadow: '0 0 40px 12px rgba(200,200,200,0.08)',
        }}
      />

      <motion.div
        className="relative z-20 text-center px-5 max-w-6xl mx-auto flex-1 flex flex-col justify-center"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={wordReveal}
          className="font-mono-label text-[var(--muted)] mb-3"
        >
          Beta Tattoo Studio · Maltepe
        </motion.p>
        <h1
          className="mx-auto max-w-170 leading-[0.98] tracking-tight text-center text-balance"
          style={{
            fontSize: 'clamp(3rem, 5.6vw, 5.4rem)',
            fontWeight: 700,
          }}
        >
          {title.map((w, i) => (
            <motion.span
              key={i}
              variants={wordReveal}
              className="inline-block"
            >
              {w}
              {i < title.length - 1 ? ' ' : ''}
            </motion.span>
          ))}
        </h1>
        <motion.p
          variants={wordReveal}
          className="mt-4 text-[var(--muted)] max-w-[460px] mx-auto text-base md:text-lg leading-relaxed"
        >
          Her dövme randevuyla, temiz çizgiyle ve kalıcı tasarım fikriyle
          hazırlanır.
        </motion.p>
        <motion.div
          variants={wordReveal}
          className="mt-7 flex flex-col items-center justify-center gap-3 w-full px-5 md:px-0"
        >
          <div className="flex flex-row items-center justify-center gap-3 w-full md:w-auto">
            <a
              href={PHONE_URL}
              className="btn-pill btn-light btn-hero w-full md:w-auto text-center flex items-center justify-center gap-2"
            >
              <Phone size={15} strokeWidth={2} />
              Ara
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="btn-pill btn-outline btn-hero backdrop-blur-sm w-full md:w-auto text-center flex items-center justify-center gap-2"
            >
              <MessageCircle size={15} strokeWidth={2} />
              WhatsApp
            </a>
          </div>
        </motion.div>
      </motion.div>

      <div
        aria-hidden={false}
        className="hidden md:flex absolute inset-x-0 z-10 items-center justify-between"
        style={{
          height: 'clamp(260px, 21vw, 430px)',
          bottom: 'clamp(2rem, 5vh, 4rem)',
          perspective: '1300px',
          perspectiveOrigin: '50% 52%',
        }}
      >
        {desktopCards.map((card, i) => (
          <HeroCard key={i} i={i} img={desktopImgs[i]} card={card} />
        ))}
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 right-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, rgba(8,8,8,0.82) 0%, rgba(8,8,8,0) 4%, rgba(8,8,8,0) 96%, rgba(8,8,8,0.82) 100%)',
          }}
        />
      </div>

      <MobileMarquee />
    </section>
  );
}

function MobileMarquee() {
  const [paused, setPaused] = useState(false);
  const track = [...marqueeImgs, ...marqueeImgs];

  return (
    <div
      className="md:hidden relative z-10 overflow-hidden pb-8"
      style={{ height: 228 }}
    >
      <div
        className="flex gap-3 w-max"
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
        style={{
          paddingLeft: 16,
          animation: 'marquee-scroll 22s linear infinite',
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        {track.map((img, i) => (
          <div
            key={i}
            className="relative flex-none overflow-hidden"
            style={{
              width: 148,
              height: 200,
              borderRadius: 18,
              background: '#1a1a1a',
              boxShadow:
                '0 14px 36px rgba(0,0,0,0.62), 0 0 0 1px rgba(255,255,255,0.07)',
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="148px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 right-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(8,8,8,0.9) 0%, rgba(8,8,8,0) 12%, rgba(8,8,8,0) 88%, rgba(8,8,8,0.9) 100%)',
        }}
      />
    </div>
  );
}

function HeroCard({
  i,
  img,
  card,
}: {
  i: number;
  img: { src: string; alt: string };
  card: (typeof desktopCards)[number];
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 72 + card.ty,
        scale: 0.88,
        rotateY: card.rotateY,
      }}
      animate={{
        opacity: 1,
        y: card.ty,
        scale: 1,
        rotateY: card.rotateY,
      }}
      transition={{
        delay: 0.5 + Math.abs(i - 4) * 0.09,
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        position: 'relative',
        transformStyle: 'preserve-3d',
        zIndex: card.z,
        flex: '0 0 auto',
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          width: card.w,
          height: card.h,
          borderRadius: 28,
          backfaceVisibility: 'hidden',
          boxShadow:
            i === 3
              ? '0 34px 78px rgba(0,0,0,0.78), 0 0 0 1px rgba(255,255,255,0.13)'
              : '0 28px 68px rgba(0,0,0,0.68), 0 0 0 1px rgba(255,255,255,0.08)',
          background: '#1a1a1a',
        }}
      >
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes="(min-width: 768px) 285px, 150px"
          className="object-cover"
          priority={i === 3}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.02) 45%, rgba(0,0,0,0.42) 100%)',
          }}
        />
      </div>
    </motion.div>
  );
}
