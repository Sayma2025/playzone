import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/Home/HomePage';
import GamePage from './pages/Game/GamePage';
import { AboutPage, ContactPage, PrivacyPage, TermsPage } from './pages/Info/InfoPages';

// ScrollToTop on route change
function ScrollToTop() {
  const location = useLocation();
  return null; // Handled per-page
}

function AppLayout() {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  // Clear search when navigating away from home
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (location.pathname !== '/') {
      window.location.href = '/';
    }
  };

  return (
    <>
      <a href="#main-content" className="skip-link" tabIndex={0}>Skip to main content</a>
      <Header searchQuery={searchQuery} onSearch={handleSearch} />
      <Routes>
        <Route path="/"             element={<HomePage searchQuery={searchQuery} />} />
        <Route path="/game/:gameId" element={<GamePage />} />
        <Route path="/about"        element={<AboutPage />} />
        <Route path="/contact"      element={<ContactPage />} />
        <Route path="/privacy"      element={<PrivacyPage />} />
        <Route path="/terms"        element={<TermsPage />} />
        <Route path="*"             element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

function NotFoundPage() {
  return (
    <main style={{ paddingTop: 'var(--header-height)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div>
        <span style={{ fontSize: '5rem', display: 'block', marginBottom: '1rem', animation: 'float 3s ease-in-out infinite' }}>🎮</span>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', marginBottom: '0.5rem' }}>404</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Page not found. Lost in the game?</p>
        <a href="/" className="btn btn-primary">← Back to Home</a>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
