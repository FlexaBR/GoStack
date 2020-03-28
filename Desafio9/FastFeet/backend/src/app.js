import 'dotenv/config';
import { resolve } from 'path';

import express from 'express';
import cors from 'cors';

// helmet faz a proteção das requisições ou respostas que vem pelos headers
// para o usuário não poder, por ex., colocar um script malicioso
import helmet from 'helmet';

// RateLimit vai controlar todas as rotas para não ter chamadas repetitivas em
// nem uma delas. Ex. codigo malicioso que fica fazendo requisições sem parar
import redis from 'redis';
import RateLimit from 'express-rate-limit';
import RateLimitRedis from 'rate-limit-redis';

import Youch from 'youch';
import 'express-async-errors';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(helmet());
    this.server.use(cors());
    this.server.use(express.json());

    // Midleware para acessar arquivos estáticos
    this.server.use(
      '/avatars',
      express.static(resolve(__dirname, '..', 'tmp', 'uploads'))
    );

    // Colocar o RateLimit abaixo da middleware de arquivo, pois nesta rota dificilmente
    // acontece requisições em quantidade
    // Config abaixo: em 15 minutos pode ter 100 chamadas por rota
    if (process.env.NODE_ENV !== 'development') {
      this.server.use(
        new RateLimit({
          store: new RateLimitRedis({
            cliente: redis.createClient({
              host: process.env.REDIS_HOST,
              port: process.env.REDIS_PORT,
            }),
          }),
          windowMs: 1000 * 60 * 15,
          max: 100,
        })
      );
    }
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      // quando middleware recebe 4 params, express entende que é middleware de tratamento de erros
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
