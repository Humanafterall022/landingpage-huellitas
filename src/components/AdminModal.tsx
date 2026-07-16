import React, { useState, useEffect } from 'react';
import { Lock, X, Download, Calendar } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const [secretKey, setSecretKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stats, setStats] = useState<{ totalDownloads: number; lastUpdated?: string } | null>(null);
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
      // Limpiar errores cuando se cierra el modal
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
          totalDownloads: data.totalDownloads,
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

  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} className="glassmorphism glow-cyan" onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <div style={styles.titleRow}>
            <Lock size={18} color="var(--color-primary)" style={{ marginRight: '8px' }} />
            <h3 style={styles.title}>Panel de Administración</h3>
          </div>
          <button onClick={onClose} style={styles.closeBtn} title="Cerrar">
            <X size={18} />
          </button>
        </div>

        <div style={styles.body}>
          {!isAuthenticated ? (
            <form onSubmit={handleLogin} style={styles.form}>
              <p style={styles.infoText}>
                Introduce la clave secreta de administración para ver las estadísticas de descargas de Huellitas IA.
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
              <div style={styles.statCard}>
                <div style={styles.statIconContainer}>
                  <Download size={22} color="var(--color-secondary)" />
                </div>
                <div style={styles.statInfo}>
                  <span style={styles.statLabel}>Descargas de la APK</span>
                  <span style={styles.statValue}>{stats?.totalDownloads}</span>
                </div>
              </div>

              {stats?.lastUpdated && (
                <div style={styles.timeInfo}>
                  <Calendar size={13} style={{ marginRight: '6px' }} />
                  <span>Última actualización: {new Date(stats.lastUpdated).toLocaleString()}</span>
                </div>
              )}

              <div style={styles.rawSection}>
                <h4 style={styles.rawTitle}>Contenido de downloads.json (Lectura)</h4>
                <pre style={styles.rawJson}>
                  {JSON.stringify({ totalDownloads: stats?.totalDownloads }, null, 2)}
                </pre>
              </div>

              <div style={styles.actions}>
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
    maxWidth: '420px',
    borderRadius: '20px',
    background: 'rgba(255, 255, 255, 0.85)',
    border: '1px solid var(--border-glow)',
    padding: '24px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    borderBottom: '1px solid var(--border-light)',
    paddingBottom: '12px',
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
    gap: '16px',
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    border: '1px solid var(--border-light)',
    borderRadius: '12px',
  },
  statIconContainer: {
    width: '44px',
    height: '44px',
    borderRadius: '10px',
    backgroundColor: 'var(--color-secondary-glow)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  statLabel: {
    fontSize: '12px',
    color: 'var(--text-muted)',
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 800,
    color: 'var(--text-main)',
    fontFamily: 'var(--font-heading)',
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
    borderRadius: '8px',
    fontFamily: 'monospace',
    fontSize: '12px',
    overflowX: 'auto',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    borderTop: '1px solid var(--border-light)',
    paddingTop: '12px',
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
