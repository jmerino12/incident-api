import { Request, Response, NextFunction } from 'express';

export function validateCreatedByHeader(req: Request, res: Response, next: NextFunction): void {
  const createdBy = req.headers['x-created-by'] as string;

  if (!createdBy) {
    res.status(400).json({ message: 'CreatedBy header is missing' });
    return
  }

  // Si todo está bien, agregamos el createdBy a la request para usarlo en los controladores
  if (req.method !== 'GET') {
    req.body = req.body || {};
    req.body.createdBy = createdBy;
  } // O puedes hacerlo de alguna otra manera si lo necesitas en otro lugar

  next();  // Continuamos con la siguiente función en la cadena
}