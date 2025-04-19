import dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import express from 'express';
import incidentRoutes from './infrastructure/http/routes/incidentRoutes';
import rateLimit from 'express-rate-limit';
import { errorHandler } from './infrastructure/http/middlewares/errorHandler';
import { db } from './shared/config/database';

const app = express();
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutos
  max: 100,  // Limita a 100 solicitudes por IP
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

app.use(limiter); 

app.use(express.json())
app.use('/incidents', incidentRoutes);
app.get('/ping', (req, res) => {
    res.send('pong');
});
  
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

(async () => {
  try {
    await db.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente.' );
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
  }
})();