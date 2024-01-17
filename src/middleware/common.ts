import express, { Application, json, urlencoded } from 'express';
import cors from 'cors';
import { env } from '../env';

import routes from '../core/routes';
import cookieParser from 'cookie-parser';
import { NotFoundError } from '../lib/api';
import { errorHandler } from '../lib/helpers/errorHandler';
import { morgan } from '@lib/logger';
export default function (app: Application) {
  app.use(cookieParser());
  app.use(json({ limit: '10mb' }));
  app.use(
    urlencoded({
      limit: '10mb',
      extended: true,
      parameterLimit: 50000,
    }),
  );
  app.use(cors({ origin: env.cors.url, optionsSuccessStatus: 200 }));

  if (!env.isTest) {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
  }

  app.use('/api', routes);
  app.use((req, res, next) => next(new NotFoundError()));

  app.use(errorHandler);
}
