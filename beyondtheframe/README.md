# Beyond The Frame — beyondtheframe.co

Personal brand website for Robert A. Asumeng.

## Pages
- `/` — Home / Landing page
- `/pages/about` — About Robert
- `/pages/projects` — All projects hub
- `/pages/beyond-the-resume` — BTR project page

## File Structure
```
beyondtheframe/
├── index.html              ← Home page
├── vercel.json             ← Vercel config
├── css/
│   └── style.css           ← Shared styles (all pages)
├── js/
│   └── main.js             ← Shared JS (nav, animations, download tracking)
└── pages/
    ├── about.html
    ├── projects.html
    └── beyond-the-resume.html
```

## Deploying to Vercel

1. Create a free account at https://vercel.com
2. Install Vercel CLI (optional): `npm i -g vercel`
3. Drag and drop the `beyondtheframe` folder into vercel.com/new — OR
4. Push to GitHub and connect the repo to Vercel for auto-deploys

## Adding Your Domain (beyondtheframe.co)
1. Buy the domain at Namecheap, Porkbun, or Google Domains
2. In Vercel → Project Settings → Domains → Add `beyondtheframe.co`
3. Follow the DNS instructions Vercel gives you (takes ~10 minutes)

## When BTR Is Ready
In `pages/beyond-the-resume.html`, find `handleDownload()` and replace:
```js
// Replace this line:
alert('Beyond The Résumé is coming soon!...');

// With:
window.location.href = '/downloads/beyond-the-resume-v1.pdf';
```

Then put your file in `/downloads/beyond-the-resume-v1.pdf`

## Download Tracking
Downloads are tracked in the browser via `localStorage` (client-side only).
For real analytics, connect Vercel Analytics (free) or add a webhook call inside `trackDownload()` in `js/main.js`.

## Adding Your Bio
In `pages/about.html`, find the `.bio-placeholder` block and replace it with your text.

---
Built under Beyond The Frame · beyondtheframe.co · © 2025 Robert A. Asumeng
