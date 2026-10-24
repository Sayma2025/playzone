import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { GAMES, CATEGORIES, FEATURED_GAMES, LEADERBOARD } from '../../data/games';
import GameCard from '../../components/GameCard/GameCard';
import AdBanner from '../../components/AdBanner/AdBanner';
import './HomePage.css';

// ── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  const navigate = useNavigate();
  const featured = FEATURED_GAMES[0];

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero__particles" aria-hidden="true">
        {Array.from({ length: 30 }, (_, i) => (
          <span
            key={i}
            className="hero__particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
      </div>
      <div className="container hero__content">
        <div className="hero__text">
          <div className="hero__eyebrow">
            <span className="badge badge-blue">🎮 Featured Game</span>
          </div>
          <h1 id="hero-heading" className="hero__title heading-font">
            Your Next Favourite<br />
            <span className="gradient-text">Game Starts Here</span>
          </h1>
          <p className="hero__subtitle">
            Play hundreds of free browser games instantly. No downloads, no installs —
            just pure gaming fun. New games added regularly!
          </p>
          <div className="hero__actions">
            <button
              className="btn btn-primary hero__btn-primary"
              onClick={() => navigate(`/game/${featured.id}`)}
              id="hero-play-btn"
              aria-label={`Play Now — ${featured.title}`}
            >
              ▶ Play Now
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => document.getElementById('popular')?.scrollIntoView({ behavior: 'smooth' })}
              id="hero-explore-btn"
              aria-label="Explore all games"
            >
              🎯 Explore Games
            </button>
          </div>
          <div className="hero__stats" aria-label="Platform statistics">
            {[
              { value: '10+', label: 'Free Games' },
              { value: '0', label: 'Downloads' },
              { value: '100%', label: 'Browser Play' },
            ].map(stat => (
              <div key={stat.label} className="hero__stat">
                <span className="hero__stat-value">{stat.value}</span>
                <span className="hero__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero__game-preview" aria-hidden="true">
          <div className="hero__game-card">
            <div className="hero__game-img" style={{ background: `radial-gradient(circle at 40% 40%, ${featured.bgColor} 0%, #0a0b18 100%)` }}>
              <span className="hero__game-emoji">🎮</span>
              <div className="hero__game-glow" style={{ background: `radial-gradient(circle, ${featured.accentColor}55 0%, transparent 70%)` }} />
            </div>
            <div className="hero__game-info">
              <div className="hero__game-title">{featured.title}</div>
              <div className="hero__game-category">{featured.category}</div>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => navigate(`/game/${featured.id}`)}
                tabIndex={-1}
              >
                ▶ Play Now
              </button>
            </div>
          </div>
          <div className="hero__floating-card hero__floating-card--1">🏆 128K Plays</div>
          <div className="hero__floating-card hero__floating-card--2">⭐ 4.8 Rating</div>
        </div>
      </div>
    </section>
  );
}

// ── Categories Section ────────────────────────────────────────────────────────
function CategoriesSection({ activeCategory, onCategorySelect }) {
  return (
    <section id="categories" className="section" aria-labelledby="categories-heading">
      <div className="container">
        <div className="section-header">
          <h2 id="categories-heading">
            <span className="gradient-text">Game Categories</span>
          </h2>
          <p>Pick your genre and start playing</p>
        </div>
        <div className="categories__grid" role="list" aria-label="Game categories">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`category-card${activeCategory === cat.id ? ' active' : ''}`}
              onClick={() => onCategorySelect(cat.id)}
              style={{ '--cat-color': cat.color }}
              role="listitem"
              aria-pressed={activeCategory === cat.id}
              aria-label={`Filter by ${cat.label}`}
              id={`cat-${cat.id}`}
            >
              <span className="category-card__icon" aria-hidden="true">{cat.icon}</span>
              <span className="category-card__label">{cat.label}</span>
              <span className="category-card__count">
                {cat.id === 'all' ? GAMES.length : GAMES.filter(g => g.category === cat.id).length} games
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Games Grid Section ────────────────────────────────────────────────────────
function GamesSection({ id, heading, games, emptyMsg = 'No games found.' }) {
  if (games.length === 0) {
    return (
      <section id={id} className="section" aria-labelledby={`${id}-heading`}>
        <div className="container">
          <div className="section-header">
            <h2 id={`${id}-heading`}>{heading}</h2>
          </div>
          <div className="empty-state" role="status" aria-live="polite">
            <span className="empty-state__icon" aria-hidden="true">🔍</span>
            <p>{emptyMsg}</p>
            <p className="empty-state__sub">Try a different search term or category.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="section" aria-labelledby={`${id}-heading`}>
      <div className="container">
        <div className="section-header">
          <h2 id={`${id}-heading`}>{heading}</h2>
          <p>{games.length} game{games.length !== 1 ? 's' : ''} available</p>
        </div>
        <div className="games__grid" role="list" aria-label={heading}>
          {games.map(game => (
            <div key={game.id} role="listitem">
              <GameCard game={game} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Leaderboard Section ───────────────────────────────────────────────────────
function LeaderboardSection() {
  return (
    <section id="leaderboard" className="section" aria-labelledby="leaderboard-heading">
      <div className="container">
        <div className="section-header">
          <h2 id="leaderboard-heading">🏆 <span className="gradient-text">Leaderboard</span></h2>
          <p>
            <span className="badge badge-purple">Demo Scores</span>
            &nbsp; These are sample scores for demonstration purposes — not real player records.
          </p>
        </div>
        <div className="leaderboard__card">
          <div className="leaderboard__header" aria-hidden="true">
            <span>#</span><span>Player</span><span>Game</span><span>Score</span>
          </div>
          <ol className="leaderboard__list" aria-label="Top players leaderboard">
            {LEADERBOARD.map(entry => (
              <li key={entry.rank} className={`leaderboard__row rank-${entry.rank}`}>
                <span className="lb__rank">
                  {entry.rank <= 3 ? entry.badge : `#${entry.rank}`}
                </span>
                <span className="lb__player">
                  <span className="lb__avatar" aria-hidden="true">{entry.avatar}</span>
                  {entry.player}
                </span>
                <span className="lb__game">{entry.game}</span>
                <span className="lb__score">{entry.score.toLocaleString()}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

// ── Premium Section ───────────────────────────────────────────────────────────
function PremiumSection() {
  return (
    <section id="premium" className="section" aria-labelledby="premium-heading">
      <div className="container">
        <div className="premium__card">
          <div className="premium__glow" aria-hidden="true" />
          <div className="premium__content">
            <div className="premium__badge">
              <span className="badge badge-purple">✨ Coming Soon</span>
            </div>
            <h2 id="premium-heading" className="heading-font premium__title">
              PlayZone <span className="gradient-text">Premium</span>
            </h2>
            <p className="premium__desc">
              A demonstration of a potential future ad-free membership.
              No payments are processed — this is a preview only.
            </p>
            <div className="premium__features">
              {[
                { icon: '🚫', text: 'Ad-free gaming experience' },
                { icon: '⚡', text: 'Exclusive premium games' },
                { icon: '🏆', text: 'Global leaderboard access' },
                { icon: '🎨', text: 'Custom profile themes' },
              ].map(f => (
                <div key={f.text} className="premium__feature">
                  <span aria-hidden="true">{f.icon}</span>
                  <span>{f.text}</span>
                </div>
              ))}
            </div>
            <button className="btn btn-primary premium__cta" disabled aria-label="Premium membership - coming soon, not yet available">
              🚀 Coming Soon
            </button>
            <p className="premium__disclaimer">
              * This is a demonstration section only. No subscriptions or payments are available.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Main HomePage ─────────────────────────────────────────────────────────────
export default function HomePage({ searchQuery }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredGames = useMemo(() => {
    let games = GAMES;
    if (activeCategory !== 'all') {
      games = games.filter(g => g.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      games = games.filter(g =>
        g.title.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q)
      );
    }
    return games;
  }, [activeCategory, searchQuery]);

  const newGames    = useMemo(() => filteredGames.filter(g => g.isNew), [filteredGames]);
  const popularGames = useMemo(() => filteredGames.filter(g => !g.isNew), [filteredGames]);

  const handleCategorySelect = (catId) => {
    setActiveCategory(catId);
    setTimeout(() => document.getElementById('popular')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const isFiltering = searchQuery.trim() || activeCategory !== 'all';

  return (
    <main id="main-content">
      {!isFiltering && <HeroSection />}

      <div className="section-sm">
        <div className="container">
          <AdBanner size="leaderboard" />
        </div>
      </div>

      <div className="divider" />
      <CategoriesSection activeCategory={activeCategory} onCategorySelect={handleCategorySelect} />
      <div className="divider" />

      {isFiltering ? (
        <GamesSection
          id="popular"
          heading={`Search Results ${searchQuery ? `for "${searchQuery}"` : ''}`}
          games={filteredGames}
          emptyMsg="No games match your search."
        />
      ) : (
        <>
          <GamesSection
            id="popular"
            heading="🔥 Popular Games"
            games={popularGames}
          />
          <div className="section-sm">
            <div className="container">
              <AdBanner size="banner" />
            </div>
          </div>
          <GamesSection
            id="new"
            heading="✨ New Games"
            games={newGames}
          />
        </>
      )}

      <div className="divider" />
      <LeaderboardSection />
      <div className="divider" />
      <PremiumSection />
    </main>
  );
}
