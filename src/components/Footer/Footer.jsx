import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.footer-section', {
        y: 40,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 90%',
          end: 'top 60%',
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer-section" id="contact" ref={containerRef}>
      <div className="footer-top">
        <div className="footer-brand-col">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span className="footer-brand">élan</span>
          </Link>
          <p className="footer-brand-sub">
            Hydrating Lip Gloss<br />
            A new standard in lip care.
          </p>
        </div>
        <div className="footer-links-col">
          <h4 className="footer-col-title">Explore</h4>
          <Link to="/story" className="footer-link hoverable">Our Story</Link>
          <Link to="/ingredients" className="footer-link hoverable">Ingredients</Link>
          <Link to="/reviews" className="footer-link hoverable">Reviews</Link>
        </div>
        <div className="footer-links-col">
          <h4 className="footer-col-title">Company</h4>
          <Link to="/about" className="footer-link hoverable">About</Link>
          <Link to="/sustainability" className="footer-link hoverable">Sustainability</Link>
          <Link to="/press" className="footer-link hoverable">Press</Link>
        </div>
        <div className="footer-links-col">
          <h4 className="footer-col-title">Connect</h4>
          <a href="#" className="footer-link hoverable">Instagram</a>
          <a href="#" className="footer-link hoverable">TikTok</a>
          <a href="#" className="footer-link hoverable">Newsletter</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 élan Beauty. All rights reserved.</span>
        <span className="footer-made">Made with intention.</span>
      </div>
    </footer>
  );
}
