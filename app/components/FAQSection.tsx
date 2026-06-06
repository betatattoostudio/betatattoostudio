'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus } from 'lucide-react';
import SectionCTA from './SectionCTA';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: 'Nasıl randevu alabilirim?',
    a: 'Instagram DM üzerinden @betatattoo.studio hesabımıza ulaşabilirsiniz. Fikrinizi, referans görsellerinizi ve istediğiniz bölge bilgisini paylaşmanız süreci hızlandırır.',
  },
  {
    q: 'Tasarımımı kendim getirebilir miyim?',
    a: 'Evet. Referans olarak getirdiğiniz görseller üzerinden birlikte özgün bir tasarım çıkartırız. Birebir kopya çalışmıyoruz; tasarım her zaman size özel.',
  },
  {
    q: 'Seans ne kadar sürer?',
    a: 'Boyuta ve detaya göre değişir. Küçük bir çalışma 1-2 saat sürebilirken, büyük ve detaylı işler 4-6 saati bulabilir.',
  },
  {
    q: 'Fiyatlar nasıl belirleniyor?',
    a: 'Boyut, detay düzeyi ve uygulanacak bölge fiyatı belirler. Net teklif için DM üzerinden referans ve ölçü paylaşmanız yeterli.',
  },
  {
    q: 'Seans için nasıl hazırlanmalıyım?',
    a: 'Bol su için, tok gelin, rahat ve bölgeye erişimi kolay kıyafet giyin. Seans öncesi alkol ve kan sulandırıcılardan uzak durun.',
  },
  {
    q: 'Kaç seansda tamamlanır?',
    a: 'Küçük ve orta ölçekli işler genellikle tek seansta biter. Büyük kompozisyonlar (kol, sırt vb.) birden fazla seansa yayılabilir.',
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useGSAP(
    () => {
      const rows = rowRefs.current.filter((el): el is HTMLButtonElement =>
        Boolean(el),
      );
      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      if (
        !sectionRef.current ||
        !headingRef.current ||
        !listRef.current ||
        rows.length === 0
      ) {
        return;
      }

      if (reducedMotion) return;

      let activeIndex = 0;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${faqs.length * 360}`,
        pin: true,
        scrub: 0.85,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate(self) {
          const nextIndex = Math.min(
            faqs.length - 1,
            Math.floor(self.progress * faqs.length),
          );

          if (nextIndex !== activeIndex) {
            activeIndex = nextIndex;
            setOpen(nextIndex);
          }
        },
      });

      gsap.from(headingRef.current.children, {
        autoAlpha: 0,
        y: 28,
        filter: 'blur(10px)',
        duration: 0.85,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 76%',
        },
      });

      gsap.from(listRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 82%',
        },
      });

      gsap.from(rows, {
        autoAlpha: 0,
        x: 34,
        filter: 'blur(8px)',
        duration: 0.72,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 78%',
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <>
    <section
      id="faq"
      ref={sectionRef}
      className="relative flex min-h-[100svh] w-full items-center"
      style={{ padding: 'clamp(4rem, 8vw, 7rem) 0' }}
    >
      <div
        className="mx-auto grid gap-10 md:grid-cols-[1fr_1.4fr]"
        style={{
          maxWidth: 'var(--container-max)',
          padding: '0 var(--container-px)',
        }}
      >
        <div ref={headingRef} className="text-center md:text-left">
          <h2
            className="font-display leading-[1]"
            style={{ fontSize: 'var(--text-section)', fontWeight: 600 }}
          >
            Sık Sorulan <br /> Sorular
          </h2>
        </div>

        <div
          ref={listRef}
          className="flex flex-col divide-y divide-[var(--border)] border-y border-[var(--border)]"
        >
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <button
                key={i}
                ref={(el) => {
                  rowRefs.current[i] = el;
                }}
                onClick={() => setOpen(i)}
                className="group relative flex w-full flex-col gap-3 py-5 text-left md:py-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <span
                    className="text-base md:text-lg"
                    style={{
                      color: isOpen ? 'var(--fg)' : 'rgba(245,245,240,0.82)',
                      transition: 'color 220ms ease',
                    }}
                  >
                    {f.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 text-[var(--muted)] group-hover:text-[var(--fg)]"
                  >
                    <Plus size={20} />
                  </motion.span>
                </div>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      className="overflow-hidden"
                    >
                      <p className="text-[var(--muted)] max-w-2xl leading-relaxed pt-1">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
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
