'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Star } from 'lucide-react';
import SectionCTA from './SectionCTA';

gsap.registerPlugin(ScrollTrigger);

type Review = {
  name: string;
  rating: number;
  date: string;
  text: string;
  avatar?: string;
};

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toLocaleUpperCase('tr-TR');
}

const reviews: Review[] = [
  {
    name: 'Nazlıcan Kaskan',
    avatar:
      'https://lh3.googleusercontent.com/a-/ALV-UjWS1C6OFzc0-KI3Pv8-b8bW14x3sGTuC_Xv8yHh7yolt9F7J4g=s64-c-rp-mo-br100',
    rating: 5,
    date: '5 ay önce',
    text: 'Herşey için çok teşekkür ederim istediğim gibi bir dövme tasarımıyla çok mutlu bir şekilde ayrıldım, samimi temiz ve işin ustası olan bir ortamdı. Eğer sizde ömür boyu taşıyacağınız dövmeniz için güvenilir bir yer arıyorsanız kesinlikle tavsiye ederim.',
  },
  {
    name: 'Kaan Kazan',
    avatar:
      'https://lh3.googleusercontent.com/a/ACg8ocIWJhVISrl7yq6hZeFsyst_atzsFq7CHp76KXs-c3IAlPBOzA=s64-c-rp-mo-br100',
    rating: 5,
    date: '5 ay önce',
    text: 'Müthiş bir deneyimdi. Daha önceden de dövmelerin vardı fakat bu fiyata bu kalite müthiş. Hoş sohbet ilgi alakaları ve bu kadar profesyonelce çalışmaları gerçekten çok iyiydi. Hiç düşünmeden gidebilirsiniz.',
  },
  {
    name: 'Gorkem Ilhan',
    avatar:
      'https://lh3.googleusercontent.com/a-/ALV-UjXfe8pXm9rWV3aLW-PxKJ_R5Nic9Jf_mvSPaq9w2juGxfopHjmAmA=s64-c-rp-mo-br100',
    rating: 5,
    date: '4 ay önce',
    text: 'Gerçekten çok kaliteli işçilikleri var, ikinci dövmemi yaptırdım çokta hoşuma gitti. Hepsi güler yüzlü, hepsine ayrı ayrı teşekkür ederim, kalitenin tek adresi.',
  },
  {
    name: 'E T',
    avatar:
      'https://lh3.googleusercontent.com/a/ACg8ocI2StsDXuZEvBLzKDkGGOIczWpkcl0zxlYEmYDwVISos8n82g=s64-c-rp-mo-br100',
    rating: 5,
    date: '6 ay önce',
    text: 'Güler yüzlü kaliteli ve bir o kadar da iyi sanatçıların olduğu samimi bir studio. İşciliklerinden hijyenine kadar her şeye özen gösterilmiş harika bir ortam, ellerinize sağlık çok teşekkür ederim.',
  },
  {
    name: 'Deniz Sert',
    avatar:
      'https://lh3.googleusercontent.com/a-/ALV-UjUGMuDp8BwYVkTsVM9pzsyuxBKeVdCbJPCInrT7P4TIB9RdlrF6ng=s64-c-rp-mo-br100',
    rating: 5,
    date: '4 ay önce',
    text: 'İlk dövme deneyimim için tam anlamıyla doğru tercih yaptığımı düşünüyorum. Tasarım konusunda verilen fikirler, gösterilen ilgi, hoş sohbet, salonun temizliği ve profesyonel bir ekip. Herşey mükemmeldi, kesinlikle tavsiye ederim.',
  },
  {
    name: 'Didem Beyoğlu',
    avatar:
      'https://lh3.googleusercontent.com/a/ACg8ocI3Bvjq34zEl06hztzuGsmwTSoeOmpbUY_kF_ZumSDszUyqUg=s64-c-rp-mo-br100',
    rating: 5,
    date: '4 ay önce',
    text: "Beta Tattoo'da dövme yaptırdım ve ortaya çıkan işi gerçekten çok beğendim. Dövmemi büyük bir özen ve profesyonellikle yapan Can Bey'e, süreç boyunca ilgisi ve desteği için de Merve Hanım'a çok teşekkür ederim. Gönül rahatlığıyla tavsiye ederim.",
  },
  {
    name: 'kadir balaban',
    avatar:
      'https://lh3.googleusercontent.com/a/ACg8ocIKjSu2gdkNPCXbeSzFDubvEPxQs9s_b0ORZSvsNGDFZ7mmMA=s64-c-rp-mo-br100',
    rating: 5,
    date: '3 ay önce',
    text: 'İlgi alakaları çok iyiydi, ilk dövme deneyimimde tasarım konusunda zaman baskısı, stresi yaratmadan uzun sürsede çok yardımcı oldular ve bir dövme için gitmişken iki çok güzel dövme yaptırdım. Benim için iyi çalışanların olduğu güzel bir yer.',
  },
  {
    name: 'Ebru KOTANOĞLU',
    avatar:
      'https://lh3.googleusercontent.com/a-/ALV-UjV1EdH6oZXT4AVqU8V41zzZs2k3vZ_HgF3ZUC55aUfV0HbT9zFy=s64-c-rp-mo-br100',
    rating: 5,
    date: '6 ay önce',
    text: 'Eşimle beraber dövme yaptırdık. Benim ilk dövmem olacağı için uzun süren bir araştırma sonucunda Beta Tattoo ile tanışma fırsatım oldu. Hem ben hem eşim sonuçtan çok memnun kaldık, herkese tavsiye ederiz.',
  },
  {
    name: 'Arda Karaman',
    avatar:
      'https://lh3.googleusercontent.com/a/ACg8ocLGyifRRG0ZJpPs8bsa7jDlOcyw_RN8I3XJxYJ54b1TZF-2iQ=s64-c-rp-mo-br100',
    rating: 5,
    date: '6 ay önce',
    text: 'İyi ki sizi tercih etmişim, işçilik harikaydı. Bu kadar güzel olacağını düşünmemiştim, harika bir deneyimdi. Sabırla tüm isteklerimi yapmaya çalıştığınız için gösterdiğiniz ilgi ve alakanız için ayrıca teşekkür ederim. Elleriniz dert görmesin.',
  },
];

export default function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;
      if (reducedMotion) return;

      gsap.from('.review-card', {
        autoAlpha: 0,
        y: 40,
        scale: 0.96,
        filter: 'blur(8px)',
        duration: 0.75,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <>
      <section
        id="reviews"
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
          {/* Header */}
          <div className="mb-12 md:mb-16 text-center">
            <p className="font-mono-label text-[var(--muted)] mb-3">
              Google Yorumları
            </p>
            <h2
              className="font-display leading-[1]"
              style={{ fontSize: 'var(--text-section)', fontWeight: 600 }}
            >
              Müşteriler <br /> Ne Diyor?
            </h2>
            <div className="flex items-center justify-center gap-3 mt-6">
              <span
                className="font-display leading-none"
                style={{ fontSize: '2.6rem', fontWeight: 600 }}
              >
                4.9
              </span>
              <div className="flex flex-col gap-1">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      fill="var(--fg)"
                      className="text-[var(--fg)]"
                    />
                  ))}
                </div>
                <span
                  className="font-mono-label text-[var(--muted)]"
                  style={{ fontSize: '0.58rem' }}
                >
                  Google üzerinde
                </span>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="review-card flex flex-col gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg-2)] p-5"
              >
                {/* Header row */}
                <div className="flex items-center gap-3">
                  <div
                    className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-full font-display text-sm font-semibold"
                    style={{
                      width: 44,
                      height: 44,
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.12)',
                    }}
                  >
                    {r.avatar ? (
                      <Image
                        src={r.avatar}
                        alt={`${r.name} profil fotoğrafı`}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    ) : (
                      <span>{initials(r.name)}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{r.name}</p>
                    <p
                      className="font-mono-label text-[var(--muted)]"
                      style={{ fontSize: '0.58rem' }}
                    >
                      {r.date}
                    </p>
                  </div>
                  <div className="flex gap-0.5 shrink-0">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star
                        key={j}
                        size={11}
                        fill="var(--fg)"
                        className="text-[var(--fg)]"
                      />
                    ))}
                  </div>
                </div>

                {/* Text */}
                <p className="text-[var(--muted)] text-sm leading-relaxed flex-1">
                  {r.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div
        style={{
          paddingBottom: 'clamp(3rem, 6vw, 5rem)',
          paddingLeft: 'var(--container-px)',
          paddingRight: 'var(--container-px)',
        }}
      >
        <SectionCTA />
      </div>
    </>
  );
}
