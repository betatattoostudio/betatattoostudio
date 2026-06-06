'use client';

import { Fragment } from 'react';

const quoteWords = [
  { text: '“Mürekkep', accent: true },
  { text: 'zamansızdır', accent: true },
  { text: '—' },
  { text: 'trendleri' },
  { text: 'takip' },
  { text: 'etmez,' },
  { text: 'solmaz.' },
  { text: 'Cesaret,' },
  { text: 'kalıcılık', accent: true },
  { text: 've' },
  { text: 'zamanın' },
  { text: 'sınavına' },
  { text: 'dayanacak' },
  { text: 'sanat', accent: true },
  { text: 'yaratmakla' },
  { text: 'ilgilidir.”' },
];

export default function QuoteSection() {
  return (
    <section
      className="relative flex min-h-[72svh] w-full items-center overflow-hidden bg-[var(--bg-2)] border-y border-[var(--border)]"
      style={{ padding: 'var(--section-py) 0' }}
    >
      <div
        className="mx-auto text-center"
        style={{
          maxWidth: 980,
          padding: '0 var(--container-px)',
        }}
      >
        <p
          className="font-display italic leading-[1.25]"
          style={{
            fontSize: 'clamp(1.75rem, 4.2vw, 3.6rem)',
            fontWeight: 500,
          }}
        >
          {quoteWords.map((word, i) => (
            <Fragment key={`${word.text}-${i}`}>
              <span
                className="inline"
                style={{ color: word.accent ? '#e8333a' : 'var(--fg)' }}
              >
                {word.text}
              </span>
              {i < quoteWords.length - 1 ? ' ' : ''}
            </Fragment>
          ))}
        </p>
      </div>
    </section>
  );
}
