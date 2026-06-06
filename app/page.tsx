import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ArtistSection from './components/ArtistSection';
import PolaroidBoard from './components/PolaroidBoard';
import ProcessSection from './components/ProcessSection';
import StylesSection from './components/StylesSection';
import ReviewsSection from './components/ReviewsSection';
import QuoteSection from './components/QuoteSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';

export default function Home() {
  return (
    <main className="bg-[var(--bg)] text-[var(--fg)] overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <PolaroidBoard />
      <ArtistSection />
      <StylesSection />
      <ProcessSection />
      <ReviewsSection />
      <QuoteSection />
      <ContactSection />
      <Footer />
      <FloatingWhatsAppButton />
    </main>
  );
}
