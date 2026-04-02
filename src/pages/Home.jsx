import { useOutletContext } from 'react-router-dom';
import ScrollSequence from '../components/ScrollSequence/ScrollSequence';
import VideoBanner from '../components/VideoBanner/VideoBanner';
import Details from '../components/Details/Details';
import ProductShowcase from '../components/ProductShowcase/ProductShowcase';
import HowTo from '../components/HowTo/HowTo';
import Shades from '../components/Shades/Shades';
import Testimonials from '../components/Testimonials/Testimonials';
import CTA from '../components/CTA/CTA';

export default function Home() {
  const { loaded, setLoadProgress, setLoaded } = useOutletContext();

  return (
    <main className="home-page">
      <ScrollSequence loaded={loaded} setLoadProgress={setLoadProgress} setLoaded={setLoaded} />

      <Details />
    
      <ProductShowcase />
      <HowTo />
        <VideoBanner />
      <Shades />
      <Testimonials />
      <CTA />
    </main>
  );
}
