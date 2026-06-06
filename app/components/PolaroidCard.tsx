'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export type NoteColor = 'yellow' | 'pink' | 'green';

export interface PolaroidCardProps {
  src: string;
  date?: string;
  note?: string;
  noteColor?: NoteColor;
  rotation?: number;
  id: number;
  onClick?: () => void;
}

export default function PolaroidCard({
  src,
  date,
  note,
  noteColor = 'yellow',
  rotation = 0,
  id,
  onClick,
}: PolaroidCardProps) {
  return (
    <motion.div
      layoutId={`polaroid-${id}`}
      className="polaroid cursor-pointer"
      style={{ rotate: rotation, width: 220, maxWidth: '100%' }}
      onClick={onClick}
    >
      <div
        className="polaroid-img-grain relative w-full aspect-[3/4] overflow-hidden bg-[#1a1a1a]"
        style={{ borderRadius: 6 }}
      >
        <Image
          src={src}
          alt="Beta Tattoo Studio"
          fill
          sizes="220px"
          className="object-cover"
          style={{ filter: 'sepia(22%) contrast(1.08) brightness(0.91) saturate(0.88)' }}
        />
      </div>
      {date && (
        <div
          className="absolute left-0 right-0 bottom-3 text-center text-[#2a2218]"
          style={{ fontFamily: 'var(--font-marker), cursive', fontSize: '0.85rem', letterSpacing: '0.02em' }}
        >
          {date}
        </div>
      )}
      {note && (
        <div className={`sticky-note ${noteColor}`}>
          {note}
        </div>
      )}
    </motion.div>
  );
}
