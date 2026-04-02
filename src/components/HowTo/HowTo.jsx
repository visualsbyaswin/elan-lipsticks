import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HowTo.css';

gsap.registerPlugin(ScrollTrigger);

export default function HowTo() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray('.routine-step');

      steps.forEach((step, i) => {
        gsap.fromTo(step, {
          opacity: 0.2,
          x: 40
        }, {
          opacity: 1,
          x: 0,
          scrollTrigger: {
            trigger: step,
            start: 'top 60%',
            end: 'top 30%',
            scrub: true,
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="howto-section" id="routine" ref={sectionRef}>
      <div className="howto-container">

        <div className="howto-left">
          <div className="howto-sticky-content">
            <span className="howto-eyebrow">The Ritual</span>
            <h2 className="howto-title">
              Three Steps To <br />
              <em>Brilliance</em>
            </h2>
            <p className="howto-desc">
              Achieve the perfect glass-like finish with our simple, effective application routine designed for maximum hydration and shine.
            </p>
          </div>
        </div>

        <div className="howto-right">
          <div className="routine-list">

            <div className="routine-step">
              <div className="step-number">01</div>
              <div className="step-content">
                <h3 className="step-title">Prepare</h3>
                <p className="step-text">Ensure lips are clean and gently exfoliated. The perfectly smooth canvas allows the hyaluronic acid to penetrate deeply and plump effectively.</p>
              </div>
            </div>

            <div className="routine-step">
              <div className="step-number">02</div>
              <div className="step-content">
                <h3 className="step-title">Glide</h3>
                <p className="step-text">Use the precision doe-foot applicator to sweep a generous layer of gloss across the bottom lip, pressing lips together to distribute evenly.</p>
              </div>
            </div>

            <div className="routine-step">
              <div className="step-number">03</div>
              <div className="step-content">
                <h3 className="step-title">Layer</h3>
                <p className="step-text">For an ultra-reflective glass effect, apply a second targeted drop to the center of the bottom and top lip. Wear alone or over your favorite lip color.</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
