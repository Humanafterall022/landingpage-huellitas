import React from 'react';

export const GeolocationMap: React.FC = () => {
  return (
    <section id="map-info" style={styles.section}>
      <div style={styles.sectionHeader}>
        <span style={styles.accentText}>COBERTURA EN TIEMPO REAL</span>
        <h2 style={styles.sectionTitle}>Red de Búsqueda Georeferenciada</h2>
        <p style={styles.sectionSub}>
          Nuestra tecnología de geolocalización permite conectar a los dueños de mascotas con la comunidad circundante mediante perímetros de rastreo activos.
        </p>
      </div>

      <div className="map-layout glassmorphism">
        {/* Lado Izquierdo: Infografía del Mapa y Radar */}
        <div style={styles.mapContainer}>
          <svg style={styles.svgMap} viewBox="0 0 500 350">
            {/* Calles simuladas */}
            <path d="M 0 50 L 500 50" stroke="#cbd5e1" strokeWidth="6" fill="none" />
            <path d="M 0 180 L 500 180" stroke="#cbd5e1" strokeWidth="8" fill="none" />
            <path d="M 0 280 L 500 280" stroke="#cbd5e1" strokeWidth="4" fill="none" />
            <path d="M 120 0 L 120 350" stroke="#cbd5e1" strokeWidth="6" fill="none" />
            <path d="M 350 0 L 350 350" stroke="#cbd5e1" strokeWidth="10" fill="none" />
            
            {/* Río simulado */}
            <path d="M -20 300 C 150 280, 200 340, 520 290" stroke="rgba(14, 165, 233, 0.08)" strokeWidth="24" fill="none" strokeLinecap="round" />
            
            {/* Radio de Búsqueda */}
            <circle cx="260" cy="170" r="10" fill="var(--color-primary)" />
            <circle cx="260" cy="170" r="70" fill="none" stroke="rgba(255, 78, 32, 0.25)" strokeWidth="2" strokeDasharray="6,4" />
            <circle cx="260" cy="170" r="130" fill="none" stroke="rgba(255, 78, 32, 0.12)" strokeWidth="1.5" />
            
            {/* Pines de mascotas */}
            <g transform="translate(200, 120)">
              <circle cx="0" cy="0" r="16" fill="rgba(255, 78, 32, 0.2)" />
              <circle cx="0" cy="0" r="5" fill="var(--color-primary)" />
            </g>
            <g transform="translate(310, 210)">
              <circle cx="0" cy="0" r="16" fill="rgba(14, 165, 233, 0.2)" />
              <circle cx="0" cy="0" r="5" fill="var(--color-secondary)" />
            </g>
          </svg>

          {/* Etiquetas estáticas sobre el mapa */}
          <div style={{ ...styles.mapLabel, top: '22%', left: '33%' }}>
            <span>Último Avistamiento</span>
          </div>
          <div style={{ ...styles.mapLabel, top: '70%', left: '50%' }}>
            <span>Radio de Búsqueda (2.5km)</span>
          </div>
        </div>

        {/* Lado Derecho: Información de uso y funcionamiento */}
        <div style={styles.infoContainer}>
          <h3 style={styles.paneTitle}>¿Cómo funciona el sistema de alertas?</h3>
          <p style={styles.paneDesc}>
            La geolocalización es la base para lograr encuentros rápidos. No dependemos de que las personas busquen activamente en una lista; la aplicación notifica a quienes están en el lugar y momento indicados.
          </p>

          <div style={styles.stepsList}>
            <div style={styles.stepItem}>
              <div style={styles.stepNumber}>1</div>
              <div>
                <h4 style={styles.stepTitle}>Creación de Alerta GPS</h4>
                <p style={styles.stepText}>
                  El dueño reporta la pérdida de la mascota marcando en el mapa la última ubicación conocida.
                </p>
              </div>
            </div>

            <div style={styles.stepItem}>
              <div style={styles.stepNumber}>2</div>
              <div>
                <h4 style={styles.stepTitle}>Notificaciones Push Focalizadas</h4>
                <p style={styles.stepText}>
                  El servidor traza un radio de búsqueda e inmediatamente envía una alerta con prioridad alta a todos los teléfonos móviles que se encuentren en ese sector.
                </p>
              </div>
            </div>

            <div style={styles.stepItem}>
              <div style={styles.stepNumber}>3</div>
              <div>
                <h4 style={styles.stepTitle}>Reportes y Avistamientos Directos</h4>
                <p style={styles.stepText}>
                  Cualquier miembro de la comunidad que transite por la zona y vea a la mascota puede reportarlo con un solo toque, actualizando la posición GPS en el mapa para el dueño.
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
    padding: '40px 24px',
    boxSizing: 'border-box',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '48px',
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
  mapLayout: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: '48px',
    padding: '40px',
    alignItems: 'center',
    '@media (max-width: 968px)': {
      gridTemplateColumns: '1fr',
      padding: '24px',
    },
  } as React.CSSProperties,
  mapContainer: {
    position: 'relative',
    backgroundColor: '#ffffff',
    border: '1px solid rgba(15, 23, 42, 0.08)',
    borderRadius: '16px',
    height: '320px',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.02)',
  },
  svgMap: {
    width: '100%',
    height: '100%',
    display: 'block',
  },
  mapLabel: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    border: '1px solid rgba(15, 23, 42, 0.08)',
    borderRadius: '6px',
    padding: '4px 10px',
    fontSize: '10px',
    color: 'var(--text-main)',
    pointerEvents: 'none',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    fontWeight: 500,
  },
  infoContainer: {
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
  stepsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginTop: '10px',
  },
  stepItem: {
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 78, 32, 0.08)',
    border: '1px solid rgba(255, 78, 32, 0.15)',
    color: 'var(--color-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: '14px',
    flexShrink: 0,
  },
  stepTitle: {
    fontSize: '15px',
    fontWeight: 600,
    color: 'var(--text-main)',
    marginBottom: '4px',
  },
  stepText: {
    fontSize: '13px',
    color: 'var(--text-muted)',
    lineHeight: 1.5,
  }
};
