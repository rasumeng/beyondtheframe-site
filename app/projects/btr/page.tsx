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
            A free tool to help you build a stronger resume in minutes — because you are more than a list of bullet points, and your time is better spent being you.
          </p>
          <div className={styles.heroActions}>
            <a href="#install" className="btn-primary" onClick={(e) => { e.preventDefault(); document.getElementById('install')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>
              Get Started
            </a>
            <Link href="/projects" className="btn-outline">
              All Projects
            </Link>
          </div>
        </div>

        {/* Right: card */}
        <div className={`${styles.heroCard} fade-up`}>
          <div className={styles.heroCardTop}>
            <div className={styles.heroCardAbbr}>BTR</div>
            <div className={styles.heroCardBadge}>Live</div>
          </div>
          <p className={styles.heroCardBody}>
            BTR runs entirely on your machine — no cloud, no accounts. Your resume stays local and never leaves your computer. Just smart tools to polish, tailor, and present yourself as more than bullet points. All in minutes, not hours.
          </p>
        </div>
      </div>

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
      <section id="install" className={styles.installSection}>
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

            <details className={styles.prereqs}>
              <summary className={styles.prereqsSummary}>Prerequisites (what you need first)</summary>
              <div className={styles.prereqsContent}>
                <p><strong>Python 3.10+</strong> (Python <strong>3.13</strong> is recommended) &mdash; BTR runs on Python. Open your terminal (Command Prompt on Windows, Terminal on macOS/Linux) and type <code>python --version</code> to check if you have it. If not, download from <a href="https://www.python.org/downloads/" target="_blank" rel="noopener noreferrer">python.org/downloads/</a>. During installation on Windows, make sure to check <strong>&ldquo;Add Python to PATH&rdquo;</strong>.</p>
                <p><strong>pip</strong> &mdash; Python&rsquo;s package installer. It comes bundled with Python 3.4+, so if Python is installed, pip is ready to go.</p>
                <p><strong>Ollama</strong> &mdash; BTR uses Ollama to run AI models locally on your computer. Don&rsquo;t install it yet &mdash; BTR will guide you through this on first launch.</p>
              </div>
            </details>

            <div className={styles.installSteps}>
              <div className={styles.installStep}>
                <span className={styles.stepNum}>1</span>
                <div className={styles.stepContent}>
                  <span className={styles.stepLabel}>Install from PyPI</span>
                  <p className={styles.stepNote}>Copy and paste this command into your terminal, then press Enter. pip downloads BTR and all its dependencies automatically.</p>
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
                  <p className={styles.stepNote}>Once installed, run this command to start BTR. It launches a local web server on your machine. You&rsquo;ll see a URL like <code>http://localhost:8000</code> appear in your terminal.</p>
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
                    Your default browser will open to BTR automatically. If Ollama isn&rsquo;t installed yet, the app will prompt you &mdash; follow the on-screen instructions to install it (it&rsquo;s free and open-source). The first AI model download is about <strong>700MB</strong>, so it may take a few minutes depending on your connection. After that, you&rsquo;re all set.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.installNotes}>
            <p><strong>Runs 100% locally.</strong> Your resumes never leave your computer. No cloud, no uploads, no accounts.</p>
            <p><strong>Completely free.</strong> No paywall, no trial, no hidden costs.</p>
            <p><strong>Keep the terminal open</strong> while using BTR. Closing it will stop the server.</p>
            <p>To update later, run <code>pip install --upgrade btr-resume</code>.</p>
            <p><strong>To open terminal:</strong> Press <code>Ctrl + Alt + T</code> (Linux) or <code>Cmd + Space</code> and type "Terminal" (Mac).</p>
            <p><strong>To open command prompt:</strong> Press <code>Win + R</code> and type "cmd" or press the Start menu and search for "Command Prompt" (Windows).</p>
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
            <strong>How to open the terminal:</strong> Press <code>Ctrl + Alt + T</code> (Linux) or <code>Cmd + Space</code> and type "Terminal" (Mac).<br />
            <strong>How to open the command prompt:</strong> Press <code>Win + R</code> and type "cmd" or press the Start menu and search for "Command Prompt" (Windows).
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