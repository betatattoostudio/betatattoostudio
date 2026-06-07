'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import SectionCTA from './SectionCTA';
import { studioInteriorImages } from '../lib/images';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const galleryImages = studioInteriorImages;

export default function PolaroidBoard() {
  const ref = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openImage = (i: number) => setSelectedIndex(i);
  const closeImage = () => setSelectedIndex(null);

  useGSAP(
    () => {
      gsap.from('.gallery-item', {
        opacity: 0,
        y: 40,
        scale: 0.96,
        stagger: { each: 0.07, from: 'start' },
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
        },
      });
    },
    { scope: ref },
  );

  const selected = selectedIndex !== null ? galleryImages[selectedIndex] : null;

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
          className="mx-auto"
          style={{
            maxWidth: 'var(--container-max)',
            padding: '0 var(--container-px)',
          }}
        >
          <div className="text-center mb-12">
            <h2
              className="font-display leading-none"
              style={{ fontSize: 'var(--text-section)', fontWeight: 600 }}
            >
              Galeri
            </h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="gallery-item group relative overflow-hidden rounded-lg cursor-pointer"
                style={{ aspectRatio: '4/3' }}
                onClick={() => openImage(i)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              </div>
            ))}
          </div>

          <SectionCTA className="mt-12" />
        </div>
      </section>

      {/* Lightbox backdrop */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50 cursor-pointer"
            style={{ background: 'rgba(6,6,6,0.92)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeImage}
          />
        )}
      </AnimatePresence>

      {/* Lightbox image */}
      <AnimatePresence>
        {selectedIndex !== null && selected !== null && (
          <div
            key={`lightbox-${selectedIndex}`}
            className="fixed inset-0 z-51 flex items-center justify-center pointer-events-none p-4"
          >
            <motion.div
              className="relative pointer-events-auto cursor-zoom-out rounded-lg overflow-hidden"
              style={{ width: 'min(90vw, 720px)', aspectRatio: '4/3' }}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={closeImage}
            >
              <Image
                src={selected.src}
                alt={selected.alt}
                fill
                sizes="720px"
                className="object-cover"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
