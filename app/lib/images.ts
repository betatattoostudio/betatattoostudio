const ASSET_VERSION = '20261005-kiyarash';

const asset = (path: string) => `/assets/website/${path}?v=${ASSET_VERSION}`;

export const teamImages = [
  {
    src: asset('team/hakan.webp'),
    alt: 'Hakan — Realism ve Black & Grey dövme sanatçısı, Beta Tattoo Studio Maltepe',
  },
  {
    src: asset('team/kiyarash.webp'),
    alt: 'Kiyarash — Black & Grey Realism dövme sanatçısı, Beta Tattoo Studio Maltepe',
  },
  {
    src: asset('team/erdinc.webp'),
    alt: 'Erdinç — Color Realism ve Cover-Up uzmanı, Beta Tattoo Studio Maltepe',
  },
];

export const studioInteriorImages = [
  {
    src: asset('studio/interior/img-3557.webp'),
    alt: 'Beta Tattoo Studio stüdyo atmosferi — Maltepe dövme stüdyosu',
  },
  {
    src: asset('studio/interior/IMG_9286.JPG'),
    alt: 'Beta Tattoo Studio seans koltuğu ve aydınlatma',
  },
  {
    src: asset('studio/interior/IMG_9288.JPG'),
    alt: 'Beta Tattoo Studio iç mekan detay — profesyonel dövme stüdyosu',
  },
  {
    src: asset('studio/interior/IMG_9291.JPG'),
    alt: 'Beta Tattoo Studio seans alanı — Ritim İstanbul, Maltepe',
  },
  {
    src: asset('studio/interior/IMG_9294.JPG'),
    alt: 'Beta Tattoo Studio çalışma ortamı — hijyenik ve steril alan',
  },
  {
    src: asset('studio/interior/IMG_9298.JPG'),
    alt: 'Beta Tattoo Studio stüdyo detayları — Maltepe, İstanbul',
  },
];

export const kiyarashGallery = [
  {
    src: asset('tattoos/realistic/kiyarash-01.webp'),
    alt: 'Valkyrie portre black & grey realism dövme — Kiyarash, Beta Tattoo Studio Maltepe',
  },
  {
    src: asset('tattoos/realistic/kiyarash-02.webp'),
    alt: 'Melek ve şeytan black & grey realism kol dövmesi — Kiyarash, Beta Tattoo Studio',
  },
  {
    src: asset('tattoos/realistic/kiyarash-03.webp'),
    alt: 'Kurt ve kartal realism omuz dövmesi — Kiyarash, Beta Tattoo Studio İstanbul',
  },
  {
    src: asset('tattoos/realistic/kiyarash-04.webp'),
    alt: 'Dalgıç ve batık gemi black & grey dövme — Kiyarash, Beta Tattoo Studio Maltepe',
  },
  {
    src: asset('tattoos/realistic/kiyarash-05.webp'),
    alt: 'Geyşa ve maske realism bacak dövmesi — Kiyarash, Beta Tattoo Studio',
  },
  {
    src: asset('tattoos/realistic/kiyarash-06.webp'),
    alt: 'Kanatlı portre ve güneş realism ön kol dövmesi — Kiyarash, Beta Tattoo Studio',
  },
  {
    src: asset('tattoos/realistic/kiyarash-07.webp'),
    alt: 'Aslan ve geometrik realism baldır dövmesi — Kiyarash, Beta Tattoo Studio İstanbul',
  },
  {
    src: asset('tattoos/realistic/kiyarash-08.webp'),
    alt: 'Gözü bağlı kadın portre realism dövme — Kiyarash, Beta Tattoo Studio Maltepe',
  },
  {
    src: asset('tattoos/realistic/kiyarash-09.webp'),
    alt: 'Stadyum ve deniz feneri black & grey ön kol dövmesi — Kiyarash, Beta Tattoo Studio',
  },
];

export const realismGallery = [
  ...kiyarashGallery,
  {
    src: asset('tattoos/realistic/img-6023.webp'),
    alt: 'Realism portre dövme — Beta Tattoo Studio Maltepe',
  },
  {
    src: asset('tattoos/realistic/img-7901-original.webp'),
    alt: 'Gerçekçi hayvan realism dövme — Hakan, Beta Tattoo Studio',
  },
  {
    src: asset('tattoos/realistic/img-9094.webp'),
    alt: 'Realism dövme detay çalışması — Beta Tattoo Studio İstanbul',
  },
  {
    src: asset('tattoos/realistic/img-0054.webp'),
    alt: 'Black & grey realism dövme — Beta Tattoo Studio Maltepe',
  },
  {
    src: asset('tattoos/realistic/img-0497.webp'),
    alt: 'Realism portre dövme, kol — Beta Tattoo Studio',
  },
  {
    src: asset('tattoos/realistic/img-0440.webp'),
    alt: 'Gerçekçi realism dövme çalışması — Hakan, Maltepe',
  },
  {
    src: asset('tattoos/realistic/img-8022-vsco.webp'),
    alt: 'Realism dövme gölge ve doku detayı — Beta Tattoo Studio',
  },
  {
    src: asset('tattoos/realistic/img-7429.webp'),
    alt: 'Realism dövme ön kol — Beta Tattoo Studio Maltepe İstanbul',
  },
  {
    src: asset('tattoos/realistic/img-2784.webp'),
    alt: 'Gerçekçi portre realism dövme — Beta Tattoo Studio',
  },
];

export const colorGallery = [
  {
    src: asset('tattoos/color/img-7625.webp'),
    alt: 'Color realism dövme — canlı renkli çalışma, Beta Tattoo Studio',
  },
  {
    src: asset('tattoos/color/img-5755.webp'),
    alt: 'Renkli realism dövme — Erdinç, Beta Tattoo Studio Maltepe',
  },
  {
    src: asset('tattoos/color/img-5963.webp'),
    alt: 'Color realism dövme detayı — Beta Tattoo Studio İstanbul',
  },
  {
    src: asset('tattoos/color/img-2743-original.webp'),
    alt: 'Canlı renkli realism dövme çalışması — Beta Tattoo Studio',
  },
  {
    src: asset('tattoos/color/img-5082.webp'),
    alt: 'Color realism dövme, kol — Erdinç, Beta Tattoo Studio Maltepe',
  },
  {
    src: asset('tattoos/color/img-7198-original.webp'),
    alt: 'Renkli realism portre dövme — Beta Tattoo Studio İstanbul',
  },
  {
    src: asset('tattoos/color/img-3806-original.webp'),
    alt: 'Color realism dövme — kalıcı canlı renkler, Beta Tattoo Studio',
  },
  {
    src: asset('tattoos/color/img-4154-original.webp'),
    alt: 'Color realism dövme çalışması — Maltepe dövme stüdyosu',
  },
  {
    src: asset('tattoos/color/img-8330.webp'),
    alt: 'Renkli realism dövme detay — Beta Tattoo Studio Maltepe',
  },
  {
    src: asset('tattoos/color/img-8084.webp'),
    alt: 'Color realism dövme arka kol — Beta Tattoo Studio İstanbul',
  },
  {
    src: asset('tattoos/color/img-6332.webp'),
    alt: 'Canlı renk realism dövme — Erdinç, Beta Tattoo Studio',
  },
];

export const minimalGallery = [
  {
    src: asset('tattoos/minimal/img-8298.webp'),
    alt: 'Minimalist ince çizgi dövme — Beta Tattoo Studio Maltepe',
  },
  {
    src: asset('tattoos/minimal/img-3068.webp'),
    alt: 'Minimal dövme tasarımı — Beta Tattoo Studio İstanbul',
  },
  {
    src: asset('tattoos/minimal/img-7505.webp'),
    alt: 'Sade minimal dövme, bilek — Beta Tattoo Studio Maltepe',
  },
  {
    src: asset('tattoos/minimal/img-7514.webp'),
    alt: 'İnce çizgi minimal dövme — Beta Tattoo Studio İstanbul',
  },
  {
    src: asset('tattoos/minimal/img-8383.webp'),
    alt: 'Minimalist dövme çalışması — Beta Tattoo Studio',
  },
  {
    src: asset('tattoos/minimal/img-8496.webp'),
    alt: 'Minimal fine line dövme detayı — Beta Tattoo Studio Maltepe',
  },
];

export const lineworkGallery = [
  {
    src: asset('tattoos/linework/img-8516.webp'),
    alt: 'Linework geometrik dövme — Beta Tattoo Studio Maltepe',
  },
  {
    src: asset('tattoos/linework/img-4997-jpg.webp'),
    alt: 'Temiz çizgi linework dövme — Beta Tattoo Studio İstanbul',
  },
  {
    src: asset('tattoos/linework/dscf3161.webp'),
    alt: 'Çizgisel botanik dövme — Beta Tattoo Studio Maltepe',
  },
  {
    src: asset('tattoos/linework/dscf2654.webp'),
    alt: 'Linework grafik dövme tasarımı — Beta Tattoo Studio',
  },
  {
    src: asset('tattoos/linework/dscf2465.webp'),
    alt: 'İnce linework dövme detayı — Beta Tattoo Studio İstanbul',
  },
  {
    src: asset('tattoos/linework/img-0087.webp'),
    alt: 'Geometrik linework dövme, kol — Beta Tattoo Studio Maltepe',
  },
  {
    src: asset('tattoos/linework/img-7677.webp'),
    alt: 'Çizgisel kompozisyon dövme — Beta Tattoo Studio',
  },
];

export const coverUpGallery = [
  {
    src: asset('tattoos/cover-up/img-8925.webp'),
    alt: 'Cover up dövme — eski dövme kapatma, Beta Tattoo Studio Maltepe',
  },
  {
    src: asset('tattoos/cover-up/img-5736.webp'),
    alt: 'Cover up dövme öncesi ve sonrası — Erdinç, Beta Tattoo Studio',
  },
  {
    src: asset('tattoos/cover-up/img-7119.webp'),
    alt: 'Dövme kapatma çalışması — Beta Tattoo Studio İstanbul',
  },
  {
    src: asset('tattoos/cover-up/img-1371.webp'),
    alt: 'Cover up realism dövme dönüşümü — Beta Tattoo Studio Maltepe',
  },
  {
    src: asset('tattoos/cover-up/img-7995.webp'),
    alt: 'Eski dövme üstü kapama çalışması — Beta Tattoo Studio',
  },
  {
    src: asset('tattoos/cover-up/img-1473.webp'),
    alt: 'Cover up dövme tasarımı — Erdinç, Beta Tattoo Studio İstanbul',
  },
  {
    src: asset('tattoos/cover-up/img-1700.webp'),
    alt: 'Cover up dövme sonuç — yeniden tasarlanmış çalışma, Beta Tattoo Studio',
  },
];

export const heroImages = [
  kiyarashGallery[2],
  colorGallery[0],
  kiyarashGallery[1],
  lineworkGallery[0],
  kiyarashGallery[0],
  kiyarashGallery[3],
  colorGallery[1],
  kiyarashGallery[6],
  coverUpGallery[0],
];

export const artistPortrait = teamImages[0].src;
export const artistEnvironment = studioInteriorImages[0].src;

export const polaroidImages = studioInteriorImages.map((img) => ({
  src: img.src,
}));

export const styleGalleries: Record<string, { src: string; alt: string }[]> = {
  realism: realismGallery,
  'color-realism': colorGallery,
  minimal: minimalGallery,
  linework: lineworkGallery,
  'cover-up': coverUpGallery,
};

export const INSTAGRAM_URL = 'https://instagram.com/betatattoo.studio';
export const INSTAGRAM_DM = 'https://ig.me/m/betatattoo.studio';
export const WHATSAPP_URL = 'https://wa.me/905369410087';
export const PHONE_NUMBER = '+905369410087';
export const PHONE_URL = `tel:${PHONE_NUMBER}`;
export const STUDIO_ADDRESS =
  'Cevizli Mah., Zuhal Cad. No:46/1, Ritim İstanbul Sitesi, A1 Ticari Blok, Ofis No:368, Maltepe / İstanbul';
