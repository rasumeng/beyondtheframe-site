'use client';

import Link from 'next/link';
import { useState, useEffect, FormEvent } from 'react';
import { useFadeUpObserver } from '@/lib/animations';
import { trackDownload, getProjectDownloads } from '@/lib/analytics';
import styles from './btr.module.css';

interface Review {
  id: number;
  name: string;
  text: string;
  date: string;
  type?: string;
  rating?: number | null;
  email?: string | null;
}

export default function BTRPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [downloads, setDownloads] = useState(0);
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  useFadeUpObserver();

  useEffect(() => {
    fetchReviews();
    setDownloads(getProjectDownloads('btr'));
  }, []);

  const fetchReviews = async () => {
    try {
      console.log('[BTR Page] Fetching reviews...');
      const res = await fetch('/api/reviews');
      const data = await res.json();
      console.log('[BTR Page] API response:', data);
      console.log('[BTR Page] Reviews count:', data.reviews?.length || 0);
      setReviews(data.reviews || []);
    } catch (e) {
      console.error('Failed to load reviews:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    trackDownload('btr', 'Beyond The Résumé');
    setDownloads(prev => prev + 1);
    alert('Beyond The Résumé is coming soon! Sign up below to be notified at launch.');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.message.trim()) {
      setFormStatus({ type: 'error', message: 'Please enter your feedback.' });
      return;
    }

    setSubmitting(true);
    setFormStatus({ type: null, message: '' });

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name || 'Anonymous',
          message: formData.message,
        }),
      });

      if (res.ok) {
        setFormStatus({ type: 'success', message: 'Thank you for your feedback!' });
        setFormData({ name: '', message: '' });
        fetchReviews();
      } else {
        setFormStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
      }
    } catch (e) {
      setFormStatus({ type: 'error', message: 'Failed to submit. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* ── HERO ── */}
      <div className={styles.projectHero}>
        <div className={styles.projectHeroGlow} />

        {/* Left: copy */}
        <div className={styles.heroContent}>
          <div className={styles.heroEyebrow}>
            <span className={styles.heroEyebrowAbbr}>BTR</span>
            <span className={styles.heroEyebrowSep} />
            <span className={styles.heroEyebrowParent}>Beyond The Frame</span>
          </div>
          <h1>
            Beyond The<br />
            <em>Résumé.</em>
          </h1>
          <p className={styles.heroTagline}>
            A free tool to help you present yourself as more than a list of bullet points — because you are more than that.
          </p>
          <div className={styles.heroActions}>
            <button className="btn-primary" onClick={handleDownload}>
              Download — Free
            </button>
            <Link href="/projects" className="btn-outline">
              All Projects
            </Link>
          </div>
        </div>

        {/* Right: stat card */}
        <div className={`${styles.heroCard} fade-up`}>
          <div className={styles.heroCardTop}>
            <div className={styles.heroCardAbbr}>BTR</div>
            <div className={styles.heroCardBadge}>Coming Soon</div>
          </div>
          <div className={styles.heroCardStats}>
            <div>
              <div className={styles.cardStatNum}>{downloads}</div>
              <div className={styles.cardStatLabel}>Downloads</div>
            </div>
            <div>
              <div className={styles.cardStatNum}>
                100<span>%</span>
              </div>
              <div className={styles.cardStatLabel}>Free</div>
            </div>
            <div>
              <div className={styles.cardStatNum}>0</div>
              <div className={styles.cardStatLabel}>Version</div>
            </div>
            <div>
              <div className={styles.cardStatNum}>—</div>
              <div className={styles.cardStatLabel}>Launch Date</div>
            </div>
          </div>
          <p className={styles.heroCardNote}>
            Be the first to know when Beyond The Résumé launches — sign up below.
          </p>
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section className={styles.aboutSection}>
        <div className="fade-up">
          <p className="section-label">What It Is</p>
          <h2>
            You are more than<br />
            your bullet <em>points.</em>
          </h2>
        </div>
        <div className="fade-up">
          <p>
            Most résumés ask you to flatten yourself into a list. Dates, titles, tasks. The world
            looks at that list and decides whether you're worth a conversation.
          </p>
          <p>
            Beyond The Résumé is built on a different belief — that the person matters more than
            the format. This free tool helps you build something that actually represents you: your
            story, your skills, your direction.
          </p>
          <p>No cost. No catch. Just a better way to show up on paper.</p>
          <div className="gold-line" />
          <p className={styles.pullQuote}>&ldquo;Go beyond the bullet points.&rdquo;</p>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className={styles.featuresSection}>
        <p className="section-label">What&rsquo;s Inside</p>
        <h2 className="section-title">
          Built to help you<br />
          <em>stand out.</em>
        </h2>

        <div className={styles.featuresGrid}>
          <div className={`${styles.featureCard} fade-up`}>
            <span className={styles.featureIcon}>📄</span>
            <h3 className={styles.featureTitle}>Story-First Layout</h3>
            <p className={styles.featureDesc}>
              Structured to lead with who you are, not just what you've done. Because context
              changes everything.
            </p>
          </div>

          <div className={`${styles.featureCard} fade-up`}>
            <span className={styles.featureIcon}>✦</span>
            <h3 className={styles.featureTitle}>Clean &amp; Professional</h3>
            <p className={styles.featureDesc}>
              Designed to look sharp in any inbox — clean enough for corporate, distinctive enough
              to be remembered.
            </p>
          </div>

          <div className={`${styles.featureCard} fade-up`}>
            <span className={styles.featureIcon}>↓</span>
            <h3 className={styles.featureTitle}>Free Download</h3>
            <p className={styles.featureDesc}>
              No account. No paywall. No subscription. Download it, fill it in, and use it however
              you need to.
            </p>
          </div>
        </div>
      </section>

      {/* ── DOWNLOAD ── */}
      <section className={styles.downloadSection}>
        <div className={`${styles.downloadBox} fade-up`}>
          <div>
            <h2 className={styles.downloadHeading}>
              Get it free.<br />
              <em>No strings.</em>
            </h2>
            <p className={styles.downloadDesc}>
              Beyond The Résumé is free because the mission demands it. Download it, share it, and
              use it to go beyond.
            </p>
            <button className="btn-primary" onClick={handleDownload}>
              Download Beyond The Résumé →
            </button>
            <div className={styles.downloadMeta}>
              <span className={styles.dlMetaItem}>
                <span className={styles.dlMetaDot} /> 100% Free
              </span>
              <span className={styles.dlMetaItem}>
                <span className={styles.dlMetaDot} /> No Sign-Up Required
              </span>
              <span className={styles.dlMetaItem}>
                <span className={styles.dlMetaDot} /> Instant Download
              </span>
            </div>
          </div>
          <div className={styles.downloadRight}>
            <div className={styles.bigCount}>{downloads}</div>
            <div className={styles.bigCountLabel}>Downloads &amp; counting</div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className={styles.reviewsSection}>
        <p className="section-label">What People Say</p>
        <h2>
          Reviews for<br />
          <em>Beyond The Résumé.</em>
        </h2>
        <div className={styles.reviewsGrid}>
          {loading ? (
            <div className={styles.noReviews}>Loading reviews...</div>
          ) : reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className={`${styles.reviewCard} fade-up`}>
                {review.rating && (
                  <div className={styles.reviewRating}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={star <= review.rating! ? styles.starFilled : styles.starEmpty}>★</span>
                    ))}
                  </div>
                )}
                <p className={styles.reviewText}>&ldquo;{review.text}&rdquo;</p>
                <div className={styles.reviewAuthor}>
                  — {review.name}
                  <span className={styles.reviewDate}>{review.date}</span>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noReviews}>
              No reviews yet. Be the first to share your thoughts!
            </div>
          )}
        </div>
      </section>

      {/* ── FEEDBACK ── */}
      <section className={styles.feedbackSection}>
        <div className={styles.feedbackInner}>
          <p className="section-label">Share Your Thoughts</p>
          <h2 className="section-title">
            Have you tried<br />
            <em>Beyond The Résumé?</em>
          </h2>
          <p className={styles.feedbackIntro}>
            Your feedback helps shape the tool. Share your experience — what&rsquo;s working, what
            could be better, or just say hello.
          </p>
          <form className={styles.feedbackForm} onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              className={styles.feedbackInput}
              placeholder="Your name (optional)"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            />
            <textarea
              name="message"
              className={styles.feedbackTextarea}
              placeholder="Your review or feedback..."
              required
              value={formData.message}
              onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
            />
            <button type="submit" className={styles.feedbackBtn} disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>
          {formStatus.type && (
            <p
              className={styles.feedbackNote}
              style={{ color: formStatus.type === 'success' ? 'var(--gold)' : 'var(--text-muted)' }}
            >
              {formStatus.message}
            </p>
          )}
          <p className={styles.feedbackNote}>Reviews are moderated before appearing on the site.</p>
        </div>
      </section>
    </>
  );
}