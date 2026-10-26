import HeroSlider from '@/components/home/HeroSlider';
import ClientsMarquee from '@/components/home/ClientsMarquee';
import ReferenceSolutions from '@/components/home/ReferenceSolutions';
import ProductMatrix from '@/components/home/ProductMatrix';
import PowernPark from '@/components/home/PowernPark';
import SectorsShowcase from '@/components/home/SectorsShowcase';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Testimonials from '@/components/home/Testimonials';
import VideoShowcase from '@/components/home/VideoShowcase';
import FaqSection from '@/components/home/FaqSection';
import CtaBanner from '@/components/home/CtaBanner';

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <ClientsMarquee />
      <ReferenceSolutions />
      <ProductMatrix />
      <PowernPark />
      <SectorsShowcase />
      <WhyChooseUs />
      <Testimonials />
      <VideoShowcase />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
