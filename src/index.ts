import 'reflect-metadata';
import express from 'express';
import incidentRoutes from './infrastructure/http/routes/incidentRoutes';
import rateLimit from 'express-rate-limit';

const app = express();
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutos
  max: 100,  // Limita a 100 solicitudes por IP
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

app.use(limiter); 
app.use('/incidents', incidentRoutes);
app.get('/ping', (req, res) => {
    res.send('pong');
  });
  

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));