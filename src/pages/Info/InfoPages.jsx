import { Link } from 'react-router-dom';
import './InfoPages.css';

export function AboutPage() {
  return (
    <main className="info-page" aria-labelledby="about-heading">
      <div className="info-page__hero">
        <div className="container">
          <span className="info-page__icon" aria-hidden="true">🎮</span>
          <h1 id="about-heading" className="heading-font gradient-text">About PlayZone</h1>
          <p>Your ultimate destination for free browser games</p>
        </div>
      </div>
      <div className="container info-page__body">
        <div className="info-card">
          <h2>What is PlayZone?</h2>
          <p>
            PlayZone is a free browser gaming portal built as a Web Engineering laboratory project.
            It aims to provide an accessible, polished platform where anyone can discover and enjoy
            HTML5 games directly in their browser — with no downloads, no registrations, and no cost.
          </p>
          <p>
            All games available on PlayZone are original HTML5 demonstrations created specifically
            for this project. They are built with vanilla HTML, CSS, and JavaScript and run entirely
            in your browser.
          </p>
        </div>

        <div className="info-card">
          <h2>Our Mission</h2>
          <p>
            To make gaming accessible to everyone. We believe great gaming experiences shouldn't require
            expensive hardware, complex installations, or paid subscriptions. Browser gaming should be
            instant, fun, and completely free.
          </p>
        </div>

        <div className="info-grid">
          {[
            { icon: '🚀', title: 'Instant Play', desc: 'No downloads required. Click Play and start gaming in seconds.' },
            { icon: '🆓', title: 'Always Free', desc: 'All games are completely free. No hidden costs or premium paywalls for basic features.' },
            { icon: '📱', title: 'Works Everywhere', desc: 'Responsive design means PlayZone works on desktops, tablets, and phones.' },
            { icon: '🎯', title: 'Original Games', desc: 'All games are original HTML5 demos, not third-party embeds.' },
          ].map(item => (
            <div key={item.title} className="info-feature-card">
              <span className="info-feature-card__icon" aria-hidden="true">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="info-card">
          <h2>Technology</h2>
          <p>
            PlayZone is built with <strong>React + Vite</strong> for a fast, modern development experience.
            All games are self-contained HTML5 applications rendered in sandboxed iframes.
            The project uses vanilla CSS for styling, and <strong>react-router-dom</strong> for navigation.
            No backend, database, or paid services are required.
          </p>
          <div className="tech-tags">
            {['React', 'Vite', 'HTML5', 'CSS3', 'JavaScript', 'React Router'].map(t => (
              <span key={t} className="badge badge-blue">{t}</span>
            ))}
          </div>
        </div>

        <div className="info-card info-card--note">
          <h2>📋 Educational Project Note</h2>
          <p>
            PlayZone was created as a Web Engineering Laboratory project. It demonstrates
            front-end development techniques including responsive design, component architecture,
            canvas game development, and accessibility best practices. It is not a commercial product.
          </p>
        </div>

        <div className="info-page__back">
          <Link to="/" className="btn btn-primary">← Back to Games</Link>
        </div>
      </div>
    </main>
  );
}

export function ContactPage() {
  return (
    <main className="info-page" aria-labelledby="contact-heading">
      <div className="info-page__hero">
        <div className="container">
          <span className="info-page__icon" aria-hidden="true">📬</span>
          <h1 id="contact-heading" className="heading-font gradient-text">Contact Us</h1>
          <p>Get in touch with the PlayZone team</p>
        </div>
      </div>
      <div className="container info-page__body">
        <div className="info-card">
          <h2>Contact Information</h2>
          <p>
            PlayZone is a student educational project. For academic enquiries, please contact via
            your institution's channels.
          </p>
          <div className="contact-items">
            {[
              { icon: '📧', label: 'Email', value: 'playzone@example.edu (placeholder)' },
              { icon: '🎓', label: 'Project Type', value: 'Web Engineering Lab Assignment' },
              { icon: '📍', label: 'Purpose', value: 'Educational Demonstration' },
            ].map(item => (
              <div key={item.label} className="contact-item">
                <span aria-hidden="true">{item.icon}</span>
                <div>
                  <strong>{item.label}:</strong> {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="info-card">
          <h2>Send a Message</h2>
          <p className="contact-note">
            <span aria-hidden="true">⚠️</span> This contact form is a demonstration only. Messages are not sent or stored.
          </p>
          <form className="contact-form" onSubmit={(e) => e.preventDefault()} aria-label="Contact form (demonstration only)">
            <div className="form-group">
              <label htmlFor="contact-name">Name</label>
              <input id="contact-name" type="text" placeholder="Your name" className="form-input" disabled />
            </div>
            <div className="form-group">
              <label htmlFor="contact-email">Email</label>
              <input id="contact-email" type="email" placeholder="your@email.com" className="form-input" disabled />
            </div>
            <div className="form-group">
              <label htmlFor="contact-subject">Subject</label>
              <input id="contact-subject" type="text" placeholder="Message subject" className="form-input" disabled />
            </div>
            <div className="form-group">
              <label htmlFor="contact-message">Message</label>
              <textarea id="contact-message" placeholder="Your message..." rows={5} className="form-input" disabled />
            </div>
            <button type="submit" className="btn btn-primary" disabled aria-label="Send message (not functional - demonstration only)">
              📨 Send Message (Demo Only)
            </button>
          </form>
        </div>

        <div className="info-page__back">
          <Link to="/" className="btn btn-secondary">← Back to Games</Link>
        </div>
      </div>
    </main>
  );
}

export function PrivacyPage() {
  return (
    <main className="info-page" aria-labelledby="privacy-heading">
      <div className="info-page__hero">
        <div className="container">
          <span className="info-page__icon" aria-hidden="true">🔒</span>
          <h1 id="privacy-heading" className="heading-font gradient-text">Privacy Policy</h1>
          <p>Last reviewed: October 2026 (Educational Project)</p>
        </div>
      </div>
      <div className="container info-page__body">
        <div className="info-card info-card--note">
          <h2>⚠️ Important Notice</h2>
          <p>
            This Privacy Policy is a demonstration document created for an educational web engineering project.
            PlayZone does not collect, store, or process any personal data. This document illustrates
            what a privacy policy might include, but <strong>it does not constitute legally binding compliance</strong>.
            Do not rely on this document for real data protection purposes.
          </p>
        </div>
        {[
          {
            title: '1. Information We Do Not Collect',
            content: `In this educational version of PlayZone, we do not collect any personal information.
            No cookies for tracking, no user accounts, no analytics data, and no payment information are
            stored or processed. All games run entirely in your browser.`
          },
          {
            title: '2. Local Storage',
            content: `Game high scores may be stored temporarily in your browser's localStorage to persist
            between sessions. This data never leaves your device and is not transmitted to any server.
            You can clear this data at any time through your browser settings.`
          },
          {
            title: '3. Third-Party Services',
            content: `PlayZone uses Google Fonts for typography (loaded from Google's CDN). This request
            is made to Google's servers. In a production version, this and similar third-party integrations
            would be subject to those providers' privacy policies.`
          },
          {
            title: '4. Advertising',
            content: `This version of PlayZone contains advertising placeholder sections only. No real
            advertising networks are integrated. When/if advertising is added in future, this policy would
            be updated to disclose data collection by advertising partners.`
          },
          {
            title: '5. Children\'s Privacy',
            content: `PlayZone is intended to be a family-friendly gaming platform. In a production version,
            we would implement appropriate measures to comply with children's online privacy regulations.`
          },
          {
            title: '6. Changes to This Policy',
            content: `As this is an educational demonstration, this policy may be updated as the project develops.
            Any material changes would be noted in the project documentation.`
          },
        ].map(section => (
          <div key={section.title} className="info-card">
            <h2>{section.title}</h2>
            <p>{section.content}</p>
          </div>
        ))}
        <div className="info-page__back">
          <Link to="/" className="btn btn-secondary">← Back to Games</Link>
        </div>
      </div>
    </main>
  );
}

export function TermsPage() {
  return (
    <main className="info-page" aria-labelledby="terms-heading">
      <div className="info-page__hero">
        <div className="container">
          <span className="info-page__icon" aria-hidden="true">📋</span>
          <h1 id="terms-heading" className="heading-font gradient-text">Terms &amp; Conditions</h1>
          <p>Last reviewed: October 2026 (Educational Project)</p>
        </div>
      </div>
      <div className="container info-page__body">
        <div className="info-card info-card--note">
          <h2>⚠️ Educational Project Notice</h2>
          <p>
            These Terms and Conditions are a demonstration document for an educational web engineering project.
            They do not constitute legally binding terms of service. PlayZone is not a commercial service
            and these terms exist to illustrate what a real gaming portal's terms might include.
          </p>
        </div>
        {[
          {
            title: '1. Acceptance of Terms',
            content: `By accessing PlayZone, you acknowledge that this is an educational demonstration project.
            These terms are illustrative only. No binding agreement is formed by using this site.`
          },
          {
            title: '2. Use of the Service',
            content: `PlayZone provides free browser-based games for entertainment purposes. You agree to use
            the service only for personal, non-commercial purposes. You must not attempt to decompile,
            reverse engineer, or misuse the platform.`
          },
          {
            title: '3. Game Content',
            content: `All games on PlayZone are original HTML5 demonstrations. They are provided "as is"
            for educational and entertainment purposes. Game scores and leaderboard entries marked as
            "demo" are fictional and do not represent real player achievements.`
          },
          {
            title: '4. Intellectual Property',
            content: `All game code, design, and content on PlayZone was created for this educational project.
            The PlayZone name and branding are used within the context of this lab assignment.`
          },
          {
            title: '5. Disclaimer of Warranties',
            content: `PlayZone is provided "as is" without any warranty. As an educational project,
            service continuity is not guaranteed. The platform may be modified or taken offline at any time.`
          },
          {
            title: '6. Premium Features',
            content: `The "Premium" section visible on this site is a design demonstration only.
            No subscriptions, payments, or premium accounts are available or will be charged.`
          },
          {
            title: '7. Advertising',
            content: `Advertising placeholders are visible throughout the site. No real advertisements
            are served and no advertising revenue is generated. These placeholders illustrate where
            legitimate ad placements might appear in a production version.`
          },
        ].map(section => (
          <div key={section.title} className="info-card">
            <h2>{section.title}</h2>
            <p>{section.content}</p>
          </div>
        ))}
        <div className="info-page__back">
          <Link to="/" className="btn btn-secondary">← Back to Games</Link>
        </div>
      </div>
    </main>
  );
}
