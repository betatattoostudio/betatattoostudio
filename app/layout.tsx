import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans, Space_Mono, Permanent_Marker } from 'next/font/google';
import './globals.css';
import SmoothScrollProvider from './components/SmoothScrollProvider';
import LocalBusinessSchema from './components/LocalBusinessSchema';

const playfair = Playfair_Display({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
});

const dmSans = DM_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const spaceMono = Space_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
});

const permanentMarker = Permanent_Marker({
  variable: '--font-marker',
  subsets: ['latin'],
  weight: '400',
});

const siteUrl = 'https://betatattoostudio.com';
const ogImage = '/og-image.jpg';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Beta Tattoo Studio | Maltepe, İstanbul — Realism & Black Grey',
  description:
    "Maltepe'de realism, color realism, black & grey ve cover-up uzmanı dövme stüdyosu. Google'da 4,9/5 (129 yorum). Her tasarım sıfırdan, sana özel. Randevu: Instagram DM @betatattoo.studio",
  keywords: [
    'dövme stüdyosu',
    'tattoo studio',
    'Maltepe dövme',
    'İstanbul dövme',
    'realism dövme',
    'black grey dövme',
    'color realism tattoo',
    'cover up dövme',
    'Beta Tattoo',
    'Ritim İstanbul dövme',
    'fine line dövme',
    'minimal dövme',
    'piercing',
    'Maltepe piercing',
    'İstanbul piercing',
  ],
  authors: [{ name: 'Beta Tattoo Studio' }],
  creator: 'Beta Tattoo Studio',
  publisher: 'Beta Tattoo Studio',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: 'Beta Tattoo Studio | Maltepe, İstanbul',
    description:
      "Maltepe'de realism, color realism, black & grey ve cover-up uzmanı dövme stüdyosu. Pişman olmayacağınız dövme.",
    url: siteUrl,
    siteName: 'Beta Tattoo Studio',
    type: 'website',
    locale: 'tr_TR',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Beta Tattoo Studio — Maltepe, İstanbul',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Beta Tattoo Studio | Maltepe, İstanbul',
    description:
      "Maltepe'de realism, color realism, black & grey ve cover-up uzmanı dövme stüdyosu.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Beta Tattoo Studio — Maltepe, İstanbul',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  other: {
    'geo.region': 'TR-34',
    'geo.placename': 'Maltepe, İstanbul',
    'geo.position': '40.9224;29.1577',
    'ICBM': '40.9224, 29.1577',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${playfair.variable} ${dmSans.variable} ${spaceMono.variable} ${permanentMarker.variable}`}
    >
      <head>
        <LocalBusinessSchema />
      </head>
      <body className="antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
