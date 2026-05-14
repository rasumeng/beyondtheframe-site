'use client';

import styles from './contact.module.css';

export default function Contact() {
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

          <form className={styles.contactForm} action="https://formspree.io/f/xeepdala" method="POST">
            <div className={styles.formGroup}>
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" name="name" placeholder="John" required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Your Email</label>
              <input type="email" id="email" name="email" placeholder="you@example.com" required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" placeholder="What's this about?" required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" placeholder="Your message here..." required></textarea>
            </div>

            <button type="submit" className={`btn-primary ${styles.formSubmit}`}>Send Message</button>
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