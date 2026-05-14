'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useFadeUpObserver } from '@/lib/animations';
import { getTotalDownloads } from '@/lib/analytics';
import styles from './home.module.css';

export default function Home() {
  const [totalDownloads, setTotalDownloads] = useState(0);
  
  useFadeUpObserver();
  
  useEffect(() => {
    setTotalDownloads(getTotalDownloads());
  }, []);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroGlow}></div>
        <p className={styles.heroEyebrow}>Robert A. Asumeng</p>
        <h1 className={styles.heroHeading}>
          Beyond<br/>
          <em><span style={{ color: 'var(--cream)', fontStyle: 'normal' }}>The</span> Frame.</em>
        </h1>
        <p className={styles.heroTagline}>Go beyond.</p>
        <p className={styles.heroDesc}>
          Innovative tools and ideas built for people — rooted in purpose, not profit. 
          Looking past the world's standard and building something better.
        </p>
        <div className={styles.heroCta}>
          <Link href="/projects" className="btn-primary">Explore Projects</Link>
          <Link href="/about" className="btn-outline">About Robert</Link>
        </div>
      </section>

      <div className={styles.marqueeStrip}>
        <div className={styles.marqueeTrack}>
          <span className={styles.accent}>Beyond The Frame</span>
          <span>·</span>
          <span>Go Beyond</span>
          <span>·</span>
          <span className={styles.accent}>BTR — Beyond The Résumé</span>
          <span>·</span>
          <span>For. People.</span>
          <span>·</span>
          <span className={styles.accent}>STAY TUNED</span>
          <span>·</span>
          <span>Built For People</span>
          <span>·</span>
          <span className={styles.accent}>Beyond The Frame</span>
          <span>·</span>
          <span>Go Beyond</span>
          <span>·</span>
          <span className={styles.accent}>BTR — Beyond The Résumé</span>
          <span>·</span>
          <span>Free. Always.</span>
          <span>·</span>
          <span className={styles.accent}>STAY TUNED</span>
          <span>·</span>
          <span>Built For People</span>
          <span>·</span>
        </div>
      </div>

      <section className={styles.aboutStrip}>
        <div className="fade-up">
          <p className={styles.aboutQuote}>
            "So we fix our eyes not on what is seen, but what is unseen, since what is seen is temporary, but what is unseen is eternal. -2 Corinthians 4:16"
          </p>
        </div>
        <div className="fade-up">
          <p className="section-label">The Mission</p>
          <div className={styles.aboutRight}>
            <p>Beyond The Frame is built on a simple conviction: the world defaults to a narrow view of what people can be and do. We're here to challenge that — one innovation at a time.</p>
            <p>Rooted in faith and a commitment to serving others the way Christ served, every project under this brand exists to add genuine value to others lives.</p>
          </div>
          <Link href="/about" className="btn-outline">Read More About Robert</Link>
        </div>
      </section>

      <section className={styles.projectsPreview}>
        <div className={styles.projectsHeader}>
          <div>
            <p className="section-label">Projects</p>
            <h2 className="section-title">Real tools.<br/><em>Real impact.</em></h2>
          </div>
          <Link href="/projects" className="btn-outline">View All Projects</Link>
        </div>

        <div className={styles.projectsGrid}>
          <Link href="/projects/btr" className={`${styles.projectCard} fade-up`}>
            <p className={styles.projectAbbr}>BTR &nbsp;·&nbsp; Resume</p>
            <h3 className={styles.projectName}>Beyond The Résumé</h3>
            <p className={styles.projectDesc}>A free tool to help you present yourself as more than a list of bullet points — because you are.</p>
            <div className={styles.projectFooter}>
              <span className={`${styles.badge} ${styles.badgeSoon}`}>Coming Soon</span>
              <span className={styles.cardArrow}>→</span>
            </div>
          </Link>

          <div className={`${styles.projectCard} ${styles.placeholder} fade-up`} style={{ animationDelay: '0.2s' }}>
            <p className={styles.projectAbbr}>BTF &nbsp;·&nbsp; More</p>
            <h3 className={styles.projectName}>More on the way.</h3>
            <p className={styles.projectDesc}>New projects in development. Every one of them free. Every one built with purpose.</p>
            <div className={styles.projectFooter}>
              <span className={`${styles.badge} ${styles.badgeSoon}`}>In Progress</span>
            </div>
          </div>

          <div className={`${styles.projectCard} ${styles.placeholder} fade-up`} style={{ animationDelay: '0.2s' }}>
            <p className={styles.projectAbbr}>BTF &nbsp;·&nbsp; More</p>
            <h3 className={styles.projectName}>More on the way.</h3>
            <p className={styles.projectDesc}>New projects in development. Every one of them free. Every one built with purpose.</p>
            <div className={styles.projectFooter}>
              <span className={`${styles.badge} ${styles.badgeSoon}`}>In Progress</span>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.statsBar}>
        <div className="fade-up">
          <div className={styles.statNum}>{totalDownloads}+</div>
          <div className={styles.statLabel}>Total Downloads</div>
        </div>
        <div className="fade-up">
          <div className={styles.statNum}>2<span>+</span></div>
          <div className={styles.statLabel}>Projects</div>
        </div>
        <div className="fade-up">
          <div className={styles.statNum}>100<span>%</span></div>
          <div className={styles.statLabel}>Free, Always</div>
        </div>
      </div>
    </>
  );
}