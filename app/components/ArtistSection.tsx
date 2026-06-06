'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { heroImages, teamImages, lineworkGallery, realismGallery } from '../lib/images';
import SectionCTA from './SectionCTA';

const artists = [
  {
    name: 'Hakan',
    role: 'Cover-Up & Black/Grey',
    portrait: teamImages[0].src,
    workPhoto: heroImages[0].src,
    bullets: [
      'Cover-up projelerinde eski izi yeni tasarıma yediren güçlü black and grey kompozisyonlar.',
      'Deniz feneri gibi mimari formlar, dalga dokuları ve yoğun gölgede temiz kontrast.',
      'Mevcut dövmenin formu analiz edilir; kapama tasarımı ona göre sıfırdan planlanır.',
    ],
  },
  {
    name: 'Merve',
    role: 'Color Realism & Fine Line',
    portrait: teamImages[1].src,
    workPhoto: realismGallery[4].src,
    bullets: [
      'Color realism ve fine line detaylarını aynı tasarımda dengeli şekilde birleştirir.',
      'Karakter ve portre işlerinde yumuşak ton geçişleri, net yüz detayları ve canlı renk vurguları.',
      'Her çalışma cilt tonu, bölge formu ve tasarımın odak noktası düşünülerek planlanır.',
    ],
  },
  {
    name: 'Erdinç',
    role: 'Fine Line & Black/White',
    portrait: teamImages[2].src,
    workPhoto: lineworkGallery[2].src,
    bullets: [
      'Fine line ve black/white işlerde temiz çizgi, boşluk dengesi ve net kompozisyon.',
      'Balon, geometrik akış ve nokta detayları gibi hafif ama karakterli tasarımlarda güçlü.',
      'Ön kol gibi hareketli bölgelerde tasarım, vücudun doğal formuna göre yerleştirilir.',
    ],
  },
];

export default function ArtistSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollArtist = (direction: -1 | 1) => {
    const nextIndex = Math.max(
      0,
      Math.min(artists.length - 1, activeIndex + direction),
    );

    setActiveIndex(nextIndex);
    trackRef.current?.children[nextIndex]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  };

  return (
    <section
      id="artist"
      className="relative w-full overflow-hidden"
      style={{
        paddingTop: 'var(--section-py)',
        paddingBottom: 'clamp(2rem, 4vw, 3.5rem)',
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: 'var(--container-max)',
          padding: '0 var(--container-px)',
        }}
      >
        <div className="mb-10 text-center md:mb-12">
          <h2
            className="font-display leading-[1]"
            style={{ fontSize: 'var(--text-section)', fontWeight: 600 }}
          >
            Dövme Sanatçılarımız
          </h2>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
        style={{
          gap: 20,
          padding: '0 var(--container-px)',
          scrollbarWidth: 'none',
        }}
        onScroll={(event) => {
          const track = event.currentTarget;
          const center = track.scrollLeft + track.clientWidth / 2;
          let closest = 0;
          let closestDistance = Number.POSITIVE_INFINITY;

          Array.from(track.children).forEach((child, index) => {
            const el = child as HTMLElement;
            const childCenter = el.offsetLeft + el.offsetWidth / 2;
            const distance = Math.abs(center - childCenter);

            if (distance < closestDistance) {
              closest = index;
              closestDistance = distance;
            }
          });

          setActiveIndex(closest);
        }}
      >
        {artists.map((artist, i) => (
          <article
            key={artist.name}
            className="grid shrink-0 snap-center overflow-hidden rounded-[26px] border border-white/10 bg-[var(--bg-2)] md:grid-cols-[minmax(300px,430px)_minmax(360px,520px)]"
            style={{
              width: 'min(88vw, 980px)',
              minHeight: 'min(72svh, 620px)',
              boxShadow: '0 24px 70px rgba(0,0,0,0.58)',
            }}
          >
            <div className="relative min-h-[560px] overflow-hidden md:min-h-0">
              <Image
                src={artist.portrait}
                alt={artist.name}
                fill
                sizes="(max-width: 768px) 88vw, 430px"
                className="object-cover"
                priority={i === 0}
              />
              <div
                className="absolute inset-x-0 bottom-0 px-6 pb-6 pt-24"
                style={{
                  background:
                    'linear-gradient(0deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0) 100%)',
                }}
              >
                <span
                  className="font-display block text-[var(--fg)] leading-none"
                  style={{
                    fontSize: 'clamp(3.2rem, 10vw, 5rem)',
                    fontWeight: 500,
                    mixBlendMode: 'screen',
                  }}
                >
                  {artist.name}
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-6 p-6 md:p-10">
              <div>
                <p className="font-mono-label mb-3 text-[var(--muted)]">
                  Sanatçıyla Tanış
                </p>
                <h3
                  className="font-display leading-[1.05]"
                  style={{
                    fontSize: 'clamp(1.8rem, 3.2vw, 3rem)',
                    fontWeight: 600,
                  }}
                >
                  {artist.role}
                </h3>
              </div>

              <div className="flex flex-col gap-4">
                {artist.bullets.map((b, j) => (
                  <div key={j} className="flex gap-3 items-start">
                    <Star
                      size={13}
                      className="mt-[3px] shrink-0 text-[var(--fg)]"
                      fill="currentColor"
                    />
                    <p className="text-[var(--muted)] leading-relaxed text-[0.95rem]">
                      {b}
                    </p>
                  </div>
                ))}
              </div>

              <div className="relative w-full max-w-[420px]">
                <div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: '16/9', borderRadius: 18 }}
                >
                  <Image
                    src={artist.workPhoto}
                    alt={`${artist.name} çalışması`}
                    fill
                    sizes="420px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div
        className="mx-auto mt-6 flex items-center justify-between"
        style={{
          maxWidth: 'var(--container-max)',
          padding: '0 var(--container-px)',
        }}
      >
        <div className="flex items-center gap-2">
          {artists.map((artist, i) => (
            <button
              key={artist.name}
              type="button"
              aria-label={`${artist.name} kartına git`}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: activeIndex === i ? 28 : 8,
                background:
                  activeIndex === i ? 'var(--fg)' : 'rgba(255,255,255,0.24)',
              }}
              onClick={() => {
                setActiveIndex(i);
                trackRef.current?.children[i]?.scrollIntoView({
                  behavior: 'smooth',
                  inline: 'center',
                  block: 'nearest',
                });
              }}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Önceki sanatçı"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-[var(--fg)] disabled:opacity-35"
            disabled={activeIndex === 0}
            onClick={() => scrollArtist(-1)}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Sonraki sanatçı"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-[var(--fg)] disabled:opacity-35"
            disabled={activeIndex === artists.length - 1}
            onClick={() => scrollArtist(1)}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        style={{
          paddingTop: 'clamp(1.75rem, 3vw, 2.75rem)',
          paddingLeft: 'var(--container-px)',
          paddingRight: 'var(--container-px)',
        }}
      >
        <SectionCTA />
      </div>
    </section>
  );
}
