import React from 'react';
import { ClipboardList, ArrowRight, Heart } from 'lucide-react';
import { trackSurveyClick } from '../utils/analytics';

export const SURVEY_URL = "https://docs.google.com/forms/d/e/1FAIpQLScKI9Q4NXiSnCEmy3BDf1Zj56XpgW8vG_Xg-5BVNGIIzafX7g/viewform";

export const PMVSurvey: React.FC = () => {
  const surveyUrl = SURVEY_URL;

  return (
    <section id="encuesta-pmv" style={styles.section}>
      <div style={styles.card} className="glassmorphism glow-cyan">
        <div style={styles.content}>
          <div style={styles.iconContainer}>
            <ClipboardList size={32} color="var(--color-secondary)" />
          </div>
          
          <div style={styles.textContainer}>
            <span style={styles.badge}>
              <Heart size={12} style={{ marginRight: '6px' }} fill="var(--color-primary)" color="var(--color-primary)" />
              Validación PMV
            </span>
            <h2 style={styles.title}>¿Nos ayudas a mejorar HuellitasIA?</h2>
            <p style={styles.description}>
              Tu opinión es fundamental para validar nuestro Producto Mínimo Viable (PMV). Participa en nuestra breve encuesta y ayúdanos a perfeccionar la herramienta que reúne a mascotas extraviadas con sus familias. ¡Tu feedback marca la diferencia!
            </p>
          </div>
          
          <div style={styles.actionContainer}>
            <a 
              href={surveyUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={trackSurveyClick}
              style={styles.button}
              className="glow-coral"
            >
              Comenzar Encuesta 
              <ArrowRight size={18} style={{ marginLeft: '8px' }} />
            </a>
            <span style={styles.note}>Toma menos de 3 minutos</span>
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
    padding: '40px 24px',
    boxSizing: 'border-box',
  },
  card: {
    padding: '40px',
    borderRadius: '24px',
    border: '1px solid var(--border-glow)',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.9) 100%)',
    position: 'relative',
    overflow: 'hidden',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
    flexWrap: 'wrap',
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '64px',
    height: '64px',
    borderRadius: '16px',
    backgroundColor: 'var(--color-secondary-glow)',
    flexShrink: 0,
  },
  textContainer: {
    flex: '1 1 500px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'var(--color-primary-glow)',
    color: 'var(--color-primary)',
    fontSize: '12px',
    fontWeight: 700,
    padding: '6px 14px',
    borderRadius: '100px',
    letterSpacing: '1px',
    display: 'inline-flex',
    alignItems: 'center',
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: 'var(--font-heading)',
    fontSize: '28px',
    fontWeight: 800,
    color: 'var(--text-main)',
    margin: 0,
  },
  description: {
    fontSize: '15px',
    color: 'var(--text-muted)',
    lineHeight: 1.6,
    margin: 0,
  },
  actionContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    flexShrink: 0,
    width: '100%',
    textAlign: 'center',
  },
  button: {
    background: 'linear-gradient(135deg, var(--color-primary) 0%, #e11d48 100%)',
    color: '#ffffff',
    padding: '14px 28px',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: 700,
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    transition: 'var(--transition-smooth)',
    boxShadow: '0 4px 14px rgba(255, 78, 32, 0.3)',
    cursor: 'pointer',
  },
  note: {
    fontSize: '12px',
    color: 'var(--text-dark)',
  }
};
