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

// Función auxiliar para leer descargas
const getDownloadsCount = () => {
  try {
    if (fs.existsSync(STATS_FILE)) {
      const data = fs.readFileSync(STATS_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error leyendo downloads.json:', err);
  }
  return { totalDownloads: 0 };
};

// Función auxiliar para guardar descargas
const saveDownloadsCount = (data) => {
  try {
    fs.writeFileSync(STATS_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error escribiendo downloads.json:', err);
  }
};

// Endpoint para descargar la APK e incrementar el contador
app.get('/api/download', (req, res) => {
  // Incrementar el contador
  const stats = getDownloadsCount();
  stats.totalDownloads = (stats.totalDownloads || 0) + 1;
  saveDownloadsCount(stats);

  // Determinar la ubicación de la APK
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

// Endpoint privado de estadísticas
app.get('/api/stats', (req, res) => {
  const { secret } = req.query;

  if (secret !== SECRET_KEY) {
    return res.status(403).json({ error: 'Acceso no autorizado' });
  }

  const stats = getDownloadsCount();
  res.json({
    success: true,
    totalDownloads: stats.totalDownloads,
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
