import './AdBanner.css';

/**
 * AdBanner — Clearly labelled advertising placeholder.
 * Replace the placeholder content with real ad provider code
 * when the site qualifies for a legitimate ad network.
 */
export default function AdBanner({ size = 'leaderboard', className = '' }) {
  const sizes = {
    leaderboard: { width: '728px', height: '90px', label: '728 × 90 Leaderboard Ad' },
    rectangle:   { width: '300px', height: '250px', label: '300 × 250 Rectangle Ad' },
    banner:      { width: '100%',  height: '100px', label: 'Banner Ad' },
    skyscraper:  { width: '160px', height: '600px', label: '160 × 600 Skyscraper Ad' },
  };
  const { label } = sizes[size] || sizes.banner;

  return (
    <div className={`ad-banner ad-banner--${size} ${className}`} role="complementary" aria-label="Advertisement placeholder">
      <div className="ad-banner__label">Advertisement</div>
      <div className="ad-banner__content">
        <span className="ad-banner__icon" aria-hidden="true">📢</span>
        <div>
          <p className="ad-banner__title">{label}</p>
          <p className="ad-banner__sub">Ad space available for future integration</p>
        </div>
      </div>
    </div>
  );
}
