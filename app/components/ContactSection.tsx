'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../lib/motion';
import SectionCTA from './SectionCTA';

// Replace this URL with the actual embed code from:
// Google Maps → share → Embed a map → copy src URL
const MAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d744.6684267918538!2d29.157735992254896!3d40.922396675975996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab99f99ae72f5%3A0xa239143198045d21!2sBeta%20Tattoo%20D%C3%B6vme%20ve%20Piercing%20Studio!5e0!3m2!1str!2str!4v1779729529335!5m2!1str!2str';

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative w-full"
      style={{
        paddingTop: 'var(--section-py)',
        paddingBottom: 'var(--section-py)',
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: 'var(--container-max)',
          padding: '0 var(--container-px)',
        }}
      >
        {/* Heading + CTA */}
        <motion.div
          className="text-center"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.h2
            variants={fadeUp}
            className="font-display leading-[1.05]"
            style={{ fontSize: 'var(--text-section)', fontWeight: 600 }}
          >
            Kalıcı Bir Şey <br /> Yaratalım.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-md text-[var(--muted)]"
          >
            Randevu ve tasarım süreci yalnızca WhatsApp üzerinden ilerler.
            Fikrinizi gönderin, detayları birlikte netleştirelim.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9">
            <SectionCTA />
          </motion.div>
        </motion.div>

        {/* Google Maps */}
        <div
          className="mt-14 md:mt-18 w-full overflow-hidden"
          style={{
            borderRadius: 20,
            border: '1px solid var(--border)',
            height: 'clamp(280px, 40vw, 480px)',
          }}
        >
          <iframe
            src={MAPS_EMBED_URL}
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Beta Tattoo Studio konum"
          />
        </div>
      </div>
    </section>
  );
}
