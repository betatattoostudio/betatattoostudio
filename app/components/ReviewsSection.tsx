'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { Star, X } from 'lucide-react';
import SectionCTA from './SectionCTA';

gsap.registerPlugin(ScrollTrigger);

type Review = {
  name: string;
  rating: number;
  date: string;
  text: string;
  avatar?: string;
  images?: string[];
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
    images: [
      'https://lh3.googleusercontent.com/grass-cs/ANxoTn3m-cg7JY-GXaV-hrwjNirzy9dUZcLVqy-3co_Bgm1h6UjzSY6JuEb2bf3UuLcqtPxZQ9z86T6G8OJymX-QJCUAmq5_OO9AmBIdGC2NCaUNMOdvZ9t5oRMK0qKFuhrMBa0JOvwxUmGmL6aA=s3756-w3756-h2266-rw',
      'https://lh3.googleusercontent.com/grass-cs/ANxoTn23mSnX5BhtiFc3KmwmUB108HOiz5I7JuLm-EnC2gKwfutztDfXD4fwuNsBzfojWPMWiM2YYoVxn70h6l-AYIks6PMg1bN09keyCLu_h10WoLx59QGs0NZJFqjbXMDtjc4LjXAIIpRjcp89=s3756-w3756-h2266-rw',
      'https://lh3.googleusercontent.com/grass-cs/ANxoTn2OrTxJN8KE4qh8F3DFOq2CB7gnzKqzwiL4CwlddTs-R3jHeTrqi1KjciSfmqeH-IAAc9D5BkVPXHBgUTzU1kKn4LxS1vCdhoDaxwQwZk2kx2FPo_iFtRN2-IKqzcvmsaR_hE5iszvaASs=s3756-w3756-h2266-rw',
    ],
  },
  {
    name: 'Kaan Kazan',
    avatar:
      'https://lh3.googleusercontent.com/a/ACg8ocIWJhVISrl7yq6hZeFsyst_atzsFq7CHp76KXs-c3IAlPBOzA=s64-c-rp-mo-br100',
    rating: 5,
    date: '5 ay önce',
    text: 'Müthiş bir deneyimdi. Daha önceden de dövmelerin vardı fakat bu fiyata bu kalite müthiş. Hoş sohbet ilgi alakaları ve bu kadar profesyonelce çalışmaları gerçekten çok iyiydi. Hiç düşünmeden gidebilirsiniz.',
    images: [
      'https://lh3.googleusercontent.com/grass-cs/ANxoTn2PivsMxdKl2bqRSmORqVDIhgUeG8jtlBut19X5cWr7tKiMf85SZ-n6pq1Xtj-vDVa5Phf86KfEEWgtxjq2q9Rqf4Ib0kKeO22MztppB1GoOeMkBuQIYubmlSbLPjuxreC2hO9MpYaILyNq=s3756-w3756-h2266-rw',
      'https://lh3.googleusercontent.com/grass-cs/ANxoTn3PFjwNJ9duMr5JnU2GbTijJyREr5-U-9xikn4KL8PfOqwyZ0Jm_NmMwb521QgzGd1BZqWHG3awZLjlsbcrn9W6jaiHAL1EmrZnPyTUjsc6fqXx3jiedPg3AtUcMGQTss62SfppTrAYBRE=s3756-w3756-h2266-rw',
      'https://lh3.googleusercontent.com/grass-cs/ANxoTn0bBcSfH8yJEPR5mMC5gyzPYz8Wpo7c1x9bpo8R_X27zSTBRjyHs9QKg06NhcUMpyZ4mhE2y1l6q_d7twEiza736CaP4eNlkFPmLSuWlx3F3eRFBZ7CWgHu_YTcF867-3rPbdv54ems8ReT=s3756-w3756-h2266-rw',
    ],
  },
  {
    name: 'Gorkem Ilhan',
    avatar:
      'https://lh3.googleusercontent.com/a-/ALV-UjXfe8pXm9rWV3aLW-PxKJ_R5Nic9Jf_mvSPaq9w2juGxfopHjmAmA=s64-c-rp-mo-br100',
    rating: 5,
    date: '4 ay önce',
    text: 'Gerçekten çok kaliteli işçilikleri var, ikinci dövmemi yaptırdım çokta hoşuma gitti. Hepsi güler yüzlü, hepsine ayrı ayrı teşekkür ederim, kalitenin tek adresi.',
    images: [
      'https://lh3.googleusercontent.com/grass-cs/ANxoTn1ANw45zK0Ai2O3DRYzOMEFKiluyqasmYcG65COMV-vNAs7Qyp9RefTDcYn-LrunrdEznZNpNfZI5UN1huS7PxgD9oOslP2HOXkhNIQ-ULBVIaUNOgL1VsZWlI4FMrdBmpBjjFyAEUMY_hf=s3756-w3756-h2266-rw',
    ],
  },
  {
    name: 'E T',
    avatar:
      'https://lh3.googleusercontent.com/a/ACg8ocI2StsDXuZEvBLzKDkGGOIczWpkcl0zxlYEmYDwVISos8n82g=s64-c-rp-mo-br100',
    rating: 5,
    date: '6 ay önce',
    text: 'Güler yüzlü kaliteli ve bir o kadar da iyi sanatçıların olduğu samimi bir studio. İşciliklerinden hijyenine kadar her şeye özen gösterilmiş harika bir ortam, ellerinize sağlık çok teşekkür ederim.',
    images: [
      'https://lh3.googleusercontent.com/grass-cs/ANxoTn3ezfi9KSPJ0EP-O-yE2C0nwKsYg2aTRaiKMhfNEtScKqZz5LbA7eSrWkE1Kj_oTds5FR2g3c0k7csYK5fHwhKwvnKMg1s9BerifA0Q8ebPf5Az-5aGQlZCa6pJM3u76H26Bj-j4zswVFgv=s3756-w3756-h2266-rw',
    ],
  },
  {
    name: 'Deniz Sert',
    avatar:
      'https://lh3.googleusercontent.com/a-/ALV-UjUGMuDp8BwYVkTsVM9pzsyuxBKeVdCbJPCInrT7P4TIB9RdlrF6ng=s64-c-rp-mo-br100',
    rating: 5,
    date: '4 ay önce',
    text: 'İlk dövme deneyimim için tam anlamıyla doğru tercih yaptığımı düşünüyorum. Tasarım konusunda verilen fikirler, gösterilen ilgi, hoş sohbet, salonun temizliği ve profesyonel bir ekip. Herşey mükemmeldi, kesinlikle tavsiye ederim.',
    images: [],
  },
  {
    name: 'Didem Beyoğlu',
    avatar:
      'https://lh3.googleusercontent.com/a/ACg8ocI3Bvjq34zEl06hztzuGsmwTSoeOmpbUY_kF_ZumSDszUyqUg=s64-c-rp-mo-br100',
    rating: 5,
    date: '4 ay önce',
    text: "Beta Tattoo'da dövme yaptırdım ve ortaya çıkan işi gerçekten çok beğendim. Dövmemi büyük bir özen ve profesyonellikle yapan Can Bey'e, süreç boyunca ilgisi ve desteği için de Merve Hanım'a çok teşekkür ederim. Gönül rahatlığıyla tavsiye ederim.",
    images: [
      'https://lh3.googleusercontent.com/grass-cs/ANxoTn1N0_PmxqmaGj4h5FyXDFrc5hWpt1zFPIJ1qOOxbW9wEONX8rmtBtrqJnvcPyK1BaJzEHpMCZI1K0VfIYQ_IEdfHzTruKGtU_3uAbAaLEcyYlmrlcQNKLLrM1QJQ9YOwm8TLDgHNQVjiEml=s3756-w3756-h2266-rw',
    ],
  },
  {
    name: 'kadir balaban',
    avatar:
      'https://lh3.googleusercontent.com/a/ACg8ocIKjSu2gdkNPCXbeSzFDubvEPxQs9s_b0ORZSvsNGDFZ7mmMA=s64-c-rp-mo-br100',
    rating: 5,
    date: '3 ay önce',
    text: 'İlgi alakaları çok iyiydi, ilk dövme deneyimimde tasarım konusunda zaman baskısı, stresi yaratmadan uzun sürsede çok yardımcı oldular ve bir dövme için gitmişken iki çok güzel dövme yaptırdım. Benim için iyi çalışanların olduğu güzel bir yer.',
    images: [
      'https://lh3.googleusercontent.com/grass-cs/ANxoTn1kPbAbmy8VpTBYgbC3YhVGmMYCkaL2Yf2ch4v9z0VMizmXe5a0YI4jZ3VN8VFRM4Hy2bLK2gqD_aJXnL5TAgvLB67UBp8LO0psvX7XQSjGk6QltCjqD5wLARCyFS5pzRfHA3rjtf6gdDmB=s3756-w3756-h2266-rw',
    ],
  },
  {
    name: 'Ebru KOTANOĞLU',
    avatar:
      'https://lh3.googleusercontent.com/a-/ALV-UjV1EdH6oZXT4AVqU8V41zzZs2k3vZ_HgF3ZUC55aUfV0HbT9zFy=s64-c-rp-mo-br100',
    rating: 5,
    date: '6 ay önce',
    text: 'Eşimle beraber dövme yaptırdık. Benim ilk dövmem olacağı için uzun süren bir araştırma sonucunda Beta Tattoo ile tanışma fırsatım oldu. Hem ben hem eşim sonuçtan çok memnun kaldık, herkese tavsiye ederiz.',
    images: [
      'https://lh3.googleusercontent.com/grass-cs/ANxoTn2kbPB8WbJv-QVUhathe_J4cJfN1gOtOSxL6OYJH5xaOT6Pr8ZVf_8Qyin_skXA8uof_JbTnAA31VuaSIFjPXKBi9xAENUTSqGFlb7-vGcbbRqGcwtIV2doD4TDOiB85EGIix2_5GHl4z_e=s3756-w3756-h2266-rw',
      'https://lh3.googleusercontent.com/grass-cs/ANxoTn34gCX5JMPeTLpRn330AOkq5JJaobMtPVXwo1UeDhJt0s0x7lKDKD7pPwO-emruFtos2pZ0_ALPezPgO2fV0Vk3dxRxkb8hljWGAbNSkWnSWhgU9xTD95j6JpqFZHUOGmxGA-Wp0IdE3lnF=s3756-w3756-h2266-rw',
      'https://lh3.googleusercontent.com/grass-cs/ANxoTn2cmnjxVlfyhTKr5Sig_qkYEdIPRiEbJm0518gAh9h4HyC4khyqBWROSbZYqi4-GEQNCz30NEHDT71VSO5jeV1_W4Fxzcj6x1k37La2GA7yWoiQREHspvQ9bgvdIrcfc9dT5BfSr-srVW15=s3756-w3756-h2266-rw',
      'https://lh3.googleusercontent.com/grass-cs/ANxoTn1W6v0UyvX1ME67ntGdugOYhcHtZ5LA00YwOgoGNIJF0NmewkhOF6dLsc_nneJr7d6kf3UGwvDSi-bGOOKXRiiIupMMd_lpRW7Je1EarFf7JTArIkolWGUPQ0Iwed0p3DZg38n_nAlJeVoc=s3756-w3756-h2266-rw',
      'https://lh3.googleusercontent.com/grass-cs/ANxoTn2cRuxJfC2FBWzy4nyZRe4_6t9_Hguacup_GQuxk0bYOzbTlwjItX42NIphLK9DrYeJHcvYF-qH7MF58tON28IYejkwq8RotGzbnjo6TOku5nU9JRclTbYS_QNwpl7euoS3GtnVOM7HkDFZ=s3756-w3756-h2266-rw',
      'https://lh3.googleusercontent.com/grass-cs/ANxoTn36On9D6oIhLohb-uzJLDFsJRfV1ICbUHp2Ud7GwLAtEeg2vuGgHWsKJpauvvwb0UtQkNA7ObdJhDRCczsAFjXn1aUv1MZIxIKOGpHkMexr6VaLrD6kYX0bysKZm4BOySk_wnSxVl525HI=s3756-w3756-h2266-rw',
    ],
  },
  {
    name: 'Arda Karaman',
    avatar:
      'https://lh3.googleusercontent.com/a/ACg8ocLGyifRRG0ZJpPs8bsa7jDlOcyw_RN8I3XJxYJ54b1TZF-2iQ=s64-c-rp-mo-br100',
    rating: 5,
    date: '6 ay önce',
    text: 'İyi ki sizi tercih etmişim, işçilik harikaydı. Bu kadar güzel olacağını düşünmemiştim, harika bir deneyimdi. Sabırla tüm isteklerimi yapmaya çalıştığınız için gösterdiğiniz ilgi ve alakanız için ayrıca teşekkür ederim. Elleriniz dert görmesin.',
    images: [
      'https://lh3.googleusercontent.com/grass-cs/ANxoTn1Tnnntz4778bN8pnGHafN0sr4h98qJ0Aj_oDrw4PFDMtqAw_Wj9JajGtmpuNcqQfqdhvY_hYpSUpOND5HePG1yKPs4ykh2FOIREC9hS05T289dvbFYwUHWORzlzhKF21lHU4Z8yNOSKipD=s3756-w3756-h2266-rw',
    ],
  },
];

export default function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

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

                {/* Review photos */}
                {r.images && r.images.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {r.images.map((src, j) => (
                      <button
                        key={j}
                        onClick={() => setLightboxImg(src)}
                        className="relative overflow-hidden rounded-lg shrink-0 transition-opacity hover:opacity-80"
                        style={{ width: 72, height: 72 }}
                        aria-label="Fotoğrafı büyüt"
                      >
                        <Image
                          src={src}
                          alt={`${r.name} dövme fotoğrafı ${j + 1}`}
                          fill
                          sizes="72px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
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

      {/* Photo lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <>
            <motion.div
              className="fixed inset-0 z-50 cursor-pointer"
              style={{
                background: 'rgba(6,6,6,0.94)',
                backdropFilter: 'blur(8px)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxImg(null)}
            />
            <motion.div
              className="fixed inset-0 z-[51] flex items-center justify-center p-6 pointer-events-none"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="relative pointer-events-auto overflow-hidden"
                style={{
                  maxWidth: 480,
                  maxHeight: '80svh',
                  width: '100%',
                  borderRadius: 16,
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <Image
                  src={lightboxImg}
                  alt="Müşteri dövme fotoğrafı"
                  width={480}
                  height={640}
                  className="w-full h-auto object-contain"
                />
              </div>
              <button
                className="pointer-events-auto absolute top-5 right-5 flex items-center justify-center rounded-full bg-[rgba(0,0,0,0.6)] border border-[rgba(255,255,255,0.15)] transition-colors hover:bg-[rgba(255,255,255,0.1)]"
                style={{ width: 40, height: 40 }}
                onClick={() => setLightboxImg(null)}
              >
                <X size={18} />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
