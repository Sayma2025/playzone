import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { GAMES } from '../../data/games';
import { GAME_ENGINES } from '../../games/gameEngines';
import AdBanner from '../../components/AdBanner/AdBanner';
import GameCard from '../../components/GameCard/GameCard';
import './GamePage.css';

const CATEGORY_COLORS = {
  arcade: '#22d3ee', puzzle: '#a855f7', action: '#ef4444',
  racing: '#f59e0b', adventure: '#22c55e', brain: '#ec4899',
};

export default function GamePage() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const iframeRef = useRef(null);

  const game = GAMES.find(g => g.id === gameId);

  useEffect(() => {
    if (game) {
      document.title = `${game.title} — PlayZone`;
      window.scrollTo({ top: 0 });
    }
  }, [game]);

  if (!game) {
    return (
      <main className="game-page game-page--notfound" role="main">
        <div className="container">
          <div className="notfound">
            <span className="notfound__icon" aria-hidden="true">🎮</span>
            <h1>Game Not Found</h1>
            <p>The game you're looking for doesn't exist or has been removed.</p>
            <Link to="/" className="btn btn-primary">← Back to Games</Link>
          </div>
        </div>
      </main>
    );
  }

  const accentColor = CATEGORY_COLORS[game.category] || '#4f9eff';
  const gameSrc = GAME_ENGINES[game.gameKey] ? GAME_ENGINES[game.gameKey]() : null;
  const relatedGames = GAMES.filter(g => g.category === game.category && g.id !== game.id).slice(0, 3);

  return (
    <main className="game-page" role="main" aria-labelledby="game-title">
      {/* ── Breadcrumb ── */}
      <div className="game-page__breadcrumb" style={{ borderBottom: `1px solid ${accentColor}22` }}>
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb">
              <li><Link to="/">Home</Link></li>
              <li aria-hidden="true">›</li>
              <li><a href="/#categories">{game.category}</a></li>
              <li aria-hidden="true">›</li>
              <li aria-current="page">{game.title}</li>
            </ol>
          </nav>
          <button
            className="btn btn-secondary btn-sm back-btn"
            onClick={() => navigate(-1)}
            aria-label="Go back to previous page"
            id="back-to-games-btn"
          >
            ← Back to Games
          </button>
        </div>
      </div>

      <div className="container game-page__layout">
        {/* ── Left: Game Area ── */}
        <div className="game-page__main">
          {/* Game Header */}
          <div className="game-header" style={{ '--accent': accentColor }}>
            <div className="game-header__top">
              <div className="game-header__badges">
                <span className="badge" style={{ background: `${accentColor}22`, color: accentColor, border: `1px solid ${accentColor}44` }}>
                  {game.category}
                </span>
                {game.isNew && <span className="badge badge-green">✨ New</span>}
                <span className="badge badge-blue">🎮 Free to Play</span>
              </div>
              <div className="game-header__rating" aria-label={`Rating: ${game.rating} out of 5`}>
                <span aria-hidden="true">⭐</span> {game.rating} · {game.plays} plays
              </div>
            </div>
            <h1 id="game-title" className="heading-font game-header__title">{game.title}</h1>
            <p className="game-header__desc">{game.longDescription}</p>
            <div className="game-header__controls" aria-label="Controls information">
              <span aria-hidden="true">🕹️</span>
              <strong>Controls:</strong> {game.controls}
            </div>
          </div>

          {/* Ad Banner above game */}
          <AdBanner size="banner" className="game-page__ad-top" />

          {/* Game Area */}
          <div
            className="game-area"
            style={{ borderColor: `${accentColor}55`, boxShadow: `0 0 40px ${accentColor}22` }}
            role="region"
            aria-label={`${game.title} game area`}
          >
            <div className="game-area__header">
              <span className="game-area__status" aria-hidden="true">
                <span className="status-dot" style={{ background: accentColor }} />
                Playing: {game.title}
              </span>
              <span className="game-area__hint">Click inside game to focus controls</span>
            </div>

            {gameSrc ? (
              <iframe
                ref={iframeRef}
                srcDoc={gameSrc}
                className="game-iframe"
                title={`Play ${game.title}`}
                sandbox="allow-scripts allow-same-origin"
                loading="lazy"
                aria-label={`${game.title} game window`}
              />
            ) : (
              <div className="game-area__unavailable">
                <span aria-hidden="true">⚠️</span>
                <p>This game is not yet available. Check back soon!</p>
              </div>
            )}
          </div>

          {/* Ad Banner below game */}
          <AdBanner size="banner" className="game-page__ad-bottom" />

          {/* Long Description / How to Play */}
          <div className="game-howto">
            <h2 className="heading-font">How to Play</h2>
            <p>{game.longDescription}</p>
            <div className="game-howto__tags">
              {game.tags.map(tag => (
                <span key={tag} className="badge badge-blue">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: Sidebar ── */}
        <aside className="game-page__sidebar" aria-label="Game sidebar">
          {/* Sidebar Ad */}
          <div className="sidebar-section">
            <AdBanner size="rectangle" />
          </div>

          {/* Game Info */}
          <div className="sidebar-card">
            <h3 className="heading-font sidebar-card__heading">Game Info</h3>
            <dl className="game-info-list">
              <div>
                <dt>Category</dt>
                <dd style={{ color: accentColor, textTransform: 'capitalize' }}>{game.category}</dd>
              </div>
              <div>
                <dt>Controls</dt>
                <dd>{game.controls}</dd>
              </div>
              <div>
                <dt>Rating</dt>
                <dd>⭐ {game.rating} / 5</dd>
              </div>
              <div>
                <dt>Total Plays</dt>
                <dd>{game.plays}</dd>
              </div>
              <div>
                <dt>Type</dt>
                <dd>HTML5 Browser Game</dd>
              </div>
            </dl>
          </div>

          {/* Related Games */}
          {relatedGames.length > 0 && (
            <div className="sidebar-card">
              <h3 className="heading-font sidebar-card__heading">More {game.category} Games</h3>
              <div className="related-games">
                {relatedGames.map(g => (
                  <button
                    key={g.id}
                    className="related-game-btn"
                    onClick={() => navigate(`/game/${g.id}`)}
                    aria-label={`Play ${g.title}`}
                    style={{ '--rg-color': CATEGORY_COLORS[g.category] || '#4f9eff' }}
                  >
                    <span className="related-game-icon" aria-hidden="true">🎮</span>
                    <div>
                      <p className="related-game-title">{g.title}</p>
                      <p className="related-game-cat">{g.category}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Second Sidebar Ad */}
          <div className="sidebar-section">
            <AdBanner size="rectangle" />
          </div>
        </aside>
      </div>
    </main>
  );
}
