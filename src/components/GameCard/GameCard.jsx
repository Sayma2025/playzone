import { useNavigate } from 'react-router-dom';
import './GameCard.css';

const CATEGORY_COLORS = {
  arcade: '#22d3ee',
  puzzle: '#a855f7',
  action: '#ef4444',
  racing: '#f59e0b',
  adventure: '#22c55e',
  brain: '#ec4899',
};

const CATEGORY_ICONS = {
  arcade: '🕹️', puzzle: '🧩', action: '⚡',
  racing: '🏎️', adventure: '🗺️', brain: '🧠',
};

// Generate a canvas-based thumbnail colour pattern for each game
function GameThumbnail({ game }) {
  const color = CATEGORY_COLORS[game.category] || '#4f9eff';
  const icon = CATEGORY_ICONS[game.category] || '🎮';

  const styles = {
    background: `radial-gradient(circle at 30% 30%, ${game.bgColor || '#1e2048'} 0%, ${game.bgColor ? game.bgColor + 'dd' : '#0f1028'} 100%)`,
    borderBottom: `2px solid ${color}22`,
  };

  return (
    <div className="game-thumb" style={styles} aria-hidden="true">
      <div className="game-thumb__glow" style={{ background: `radial-gradient(circle, ${color}44 0%, transparent 70%)` }} />
      <span className="game-thumb__icon">{icon}</span>
      <div className="game-thumb__stars">
        {Array.from({ length: 12 }, (_, i) => (
          <span
            key={i}
            className="thumb-star"
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 90 + 5}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
              background: color,
            }}
          />
        ))}
      </div>
      {game.isNew && <span className="game-thumb__badge">NEW</span>}
    </div>
  );
}

export default function GameCard({ game }) {
  const navigate = useNavigate();
  const color = CATEGORY_COLORS[game.category] || '#4f9eff';

  const handlePlay = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/game/${game.id}`);
  };

  return (
    <article
      className="game-card"
      onClick={handlePlay}
      style={{ '--card-accent': color }}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handlePlay(e)}
      aria-label={`${game.title} - ${game.category} game. ${game.description}`}
    >
      <GameThumbnail game={game} />

      <div className="game-card__body">
        <div className="game-card__meta">
          <span className="badge" style={{
            background: `${color}22`,
            color: color,
            border: `1px solid ${color}44`
          }}>
            {CATEGORY_ICONS[game.category]} {game.category}
          </span>
          <div className="game-card__rating" aria-label={`Rating: ${game.rating} stars`}>
            <span aria-hidden="true">⭐</span>
            <span>{game.rating}</span>
          </div>
        </div>

        <h3 className="game-card__title">{game.title}</h3>
        <p className="game-card__desc">{game.description}</p>

        <div className="game-card__footer">
          <span className="game-card__plays" aria-label={`${game.plays} plays`}>
            🎮 {game.plays} plays
          </span>
          <button
            className="btn btn-primary btn-sm"
            onClick={handlePlay}
            aria-label={`Play ${game.title}`}
          >
            ▶ Play
          </button>
        </div>
      </div>
    </article>
  );
}
