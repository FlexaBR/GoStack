import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import AvatarController from './app/controllers/AvatarController';
import DeliverymanController from './app/controllers/DeliverymanController';
import OrderController from './app/controllers/OrderController';
import RecipientController from './app/controllers/RecipientController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Tudo que vem depois passa pelo authMiddleware
routes.use(authMiddleware);

// Avatar
// Insomnia: multipart => file (varável com avatar)
routes.post('/avatars', upload.single('file'), AvatarController.store);
routes.put('/avatars/:id', upload.single('file'), AvatarController.update);

// Destinatário
routes.post('/recipients', RecipientController.store);
routes.get('/recipients', RecipientController.index);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);


// Entregador
routes.post('/deliverymans', DeliverymanController.store);
routes.get('/deliverymans', DeliverymanController.index);
routes.delete('/deliverymans/:id', DeliverymanController.delete);
routes.put('/deliverymans/:id', DeliverymanController.update);

// Pedidos
routes.post('/orders', OrderController.store);
routes.get('/orders', OrderController.index);

routes.get('/users', UserController.index);
routes.put('/users/:id', UserController.update);

export default routes;
