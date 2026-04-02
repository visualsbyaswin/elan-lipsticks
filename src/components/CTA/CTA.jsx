import { Link } from 'react-router-dom';
import './CTA.css';

export default function CTA() {
  return (
    <section className="cta-band">
      <div className="cta-inner">
        <h2 className="cta-heading">
          Ready to <em>Glow</em>?
        </h2>
        <p className="cta-subtext">
          Join thousands who've made élan their go-to.
        </p>
        <Link to="/contact" className="cta-button hoverable" id="cta-shop-btn" style={{ textDecoration: 'none' }}>
          <span>Shop Now — $24</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </section>
  );
}
