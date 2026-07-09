import React from 'react';
import { Cpu, Zap, Server, Database } from 'lucide-react';

export const YoloDemo: React.FC = () => {
  return (
    <section id="yolo-info" style={styles.section}>
      <div style={styles.sectionHeader}>
        <span style={styles.accentText}>TECNOLOGÍA INTELIGENTE</span>
        <h2 style={styles.sectionTitle}>La tecnología detrás de cada reencuentro</h2>
        <p style={styles.sectionSub}>
          HuellitasIA combina herramientas sencillas de usar pero potentes para que buscar y reportar una mascota sea rápido y efectivo.
        </p>
      </div>

      <div style={styles.infoLayout} className="glassmorphism">
        {/* Lado Izquierdo: Representación gráfica de YOLOv8 */}
        <div style={styles.graphicPane}>
          <div style={styles.screenWrapper}>
            <img 
              src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=600" 
              alt="Mascota Detectada por IA" 
              style={styles.petImage} 
            />
            {/* Bounding Box Estática */}
            <div style={styles.yoloBBox}>
              <div style={styles.yoloLabel}>
                Mascota Identificada: 99%
              </div>
            </div>
            
            {/* Indicadores de rasgos */}
            <div style={styles.metaLabelTop}>
              <span>Raza: Golden Retriever</span>
            </div>
            <div style={styles.metaLabelBottom}>
              <span>Escáner Inteligente Activo</span>
            </div>
          </div>
        </div>

        {/* Lado Derecho: Explicación Simplificada */}
        <div style={styles.textPane}>
          <h3 style={styles.paneTitle}>¿Cómo te ayuda la aplicación?</h3>
          <p style={styles.paneDesc}>
            No necesitas saber de tecnología para usar HuellitasIA. La aplicación realiza todo el trabajo pesado en segundo plano para conectar a las mascotas perdidas con sus dueños en tiempo récord:
          </p>

          <div style={styles.featuresList}>
            <div style={styles.featureItem}>
              <div style={styles.iconCircle}>
                <Cpu size={18} color="var(--color-secondary)" />
              </div>
              <div>
                <h4 style={styles.featureTitle}>Reconocimiento Visual Automático</h4>
                <p style={styles.featureText}>
                  La aplicación analiza la foto de la mascota para identificar la especie (perro o gato), su raza y sus colores principales sin que tengas que escribirlos.
                </p>
              </div>
            </div>

            <div style={styles.featureItem}>
              <div style={styles.iconCircle}>
                <Database size={18} color="var(--color-secondary)" />
              </div>
              <div>
                <h4 style={styles.featureTitle}>Cruce de Fotos Inteligente</h4>
                <p style={styles.featureText}>
                  El sistema compara las imágenes que suben los dueños de mascotas perdidas con las fotos que toman los vecinos en la calle, buscando coincidencias visuales al instante.
                </p>
              </div>
            </div>

            <div style={styles.featureItem}>
              <div style={styles.iconCircle}>
                <Server size={18} color="var(--color-secondary)" />
              </div>
              <div>
                <h4 style={styles.featureTitle}>Notificaciones Inmediatas en la Zona</h4>
                <p style={styles.featureText}>
                  Cuando se reporta una mascota perdida o encontrada, el servidor avisa automáticamente a los teléfonos de todos los usuarios que están cerca para que presten atención.
                </p>
              </div>
            </div>

            <div style={styles.featureItem}>
              <div style={styles.iconCircle}>
                <Zap size={18} color="var(--color-secondary)" />
              </div>
              <div>
                <h4 style={styles.featureTitle}>Diseñada para tu Teléfono</h4>
                <p style={styles.featureText}>
                  Una aplicación móvil muy liviana, rápida y fácil de usar, pensada para funcionar sin problemas y sin gastar tus datos en situaciones de emergencia.
                </p>
              </div>
            </div>
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
    padding: '80px 24px',
    boxSizing: 'border-box',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '48px',
  },
  accentText: {
    color: 'var(--color-secondary)',
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
  infoLayout: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.2fr',
    gap: '48px',
    padding: '40px',
    alignItems: 'center',
    '@media (max-width: 968px)': {
      gridTemplateColumns: '1fr',
      padding: '24px',
    },
  } as React.CSSProperties,
  graphicPane: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenWrapper: {
    position: 'relative',
    width: '100%',
    maxWidth: '400px',
    height: '320px',
    borderRadius: '16px',
    overflow: 'hidden',
    border: '1px solid rgba(15, 23, 42, 0.08)',
    backgroundColor: '#f1f5f9',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.03)',
  },
  petImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: 0.9,
  },
  yoloBBox: {
    position: 'absolute',
    border: '2px solid var(--color-secondary)',
    boxShadow: '0 0 15px rgba(14, 165, 233, 0.3)',
    top: '15%',
    left: '20%',
    width: '60%',
    height: '70%',
    boxSizing: 'border-box',
  },
  yoloLabel: {
    position: 'absolute',
    top: '-24px',
    left: '-2px',
    backgroundColor: 'var(--color-secondary)',
    color: '#fff',
    fontSize: '11px',
    fontWeight: 800,
    padding: '2px 8px',
    borderRadius: '2px',
    whiteSpace: 'nowrap',
  },
  metaLabelTop: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    border: '1px solid rgba(15, 23, 42, 0.08)',
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '11px',
    color: 'var(--text-main)',
    fontWeight: 500,
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  metaLabelBottom: {
    position: 'absolute',
    bottom: '16px',
    left: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    border: '1px solid rgba(15, 23, 42, 0.08)',
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '11px',
    color: 'var(--text-main)',
    fontWeight: 500,
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  textPane: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  paneTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '24px',
    fontWeight: 700,
    color: 'var(--text-main)',
  },
  paneDesc: {
    fontSize: '15px',
    color: 'var(--text-muted)',
    lineHeight: 1.6,
  },
  featuresList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginTop: '10px',
  },
  featureItem: {
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
  },
  iconCircle: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-secondary-glow)',
    border: '1px solid rgba(14, 165, 233, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  featureTitle: {
    fontSize: '15px',
    fontWeight: 600,
    color: 'var(--text-main)',
    marginBottom: '4px',
  },
  featureText: {
    fontSize: '13px',
    color: 'var(--text-muted)',
    lineHeight: 1.5,
  }
};
