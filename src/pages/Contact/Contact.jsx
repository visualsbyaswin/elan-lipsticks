import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef(null);
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text reveal
      gsap.fromTo('.contact-hero-eyebrow', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 });
      gsap.fromTo('.contact-hero-title', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.4 });
      gsap.fromTo('.contact-hero-sub', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.6 });

      // Info cards stagger in
      gsap.fromTo('.contact-info-card', { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-info-grid', start: 'top 80%' }
      });

      // Form reveal
      gsap.fromTo('.contact-form-wrap', { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-form-wrap', start: 'top 80%' }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="contact-page" ref={containerRef}>
      {/* Hero */}
      <section className="contact-hero">
        <div className="contact-hero-bg" />
        <div className="contact-hero-content">
          <span className="contact-hero-eyebrow">Get In Touch</span>
          <h1 className="contact-hero-title">
            We'd Love to<br />
            <em>Hear From You</em>
          </h1>
          <p className="contact-hero-sub">
            Questions, wholesale enquiries, press, or just want to say hello — we're here for all of it.
          </p>
        </div>
        <div className="contact-hero-deco" />
      </section>

      {/* Info Cards */}
      <section className="contact-info-section">
        <div className="contact-info-grid">
          <div className="contact-info-card">
            <div className="contact-card-icon">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" />
                <path d="M16 18h16v12a2 2 0 01-2 2H18a2 2 0 01-2-2V18z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M16 18l8 7 8-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="contact-card-title">Email Us</h3>
            <p className="contact-card-text">hello@elanbeauty.com</p>
            <p className="contact-card-note">We reply within 24 hours</p>
          </div>

          <div className="contact-info-card">
            <div className="contact-card-icon">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" />
                <path d="M24 14C20.686 14 18 16.686 18 20c0 5 6 14 6 14s6-9 6-14c0-3.314-2.686-6-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="24" cy="20" r="2" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <h3 className="contact-card-title">Visit Us</h3>
            <p className="contact-card-text">12 Beaumont Sq, London</p>
            <p className="contact-card-note">Mon–Fri, 10am – 6pm</p>
          </div>

          <div className="contact-info-card">
            <div className="contact-card-icon">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" />
                <path d="M18 20c0 0 1.5 3 3 4.5 1.5 1.5 4.5 3 4.5 3l3-3-3-3-1.5 1.5S22.5 21 21 19.5L22.5 18l-3-3-1.5 5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="contact-card-title">Call Us</h3>
            <p className="contact-card-text">+44 20 7123 4567</p>
            <p className="contact-card-note">Weekdays only</p>
          </div>

          <div className="contact-info-card">
            <div className="contact-card-icon">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" />
                <rect x="15" y="18" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M19 22h2M19 26h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="contact-card-title">Press & Wholesale</h3>
            <p className="contact-card-text">trade@elanbeauty.com</p>
            <p className="contact-card-note">Media kits available</p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-form-section">
        <div className="contact-form-wrap">
          <div className="contact-form-left">
            <span className="form-eyebrow">Send a Message</span>
            <h2 className="form-title">
              Let's Start a<br /><em>Conversation</em>
            </h2>
            <p className="form-desc">
              Whether it's about a product, a collaboration, or just sharing some love — drop us a note and we'll be in touch soon.
            </p>
            <div className="form-deco-line" />
            <div className="form-social-row">
              <a href="#" className="form-social-link hoverable">Instagram</a>
              <span className="form-social-dot">·</span>
              <a href="#" className="form-social-link hoverable">TikTok</a>
              <span className="form-social-dot">·</span>
              <a href="#" className="form-social-link hoverable">Pinterest</a>
            </div>
          </div>

          <div className="contact-form-right">
            {submitted ? (
              <div className="form-success">
                <div className="form-success-icon">✦</div>
                <h3 className="form-success-title">Message Sent!</h3>
                <p className="form-success-text">
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder=" "
                      required
                      className="form-input"
                    />
                    <label htmlFor="contact-name" className="form-label">Your Name</label>
                  </div>
                  <div className="form-group">
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder=" "
                      required
                      className="form-input"
                    />
                    <label htmlFor="contact-email" className="form-label">Email Address</label>
                  </div>
                </div>

                <div className="form-group">
                  <select
                    id="contact-subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    className="form-input form-select"
                    required
                  >
                    <option value="" disabled>Select a subject…</option>
                    <option value="order">Order & Shipping</option>
                    <option value="product">Product Question</option>
                    <option value="wholesale">Wholesale Enquiry</option>
                    <option value="press">Press & Media</option>
                    <option value="other">Other</option>
                  </select>
                  <label htmlFor="contact-subject" className="form-label form-label--select">Subject</label>
                </div>

                <div className="form-group">
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder=" "
                    required
                    rows={5}
                    className="form-input form-textarea"
                  />
                  <label htmlFor="contact-message" className="form-label">Your Message</label>
                </div>

                <button type="submit" className="form-submit hoverable" id="contact-submit-btn">
                  <span>Send Message</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
