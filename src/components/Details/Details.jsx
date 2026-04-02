import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Details.css';

gsap.registerPlugin(ScrollTrigger);

export default function Details() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.details-section', {
        opacity: 0,
      }, {
        opacity: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'top 40%',
          scrub: 1,
        },
      });

      gsap.utils.toArray('.detail-card').forEach((card) => {
        gsap.fromTo(card, {
          y: 60,
          opacity: 0,
        }, {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 55%',
            scrub: 1,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="details-section" id="details" ref={containerRef}>
      <div className="details-header">
        <span className="details-eyebrow">Key Ingredients</span>
        <h2 className="details-title">
          What's <em>Inside</em>
        </h2>
      </div>
      <div className="details-grid">
        <div className="detail-card hoverable" id="ingredient-ha">
          <div className="detail-icon">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" />
              <path d="M24 14C24 14 18 20 18 26C18 29.3137 20.6863 32 24 32C27.3137 32 30 29.3137 30 26C30 20 24 14 24 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="detail-name">Hyaluronic Acid</h3>
          <p className="detail-desc">
            Attracts and retains moisture, plumping lips for a fuller, smoother appearance.
          </p>
        </div>
        <div className="detail-card hoverable" id="ingredient-ve">
          <div className="detail-icon">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" />
              <path d="M24 16L26 22H32L27 26L29 32L24 28L19 32L21 26L16 22H22L24 16Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="detail-name">Vitamin E</h3>
          <p className="detail-desc">
            A powerful antioxidant that protects and nourishes delicate lip skin from environmental stress.
          </p>
        </div>
        <div className="detail-card hoverable" id="ingredient-jo">
          <div className="detail-icon">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" />
              <path d="M20 18C20 18 16 24 20 30M28 18C28 18 32 24 28 30M24 16V32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="detail-name">Jojoba Oil</h3>
          <p className="detail-desc">
            Mimics the skin's natural oils to deeply condition and soften without clogging pores.
          </p>
        </div>
        <div className="detail-card hoverable" id="ingredient-sh">
          <div className="detail-icon">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" />
              <ellipse cx="24" cy="24" rx="8" ry="10" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M18 20C20 22 28 22 30 20" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
            </svg>
          </div>
          <h3 className="detail-name">Shea Butter</h3>
          <p className="detail-desc">
            Rich in fatty acids and vitamins, creating a protective barrier for long-lasting hydration.
          </p>
        </div>
      </div>
    </section>
  );
}
