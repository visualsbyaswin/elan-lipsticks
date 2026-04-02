import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import aetVideo from '../../assets/aet.mp4';
import './VideoBanner.css';

gsap.registerPlugin(ScrollTrigger);

export default function VideoBanner() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gentle cinematic parallax effect (scales down and moves slightly)
      gsap.to(videoRef.current, {
        y: '10vh',
        scale: 1.15,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
      
      // Floating text reveal
      gsap.fromTo('.video-banner-text', 
        { opacity: 0, y: 60 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="video-banner-section" ref={containerRef}>
      <div className="video-banner-parallax-wrapper">
        <video 
          ref={videoRef}
          src={aetVideo} 
          className="video-banner-media"
          autoPlay 
          loop 
          muted 
          playsInline 
        />
        <div className="video-banner-overlay" />
      </div>
      
      <div className="video-banner-content">
        <h2 className="video-banner-text">
          <span>The True</span><br/>
          <em>Aesthetic</em>
        </h2>
      </div>
    </section>
  );
}
