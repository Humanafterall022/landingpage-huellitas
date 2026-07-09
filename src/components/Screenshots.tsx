import React from 'react';
import { Map, Camera, ClipboardList } from 'lucide-react';

export const Screenshots: React.FC = () => {
  return (
    <section id="screenshots" style={styles.section}>
      <div style={styles.sectionHeader}>
        <span style={styles.accentText}>CAPTURAS DE PANTALLA</span>
        <h2 style={styles.sectionTitle}>Conoce la Aplicación Móvil</h2>
        <p style={styles.sectionSub}>
          Una interfaz intuitiva y limpia, diseñada para actuar con rapidez cuando cada minuto cuenta.
        </p>
      </div>

      <div className="screenshots-grid">
        {/* Celular 1: Avistamientos */}
        <div style={styles.card}>
          <div style={styles.mockupContainer}>
            <div className="device-frame" style={styles.scaledFrame}>
              <div className="device-screen" style={styles.screenBg}>
                <img 
                  src="/avistamientos.png" 
                  alt="Avistamientos Screen" 
                  style={styles.screenshotImg}
                />
              </div>
            </div>
          </div>
          <div style={styles.infoArea}>
            <div style={styles.infoTitleRow}>
              <Map size={18} color="var(--color-primary)" style={{ marginRight: '6px' }} />
              <h4 style={styles.infoTitle}>Mapa de Avistamientos</h4>
            </div>
            <p style={styles.infoDesc}>
              Visualiza en tiempo real los reportes de mascotas perdidas y avistadas a tu alrededor sobre el mapa integrado.
            </p>
          </div>
        </div>

        {/* Celular 2: Reportar Mascota */}
        <div style={styles.card}>
          <div style={styles.mockupContainer}>
            <div className="device-frame" style={styles.scaledFrame}>
              <div className="device-screen" style={styles.screenBg}>
                <img 
                  src="/reportarmascota.png" 
                  alt="Reportar Mascota Screen" 
                  style={styles.screenshotImg}
                />
              </div>
            </div>
          </div>
          <div style={styles.infoArea}>
            <div style={styles.infoTitleRow}>
              <Camera size={18} color="var(--color-secondary)" style={{ marginRight: '6px' }} />
              <h4 style={styles.infoTitle}>Reportar Mascota</h4>
            </div>
            <p style={styles.infoDesc}>
              Publica fotos y detalla las señas particulares de la mascota en segundos para alertar al barrio.
            </p>
          </div>
        </div>

        {/* Celular 3: Mis Reportes */}
        <div style={styles.card}>
          <div style={styles.mockupContainer}>
            <div className="device-frame" style={styles.scaledFrame}>
              <div className="device-screen" style={styles.screenBg}>
                <img 
                  src="/misreportes.png" 
                  alt="Mis Reportes Screen" 
                  style={styles.screenshotImg}
                />
              </div>
            </div>
          </div>
          <div style={styles.infoArea}>
            <div style={styles.infoTitleRow}>
              <ClipboardList size={18} color="var(--color-accent)" style={{ marginRight: '6px' }} />
              <h4 style={styles.infoTitle}>Mis Reportes</h4>
            </div>
            <p style={styles.infoDesc}>
              Administra todas tus publicaciones de mascotas y mantén el control sobre las alertas generadas por la comunidad.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  section: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 24px 80px',
    boxSizing: 'border-box',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '48px',
  },
  accentText: {
    color: 'var(--color-accent)',
    fontSize: '14px',
    fontWeight: 700,
    letterSpacing: '2px',
    display: 'block',
    marginBottom: '8px',
  },
  sectionTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '36px',
    fontWeight: 800,
    color: 'var(--text-main)',
    marginBottom: '16px',
  },
  sectionSub: {
    fontSize: '16px',
    color: 'var(--text-muted)',
    maxWidth: '650px',
    margin: '0 auto',
    lineHeight: 1.6,
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '32px',
    '@media (max-width: 968px)': {
      gridTemplateColumns: '1fr',
      maxWidth: '450px',
      margin: '0 auto',
    },
  } as React.CSSProperties,
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
  },
  mockupContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  scaledFrame: {
    width: '230px',
    height: '460px',
    borderWidth: '8px',
    borderRadius: '28px',
    boxShadow: '0 15px 30px rgba(15, 23, 42, 0.12)',
  },
  screenBg: {
    background: '#ffffff',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    overflow: 'hidden',
  },
  screenshotImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  infoArea: {
    textAlign: 'center',
    maxWidth: '280px',
  },
  infoTitleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '8px',
  },
  infoTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--text-main)',
  },
  infoDesc: {
    fontSize: '13px',
    color: 'var(--text-muted)',
    lineHeight: 1.5,
  }
};
