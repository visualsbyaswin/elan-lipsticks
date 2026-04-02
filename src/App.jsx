import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { Outlet, useLocation } from 'react-router-dom';
import Cursor from './components/Cursor/Cursor';
import Preloader from './components/Preloader/Preloader';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Scroll to top on route change
    lenis.scrollTo(0, { immediate: true });

    return () => {

      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, [location.pathname]);

  return (
    <div className="app">
      <Cursor loaded={loaded} />
      {/* Run global preloader only on home route if needed, 
          but simpler to just keep it globally tied to loaded state */}
      {location.pathname === '/' && <Preloader loaded={loaded} loadProgress={loadProgress} />}
      
      <Navigation />
      
      <Outlet context={{ loaded, setLoadProgress, setLoaded }} />
      
      <Footer />
    </div>
  );
}

export default App;
