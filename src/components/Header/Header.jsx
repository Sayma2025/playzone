import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const NAV_LINKS = [
  { label: 'Home',           to: '/' },
  { label: 'Categories',     to: '/#categories' },
  { label: 'Popular Games',  to: '/#popular' },
  { label: 'New Games',      to: '/#new' },
];

export default function Header({ searchQuery, onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const handleNavClick = (e, to) => {
    if (to.includes('#')) {
      e.preventDefault();
      const id = to.split('#')[1];
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else if (location.pathname !== '/') window.location.href = to;
    }
  };

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`} role="banner">
      <div className="container header__inner">
        {/* Logo */}
        <Link to="/" className="header__logo" aria-label="PlayZone Home">
          <span className="logo-icon" aria-hidden="true">🎮</span>
          <span className="logo-text">Play<span className="logo-accent">Zone</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="header__nav" role="navigation" aria-label="Main navigation">
          <ul className="nav__list">
            {NAV_LINKS.map(link => (
              <li key={link.to}>
                <a
                  href={link.to}
                  className="nav__link"
                  onClick={(e) => handleNavClick(e, link.to)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Search */}
        <div className="header__search">
          <label htmlFor="game-search" className="sr-only">Search games</label>
          <span className="search-icon" aria-hidden="true">🔍</span>
          <input
            id="game-search"
            type="search"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="search-input"
            autoComplete="off"
          />
        </div>

        {/* Mobile Hamburger */}
        <button
          className={`header__hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div id="mobile-menu" className={`mobile-menu${menuOpen ? ' open' : ''}`} role="dialog" aria-label="Mobile navigation">
        <nav aria-label="Mobile navigation">
          <ul>
            {NAV_LINKS.map(link => (
              <li key={link.to}>
                <a
                  href={link.to}
                  className="mobile-link"
                  onClick={(e) => { handleNavClick(e, link.to); setMenuOpen(false); }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mobile-search">
            <label htmlFor="mobile-search" className="sr-only">Search games</label>
            <span className="search-icon" aria-hidden="true">🔍</span>
            <input
              id="mobile-search"
              type="search"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="search-input"
            />
          </div>
        </nav>
      </div>
    </header>
  );
}
