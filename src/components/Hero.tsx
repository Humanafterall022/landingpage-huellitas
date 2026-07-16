import React from 'react';
import { Download, Shield, MapPin, BrainCircuit } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <header style={styles.header}>
      {/* Navbar */}
      <nav style={styles.nav}>
        <div style={styles.logoContainer}>
          <img src="/logo.png" alt="HuellitasIA Logo" style={styles.logoImg} />
          <span style={styles.logoText}>Huellitas<span style={styles.logoHighlight}>IA</span></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a href="/api/download" style={styles.navBtn}>
            <Download size={16} style={{ marginRight: '6px' }} /> Descargar APK
          </a>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="hero-grid">
        <div style={styles.heroLeft}>
          <div className="hero-tag">
            <span style={styles.tagDot}></span>
            <span>Inteligencia Artificial & Geolocalización</span>
          </div>
          <h1 className="hero-title">
            Reencuentros <span className="text-gradient-coral">Rápidos</span>,<br />
            Mascotas a salvo con <span className="text-gradient-cyan">HUELLITAS AI</span>
          </h1>
          <p style={styles.subtitle}>
            HuellitasIA utiliza algoritmos avanzados de visión artificial para identificar y emparejar instantáneamente mascotas perdidas y encontradas. Localiza a tu mejor amigo con mapas en tiempo real y alertas comunitarias.
          </p>

          <div style={styles.ctaContainer}>
            <div className="cta-row">
              <a href="/api/download" style={styles.primaryBtn} className="glow-cyan">
                <Download size={20} style={{ marginRight: '8px' }} />
                Descargar APK
              </a>
              <div style={styles.playstoreWrapper}>
                <button style={styles.playstoreBtn} disabled title="Próximamente en Google Play Store">
                  <span style={{ marginRight: '8px', fontSize: '18px' }}>🤖</span>
                  <span>Play Store</span>
                </button>
                <span style={styles.comingSoonBadge}>Coming Soon</span>
              </div>
            </div>
            <div className="version-info">
              <span>Versión 1.0.0 (Estable)</span>
              <span style={styles.bullet}>•</span>
              <span> (Android)</span>
            </div>
          </div>

          <div className="badge-grid">
            <div style={styles.badge}>
              <BrainCircuit size={18} color="var(--color-secondary)" style={{ marginRight: '8px' }} />
              <span>Detección YOLO</span>
            </div>
            <div style={styles.badge}>
              <MapPin size={18} color="var(--color-primary)" style={{ marginRight: '8px' }} />
              <span>Geolocalización GPS</span>
            </div>
            <div style={styles.badge}>
              <Shield size={18} color="var(--color-accent)" style={{ marginRight: '8px' }} />
              <span>100% Seguro</span>
            </div>
          </div>
        </div>

        {/* Mockup del Teléfono de la App con captura real */}
        <div style={styles.heroRight}>
          <div className="device-frame" style={{ animation: 'float 6s ease-in-out infinite' }}>
            <div className="device-screen" style={styles.appBg}>
              <img
                src="/avistamientos.png"
                alt="HuellitasIA App Avistamientos Screen"
                style={styles.screenshotImg}
              />
            </div>
          </div>
          {/* Decorative glowing background behind the phone */}
          <div style={styles.glowBg}></div>
        </div>
      </div>
    </header>
  );
};

const styles: Record<string, React.CSSProperties> = {
  header: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 0',
    borderBottom: '1px solid rgba(15, 23, 42, 0.06)',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoImg: {
    height: '38px',
    width: 'auto',
    objectFit: 'contain',
  },
  logoIcon: {
    fontSize: '24px',
  },
  logoText: {
    fontFamily: 'var(--font-heading)',
    fontSize: '22px',
    fontWeight: 800,
    letterSpacing: '-0.5px',
    color: 'var(--text-main)',
  },
  logoHighlight: {
    color: 'var(--color-secondary)',
  },
  navBtn: {
    background: 'rgba(15, 23, 42, 0.04)',
    border: '1px solid rgba(15, 23, 42, 0.08)',
    color: 'var(--text-main)',
    padding: '10px 20px',
    borderRadius: '10px',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 600,
    display: 'inline-flex',
    alignItems: 'center',
    transition: 'var(--transition-smooth)',
  },
  navLink: {
    color: 'var(--text-muted)',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 600,
    transition: 'var(--transition-smooth)',
    cursor: 'pointer',
  },
  heroGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 0.8fr',
    gap: '64px',
    alignItems: 'center',
    padding: '80px 0',
  },
  heroLeft: {
    display: 'flex',
    flexDirection: 'column',
  },
  tag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    alignSelf: 'flex-start',
    backgroundColor: 'var(--color-secondary-glow)',
    border: '1px solid rgba(14, 165, 233, 0.2)',
    padding: '6px 14px',
    borderRadius: '100px',
    color: 'var(--color-secondary)',
    fontSize: '13px',
    fontWeight: 600,
    marginBottom: '24px',
  },
  tagDot: {
    width: '6px',
    height: '6px',
    backgroundColor: 'var(--color-secondary)',
    borderRadius: '50%',
    boxShadow: '0 0 8px var(--color-secondary)',
  },
  title: {
    fontFamily: 'var(--font-heading)',
    fontSize: '52px',
    fontWeight: 800,
    lineHeight: 1.15,
    letterSpacing: '-1px',
    marginBottom: '20px',
    color: 'var(--text-main)',
  },
  subtitle: {
    fontSize: '18px',
    color: 'var(--text-muted)',
    lineHeight: 1.6,
    marginBottom: '36px',
    maxWidth: '560px',
  },
  ctaContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '12px',
    marginBottom: '48px',
  },
  ctaRow: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
  },
  playstoreWrapper: {
    position: 'relative',
    display: 'inline-flex',
  },
  playstoreBtn: {
    background: 'rgba(15, 23, 42, 0.02)',
    border: '1px dashed rgba(15, 23, 42, 0.15)',
    color: 'var(--text-muted)',
    padding: '15px 28px',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: 600,
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'not-allowed',
    opacity: 0.65,
    boxSizing: 'border-box',
  },
  comingSoonBadge: {
    position: 'absolute',
    top: '-9px',
    right: '-6px',
    backgroundColor: 'var(--color-primary)',
    color: '#fff',
    fontSize: '8px',
    fontWeight: 800,
    padding: '2px 7px',
    borderRadius: '100px',
    boxShadow: '0 3px 6px rgba(255, 78, 32, 0.25)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  primaryBtn: {
    background: 'linear-gradient(135deg, var(--color-secondary) 0%, #0284c7 100%)',
    color: '#fff',
    padding: '15px 32px',
    borderRadius: '12px',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: 700,
    display: 'inline-flex',
    alignItems: 'center',
    transition: 'var(--transition-smooth)',
    boxShadow: '0 4px 14px rgba(14, 165, 233, 0.3)',
  },
  versionInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: 'var(--text-muted)',
    fontSize: '13px',
    fontWeight: 500,
    marginLeft: '8px',
  },
  bullet: {
    fontSize: '8px',
  },
  badgeGrid: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  badge: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.03)',
    border: '1px solid rgba(15, 23, 42, 0.05)',
    padding: '8px 16px',
    borderRadius: '100px',
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--text-main)',
  },
  heroRight: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  glowBg: {
    position: 'absolute',
    width: '320px',
    height: '320px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(14, 165, 233, 0.1) 0%, transparent 70%)',
    zIndex: -1,
  },
  appBg: {
    background: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
  screenshotImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  }
};
