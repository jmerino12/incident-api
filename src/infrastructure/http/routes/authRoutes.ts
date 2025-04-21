import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { validateCreatedByHeader } from '../middlewares/validateCreatedByHeader';
import { validateFields } from '../middlewares/validateField';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export default function authRoutes(): Router {
    const router = Router();
    router.get('/dev-token', validateCreatedByHeader, validateFields, (req: Request, res: Response) => {
        const id = req.query.id;
        if (!id) {
             res.status(400).json({
              success: false,
              message: "Missing 'id' in query parameters",
            });
          }
        const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({
            success: true,
            token,
            message: `Token generado para el usuario con id '${id}'`,
        });
    });
    return router;
}