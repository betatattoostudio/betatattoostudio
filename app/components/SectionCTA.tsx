import { MessageCircle, Phone } from 'lucide-react';
import { whatsappHref } from '../lib/contact';
import { PHONE_URL } from '../lib/images';

export default function SectionCTA({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex flex-row items-center justify-center gap-3 w-full px-5 md:px-0 ${className}`}
    >
      <a
        href={PHONE_URL}
        className="btn-pill btn-light w-full md:w-auto text-center flex items-center justify-center gap-2"
      >
        <Phone size={15} strokeWidth={2} />
        Ara
      </a>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="btn-pill btn-outline w-full md:w-auto text-center flex items-center justify-center gap-2"
      >
        <MessageCircle size={15} strokeWidth={2} />
        WhatsApp
      </a>
    </div>
  );
}
