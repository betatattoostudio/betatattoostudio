import { WHATSAPP_URL } from './images';

export const whatsappMessage = encodeURIComponent(
  [
    'Merhaba Beta Tattoo Studio, randevu almak istiyorum.',
    '',
    'Dövme fikrim:',
    'Uygulama bölgesi:',
    'Yaklaşık boyut:',
    'Referans görselleri paylaşacağım.',
  ].join('\n'),
);

export const whatsappHref = `${WHATSAPP_URL}?text=${whatsappMessage}`;
