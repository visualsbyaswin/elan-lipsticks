import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useOutletContext } from 'react-router-dom';
import formulaMacro from '../../assets/about_formula.jpg';
import './Ingredients.css';

gsap.registerPlugin(ScrollTrigger);

const masterIngredients = [
  {
    name: "Hyaluronic Acid Multi-Weight Matrix",
    detail: "Clinical-grade HA structured at three varying molecular weights. Low molecular weight penetrates deeply for structural plumping, while high molecular weight binds moisture at the surface.",
    percentage: "2.0%",
    benefit: "Hydration"
  },
  {
    name: "Squalane (Olive-Derived)",
    detail: "A bio-compatible lipid that mimics the skin's natural oils. It locks in the hydration provided by HA and creates an impenetrable barrier against environmental moisture loss.",
    percentage: "5.5%",
    benefit: "Barriers"
  },
  {
    name: "Vitamin E Acetate",
    detail: "A powerful antioxidant powerhouse that neutralizes free radicals and repairs oxidative stress caused by UV exposure and urban pollution.",
    percentage: "1.2%",
    benefit: "Protection"
  },
  {
    name: "Cold-Pressed Jojoba Oil",
    detail: "Rich in sterols and vitamins A, D, and E. Sourced sustainably, it conditions and softens the lip mucosa without the heavy, tacky feeling of synthetic silicones.",
    percentage: "12.0%",
    benefit: "Conditioning"
  }
];

export default function Ingredients() {
  const containerRef = useRef(null);
  const { loaded } = useOutletContext() || { loaded: true };

  useEffect(() => {
    if (!loaded) return;
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo('.ing-hero-title span', 
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, stagger: 0.15, ease: 'power4.out' }
      );

      // List Items
      gsap.utils.toArray('.ing-card').forEach((card, i) => {
        gsap.fromTo(card, 
          { y: 60, opacity: 0 },
          { 
            y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            }
          }
        );
      });

      // Parallax Macro Image
      gsap.to('.ing-parallax-img', {
        y: -150,
        ease: 'none',
        scrollTrigger: {
          trigger: '.ing-formula-intro',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, [loaded]);

  return (
    <main className="ingredients-page" ref={containerRef}>
      
      {/* Modern Clinical Hero */}
      <section className="ing-hero">
        <div className="ing-hero-content">
          <span className="sc-eyebrow reveal-up">The Formula</span>
          <h1 className="ing-hero-title">
            <span>Transparent.</span><br/>
            <span className="indent">Clinical.</span><br/>
            <span><em>Clean.</em></span>
          </h1>
        </div>
        <div className="ing-hero-visual">
          <div className="ing-img-frame reveal-up">
            <img src={formulaMacro} alt="Molecular Structure" className="ing-parallax-img" />
            <div className="ing-vignette" />
          </div>
        </div>
      </section>

      {/* Intro Statement */}
      <section className="ing-formula-intro">
        <div className="container-sm">
          <p className="ing-lead reveal-up">
            Constructed without compromise. We omit over 1,500 questionable compounds, relying instead on proven, clinical-grade actives that actively improve lip health while maintaining a mirror-like finish.
          </p>
        </div>
      </section>

      {/* Ingredient Glossary Grid */}
      <section className="ing-manifesto">
        <div className="container-md">
          <div className="ing-grid">
            {masterIngredients.map((ing, i) => (
              <div className="ing-card" key={i}>
                <div className="ing-card-header">
                  <span className="ing-num">0{i + 1}</span>
                  <span className="ing-benefit">{ing.benefit}</span>
                </div>
                <div className="ing-card-body">
                  <h2>{ing.name}</h2>
                  <p>{ing.detail}</p>
                </div>
                <div className="ing-card-footer">
                  <div className="ing-meter">
                    <div className="ing-meter-fill" style={{ width: ing.percentage }} />
                  </div>
                  <span className="ing-conc">Conc. {ing.percentage}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* The Blacklist (WOW Design) */}
      <section className="ing-blacklist">
        <div className="blacklist-container">
          <div className="blacklist-header reveal-up">
            <span className="sc-eyebrow white">Our Refusal</span>
            <h2 className="blacklist-title">The <em>Blacklist</em></h2>
          </div>
          <div className="blacklist-list reveal-up">
            <div className="b-item">NO PARABENS</div>
            <div className="b-item">NO PHTHALATES</div>
            <div className="b-item">NO SULFATES</div>
            <div className="b-item">NO MINERAL OIL</div>
            <div className="b-item">NO FORMALDEHYDE</div>
            <div className="b-item">NO SYNTHETIC FRAGRANCE</div>
          </div>
          <p className="blacklist-footer reveal-up">
            EU standard compliant. Scientifically screened. Consciously sourced.
          </p>
        </div>
      </section>

    </main>
  );
}
