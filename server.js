import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const STATS_FILE = path.join(__dirname, 'downloads.json');
const SECRET_KEY = 'huellitas123'; // Clave para visualizar el backend en privado

app.use(express.json());

// Función auxiliar para leer estadísticas avanzadas
const getStats = () => {
  try {
    if (fs.existsSync(STATS_FILE)) {
      const data = fs.readFileSync(STATS_FILE, 'utf8');
      const parsed = JSON.parse(data);
      return {
        totalDownloads: parsed.totalDownloads || 0,
        totalSessions: parsed.totalSessions || 0,
        totalTimeSeconds: parsed.totalTimeSeconds || 0,
        totalScrollDepthSum: parsed.totalScrollDepthSum || 0,
        bounceSessions: parsed.bounceSessions || 0,
        totalSurveyClicks: parsed.totalSurveyClicks || 0,
        sessions: parsed.sessions || {}
      };
    }
  } catch (err) {
    console.error('Error leyendo downloads.json:', err);
  }
  return {
    totalDownloads: 0,
    totalSessions: 0,
    totalTimeSeconds: 0,
    totalScrollDepthSum: 0,
    bounceSessions: 0,
    totalSurveyClicks: 0,
    sessions: {}
  };
};

// Función auxiliar para guardar estadísticas
const saveStats = (data) => {
  try {
    fs.writeFileSync(STATS_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error escribiendo downloads.json:', err);
  }
};

// Endpoint para descargar la APK e incrementar el contador
app.get('/api/download', (req, res) => {
  const stats = getStats();
  stats.totalDownloads = (stats.totalDownloads || 0) + 1;
  saveStats(stats);

  const devApkPath = path.join(__dirname, 'public', 'app-huellitas.apk');
  const prodApkPath = path.join(__dirname, 'dist', 'app-huellitas.apk');
  const apkPath = fs.existsSync(prodApkPath) ? prodApkPath : devApkPath;

  if (fs.existsSync(apkPath)) {
    res.download(apkPath, 'huellitas-ia.apk', (err) => {
      if (err) {
        console.error('Error al enviar la APK:', err);
        if (!res.headersSent) {
          res.status(500).send('Error al descargar la APK');
        }
      }
    });
  } else {
    res.status(404).send('APK no disponible temporalmente');
  }
});

// Endpoint para actualizar métricas de sesión en tiempo real
app.post('/api/analytics/session', (req, res) => {
  const { sessionId, durationSeconds = 0, maxScrollDepth = 0, clickedSurvey = false } = req.body || {};
  if (!sessionId) {
    return res.status(400).json({ error: 'sessionId es requerido' });
  }

  const stats = getStats();
  const sessionRecord = stats.sessions[sessionId] || {
    durationSeconds: 0,
    maxScrollDepth: 0,
    clickedSurvey: false,
    isBounce: true
  };

  // Si es una nueva sesión
  if (!stats.sessions[sessionId]) {
    stats.totalSessions = (stats.totalSessions || 0) + 1;
    stats.bounceSessions = (stats.bounceSessions || 0) + 1;
  }

  // Actualizar tiempo acumulado delta
  const durationDelta = Math.max(0, durationSeconds - sessionRecord.durationSeconds);
  if (durationDelta > 0) {
    stats.totalTimeSeconds = (stats.totalTimeSeconds || 0) + durationDelta;
    sessionRecord.durationSeconds = durationSeconds;
  }

  // Actualizar profundidad de scroll delta
  if (maxScrollDepth > sessionRecord.maxScrollDepth) {
    const scrollDelta = maxScrollDepth - sessionRecord.maxScrollDepth;
    stats.totalScrollDepthSum = (stats.totalScrollDepthSum || 0) + scrollDelta;
    sessionRecord.maxScrollDepth = maxScrollDepth;
  }

  // Click en encuesta
  if (clickedSurvey && !sessionRecord.clickedSurvey) {
    sessionRecord.clickedSurvey = true;
  }

  // Evaluar estado de rebote (Rebote = duración < 10s Y scroll <= 25% Y sin click en encuesta)
  const isNowBounce = sessionRecord.durationSeconds < 10 && sessionRecord.maxScrollDepth <= 25 && !sessionRecord.clickedSurvey;

  if (sessionRecord.isBounce && !isNowBounce) {
    sessionRecord.isBounce = false;
    stats.bounceSessions = Math.max(0, (stats.bounceSessions || 1) - 1);
  } else if (!sessionRecord.isBounce && isNowBounce) {
    sessionRecord.isBounce = true;
    stats.bounceSessions = (stats.bounceSessions || 0) + 1;
  }

  stats.sessions[sessionId] = sessionRecord;
  saveStats(stats);

  res.json({ success: true });
});

// Endpoint para registrar clicks en la encuesta PMV
app.post('/api/analytics/survey-click', (req, res) => {
  const { sessionId } = req.body || {};
  const stats = getStats();
  stats.totalSurveyClicks = (stats.totalSurveyClicks || 0) + 1;

  if (sessionId && stats.sessions[sessionId]) {
    const sessionRecord = stats.sessions[sessionId];
    if (!sessionRecord.clickedSurvey) {
      sessionRecord.clickedSurvey = true;
      if (sessionRecord.isBounce) {
        sessionRecord.isBounce = false;
        stats.bounceSessions = Math.max(0, (stats.bounceSessions || 1) - 1);
      }
    }
  }

  saveStats(stats);
  res.json({ success: true, totalSurveyClicks: stats.totalSurveyClicks });
});

// Endpoint privado de estadísticas consolidadas
app.get('/api/stats', (req, res) => {
  const { secret } = req.query;

  if (secret !== SECRET_KEY) {
    return res.status(403).json({ error: 'Acceso no autorizado' });
  }

  const stats = getStats();
  const totalSessions = stats.totalSessions || 0;
  const avgTimeSeconds = totalSessions > 0 ? Math.round(stats.totalTimeSeconds / totalSessions) : 0;
  const avgScrollDepth = totalSessions > 0 ? Math.round(stats.totalScrollDepthSum / totalSessions) : 0;
  const bounceRate = totalSessions > 0 ? Math.round((stats.bounceSessions / totalSessions) * 100) : 0;

  res.json({
    success: true,
    totalDownloads: stats.totalDownloads || 0,
    totalSessions,
    avgTimeSeconds,
    avgScrollDepth,
    bounceRate,
    totalSurveyClicks: stats.totalSurveyClicks || 0,
    bounceSessions: stats.bounceSessions || 0,
    lastUpdated: new Date().toISOString()
  });
});

// Servir frontend en producción
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Servidor de HuellitasIA corriendo. El frontend de desarrollo se ejecuta en el puerto 5173.');
  });
}

app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en el puerto ${PORT}`);
  console.log(`Ver estadísticas de descarga: http://localhost:${PORT}/api/stats?secret=${SECRET_KEY}`);
});
