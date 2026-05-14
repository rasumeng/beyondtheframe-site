'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    if (!pathname) return false;
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav>
      <Link href="/" className="nav-logo">
        <img 
          src="/images/BTF Banner Transparent.svg" 
          alt="Beyond The Frame" 
          className="logo-banner"
        />
      </Link>
      <ul className="nav-links">
        <li><Link href="/" className={isActive('/') ? 'active' : ''}>Home</Link></li>
        <li><Link href="/about" className={isActive('/about') ? 'active' : ''}>About</Link></li>
        <li><Link href="/projects" className={isActive('/projects') ? 'active' : ''}>Projects</Link></li>
        <li><Link href="/contact" className={isActive('/contact') ? 'active' : ''}>Connect</Link></li>
        <li>
          <Link href="/projects/btr" className={`btn-nav ${isActive('/projects/btr') ? 'active' : ''}`}>
            Beyond The Résumé →
          </Link>
        </li>
      </ul>
      <button className="hamburger" aria-label="Open menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}