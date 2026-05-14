'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useFadeUpObserver } from '@/lib/animations';
import { getTotalDownloads } from '@/lib/analytics';
import styles from './projects.module.css';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [totalDownloads, setTotalDownloads] = useState(0);
  
  useFadeUpObserver();
  
  useEffect(() => {
    setTotalDownloads(getTotalDownloads());
  }, []);

  const projects = [
    {
      abbr: 'BTR',
      name: 'Beyond The Résumé',
      desc: 'A free resume tool — because you\'re more than your bullet points.',
      downloads: 0,
      status: 'soon',
      href: '/projects/btr'
    }
  ];

  const handleFilter = (filter: string) => {
    setActiveFilter(filter);
    const rows = document.querySelectorAll('[data-status]');
    rows.forEach((row) => {
      const status = row.getAttribute('data-status');
      let shouldShow = false;
      
      if (filter === 'all') {
        shouldShow = true;
      } else if (filter === 'live' && status?.includes('live')) {
        shouldShow = true;
      } else if (filter === 'coming soon' && status?.includes('soon')) {
        shouldShow = true;
      }

      if (shouldShow) {
        (row as HTMLElement).style.display = '';
      } else {
        (row as HTMLElement).style.display = 'none';
      }
    });
  };

  return (
    <>
      <div className={styles.pageHero}>
        <div className={styles.pageHeroGlow}></div>
        <p className={styles.pageHeroLabel}>All Projects</p>
        <h1>Free tools.<br/><em>Real impact.</em></h1>
        <p className={styles.pageHeroSub}>
          Every project under Beyond The Frame is free — built to genuinely help people, with nothing asked in return.
        </p>
      </div>

      <div className={styles.filterBar}>
        <span className={styles.filterLabel}>Filter:</span>
        <button 
          className={`${styles.filterBtn} ${activeFilter === 'all' ? styles.active : ''}`}
          onClick={() => handleFilter('all')}
        >
          All
        </button>
        <button 
          className={`${styles.filterBtn} ${activeFilter === 'live' ? styles.active : ''}`}
          onClick={() => handleFilter('live')}
        >
          Live
        </button>
        <button 
          className={`${styles.filterBtn} ${activeFilter === 'coming soon' ? styles.active : ''}`}
          onClick={() => handleFilter('coming soon')}
        >
          Coming Soon
        </button>
      </div>

      <section className={`projects-section fade-up`}>
        <div className={styles.projectsList}>
          <Link href="/projects/btr" className={`${styles.projectRow} fade-up`} data-status="soon">
            <div className={styles.rowAbbr}>BTR</div>
            <div className={styles.rowName}>
              Beyond The Résumé
              <small>A free resume tool — because you're more than your bullet points.</small>
            </div>
            <div className={styles.rowDownloads}>
              <div className={styles.rowDlCount} data-downloads="btr">0</div>
              <div className={styles.rowDlLabel}>Downloads</div>
            </div>
            <div className={styles.rowStatus}>
              <span className={`${styles.badge} ${styles.badgeSoon}`}>Coming Soon</span>
              <span className={styles.rowArrow}>→</span>
            </div>
          </Link>

          <div className={`${styles.projectRow} ${styles.projectRowPlaceholder}`} data-status="live soon">
            <div className={styles.rowAbbr}>BTF</div>
            <div className={styles.rowName}>
              More on the way
              <small>New tools and projects in development.</small>
            </div>
            <div className={styles.rowDownloads}>
              <div className={styles.rowDlCount}>—</div>
              <div className={styles.rowDlLabel}>—</div>
            </div>
            <div className={styles.rowStatus}>
              <span className={`${styles.badge} ${styles.badgeProgress}`}>In Progress</span>
              <span className={styles.rowArrow} style={{ opacity: 0, visibility: 'hidden' }}>→</span>
            </div>
          </div>
        </div>

        <div className={`${styles.comingSoonBanner} fade-up`}>
          <div className={styles.bannerText}>
            <h3>Have an idea for a project?</h3>
            <p>Beyond The Frame grows as the mission grows. If there's a tool you think could help people, Robert wants to hear about it.</p>
          </div>
          <Link href="/contact" className="btn-outline">Get in Touch</Link>
        </div>
      </section>

      <div className={styles.statsRow}>
        <div className="fade-up">
          <div className={styles.statNum}>{totalDownloads}<span>+</span></div>
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