import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__glow" aria-hidden="true" />
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo" aria-label="PlayZone Home">
              <span aria-hidden="true">🎮</span>
              <span>Play<span className="logo-accent">Zone</span></span>
            </Link>
            <p className="footer__tagline">
              Your ultimate browser gaming portal. Play free HTML5 games instantly — no downloads, no installs.
            </p>
            <div className="footer__social" aria-label="Social links (placeholder)">
              {['🐦','📘','📷','🎮'].map((icon, i) => (
                <button key={i} className="social-btn" aria-label={`Social link ${i+1}`} disabled>
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__col">
            <h3 className="footer__heading">Quick Links</h3>
            <ul className="footer__links">
              <li><a href="/#categories">Categories</a></li>
              <li><a href="/#popular">Popular Games</a></li>
              <li><a href="/#new">New Games</a></li>
              <li><a href="/#leaderboard">Leaderboard</a></li>
              <li><a href="/#premium">Premium</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer__col">
            <h3 className="footer__heading">Company</h3>
            <ul className="footer__links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms &amp; Conditions</Link></li>
            </ul>
          </div>

          {/* Newsletter Placeholder */}
          <div className="footer__col">
            <h3 className="footer__heading">Stay Updated</h3>
            <p className="footer__desc">Get notified when new games are added.</p>
            <div className="footer__newsletter">
              <input
                type="email"
                placeholder="your@email.com"
                className="newsletter-input"
                aria-label="Email for newsletter (not yet active)"
                disabled
              />
              <button className="btn btn-primary btn-sm" disabled aria-label="Subscribe (coming soon)">
                Subscribe
              </button>
            </div>
            <p className="footer__note">📧 Newsletter coming soon.</p>
          </div>
        </div>

        <div className="footer__divider" />

        <div className="footer__bottom">
          <p className="footer__copy">
            © {year} PlayZone. Built for educational purposes · Lab Web Engineering Project.
          </p>
          <p className="footer__legal">
            All games are original HTML5 demos. No real data is collected.
          </p>
        </div>
      </div>
    </footer>
  );
}
