// ─── NAV ACTIVE STATE ───
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && path.endsWith(href)) link.classList.add('active');
    if (path === '/' && href === 'index.html') link.classList.add('active');
  });

  // Hamburger toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // ─── FADE UP OBSERVER ───
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(el => {
      if (el.isIntersecting) {
        el.target.classList.add('visible');
        observer.unobserve(el.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
});

// ─── DOWNLOAD TRACKER ───
// Lightweight local counter using localStorage
// Replace this with a real analytics call (e.g. Vercel Analytics or a webhook) later
function trackDownload(projectId, projectName) {
  const key = `btf_downloads_${projectId}`;
  const current = parseInt(localStorage.getItem(key) || '0');
  localStorage.setItem(key, current + 1);

  // Update any visible counter on the page
  const counter = document.querySelector(`[data-downloads="${projectId}"]`);
  if (counter) counter.textContent = (current + 1).toLocaleString();

  console.log(`[BTF Analytics] Download tracked: ${projectName} (total: ${current + 1})`);
}

// ─── TOTAL DOWNLOADS ACROSS ALL PROJECTS ───
function getTotalDownloads() {
  let total = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('btf_downloads_')) {
      total += parseInt(localStorage.getItem(key) || '0');
    }
  }
  return total;
}

// Auto-update any total counter elements on page load
document.addEventListener('DOMContentLoaded', () => {
  const totalEl = document.querySelector('[data-downloads="total"]');
  if (totalEl) totalEl.textContent = getTotalDownloads().toLocaleString();
});
