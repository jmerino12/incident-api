import { Router } from 'express';
import { IncidentController } from '../controllers/IncidentController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { body } from 'express-validator';
import { validateFields } from '../middlewares/validateField';
import { validateCreatedByHeader } from '../middlewares/validateCreatedByHeader';
import { container } from '../../../di/dependencyInjection';

const controller = container.get<IncidentController>(IncidentController);

const router = Router();
router.post('/',
    validateCreatedByHeader,
    body('title').isString().isLength({ min: 3 }).withMessage('Title is required and must be at least 3 characters long'),
    body('description').optional().isString(),
    body('severity').isIn(['low', 'medium', 'high']).withMessage('Severity must be one of: low, medium, high'),
    validateFields
    , (req, res) => controller.create(req, res));
router.get('/', (req, res) => controller.getAll(req, res));
router.put('/incidents/:id', authMiddleware, (req, res) => controller.update(req, res));
router.delete('/incident/:id', authMiddleware, (req, res) => controller.delete(req, res));


export default router;