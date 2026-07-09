import React from 'react';
import { Check } from 'lucide-react';

interface PricingPlan {
  title: string;
  price: string;
  period?: string;
  desc: string;
  features: string[];
  color: string;
  badge?: string;
  isPopular?: boolean;
}

const PLANS: PricingPlan[] = [
  {
    title: 'Plan Freemium',
    price: 'S/ 0.00',
    desc: 'Búsqueda y reporte básico para toda la comunidad.',
    features: [
      'Reportar mascota extraviada',
      'Reportar avistamientos en calle',
      'Geolocalización estándar',
      'Alertas push a vecinos cercanos',
      'Uso del escáner YOLOv8'
    ],
    color: 'var(--color-secondary)',
  },
  {
    title: 'Reporte Destacado',
    price: 'S/ 5.00',
    period: 'por 3 días',
    desc: 'Multiplica la visibilidad para una búsqueda de urgencia.',
    features: [
      'Todo lo del Plan Freemium',
      'Posiciones prioritarias en la lista',
      'Pin destacado brillante en el mapa',
      'Notificaciones push recurrentes',
      'Opción extendida: S/10 por 7 días'
    ],
    color: 'var(--color-primary)',
    badge: 'Popular',
    isPopular: true
  },
  {
    title: 'Comisión por Éxito',
    price: 'Variable',
    desc: 'Cobro de servicio justo al concretar el reencuentro.',
    features: [
      'Contacto directo verificado',
      'Chat privado entre dueño y rescatista',
      'Verificación de identidad asistida',
      'Soporte técnico prioritario',
      'Comisión aplicada solo al reencuentro'
    ],
    color: 'var(--color-accent)',
  },
  {
    title: 'Partners & Vet',
    price: 'Alianzas',
    desc: 'Publicidad dedicada para veterinarias y pet shops.',
    features: [
      'Anuncios en la sección de alertas',
      'Publicación de campañas de salud',
      'Validación de reportes como punto oficial',
      'Panel de analíticas de visualizaciones',
      'Suscripción mensual flexible'
    ],
    color: '#22c55e',
  }
];

export const Pricing: React.FC = () => {
  return (
    <section id="pricing" style={styles.section}>
      <div style={styles.sectionHeader}>
        <span style={styles.accentText}>SOSTENIBILIDAD</span>
        <h2 style={styles.sectionTitle}>Modelo de Negocio HuellitasIA</h2>
        <p style={styles.sectionSub}>
          Nuestra plataforma es principalmente gratuita para ayudar a la comunidad, y se sostiene mediante servicios de visibilidad y alianzas comerciales con veterinarias y tiendas de mascotas.
        </p>
      </div>

      <div style={styles.gridContainer}>
        {PLANS.map((plan, i) => (
          <div 
            key={i} 
            style={{
              ...styles.card,
              borderColor: plan.isPopular ? plan.color : 'var(--border-light)',
              boxShadow: plan.isPopular ? `0 15px 30px rgba(255, 78, 32, 0.08)` : 'none'
            }}
            className="glassmorphism"
          >
            {plan.badge && (
              <span style={{ ...styles.badge, backgroundColor: plan.color }}>
                {plan.badge}
              </span>
            )}
            
            <h3 style={styles.planTitle}>{plan.title}</h3>
            
            <div style={styles.priceRow}>
              <span style={{ ...styles.priceText, color: plan.color }}>{plan.price}</span>
              {plan.period && <span style={styles.periodText}>{plan.period}</span>}
            </div>

            <p style={styles.planDesc}>{plan.desc}</p>
            
            <div style={styles.divider}></div>

            <ul style={styles.featureList}>
              {plan.features.map((feature, idx) => (
                <li key={idx} style={styles.featureItem}>
                  <Check size={14} color={plan.color} style={{ marginRight: '8px', flexShrink: 0 }} />
                  <span style={styles.featureTextItem}>{feature}</span>
                </li>
              ))}
            </ul>
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
    padding: '40px 24px 80px',
    boxSizing: 'border-box',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '56px',
  },
  accentText: {
    color: 'var(--color-primary)',
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
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '24px',
    alignItems: 'stretch',
    '@media (max-width: 1024px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '@media (max-width: 600px)': {
      gridTemplateColumns: '1fr',
    },
  } as React.CSSProperties,
  card: {
    padding: '32px 24px',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    transition: 'var(--transition-smooth)',
    border: '1px solid',
  },
  badge: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    color: '#fff',
    fontSize: '8px',
    fontWeight: 800,
    textTransform: 'uppercase',
    padding: '3px 8px',
    borderRadius: '100px',
    letterSpacing: '0.5px',
  },
  planTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '18px',
    fontWeight: 700,
    color: 'var(--text-main)',
    marginBottom: '12px',
  },
  priceRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '4px',
    marginBottom: '12px',
  },
  priceText: {
    fontSize: '28px',
    fontWeight: 800,
    fontFamily: 'var(--font-heading)',
  },
  periodText: {
    fontSize: '12px',
    color: 'var(--text-muted)',
  },
  planDesc: {
    fontSize: '13px',
    color: 'var(--text-muted)',
    lineHeight: 1.4,
    marginBottom: '24px',
    minHeight: '40px',
  },
  divider: {
    height: '1px',
    backgroundColor: 'var(--border-light)',
    width: '100%',
    marginBottom: '24px',
  },
  featureList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    margin: 0,
    padding: 0,
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'left',
  },
  featureTextItem: {
    fontSize: '12px',
    color: 'var(--text-muted)',
    lineHeight: 1.4,
  }
};
