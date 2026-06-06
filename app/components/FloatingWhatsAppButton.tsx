'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { whatsappHref } from '../lib/contact';

export default function FloatingWhatsAppButton() {
  return (
    <motion.a
      href={whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp ile iletişime geç"
      className="fixed right-4 z-40 inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-[#07110a] shadow-[0_18px_48px_rgba(0,0,0,0.42)] md:hidden"
      style={{
        bottom: 'calc(1rem + env(safe-area-inset-bottom))',
        background: '#f5f5f0',
      }}
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.45, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileTap={{ scale: 0.96 }}
    >
      <MessageCircle size={17} strokeWidth={2} />
      <span>WhatsApp</span>
    </motion.a>
  );
}
