import { Router } from 'express';

// Colocar o Brute principalmente na rote de autenticação,
// para bloquear tentativas sucessivas de login
import Brute from 'express-brute';
// Colocar o contador de tentativas de acesso (com erro) no Redis
import BruteRedis from 'express-brute-redis';

import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import AvatarController from './app/controllers/AvatarController';
import DeliveryCancelController from './app/controllers/DeliveryCancelController';
import DeliveriesCanceledController from './app/controllers/DeliveriesCanceledController';
import DeliveriesClosedController from './app/controllers/DeliveriesClosedController';
import DeliveriesOpenedController from './app/controllers/DeliveriesOpenedController';
import DeliveriesProblemsController from './app/controllers/DeliveriesProblemsController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryCheckInController from './app/controllers/DeliveryCheckInController';
import DeliveryCheckOutController from './app/controllers/DeliveryCheckOutController';
import DeliveryController from './app/controllers/DeliveryController';
import RecipientController from './app/controllers/RecipientController';
import SignatureController from './app/controllers/SignatureController';

const routes = new Router();
// Referente a envio de arquivos
const upload = multer(multerConfig);

const bruteStore = new BruteRedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});
const bruteForce = new Brute(bruteStore);

routes.post('/users', UserController.store);

// bruteForce.prevent: middleware do Brute para bloquear tentativas sucessivas
routes.post('/sessions', bruteForce.prevent, SessionController.store);

// Listagem das entregas pendente/concluídas/canceladas pelo entregador
routes.get('/deliveryman/:id/deliveries', DeliveriesOpenedController.index);

routes.get(
  '/deliveryman/:id/deliveries/closed',
  DeliveriesClosedController.index
);

routes.get(
  '/deliveryman/:id/deliveries/canceled',
  DeliveriesCanceledController.index
);

// Retirada da Encomenda - Inclusão da data de saída
routes.put(
  '/deliveryman/:deliverymanId/deliverycheckin/',
  DeliveryCheckInController.update
);

// Entrega da Encomenda e Coleta da Assinatura de Recebimento
routes.post('/signatures', upload.single('file'), SignatureController.store);

routes.put(
  '/deliveryman/:deliverymanId/deliverycheckout/',
  DeliveryCheckOutController.update
);

// Cadastrar Problemas na entrega (Entregador)
routes.post('/delivery/:deliveryId/problems', DeliveryProblemController.store);

// Listagem dos Problemas por Encomenda
routes.get('/delivery/:deliveryId/problems', DeliveryProblemController.index);

// Tudo que vem depois passa pelo authMiddleware
routes.use(authMiddleware);

// Administradora
// Cancelamento da Entrega
routes.delete('/problem/:id/cancel-delivery', DeliveryCancelController.delete);
// Listagem dos Problemas de todas as Encomendas
routes.get('/delivery/problems', DeliveriesProblemsController.index);

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

// Entregas
routes.post('/deliveries', DeliveryController.store);
routes.get('/deliveries', DeliveryController.index);
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.delete);

routes.get('/users', UserController.index);
routes.put('/users/:id', UserController.update);

export default routes;
