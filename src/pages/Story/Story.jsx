import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useOutletContext } from 'react-router-dom';
import st1 from '../../assets/st1.jpg';
import st2 from '../../assets/st2.jpg';
import st3 from '../../assets/st3.jpg';
import './Story.css';

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  const containerRef = useRef(null);
  const { loaded } = useOutletContext() || { loaded: true };

  useEffect(() => {
    if (!loaded) return;
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Clean intro fade
      gsap.fromTo('.story-intro-title', 
        { opacity: 0, y: 40 }, 
        { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out', delay: 0.2 }
      );
      
      gsap.fromTo('.story-intro-text',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out', delay: 0.4 }
      );

      // Scroll staggered blocks
      const items = gsap.utils.toArray('.split-item');
      items.forEach(item => {
        const visual = item.querySelector('.split-visual');
        const content = item.querySelector('.split-content');
        
        gsap.fromTo(visual, { x: item.classList.contains('reverse') ? 60 : -60, opacity: 0 }, {
          x: 0, opacity: 1, duration: 1.5, ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 70%' }
        });

        gsap.fromTo(content, { x: item.classList.contains('reverse') ? -60 : 60, opacity: 0 }, {
          x: 0, opacity: 1, duration: 1.5, ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 70%' }
        });

        // Parallax on image inside frame
        const img = item.querySelector('.parallax-img');
        gsap.to(img, {
          y: -100,
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, [loaded]);

  return (
    <main className="story-page" ref={containerRef}>
      
      <section className="story-intro">
        <span className="story-eyebrow">Heritage</span>
        <h1 className="story-intro-title">Uncompromising Desire.</h1>
        <p className="story-intro-text">
          élan was born from a singular refusal: the refusal to choose between high-fashion aesthetics and active, nourishing skincare. 
        </p>
      </section>

      <section className="story-split-scroller">
        
        {/* Step 1 */}
        <div className="split-item">
          <div className="split-visual story-reveal">
            <div className="image-frame">
              <img src={st1} alt="The Catalyst" className="parallax-img" />
              <div className="vignette" />
            </div>
            <div className="floating-caption">01 — Catalyst</div>
          </div>
          <div className="split-content">
            <div className="content-inner">
              <span className="sc-eyebrow">The Journey</span>
              <h2 className="sc-title">Absolute Disruption</h2>
              <p className="sc-desc">
                For decades, lip gloss meant choosing between comfortable hydration and brilliant shine. The industry accepted that true glass-like reflection required heavy, sticky formulas. 
              </p>
              <p className="sc-para">
                We saw this not as a limitation, but as an opportunity. The catalyst was a simple question: why can't the most reflective surface also be the most nourishing?
              </p>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="split-item reverse">
          <div className="split-visual story-reveal">
            <div className="image-frame">
              <img src={st2} alt="Reformulation" className="parallax-img" />
              <div className="vignette" />
            </div>
            <div className="floating-caption">02 — Formula</div>
          </div>
          <div className="split-content">
            <div className="content-inner">
              <span className="sc-eyebrow">The Science</span>
              <h2 className="sc-title">Molecule by Molecule</h2>
              <p className="sc-desc">
                We spent three years in our Parisian laboratory, challenging every convention of cosmetic chemistry. 
              </p>
              <p className="sc-para">
                By stripping away cheap synthetic fillers and replacing them with clinical-grade active moisturizers like hyaluronic acid, we unlocked a new matrix—capable of suspending light while flooding the skin with moisture.
              </p>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="split-item">
          <div className="split-visual story-reveal">
            <div className="image-frame">
              <img src={st3} alt="Philosophy" className="parallax-img" />
              <div className="vignette" />
            </div>
            <div className="floating-caption">03 — Impact</div>
          </div>
          <div className="split-content">
            <div className="content-inner">
              <span className="sc-eyebrow">The Mission</span>
              <h2 className="sc-title">Quiet Confidence</h2>
              <p className="sc-desc">
                Luxury is the absence of compromise. It is the invisible effort that makes something look and feel effortless. 
              </p>
              <p className="sc-para">
                At élan, we exist to elevate the fundamental rituals of everyday beauty into moments of profound self-care. It's not just about a gloss; it's about the confidence that comes from clarity.
              </p>
            </div>
          </div>
        </div>

      </section>
      
    </main>
  );
}
