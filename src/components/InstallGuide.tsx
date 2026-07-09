import React, { useState } from 'react';
import { ChevronDown, Download, ShieldAlert, FileCode, CheckCircle2 } from 'lucide-react';

interface GuideStep {
  number: number;
  icon: React.ReactNode;
  title: string;
  shortDesc: string;
  fullDetails: string;
}

const GUIDE_STEPS: GuideStep[] = [
  {
    number: 1,
    icon: <Download size={22} color="var(--color-secondary)" />,
    title: 'Descarga el archivo APK',
    shortDesc: 'Descarga directa y segura de HuellitasIA (12 MB).',
    fullDetails: 'Presiona cualquiera de los botones de descarga de esta página. Tu navegador Android te preguntará si deseas descargar el archivo. Haz clic en "Descargar de todos modos". Nuestro instalador no contiene ningún tipo de malware ni publicidad.',
  },
  {
    number: 2,
    icon: <ShieldAlert size={22} color="var(--color-primary)" />,
    title: 'Habilita "Fuentes Desconocidas"',
    shortDesc: 'Autoriza la instalación fuera de la Google Play Store.',
    fullDetails: 'Por defecto, Android bloquea aplicaciones de terceros. Si es la primera vez que instalas una APK, ve a Configuración > Seguridad (o Ajustes de Aplicaciones) y activa la casilla de "Instalar aplicaciones desconocidas" para tu navegador de Internet o tu Gestor de Archivos.',
  },
  {
    number: 3,
    icon: <FileCode size={22} color="var(--color-accent)" />,
    title: 'Ejecuta el archivo descargado',
    shortDesc: 'Abre el archivo e inicia la instalación en tu teléfono.',
    fullDetails: 'Una vez finalizada la descarga, haz clic sobre la notificación de archivo completado o entra a la carpeta "Descargas" utilizando cualquier explorador de archivos. Presiona sobre "huellitas-ia.apk" y selecciona "Instalar".',
  },
  {
    number: 4,
    icon: <CheckCircle2 size={22} color="#22c55e" />,
    title: '¡Abre la app y ayuda a las mascotas!',
    shortDesc: 'Configura tu ubicación y el escáner estará listo.',
    fullDetails: '¡Eso es todo! Ya puedes abrir HuellitasIA. Concede permisos de ubicación y cámara para habilitar las notificaciones GPS de mascotas extraviadas y usar la herramienta de reconocimiento YOLO AI.',
  }
];

export const InstallGuide: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(1);

  const toggleStep = (stepNumber: number) => {
    setActiveStep(activeStep === stepNumber ? null : stepNumber);
  };

  return (
    <section id="guia" style={styles.section}>
      <div style={styles.sectionHeader}>
        <span style={styles.accentText}>PASOS DE INSTALACIÓN</span>
        <h2 style={styles.sectionTitle}>¿Cómo instalar la APK en tu Android?</h2>
        <p style={styles.sectionSub}>
          Instalar una aplicación APK es muy sencillo. Sigue esta guía interactiva paso a paso para comenzar a usar HuellitasIA en pocos minutos.
        </p>
      </div>

      <div className="guide-layout">
        {/* Acordeón interactivo a la izquierda */}
        <div style={styles.accordionContainer}>
          {GUIDE_STEPS.map((step) => {
            const isOpen = activeStep === step.number;
            return (
              <div 
                key={step.number} 
                style={{
                  ...styles.accordionItem,
                  borderColor: isOpen ? 'var(--color-secondary)' : 'rgba(15,23,42,0.06)',
                  backgroundColor: isOpen ? 'rgba(14, 165, 233, 0.02)' : 'rgba(15,23,42,0.01)',
                }}
                className="glassmorphism"
              >
                <button 
                  onClick={() => toggleStep(step.number)}
                  style={styles.accordionTrigger}
                >
                  <div style={styles.triggerLeft}>
                    <div style={styles.stepNumBadge}>{step.number}</div>
                    <div style={styles.stepIcon}>{step.icon}</div>
                    <div style={styles.stepSummary}>
                      <h4 style={styles.stepTitle}>{step.title}</h4>
                      <p style={styles.stepShort}>{step.shortDesc}</p>
                    </div>
                  </div>
                  <ChevronDown 
                    size={20} 
                    style={{ 
                      ...styles.arrowIcon,
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      color: isOpen ? 'var(--color-secondary)' : 'var(--text-muted)',
                    }} 
                  />
                </button>

                {isOpen && (
                  <div style={styles.accordionContent}>
                    <p style={styles.fullDetailsText}>{step.fullDetails}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Sección publicitaria / Call to Action derecha */}
        <div style={styles.ctaBox} className="glassmorphism">
          <span style={styles.ctaHeader}>ÚNETE A LA RED</span>
          <h3 style={styles.ctaTitle}>¿Listo para marcar la diferencia?</h3>
          <p style={styles.ctaDesc}>
            Cada descarga amplía el radio de seguridad para cientos de mascotas perdidas. Registra avistamientos en segundos y devuelve la tranquilidad a las familias.
          </p>

          <div style={styles.highlightBadge}>
            <span style={{ fontSize: '18px', marginRight: '8px' }}>🔐</span>
            <span style={{ fontSize: '13px', color: 'var(--text-main)', fontWeight: 500 }}>
              Instalador verificado libre de virus y malware.
            </span>
          </div>

          <div style={styles.ctaGroup}>
            <a href="/api/download" style={styles.ctaBtn} className="glow-coral">
              Descargar APK ahora
            </a>
            <div style={styles.playstoreCtaWrapper}>
              <button style={styles.playstoreCtaBtn} disabled title="Próximamente disponible en Google Play Store">
                🤖 Play Store (Próximamente)
              </button>
              <span style={styles.comingSoonCtaBadge}>Coming Soon</span>
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
    padding: '40px 24px 80px',
    boxSizing: 'border-box',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '48px',
  },
  accentText: {
    color: '#22c55e',
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
  guideLayout: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 0.8fr',
    gap: '40px',
    alignItems: 'start',
    '@media (max-width: 968px)': {
      gridTemplateColumns: '1fr',
    },
  } as React.CSSProperties,
  accordionContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  accordionItem: {
    borderRadius: '12px',
    border: '1px solid',
    overflow: 'hidden',
    transition: 'var(--transition-smooth)',
  },
  accordionTrigger: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '20px 24px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    outline: 'none',
  },
  triggerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  stepNumBadge: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: 'rgba(15, 23, 42, 0.03)',
    border: '1px solid rgba(15, 23, 42, 0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 700,
    color: 'var(--text-main)',
  },
  stepIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepSummary: {
    display: 'flex',
    flexDirection: 'column',
  },
  stepTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--text-main)',
  },
  stepShort: {
    fontSize: '13px',
    color: 'var(--text-muted)',
    marginTop: '2px',
  },
  arrowIcon: {
    transition: 'transform 0.3s ease',
  },
  accordionContent: {
    padding: '0 24px 24px 84px',
  },
  fullDetailsText: {
    fontSize: '14px',
    color: 'var(--text-muted)',
    lineHeight: 1.6,
  },
  ctaBox: {
    padding: '36px',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '20px',
  },
  ctaHeader: {
    color: 'var(--color-primary)',
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '2.5px',
  },
  ctaTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '24px',
    fontWeight: 700,
    color: 'var(--text-main)',
  },
  ctaDesc: {
    fontSize: '15px',
    color: 'var(--text-muted)',
    lineHeight: 1.6,
  },
  highlightBadge: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.03)',
    border: '1px solid rgba(15, 23, 42, 0.05)',
    padding: '10px 14px',
    borderRadius: '8px',
    width: '100%',
    boxSizing: 'border-box',
  },
  ctaGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
  },
  playstoreCtaWrapper: {
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  playstoreCtaBtn: {
    width: '100%',
    textAlign: 'center',
    background: 'rgba(15, 23, 42, 0.02)',
    border: '1px dashed rgba(15, 23, 42, 0.15)',
    color: 'var(--text-muted)',
    padding: '14px 24px',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: 700,
    cursor: 'not-allowed',
    opacity: 0.65,
    boxSizing: 'border-box',
  },
  comingSoonCtaBadge: {
    position: 'absolute',
    top: '-8px',
    right: '8px',
    backgroundColor: 'var(--color-primary)',
    color: '#fff',
    fontWeight: 800,
    padding: '2px 6px',
    borderRadius: '100px',
    boxShadow: '0 2px 4px rgba(255, 78, 32, 0.2)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    fontSize: '7px',
  },
  ctaBtn: {
    width: '100%',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #ff8a72 0%, #ff5231 100%)',
    color: '#fff',
    padding: '14px 24px',
    borderRadius: '10px',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: 700,
    transition: 'var(--transition-smooth)',
    boxShadow: '0 4px 14px rgba(255, 78, 32, 0.25)',
  }
};
