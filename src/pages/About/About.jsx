import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useOutletContext } from 'react-router-dom';
import aboutLab from '../../assets/about_lab.jpg';
import aboutFormula from '../../assets/about_formula.jpg';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);
  const { loaded } = useOutletContext() || { loaded: true };

  useEffect(() => {
    if (!loaded) return;
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.fromTo('.about-hero-title span',
        { y: 100, skewY: 7 },
        { y: 0, skewY: 0, duration: 1.5, stagger: 0.1, ease: 'power4.out', delay: 0.2 }
      );

      gsap.fromTo('.hero-visual',
        { clipPath: 'inset(100% 0% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.8, ease: 'expo.inOut', delay: 0.1 }
      );

      // Scroll reveals
      const scrollItems = gsap.utils.toArray('.reveal-up');
      scrollItems.forEach(item => {
        gsap.fromTo(item,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            }
          }
        );
      });

      // Special sticky parallax for Studio image
      gsap.to('.studio-parallax', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.studio-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      // Quote BG parallax
      gsap.to('.quote-bg-text', {
        x: -200,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-quote-immersive',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [loaded]);

  return (
    <main className="about-page" ref={containerRef}>

      {/* Cinematic Hero */}
      <section className="about-hero">
        <div className="hero-visual">
          <img src={aboutLab} alt="élan Studio" className="hero-img" />
          <div className="hero-overlay" />
        </div>
        <div className="hero-text-floating">
          <span className="sc-eyebrow white">Founded in Paris</span>
          <h1 className="about-hero-title">
            <span>Beyond</span><br />
            <span className="indent">Surface</span>
          </h1>
        </div>
      </section>

      {/* The Studio Section (Asymmetric) */}
      <section className="studio-section">
        <div className="studio-grid">
          <div className="studio-left reveal-up">
            <span className="sc-eyebrow">The Studio</span>
            <h2 className="studio-title">Where Science <br /><em>Meets Art</em></h2>
            <p className="studio-desc">
              Operating out of a modernist lab in the heart of Le Marais, we are a collective of chemists and designers dedicated to one goal: the absolute perfection of lip care.
            </p>
            <div className="studio-stats">
              <div className="stat">
                <strong>2023</strong>
                <span>Est.</span>
              </div>
              <div className="stat">
                <strong>3rd Arr.</strong>
                <span>Paris</span>
              </div>
              <div className="stat">
                <strong>03</strong>
                <span>Clinical Pat.</span>
              </div>
            </div>
          </div>
          <div className="studio-right">
            <div className="parallax-frame">
              <img src={aboutFormula} alt="The Formula" className="studio-parallax" />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy (Layered Cards) */}
      <section className="philosophy-wow">
        <div className="container-md">
          <div className="philosophy-header reveal-up">
            <span className="sc-eyebrow">Our Philosophy</span>
            <h2 className="sc-title">Essential <em>Integrity</em></h2>
          </div>

          <div className="phil-cards">
            <div className="phil-card reveal-up">
              <span className="phil-num">01</span>
              <h3>Intentionality</h3>
              <p>Every molecule in our formula serves a purpose. We don't believe in fillers—only functional, high-performance ingredients that actively improve skin health while providing a mirror-like finish.</p>
            </div>
            <div className="phil-card reveal-up" style={{ transitionDelay: '0.2s' }}>
              <span className="phil-num">02</span>
              <h3>Transparency</h3>
              <p>From the sourcing of our cold-pressed jojoba oil to our biodegradable outer packaging, we maintain a transparent supply chain. We want you to know exactly what you're putting on your skin.</p>
            </div>
            <div className="phil-card reveal-up" style={{ transitionDelay: '0.4s' }}>
              <span className="phil-num">03</span>
              <h3>Simplicity</h3>
              <p>Beauty should be effortless. We design multi-functional products that simplify your routine, allowing your natural radiance to remain the focus of every look.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Quote Section */}
      <section className="about-quote-immersive">
        <div className="quote-bg-text">CLARITY</div>
        <div className="container-md">
          <div className="quote-container reveal-up">
            <div className="decorative-mark">“</div>
            <h2 className="quote-text-large">
              We aren't just making <em>gloss</em>; we are architecting moments of <em>clarity</em> in an over-cluttered landscape.
            </h2>
            <div className="quote-attribution">
              <div className="author-line" />
              <span className="author-name">The Founders</span>
              <span className="author-role">Paris Studio — 2024</span>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
