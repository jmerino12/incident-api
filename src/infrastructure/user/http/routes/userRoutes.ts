import { Router } from 'express';
import { body } from 'express-validator';
import { UserController } from '../controllers/UserController';
import { validateFields } from '../../../incident/http/middlewares/validateField';


export default function usertRoutes(controller: UserController): Router {
  const router = Router();
  router.post('/',
    body('identification').isString().isLength({ min: 3 }).withMessage('Title is required and must be at least 3 characters long'),
    body('name').isString().isLength({ min: 7 }).withMessage('name is required'),
    body('email').isString().isEmail().isLength({ min: 2 }).withMessage('email is required'),
    validateFields,
    (req, res) => controller.create(req, res));
  router.get('/', (req, res) => controller.getAll(req, res));
  router.get('/:id', (req, res) => controller.getById(req, res));
  router.put('/:id', (req, res) => controller.update(req, res));
  router.delete('/:id', (req, res) => controller.delete(req, res));
  return router;
}