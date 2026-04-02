import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Testimonials.css';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "The holy grail of lip hydration. It feels like nothing but looks like absolutely everything.",
    author: "Vogue Beauty",
    role: "Editor's Pick"
  },
  {
    quote: "A masterclass in modern luxury. The shine is unreal, yet it never feels sticky or heavy.",
    author: "Harper's Bazaar",
    role: "Beauty Awards 2026"
  },
  {
    quote: "Finally, a gloss that actually treats your lips while providing an unparalleled glass-like finish.",
    author: "Allure",
    role: "Must-Have"
  }
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent(c => (c === testimonials.length - 1 ? 0 : c + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent(c => (c === 0 ? testimonials.length - 1 : c - 1));
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current, {
        opacity: 0,
        y: 60
      }, {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'top 40%',
          scrub: 1,
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="testimonials-section" ref={sectionRef}>
      <div className="testimonials-wrapper">
        <button className="slider-nav prev hoverable" onClick={prevSlide} aria-label="Previous testimonial">
          <svg viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        
        <div className="slider-viewport">
          {testimonials.map((t, index) => {
            const isActive = index === current;
            return (
              <div 
                className={`testimonial-slide ${isActive ? 'active' : ''}`} 
                key={index}
                aria-hidden={!isActive}
              >
                <div className="quote-mark">"</div>
                <h3 className="testimonial-quote">{t.quote}</h3>
                <div className="testimonial-author-block">
                  <span className="testimonial-author">{t.author}</span>
                  <span className="testimonial-role">{t.role}</span>
                </div>
              </div>
            );
          })}
        </div>

        <button className="slider-nav next hoverable" onClick={nextSlide} aria-label="Next testimonial">
          <svg viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      <div className="slider-dots">
        {testimonials.map((_, index) => (
          <button 
            key={index} 
            className={`slider-dot hoverable ${index === current ? 'active' : ''}`}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
