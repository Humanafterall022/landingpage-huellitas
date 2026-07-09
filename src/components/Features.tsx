import React from 'react';
import { Brain, MapPin, Bell, Database, MessageSquare, BadgeCheck } from 'lucide-react';

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
  color: string;
}

const FEATURES: FeatureItem[] = [
  {
    icon: <Brain size={24} />,
    title: 'IA para Reconocer Mascotas',
    desc: 'Emplea el modelo Ultralytics YOLOv8 para extraer rasgos biométricos de las mascotas y encontrar coincidencias automatizadas.',
    color: 'var(--color-secondary)',
  },
  {
    icon: <MapPin size={24} />,
    title: 'Geolocalización en Tiempo Real',
    desc: 'Registra y mapea de forma precisa el último punto de avistamiento de la mascota para coordinar búsquedas eficientes.',
    color: 'var(--color-primary)',
  },
  {
    icon: <Bell size={24} />,
    title: 'Alertas Automáticas',
    desc: 'Envía notificaciones instantáneas a los usuarios y vecinos que se encuentran dentro del radio de búsqueda activo.',
    color: 'var(--color-accent)',
  },
  {
    icon: <Database size={24} />,
    title: 'Base de Datos Centralizada',
    desc: 'Unifica todos los registros de mascotas perdidas y reportadas en la calle para evitar la dispersión de información en redes.',
    color: '#22c55e',
  },
  {
    icon: <MessageSquare size={24} />,
    title: 'Contacto Sencillo',
    desc: 'Permite la comunicación directa y segura entre el dueño y la persona que encontró a la mascota para coordinar el reencuentro.',
    color: '#3b82f6',
  },
  {
    icon: <BadgeCheck size={24} />,
    title: 'Modelo Sostenible Freemium',
    desc: 'Registro y búsquedas básicas 100% gratuitas, con opciones premium para destacar alertas y aumentar la difusión.',
    color: '#ec4899',
  }
];

export const Features: React.FC = () => {
  return (
    <section id="features" style={styles.section}>
      <div style={styles.sectionHeader}>
        <span style={styles.accentText}>PROPUESTA DE VALOR</span>
        <h2 style={styles.sectionTitle}>¿Qué nos diferencia de otras plataformas?</h2>
        <p style={styles.sectionSub}>
          Buscamos solucionar el extravío de mascotas lo más rápido posible facilitando que regresen a sus hogares mediante una plataforma centralizada, inteligente y colaborativa.
        </p>
      </div>

      <div className="features-grid">
        {FEATURES.map((feature, i) => (
          <div
            key={i}
            style={styles.card}
            className="glassmorphism"
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = feature.color;
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = `0 10px 20px rgba(0, 0, 0, 0.03), 0 0 12px ${feature.color}15`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-light)';
              e.currentTarget.style.transform = 'translateY(0px)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ ...styles.iconWrapper, backgroundColor: `${feature.color}10`, color: feature.color }}>
              {feature.icon}
            </div>
            <h3 style={styles.cardTitle}>{feature.title}</h3>
            <p style={styles.cardDesc}>{feature.desc}</p>
          </div>
        ))}
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
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '56px',
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
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
    '@media (max-width: 968px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '@media (max-width: 640px)': {
      gridTemplateColumns: '1fr',
    },
  } as React.CSSProperties,
  card: {
    padding: '32px',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    cursor: 'pointer',
    transition: 'var(--transition-smooth)',
    borderColor: 'var(--border-light)',
  },
  iconWrapper: {
    width: '52px',
    height: '52px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  cardTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '18px',
    fontWeight: 600,
    color: 'var(--text-main)',
    marginBottom: '12px',
  },
  cardDesc: {
    fontSize: '14px',
    color: 'var(--text-muted)',
    lineHeight: 1.6,
  }
};
