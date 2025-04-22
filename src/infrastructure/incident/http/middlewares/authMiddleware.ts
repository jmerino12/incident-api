import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  // Verifica si el token existe en el header
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
     res.status(401).json({ message: 'Token not provided' });
     return;
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verifica y decodifica el token JWT
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    // Asignamos el usuario a la solicitud
    req.user = {
      id: decoded.id,
      // Puedes agregar más propiedades aquí si es necesario (como role, email, etc.)
    };

    // Si todo está bien, pasamos el control al siguiente middleware o ruta
    next();
  } catch (err) {
    // Si el token es inválido o expiró, devuelve un error 401
     res.status(401).json({ message: 'Invalid or expired token' });
     return;
  }
}
