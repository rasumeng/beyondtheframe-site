import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div>
        <div className="footer-brand">Beyond The Frame</div>
        <div className="footer-domain">beyondtheframe.vercel.app</div>
      </div>
      <ul className="footer-links">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/projects">Projects</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
      <div className="footer-copy">© 2026 Robert A. Asumeng</div>
    </footer>
  );
}