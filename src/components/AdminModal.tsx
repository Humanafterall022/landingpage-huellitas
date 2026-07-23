import React, { useState, useEffect } from 'react';
import { Lock, X, Download, Calendar, Clock, ArrowDownCircle, TrendingDown, MousePointer, Users, RefreshCw } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface StatsData {
  totalDownloads: number;
  totalSessions: number;
  avgTimeSeconds: number;
  avgScrollDepth: number;
  bounceRate: number;
  totalSurveyClicks: number;
  bounceSessions: number;
  lastUpdated?: string;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const [secretKey, setSecretKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const savedKey = sessionStorage.getItem('admin_secret_huellitas');
      if (savedKey) {
        setSecretKey(savedKey);
        fetchStats(savedKey);
      }
    } else {
      setError('');
    }
  }, [isOpen]);

  const fetchStats = async (key: string) => {
    setError('');
    setLoading(true);
    try {
      const response = await fetch(`/api/stats?secret=${encodeURIComponent(key)}`);
      
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('Clave incorrecta. Acceso no autorizado.');
        }
        throw new Error('Error al intentar conectar con el servidor.');
      }

      const data = await response.json();
      if (data.success) {
        setStats({
          totalDownloads: data.totalDownloads || 0,
          totalSessions: data.totalSessions || 0,
          avgTimeSeconds: data.avgTimeSeconds || 0,
          avgScrollDepth: data.avgScrollDepth || 0,
          bounceRate: data.bounceRate || 0,
          totalSurveyClicks: data.totalSurveyClicks || 0,
          bounceSessions: data.bounceSessions || 0,
          lastUpdated: data.lastUpdated
        });
        setIsAuthenticated(true);
        sessionStorage.setItem('admin_secret_huellitas', key);
      } else {
        throw new Error('Respuesta inválida del servidor.');
      }
    } catch (err: any) {
      setError(err.message || 'Error de conexión con el servidor.');
      setIsAuthenticated(false);
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!secretKey.trim()) return;
    fetchStats(secretKey);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setStats(null);
    setSecretKey('');
    sessionStorage.removeItem('admin_secret_huellitas');
  };

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} className="glassmorphism glow-cyan" onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <div style={styles.titleRow}>
            <Lock size={18} color="var(--color-primary)" style={{ marginRight: '8px' }} />
            <h3 style={styles.title}>Panel de Administración & Analíticas</h3>
          </div>
          <button onClick={onClose} style={styles.closeBtn} title="Cerrar">
            <X size={18} />
          </button>
        </div>

        <div style={styles.body}>
          {!isAuthenticated ? (
            <form onSubmit={handleLogin} style={styles.form}>
              <p style={styles.infoText}>
                Introduce la clave secreta de administración para ver las métricas de engagement y descargas de Huellitas IA.
              </p>
              <div style={styles.inputGroup}>
                <input
                  type="password"
                  placeholder="Clave Secreta"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  style={styles.input}
                  required
                  autoFocus
                />
              </div>
              {error && <p style={styles.errorText}>{error}</p>}
              <button type="submit" disabled={loading} style={styles.submitBtn} className="glow-coral">
                {loading ? 'Verificando...' : 'Acceder'}
              </button>
            </form>
          ) : (
            <div style={styles.statsContainer}>
              <div style={styles.kpiGrid}>
                {/* Tiempo promedio en página */}
                <div style={styles.kpiCard}>
                  <div style={{ ...styles.kpiIcon, backgroundColor: 'rgba(14, 165, 233, 0.12)' }}>
                    <Clock size={20} color="var(--color-secondary)" />
                  </div>
                  <div style={styles.kpiInfo}>
                    <span style={styles.kpiLabel}>Tiempo Promedio</span>
                    <span style={styles.kpiValue}>{formatDuration(stats?.avgTimeSeconds || 0)}</span>
                    <span style={styles.kpiSub}>Permanencia en sitio</span>
                  </div>
                </div>

                {/* Scroll Depth */}
                <div style={styles.kpiCard}>
                  <div style={{ ...styles.kpiIcon, backgroundColor: 'rgba(16, 185, 129, 0.12)' }}>
                    <ArrowDownCircle size={20} color="#10b981" />
                  </div>
                  <div style={styles.kpiInfo}>
                    <span style={styles.kpiLabel}>Scroll Depth</span>
                    <span style={styles.kpiValue}>{stats?.avgScrollDepth || 0}%</span>
                    <span style={styles.kpiSub}>Profundidad promedio</span>
                  </div>
                </div>

                {/* Tasa de Rebote */}
                <div style={styles.kpiCard}>
                  <div style={{ ...styles.kpiIcon, backgroundColor: 'rgba(239, 68, 68, 0.12)' }}>
                    <TrendingDown size={20} color="#ef4444" />
                  </div>
                  <div style={styles.kpiInfo}>
                    <span style={styles.kpiLabel}>Tasa de Rebote</span>
                    <span style={styles.kpiValue}>{stats?.bounceRate || 0}%</span>
                    <span style={styles.kpiSub}>{stats?.bounceSessions || 0} de {stats?.totalSessions || 0} rebotes</span>
                  </div>
                </div>

                {/* Clicks Encuesta */}
                <div style={styles.kpiCard}>
                  <div style={{ ...styles.kpiIcon, backgroundColor: 'rgba(245, 158, 11, 0.12)' }}>
                    <MousePointer size={20} color="#f59e0b" />
                  </div>
                  <div style={styles.kpiInfo}>
                    <span style={styles.kpiLabel}>Clicks Encuesta</span>
                    <span style={styles.kpiValue}>{stats?.totalSurveyClicks || 0}</span>
                    <span style={styles.kpiSub}>Interacciones PMV</span>
                  </div>
                </div>

                {/* Descargas APK */}
                <div style={styles.kpiCard}>
                  <div style={{ ...styles.kpiIcon, backgroundColor: 'rgba(255, 78, 32, 0.12)' }}>
                    <Download size={20} color="var(--color-primary)" />
                  </div>
                  <div style={styles.kpiInfo}>
                    <span style={styles.kpiLabel}>Descargas APK</span>
                    <span style={styles.kpiValue}>{stats?.totalDownloads || 0}</span>
                    <span style={styles.kpiSub}>Descargas app Android</span>
                  </div>
                </div>

                {/* Total Sesiones */}
                <div style={styles.kpiCard}>
                  <div style={{ ...styles.kpiIcon, backgroundColor: 'rgba(139, 92, 246, 0.12)' }}>
                    <Users size={20} color="#8b5cf6" />
                  </div>
                  <div style={styles.kpiInfo}>
                    <span style={styles.kpiLabel}>Total Visitas</span>
                    <span style={styles.kpiValue}>{stats?.totalSessions || 0}</span>
                    <span style={styles.kpiSub}>Sesiones iniciadas</span>
                  </div>
                </div>
              </div>

              {stats?.lastUpdated && (
                <div style={styles.timeInfo}>
                  <Calendar size={13} style={{ marginRight: '6px' }} />
                  <span>Última actualización: {new Date(stats.lastUpdated).toLocaleString()}</span>
                </div>
              )}

              <div style={styles.rawSection}>
                <h4 style={styles.rawTitle}>Resumen JSON (Lectura de Servidor)</h4>
                <pre style={styles.rawJson}>
                  {JSON.stringify(
                    {
                      totalDownloads: stats?.totalDownloads,
                      totalSessions: stats?.totalSessions,
                      avgTimeSeconds: stats?.avgTimeSeconds,
                      avgScrollDepthPercent: stats?.avgScrollDepth,
                      bounceRatePercent: stats?.bounceRate,
                      totalSurveyClicks: stats?.totalSurveyClicks
                    },
                    null,
                    2
                  )}
                </pre>
              </div>

              <div style={styles.actions}>
                <button
                  onClick={() => fetchStats(secretKey)}
                  style={styles.refreshBtn}
                  disabled={loading}
                >
                  <RefreshCw size={13} style={{ marginRight: '6px' }} className={loading ? 'spin' : ''} />
                  {loading ? 'Cargando...' : 'Actualizar'}
                </button>
                <button onClick={handleLogout} style={styles.logoutBtn}>
                  Cerrar Sesión
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    padding: '24px',
  },
  modal: {
    width: '100%',
    maxWidth: '580px',
    borderRadius: '24px',
    background: 'rgba(255, 255, 255, 0.92)',
    border: '1px solid var(--border-glow)',
    padding: '28px',
    boxShadow: '0 24px 48px rgba(0, 0, 0, 0.12)',
    boxSizing: 'border-box',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    borderBottom: '1px solid var(--border-light)',
    paddingBottom: '14px',
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'var(--font-heading)',
    fontSize: '18px',
    fontWeight: 700,
    color: 'var(--text-main)',
    margin: 0,
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--text-muted)',
    display: 'flex',
    alignItems: 'center',
    padding: '4px',
    borderRadius: '50%',
    transition: 'var(--transition-smooth)',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  infoText: {
    fontSize: '13px',
    color: 'var(--text-muted)',
    lineHeight: 1.5,
    margin: 0,
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1px solid var(--border-light)',
    backgroundColor: '#ffffff',
    fontSize: '14px',
    outline: 'none',
    transition: 'var(--transition-smooth)',
    color: 'var(--text-main)',
  },
  errorText: {
    color: 'var(--color-primary)',
    fontSize: '12px',
    fontWeight: 600,
    margin: 0,
  },
  submitBtn: {
    background: 'linear-gradient(135deg, var(--color-primary) 0%, #e11d48 100%)',
    color: '#ffffff',
    border: 'none',
    padding: '12px',
    borderRadius: '10px',
    fontWeight: 700,
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'var(--transition-smooth)',
  },
  statsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  kpiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    gap: '12px',
  },
  kpiCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    border: '1px solid var(--border-light)',
    borderRadius: '14px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
  },
  kpiIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  kpiInfo: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
  },
  kpiLabel: {
    fontSize: '11px',
    fontWeight: 600,
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  kpiValue: {
    fontSize: '20px',
    fontWeight: 800,
    color: 'var(--text-main)',
    fontFamily: 'var(--font-heading)',
    lineHeight: 1.2,
  },
  kpiSub: {
    fontSize: '10px',
    color: 'var(--text-dark)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  timeInfo: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '12px',
    color: 'var(--text-dark)',
  },
  rawSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  rawTitle: {
    fontSize: '12px',
    fontWeight: 700,
    color: 'var(--text-main)',
    margin: 0,
  },
  rawJson: {
    margin: 0,
    padding: '12px',
    backgroundColor: '#0f172a',
    color: '#38bdf8',
    borderRadius: '10px',
    fontFamily: 'monospace',
    fontSize: '12px',
    overflowX: 'auto',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid var(--border-light)',
    paddingTop: '14px',
  },
  refreshBtn: {
    background: 'none',
    border: '1px solid var(--border-glow)',
    color: 'var(--color-secondary)',
    padding: '8px 14px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    transition: 'var(--transition-smooth)',
  },
  logoutBtn: {
    background: 'none',
    border: '1px solid var(--border-light)',
    color: 'var(--text-muted)',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'var(--transition-smooth)',
  }
};
