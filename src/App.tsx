import React, { useEffect } from 'react';
import { Hero } from './components/Hero';
import { YoloDemo } from './components/YoloDemo';
import { GeolocationMap } from './components/GeolocationMap';
import { Screenshots } from './components/Screenshots';
import { Features } from './components/Features';
import { Pricing } from './components/Pricing';
import { InstallGuide } from './components/InstallGuide';
import { PMVSurvey, SURVEY_URL } from './components/PMVSurvey';
import { AdminModal } from './components/AdminModal';
import { Lock } from 'lucide-react';
import { initAnalyticsTracker, trackSurveyClick } from './utils/analytics';

function App() {
  const [isAdminModalOpen, setIsAdminModalOpen] = React.useState(false);

  useEffect(() => {
    initAnalyticsTracker();
  }, []);

  return (
    <div style={styles.appContainer}>
      {/* Announcement Banner */}
      <div style={styles.announcementBanner}>
        <span>📋 Ayúdanos a mejorar: completa la <strong>Encuesta de Validación PMV</strong> de Huellitas AI.</span>
        <a
          href={SURVEY_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackSurveyClick}
          style={styles.announcementLink}
          className="announcement-hover-link"
        >
          Responder encuesta →
        </a>
      </div>

      {/* Hero Header Section */}
      <Hero />

      {/* Spacers with glowing dividing lines */}
      <div style={styles.glowDivider}></div>

      {/* Features Grid */}
      <Features />

      <div style={styles.glowDivider}></div>

      {/* YOLO AI Simulation */}
      <YoloDemo />

      <div style={styles.glowDivider}></div>

      {/* Geolocation Radar Map */}
      <GeolocationMap />

      <div style={styles.glowDivider}></div>

      {/* High-Fidelity Mobile App Screenshots */}
      <Screenshots />

      <div style={styles.glowDivider}></div>

      {/* Modelo de Sostenibilidad / Pricing */}
      <Pricing />

      <div style={styles.glowDivider}></div>

      {/* Step by step install guide for APK */}
      <InstallGuide />

      <div style={styles.glowDivider}></div>

      {/* Encuesta de Validación del PMV */}
      <PMVSurvey />

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerBrand}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src="/logo.png" alt="HuellitasIA Logo" style={{ height: '32px', objectFit: 'contain' }} />
              <span style={styles.footerLogo}>Huellitas<span style={styles.logoHighlight}>IA</span></span>
            </div>
            <p style={styles.footerTagline}>
              Reuniendo familias con el poder de la Inteligencia Artificial.
            </p>
          </div>

          <div style={styles.footerLinks}>
            <div style={styles.footerCol}>
              <h5 style={styles.footerColTitle}>Equipo de Desarrollo</h5>
              <span style={styles.footerLink}>Champi Sanchez Manuel M.</span>
              <span style={styles.footerLink}>Quispe S. Luis Fernando</span>
              <span style={styles.footerLink}>Mendoza Hilasaca Emerson</span>
              <span style={styles.footerLink}>Tinta Aguilar Miguel Ángel</span>
            </div>
            <div style={styles.footerCol}>
              <h5 style={styles.footerColTitle}>Tecnología</h5>
              <a href="#demo" style={styles.footerLink}>Algoritmo YOLO</a>
              <a href="#mapa" style={styles.footerLink}>Geolocalización GPS</a>
              <a href="#features" style={styles.footerLink}>Red Neuronal</a>
            </div>
            <div style={styles.footerCol}>
              <h5 style={styles.footerColTitle}>Soporte</h5>
              <a href="#guia" style={styles.footerLink}>Guía de Instalación</a>
              <a href="/api/download" style={styles.footerLink}>Descargar APK</a>
              <a href={SURVEY_URL} target="_blank" rel="noopener noreferrer" onClick={trackSurveyClick} style={styles.footerLink}>Encuesta PMV</a>
              <span style={styles.footerLinkDisabled}>Términos de Servicio</span>
            </div>
          </div>
        </div>

        <div style={styles.footerBottom}>
          <p>© {new Date().getFullYear()} HuellitasIA. Todos los derechos reservados.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <p style={{ color: 'var(--text-dark)' }}>Desarrollado para la protección y reencuentro de mascotas.</p>
            <button
              onClick={() => setIsAdminModalOpen(true)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dark)', padding: '2px', display: 'inline-flex', alignItems: 'center' }}
              title="Administración"
            >
              <Lock size={12} />
            </button>
          </div>
        </div>
      </footer>

      <AdminModal isOpen={isAdminModalOpen} onClose={() => setIsAdminModalOpen(false)} />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  appContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden',
  },
  announcementBanner: {
    width: '100%',
    background: 'linear-gradient(90deg, rgba(14, 165, 233, 0.08) 0%, rgba(255, 78, 32, 0.08) 100%)',
    borderBottom: '1px solid rgba(14, 165, 233, 0.15)',
    padding: '10px 24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '12px',
    fontSize: '14px',
    color: 'var(--text-main)',
    textAlign: 'center',
    flexWrap: 'wrap',
    zIndex: 100,
  },
  announcementLink: {
    color: 'var(--color-primary)',
    fontWeight: 700,
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    transition: 'var(--transition-smooth)',
    cursor: 'pointer',
  },
  glowDivider: {
    width: '100%',
    maxWidth: '1200px',
    height: '1px',
    margin: '40px auto',
    background: 'linear-gradient(90deg, transparent 0%, rgba(14, 165, 233, 0.15) 50%, transparent 100%)',
  },
  logoHighlight: {
    color: 'var(--color-secondary)',
  },
  footer: {
    borderTop: '1px solid rgba(15, 23, 42, 0.06)',
    backgroundColor: '#ffffff',
    padding: '60px 24px 30px',
    marginTop: '80px',
  },
  footerContent: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto 40px',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '40px',
  },
  footerBrand: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    maxWidth: '300px',
  },
  footerLogo: {
    fontFamily: 'var(--font-heading)',
    fontSize: '20px',
    fontWeight: 800,
    color: 'var(--text-main)',
  },
  footerTagline: {
    fontSize: '14px',
    color: 'var(--text-muted)',
    lineHeight: 1.5,
  },
  footerLinks: {
    display: 'flex',
    gap: '64px',
    flexWrap: 'wrap',
  },
  footerCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  footerColTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--text-main)',
    marginBottom: '4px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  footerLink: {
    fontSize: '14px',
    color: 'var(--text-muted)',
    textDecoration: 'none',
    transition: 'var(--transition-smooth)',
  },
  footerLinkDisabled: {
    fontSize: '14px',
    color: 'var(--text-dark)',
  },
  footerBottom: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    paddingTop: '30px',
    borderTop: '1px solid rgba(15, 23, 42, 0.05)',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '16px',
    fontSize: '13px',
    color: 'var(--text-dark)',
  }
};

export default App;
