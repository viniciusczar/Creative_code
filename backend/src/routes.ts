import { Router } from 'express';
import UserController from './controllers/UserController';
import EnderecoController from './controllers/EnderecoController';
import AuthController from './controllers/AuthController';

import authMiddleware from './middlewares/authMiddleware';

const routes = Router();

routes.post('/users', authMiddleware, UserController.index);
routes.get('/users', authMiddleware, UserController.listener);
routes.get('/users/:id', authMiddleware, UserController.show);
routes.put('/users', authMiddleware, UserController.updated);
routes.delete('/users/:id', authMiddleware, UserController.deleted);

routes.post('/users/endereco', authMiddleware, EnderecoController.index);
routes.get('/users/endereco', authMiddleware, EnderecoController.listener);
routes.get('/users/endereco/:end', authMiddleware, EnderecoController.show);
routes.put('/users/endereco', authMiddleware, EnderecoController.updated);
routes.delete('/users/endereco/:end', authMiddleware, EnderecoController.deleted);

routes.post('/login', AuthController.autenticate);

export default routes;
