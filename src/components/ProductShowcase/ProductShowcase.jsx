import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import p1 from '../../assets/p1.jpg';
import p2 from '../../assets/p2.jpg';
import p3 from '../../assets/p3.jpg';
import p4 from '../../assets/p4.jpg';
import './ProductShowcase.css';

gsap.registerPlugin(ScrollTrigger);

export default function ProductShowcase() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo('.showcase-title-line',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.showcase-title', start: 'top 85%' }
        }
      );

      // Fade + slide-up reveal
      const wraps = gsap.utils.toArray('.showcase-img-wrap');
      wraps.forEach((wrap) => {
        gsap.fromTo(wrap,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: wrap, start: 'top 88%' }
          }
        );

        // Caption Reveal
        const caption = wrap.querySelector('.showcase-caption');
        if (caption) {
          gsap.fromTo(caption, { y: 20, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1, delay: 0.4, ease: 'power3.out',
            scrollTrigger: { trigger: wrap, start: 'top 88%' }
          });
        }
      });

      // Internal Image Scale Parallax
      const images = gsap.utils.toArray('.showcase-img-wrap img');
      images.forEach((img, i) => {
        gsap.fromTo(img, {
          scale: 1.3,
          yPercent: -15,
        }, {
          scale: 1,
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: img.parentNode,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="product-showcase" ref={containerRef}>
      <div className="showcase-header">
        <span className="showcase-eyebrow">Our Products</span>
        <h2 className="showcase-title">
          <span className="showcase-title-line">Curated for </span>
          <span className="showcase-title-line"><em>Excellence.</em></span>
        </h2>
      </div>

      <div className="showcase-gallery">
        <div className="showcase-img-wrap img-1">
          <div className="showcase-caption">
            <span className="sc-num">01</span>
            <span className="sc-name">Rose Glow</span>
          </div>
          <img src={p1} alt="Lip gloss product showcase 1" />
        </div>
        <div className="showcase-img-wrap img-2">
          <div className="showcase-caption">
            <span className="sc-num">02</span>
            <span className="sc-name">Clear Glass</span>
          </div>
          <img src={p2} alt="Lip gloss product showcase 2" />
        </div>
        <div className="showcase-img-wrap img-3">
          <div className="showcase-caption">
            <span className="sc-num">03</span>
            <span className="sc-name">Berry Tint</span>
          </div>
          <img src={p3} alt="Lip gloss product showcase 3" />
        </div>
        <div className="showcase-img-wrap img-4">
          <div className="showcase-caption">
            <span className="sc-num">04</span>
            <span className="sc-name">Nude Silk</span>
          </div>
          <img src={p4} alt="Lip gloss product showcase 4" />
        </div>
      </div>
    </section>
  );
}
