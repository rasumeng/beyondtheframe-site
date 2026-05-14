'use client';

import Link from 'next/link';
import { useFadeUpObserver } from '@/lib/animations';
import styles from './about.module.css';

export default function About() {
  useFadeUpObserver();

  return (
    <>
      <div className={styles.pageHero}>
        <div className={styles.pageHeroGlow}></div>
        <p className={styles.pageHeroLabel}>About</p>
        <h1>Robert A.<br/><em style={{ color: 'var(--gold)' }}>Asumeng</em></h1>
        <p className={styles.pageHeroSub}>
          Builder, creator, and the person behind Beyond The Frame — committed to going against the grain and building for others.
        </p>
      </div>

      <section className={styles.profileSection}>
        <div className={`profile-left fade-up`}>
          <div className={styles.avatarRing}>
            <span className={styles.avatarInitials}>R.A.A</span>
          </div>
          <h2 className={styles.profileName}>Robert A. Asumeng</h2>
          <p className={styles.profileTitle}>Founder, Beyond The Frame</p>
          <div className={styles.profileLinks}>
            <span className={styles.profileLink}><span className={styles.profileLinkDot}></span>Faith-driven, people-first</span>
            <span className={styles.profileLink}><span className={styles.profileLinkDot}></span>Tools made for everyone</span>
            <a 
              className={styles.profileLink} 
              href="https://www.linkedin.com/in/robertasumeng/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <span className={styles.profileLinkDot}></span>
              <svg aria-hidden="true" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.9-2 3.9-2 4.2 0 5 2.7 5 6.3V21h-4v-5.3c0-1.3 0-2.8-1.8-2.8s-2 1.3-2 2.7V21H9z"/>
              </svg>
              LinkedIn
            </a>
            <a 
              className={styles.profileLink} 
              href="https://github.com/rasumeng" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <span className={styles.profileLinkDot}></span>
              <svg aria-hidden="true" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.58 2 12.22c0 4.5 2.87 8.32 6.84 9.66.5.1.66-.22.66-.49v-1.73c-2.78.62-3.37-1.22-3.37-1.22-.45-1.2-1.11-1.52-1.11-1.52-.9-.63.07-.62.07-.62 1 .08 1.53 1.05 1.53 1.05.88 1.56 2.3 1.11 2.86.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.03 1.03-2.74-.1-.26-.45-1.3.1-2.72 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.8c.85 0 1.7.12 2.5.35 1.9-1.33 2.74-1.05 2.74-1.05.55 1.42.2 2.46.1 2.72.64.7 1.03 1.62 1.03 2.74 0 3.95-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9v2.82c0 .27.18.6.67.49A10.13 10.13 0 0 0 22 12.22C22 6.58 17.52 2 12 2z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>

        <div className={`bio-block fade-up`}>
          <h2>Going against<br/>the <em>grain.</em></h2>
          <p>Beyond The Frame exists because Robert A. Asumeng believes most people are handed a canvas with the frame already built around it — and taught that anything beyond it isn't theirs to reach.</p>
          <div className={styles.bioPlaceholder}>
            <p>Robert A. Asumeng is a Computer Science major that focuses on Artificial Intelligence with a hope to become an AI engineer and Researcher. Born and raised in St. Joseph Michigan and raised in Dallas, Texas, with Ghanian roots, he combines analytical thinking, proficient communication, and faith driver leadership, Currently, he serves in leadership roles within the ColorStack (UTA Chapter) and National Society of Black Engineers (UTA Chapter) and is known for his integrity, calm mindset, and ale to solve problems thoughtfully. Driven by the desire to mentor others and construct opportunities for students, his goal is to use AI to innovate, lead, and give back to his community.</p>
          </div>
          <p>What drives every project under this brand is a conviction rooted in faith: that we are called to benefit others the way Christ benefited us — freely, genuinely, and without condition. Every tool on this site is built to be accessible to everyone.</p>
        </div>
      </section>

      <section className={styles.valuesSection}>
        <p className="section-label">What This Is Built On</p>
        <h2 className="section-title">The <em>values.</em></h2>

        <div className={styles.valuesGrid}>
          <div className={`${styles.valueCard} fade-up`}>
            <div className={styles.valueNum}>01</div>
            <h3 className={styles.valueTitle}>Look Beyond the World</h3>
            <p className={styles.valueDesc}>The world has defaults. Defaults for how you present yourself, what you should want, what counts as success. Beyond The Frame pushes back on every one of them.</p>
          </div>

          <div className={`${styles.valueCard} fade-up`}>
            <div className={styles.valueNum}>02</div>
            <h3 className={styles.valueTitle}>Serve First</h3>
            <p className={styles.valueDesc}>Beyond The Frame exists to put people first. Every tool is created with genuine care, designed to be accessible and usable for everyone, while leaving room to grow and expand in ways that continue to serve the community.</p>
          </div>

          <div className={`${styles.valueCard} fade-up`}>
            <div className={styles.valueNum}>03</div>
            <h3 className={styles.valueTitle}>Look Further</h3>
            <p className={styles.valueDesc}>Beyond The Frame challenges you to see past the surface—to look beyond the headline, the résumé, the frame—and uncover the story that's waiting to be told.</p>
          </div>
        </div>
      </section>

      <div className={styles.aboutCta}>
        <h2 style={{ color: 'var(--gold)' }}>Ready to go beyond?</h2>
        <p>Explore the free tools I've built — and check back as more projects launch under Beyond The Frame.</p>
        <div className={styles.ctaBtns}>
          <Link href="/projects" className="btn-primary">See All Projects</Link>
          <Link href="/projects/btr" className="btn-outline">Beyond The Résumé</Link>
        </div>
      </div>
    </>
  );
}