import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Shades.css';

gsap.registerPlugin(ScrollTrigger);

const shades = [
  { id: '01', name: 'Clear Glass', hex: '#FFFFFF', desc: 'A pure, crystalline shine with zero color payoff. The ultimate top coat or natural enhancer.' },
  { id: '02', name: 'Dusty Rose', hex: '#D4708F', desc: 'Your lips but better. A soft, universally flattering muted pink for an effortless daytime glow.' },
  { id: '03', name: 'Deep Berry', hex: '#632135', desc: 'A sheer, sophisticated wash of blackberry hue. Adds depth and intrigue with a single swipe.' },
  { id: '04', name: 'Peachy Nude', hex: '#E29A86', desc: 'A warm, sun-kissed apricot tone that brightens the complexion and perfectly complements warmth.' },
];

export default function Shades() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const getScrollAmount = () => {
        return -(track.scrollWidth - window.innerWidth);
      };

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getScrollAmount() * -1}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });
      
      return () => {
        tween.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="shades-section" id="shades" ref={sectionRef}>
      <div className="shades-track" ref={trackRef}>
        
        <div className="shades-intro-panel">
          <span className="shades-eyebrow">The Palette</span>
          <h2 className="shades-title">
            Find Your <br/><em>Signature</em>
          </h2>
          <div className="scroll-indicator-horizontal">
            <span className="scroll-arrow">→</span>
            <span>Scroll</span>
          </div>
        </div>

        {shades.map((shade) => (
          <div className="shade-card" key={shade.id}>
            <div className="shade-color-display" style={{ backgroundColor: shade.hex }}>
              {shade.id === '01' && <div className="clear-glass-effect" />}
            </div>
            <div className="shade-details">
              <span className="shade-number">{shade.id}</span>
              <h3 className="shade-name">{shade.name}</h3>
              <p className="shade-desc">{shade.desc}</p>
            </div>
          </div>
        ))}
        
        {/* Empty padding at the end of scroll */}
        <div className="shades-padding-panel" />
      </div>
    </section>
  );
}
