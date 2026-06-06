'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import PolaroidCard from './PolaroidCard';
import SectionCTA from './SectionCTA';
import { polaroidImages } from '../lib/images';
import type { NoteColor } from './PolaroidCard';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Scattered positions: [left%, top%, rotate]
// Container ~1600px, card 220×293px + rotation = ~318px visual height
// Row tops: 2%, 24%, 47%, 70% → each gap ~352px > 318px visual height
const positions: [string, string, number][] = [
  ['0%', '2%', -9],
  ['39%', '5%', 4],
  ['76%', '1%', 6],
  ['2%', '24%', -4],
  ['39%', '27%', -2],
  ['75%', '23%', 8],
  ['-1%', '47%', -10],
  ['39%', '50%', 3],
  ['76%', '46%', -5],
  ['2%', '70%', 7],
  ['39%', '72%', -3],
  ['78%', '73%', 5],
];

const mobileRotations = [-7, 5, -3, 6, -5, 4, -8, 3, -2, 6, -4, -3];

type PolaroidImage = {
  src: string;
  date?: string;
  note?: string;
  noteColor?: NoteColor;
};

const boardImages: PolaroidImage[] = polaroidImages;

const getPosition = (
  list: [string, string, number][],
  index: number,
): [string, string, number] => {
  const position = list[index];

  if (position) {
    return position;
  }

  const column = index % 3;
  const row = Math.floor(index / 3);
  const left = column === 0 ? '0%' : column === 1 ? '39%' : '76%';

  return [left, `${2 + row * 22}%`, column === 0 ? -6 : column === 1 ? 3 : 6];
};

export default function PolaroidBoard() {
  const ref = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openCard = (i: number) => {
    setSelectedIndex(i);
    setLightboxOpen(true);
  };
  const closeCard = () => setLightboxOpen(false);

  useGSAP(
    () => {
      gsap.from('.polaroid-card', {
        opacity: 0,
        y: 60,
        scale: 0.9,
        stagger: { each: 0.1, from: 'random' },
        duration: 0.85,
        ease: 'back.out(1.3)',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
        },
      });
    },
    { scope: ref },
  );

  const selected = selectedIndex !== null ? boardImages[selectedIndex] : null;

  return (
    <>
      <section
        id="board"
        ref={ref}
        className="relative w-full"
        style={{
          paddingTop: 'var(--section-py)',
          paddingBottom: 'clamp(2.5rem, 5vw, 4rem)',
        }}
      >
        <div
          className="mx-auto relative"
          style={{
            maxWidth: 'var(--container-max)',
            padding: '0 var(--container-px)',
          }}
        >
          {/* Desktop scattered layout */}
          <div className="hidden md:block">
            <div className="text-center">
              <h2
                className="font-display leading-[1]"
                style={{ fontSize: 'var(--text-section)', fontWeight: 600 }}
              >
                Galeri
              </h2>
            </div>
            <div
              className="relative"
              style={{ height: 'clamp(1520px, 112vw, 1640px)' }}
            >
              {boardImages.map((p, i) => {
                const [left, top, rotate] = getPosition(positions, i);
                return (
                  <div
                    key={i}
                    className="polaroid-card absolute"
                    style={{
                      left,
                      top,
                      zIndex: selectedIndex === i ? 0 : 10,
                      opacity: selectedIndex === i ? 0 : 1,
                      pointerEvents: selectedIndex === i ? 'none' : 'auto',
                    }}
                  >
                    <PolaroidCard
                      id={i}
                      src={p.src}
                      date={p.date}
                      note={p.note}
                      noteColor={p.noteColor}
                      rotation={rotate}
                      onClick={() => openCard(i)}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile 2-col layout */}
          <div className="md:hidden">
            <div className="text-center mb-10">
              <h2
                className="font-display leading-[1]"
                style={{ fontSize: 'var(--text-section)', fontWeight: 600 }}
              >
                Galeri
              </h2>
            </div>

            <div className="grid grid-cols-2 items-start gap-x-3 gap-y-6 pb-2">
              {boardImages.map((p, i) => {
                const rotate = mobileRotations[i % mobileRotations.length];

                return (
                  <div
                    key={i}
                    className="polaroid-card w-full"
                    style={{
                      marginTop: i % 2 === 1 ? 28 : 0,
                      zIndex: selectedIndex === i ? 0 : 10,
                      opacity: selectedIndex === i ? 0 : 1,
                      pointerEvents: selectedIndex === i ? 'none' : 'auto',
                    }}
                  >
                    <PolaroidCard
                      id={i}
                      src={p.src}
                      date={p.date}
                      note={p.note}
                      noteColor={p.noteColor}
                      rotation={rotate}
                      onClick={() => openCard(i)}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <SectionCTA className="relative z-30 mt-12 md:mt-8" />
        </div>
      </section>

      {/* Backdrop */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50 cursor-pointer"
            style={{
              background: 'rgba(6,6,6,0.88)',
              backdropFilter: 'blur(6px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCard}
          />
        )}
      </AnimatePresence>

      {/* Lightbox card */}
      <AnimatePresence onExitComplete={() => setSelectedIndex(null)}>
        {lightboxOpen && selected !== null && selectedIndex !== null && (
          <div
            key={`lightbox-${selectedIndex}`}
            className="fixed inset-0 z-[51] flex items-center justify-center pointer-events-none"
          >
            <motion.div
              layoutId={`polaroid-${selectedIndex}`}
              className="polaroid pointer-events-auto cursor-zoom-out"
              style={{ rotate: 0, width: 'clamp(240px, 65vw, 380px)' }}
              onClick={closeCard}
            >
              <div
                className="polaroid-img-grain relative w-full overflow-hidden bg-[#1a1a1a]"
                style={{ aspectRatio: '3/4', borderRadius: 6 }}
              >
                <Image
                  src={selected.src}
                  alt="Beta Tattoo Studio"
                  fill
                  sizes="380px"
                  className="object-cover"
                  style={{
                    filter:
                      'sepia(22%) contrast(1.08) brightness(0.91) saturate(0.88)',
                  }}
                />
              </div>
              {selected.date && (
                <div
                  className="absolute left-0 right-0 bottom-3 text-center text-[#2a2218]"
                  style={{
                    fontFamily: 'var(--font-marker), cursive',
                    fontSize: '0.95rem',
                    letterSpacing: '0.02em',
                  }}
                >
                  {selected.date}
                </div>
              )}
              {selected.note && (
                <div className={`sticky-note ${selected.noteColor}`}>
                  {selected.note}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
