import { Router } from 'express';
import { IncidentController } from '../controllers/IncidentController';
import { validateCreatedByHeader } from '../middlewares/validateCreatedByHeader';
import { body } from 'express-validator';
import { validateFields } from '../middlewares/validateField';
import { authMiddleware } from '../middlewares/authMiddleware';

export default function incidentRoutes(controller: IncidentController): Router {
  const router = Router();
  router.post('/',
    validateCreatedByHeader,
    body('title').isString().isLength({ min: 3 }).withMessage('Title is required and must be at least 3 characters long'),
    body('description').optional().isString(),
    body('severity').isIn(['low', 'medium', 'high']).withMessage('Severity must be one of: low, medium, high'),
    validateFields
    , (req, res) => controller.create(req, res));
  router.get('/', (req, res) => controller.getAll(req, res));
  router.get('/:id', (req, res) => controller.getById(req, res));
  router.put('/:id', authMiddleware, (req, res) => controller.update(req, res));
  router.delete('/:id', authMiddleware, (req, res) => controller.delete(req, res));
  return router;
}