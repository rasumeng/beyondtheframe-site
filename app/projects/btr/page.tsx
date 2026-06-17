'use client';

import Link from 'next/link';
import { useState, useEffect, FormEvent, useCallback } from 'react';
import { useFadeUpObserver } from '@/lib/animations';
import styles from './btr.module.css';

const METRICS_CONFIG: Record<string, { label: string; desc: string; icon: string }> = {
  resume_uploaded: { label: 'Resumes Uploaded', desc: 'Resumes brought into the app', icon: '📄' },
  grade_resume: { label: 'Resumes Graded', desc: 'AI-powered resume assessments', icon: '📊' },
  polish: { label: 'Resumes Polished', desc: 'AI-enhanced resume content', icon: '✨' },
  fit_analysis: { label: 'Fit Analyses', desc: 'Job match assessments performed', icon: '🎯' },
  tailor: { label: 'Resumes Tailored', desc: 'Customized for job descriptions', icon: '📝' },
  polish_downloaded: { label: 'Polished Exports', desc: 'Polished resumes downloaded', icon: '⬇️' },
  tailor_downloaded: { label: 'Tailored Exports', desc: 'Tailored resumes downloaded', icon: '⬇️' },
};

const DISPLAY_EVENTS = Object.keys(METRICS_CONFIG);

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
  const [metrics, setMetrics] = useState<{ total: number; byEvent: Record<string, number>; byLabel: Record<string, number> } | null>(null);
  const [metricsLoading, setMetricsLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  useFadeUpObserver();

  useEffect(() => {
    fetchReviews();
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const res = await fetch('/api/track/stats');
      const data = await res.json();
      if (data.success) setMetrics(data);
    } catch (e) {
      console.error('Failed to load metrics:', e);
    } finally {
      setMetricsLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      console.log('[BTR Page] Fetching reviews...');
      const res = await fetch('/api/reviews');
      const data = await res.json();
      console.log('[BTR Page] API response:', JSON.stringify(data));
      
      // Handle different response formats
      let reviewsArray = [];
      if (Array.isArray(data)) {
        reviewsArray = data;
      } else if (data.reviews) {
        reviewsArray = data.reviews;
      } else if (data.result) {
        reviewsArray = Array.isArray(data.result) ? data.result : [];
      }
      
      console.log('[BTR Page] Parsed reviews:', JSON.stringify(reviewsArray));
      console.log('[BTR Page] Reviews count:', reviewsArray.length);
      setReviews(reviewsArray);
    } catch (e) {
      console.error('Failed to load reviews:', e);
    } finally {
      setLoading(false);
    }
  };

  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const copyToClipboard = useCallback(async (cmd: string) => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopiedCmd(cmd);
      setTimeout(() => setCopiedCmd(null), 2000);
    } catch { /* clipboard not available */ }
  }, []);

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
          <div className={styles.heroTerminal}>
            <div className={styles.terminalBlock}>
              <div className={styles.termLine}>
                <span className={styles.termPrompt}>$</span>
                <span className={styles.termCmd}>pip install btr-resume</span>
                <button className={`${styles.copyBtn} ${copiedCmd === 'pip install btr-resume' ? styles.copied : ''}`} onClick={() => copyToClipboard('pip install btr-resume')}>
                  {copiedCmd === 'pip install btr-resume' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className={styles.termLine}>
                <span className={styles.termPrompt}>$</span>
                <span className={styles.termCmd}>btr serve</span>
                <button className={`${styles.copyBtn} ${copiedCmd === 'btr serve' ? styles.copied : ''}`} onClick={() => copyToClipboard('btr serve')}>
                  {copiedCmd === 'btr serve' ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
          <div className={styles.heroActions}>
            <Link href="/projects" className="btn-outline">
              All Projects
            </Link>
          </div>
        </div>

        {/* Right: stat card */}
        <div className={`${styles.heroCard} fade-up`}>
          <div className={styles.heroCardTop}>
            <div className={styles.heroCardAbbr}>BTR</div>
            <div className={styles.heroCardBadge}>Live</div>
          </div>
          <div className={styles.heroCardStats}>
            <div>
              <div className={styles.cardStatNum}>pip <span>install</span></div>
              <div className={styles.cardStatLabel}>One-Command Setup</div>
            </div>
            <div>
              <div className={styles.cardStatNum}>
                100<span>%</span>
              </div>
              <div className={styles.cardStatLabel}>Free</div>
            </div>
            <div>
              <div className={styles.cardStatNum}>1.0.2</div>
              <div className={styles.cardStatLabel}>Version</div>
            </div>
            <div>
              <div className={styles.cardStatNum}>PyPI</div>
              <div className={styles.cardStatLabel}>Published</div>
            </div>
          </div>
          <p className={styles.heroCardNote}>
            Install with a single command. No sign-up. No paywall.
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
            <span className={styles.featureIcon}>✨</span>
            <h3 className={styles.featureTitle}>Bullet Polish</h3>
            <p className={styles.featureDesc}>
              Transform weak bullet points into strong, impact-driven statements. AI-powered
              rewriting that keeps your voice and amplifies your results.
            </p>
          </div>

          <div className={`${styles.featureCard} fade-up`}>
            <span className={styles.featureIcon}>🎯</span>
            <h3 className={styles.featureTitle}>Job Tailoring</h3>
            <p className={styles.featureDesc}>
              Paste a job description and get a resume customized for that role. Every section
              re-aligned to speak directly to what employers are looking for.
            </p>
          </div>

          <div className={`${styles.featureCard} fade-up`}>
            <span className={styles.featureIcon}>🔒</span>
            <h3 className={styles.featureTitle}>100% Local &amp; Private</h3>
            <p className={styles.featureDesc}>
              Runs entirely on your machine using Ollama. No data ever leaves your computer.
              Your resume stays yours — always.
            </p>
          </div>
        </div>
      </section>

      {/* ── INSTALL ── */}
      <section className={styles.installSection}>
        <p className="section-label">Get Started</p>
        <h2 className="section-title">
          Install in seconds.<br />
          <em>No strings.</em>
        </h2>
        <div className={styles.installGrid}>
          <div>
            <p className={styles.installDesc}>
              One command to install, one to run — and it&rsquo;s yours.
            </p>
            <div className={styles.installSteps}>
              <div className={styles.installStep}>
                <span className={styles.stepNum}>1</span>
                <div className={styles.stepContent}>
                  <span className={styles.stepLabel}>Install from PyPI</span>
                  <div className={styles.terminalBlock}>
                    <div className={styles.termLine}>
                      <span className={styles.termPrompt}>$</span>
                      <span className={styles.termCmd}>pip install btr-resume</span>
                      <button className={`${styles.copyBtn} ${copiedCmd === 'pip install btr-resume' ? styles.copied : ''}`} onClick={() => copyToClipboard('pip install btr-resume')}>
                        {copiedCmd === 'pip install btr-resume' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.installStep}>
                <span className={styles.stepNum}>2</span>
                <div className={styles.stepContent}>
                  <span className={styles.stepLabel}>Start the server</span>
                  <div className={styles.terminalBlock}>
                    <div className={styles.termLine}>
                      <span className={styles.termPrompt}>$</span>
                      <span className={styles.termCmd}>btr serve</span>
                      <button className={`${styles.copyBtn} ${copiedCmd === 'btr serve' ? styles.copied : ''}`} onClick={() => copyToClipboard('btr serve')}>
                        {copiedCmd === 'btr serve' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.installStep}>
                <span className={styles.stepNum}>3</span>
                <div className={styles.stepContent}>
                  <span className={styles.stepLabel}>Your browser opens to the app</span>
                  <p className={styles.stepNote}>
                    Follow the on-screen prompt to install Ollama (~700MB model download on first run). That&rsquo;s it.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.installNotes}>
            <p>Runs entirely on your machine. No cloud, no uploads, no accounts.</p>
            <p>Requires Python 3.10+ and Ollama. Both are free and open-source.</p>
          </div>
        </div>
      </section>

      {/* ── METRICS ── */}
      <section className={styles.metricsSection}>
        <p className="section-label">Real Usage</p>
        <h2>
          Live <em>Metrics.</em>
        </h2>
        {metricsLoading ? (
          <div className={styles.noReviews}>Loading metrics...</div>
        ) : metrics && metrics.total > 0 ? (
          <div className={styles.metricsGrid}>
            {DISPLAY_EVENTS.map((key) => {
              const cfg = METRICS_CONFIG[key];
              const count = metrics.byEvent[key] || 0;
              return (
                <div key={key} className={styles.metricCard}>
                  <span className={styles.metricIcon}>{cfg.icon}</span>
                  <div className={styles.metricNum}>{count}</div>
                  <div className={styles.metricLabel}>{cfg.label}</div>
                  <div className={styles.metricDesc}>{cfg.desc}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styles.noReviews}>No events tracked yet. Events will appear once the resume-ai web app starts sending data.</div>
        )}
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
            reviews.map((review, index) => {
              console.log(`[BTR Page] Rendering review ${index}:`, JSON.stringify(review));
              return (
                <div key={review.id || index} className={`${styles.reviewCard} fade-up`}>
                  {review.rating && (
                    <div className={styles.reviewRating}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className={star <= (review.rating || 0) ? styles.starFilled : styles.starEmpty}>★</span>
                      ))}
                    </div>
                  )}
                  <p className={styles.reviewText}>&ldquo;{review.text || 'No text'}&rdquo;</p>
                  <div className={styles.reviewAuthor}>
                    — {review.name || 'Anonymous'}
                    <span className={styles.reviewDate}>{review.date || ''}</span>
                  </div>
                </div>
              );
            })
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