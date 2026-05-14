'use client';

import { useState } from 'react';
import styles from './contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name || formData.email || 'Anonymous',
          message: `${formData.subject}\n\n${formData.message}`,
          type: 'general',
          email: formData.email || null,
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className={styles.pageHero}>
        <div className={styles.pageHeroGlow}></div>
        <div className={styles.pageHeroLabel}>Contact</div>
        <h1>Let's Connect</h1>
        <p className={styles.pageHeroSub}>
          Have a question, idea, or want to collaborate? I'd love to hear from you. Reach out directly or use the form below.
        </p>
      </section>

      <section className={styles.contactSection}>
        <div className={styles.contactLeft}>
          <div className={styles.contactMethod}>
            <div className={styles.contactLabel}>Primary Email</div>
            <div className={styles.contactValue}>
              <a href="mailto:beyondtfofficial@gmail.com">beyondtfofficial@gmail.com</a>
            </div>
          </div>

          <div className={styles.contactMethod}>
            <div className={styles.contactLabel}>For Business & Inquiries</div>
            <div className={styles.contactValue}>
              Partnerships, collaborations, and professional inquiries — I get back within 24–48 hours.
            </div>
          </div>

          <div className={styles.contactMethod}>
            <div className={styles.contactLabel}>Expected Response</div>
            <div className={styles.contactValue}>
              Most emails answered within 1–2 business days.
            </div>
          </div>
        </div>

        <div className={styles.contactRight}>
          <p className={styles.contactIntro}>
            Whether you're interested in Beyond The Resume, have feedback on tools, want to discuss ideas, or just want to connect—I'm all ears. Send me a message below or reach out directly via email above.
          </p>

          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Your Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder="John" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Your Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="you@example.com" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="subject">Subject</label>
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                placeholder="What's this about?" 
                value={formData.subject}
                onChange={handleChange}
                required 
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                name="message" 
                placeholder="Your message here..." 
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              className={`btn-primary ${styles.formSubmit}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {submitStatus === 'success' && (
              <p style={{ color: '#4ade80', marginTop: '1rem' }}>
                Message sent successfully! Thank you for reaching out.
              </p>
            )}

            {submitStatus === 'error' && (
              <p style={{ color: '#f87171', marginTop: '1rem' }}>
                Failed to send message. Please try again or email directly.
              </p>
            )}
          </form>

          <div className={styles.contactCta}>
            <h3>Prefer Email?</h3>
            <p>
              No problem. Send a direct message to <a href="mailto:beyondtfofficial@gmail.com" style={{ color: 'var(--gold)', textDecoration: 'none', border: 'none' }}>beyondtfofficial@gmail.com</a> and I'll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}