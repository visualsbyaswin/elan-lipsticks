import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollSequence.css';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 252;
const FRAME_PATH = (i) => `${import.meta.env.BASE_URL}sequence/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;

export default function ScrollSequence({ loaded, setLoadProgress, setLoaded }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const frameIndexRef = useRef({ value: 0 });

  useEffect(() => {
    if (imagesRef.current.length > 0) return; // Prevent double load in StrictMode

    let loadedCount = 0;
    const images = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      
      const handleLoad = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
        if (loadedCount === FRAME_COUNT) {
          setLoaded(true);
        }
      };

      if (img.decode) {
        img.decode().then(handleLoad).catch(handleLoad);
      } else {
        img.onload = handleLoad;
      }
      
      images.push(img);
    }
    imagesRef.current = images;
  }, [setLoaded, setLoadProgress]);

  const renderFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = imagesRef.current[index];
    if (!img) return;

    const dpr = window.devicePixelRatio || 1;
    const newWidth = canvas.offsetWidth * dpr;
    const newHeight = canvas.offsetHeight * dpr;

    if (canvas.width !== newWidth || canvas.height !== newHeight) {
      canvas.width = newWidth;
      canvas.height = newHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const scale = Math.max(
      canvas.width / img.width,
      canvas.height / img.height
    );
    const w = img.width * scale;
    const h = img.height * scale;
    const x = (canvas.width - w) / 2;
    const y = (canvas.height - h) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(img, x, y, w, h);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    renderFrame(0);

    const ctx = gsap.context(() => {
      gsap.to(frameIndexRef.current, {
        value: FRAME_COUNT - 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          onUpdate: () => {
            renderFrame(Math.round(frameIndexRef.current.value));
          },
        },
      });

      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: '+=40%',
          scrub: 1,
        },
      });

      heroTl
        .fromTo('.hero-brand', { y: 0, opacity: 1 }, { y: -120, opacity: 0 }, 0)
        .fromTo('.hero-tagline', { y: 0, opacity: 1 }, { y: -80, opacity: 0 }, 0.1)
        .fromTo('.hero-scroll-hint', { opacity: 1 }, { opacity: 0 }, 0);


    }, containerRef);

    return () => ctx.revert();
  }, [loaded, renderFrame]);

  useEffect(() => {
    const handleResize = () => {
      if (loaded) renderFrame(Math.round(frameIndexRef.current.value));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [loaded, renderFrame]);

  return (
    <div className="scroll-sequence" ref={containerRef}>
      <div className="canvas-container">
        <canvas ref={canvasRef} className="sequence-canvas" id="product-canvas" />

        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-brand">
              <span className="hero-brand-e">é</span>lan
            </h1>
            <p className="hero-tagline">
              Hydrating Lip Gloss
            </p>
            <div className="hero-scroll-hint">
              <div className="scroll-line" />
              <span className="scroll-text">Scroll to explore</span>
            </div>
          </div>
        </div>

        <div className="story-overlay">
          <div className="story-panel story-panel--left" id="story">
            <div className="story-text">
              <span className="story-eyebrow">The Formula</span>
              <h2 className="story-heading">
                Effortless<br />
                <em>Radiance</em>
              </h2>
              <div className="story-accent" />
              <p className="story-body">
                A weightless, non-sticky formula infused with
                hyaluronic acid and vitamin E. Designed to
                hydrate, plump, and deliver a luminous glass-like finish.
              </p>
            </div>
          </div>

          <div className="story-panel story-panel--right">
            <div className="story-text">
              <span className="story-eyebrow">The Application</span>
              <h2 className="story-heading">
                One Stroke.<br />
                <em>Perfection.</em>
              </h2>
              <div className="story-accent" />
              <p className="story-body">
                The precision doe-foot applicator delivers
                the perfect amount of gloss in a single, satisfying sweep.
                Build for intensity or wear alone for a natural sheen.
              </p>
            </div>
          </div>

          <div className="story-panel story-panel--center">
            <div className="story-text">
              <span className="story-eyebrow">The Experience</span>
              <h2 className="story-heading">
                Beauty That<br />
                <em>Feels Right</em>
              </h2>
              <div className="story-accent" />
              <p className="story-body">
                Clean. Vegan. Cruelty-free. Every shade is formulated
                with intention — because what you put on your skin
                should be as beautiful as how it makes you feel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
