import express, { NextFunction, Request, Response } from 'express';
import limiter from 'express-rate-limit';
import helmet from 'helmet';

import marketRouter from '@src/routes/market.router';
import AppError from './helpers/AppError';


const rateLimiter = limiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests. Try again later.',
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(rateLimiter);
app.use('/api', marketRouter);

app.use((err: Error, _: Request, res: Response, _next: NextFunction) => {
  console.error(err)
  if (err instanceof AppError) {
    return res.status(err.status).json({
      error: err.message,
      details: err.details,
    });
  } else {
    return res.status(500).json({
      error: 'Internal Server Error'
    })
  }
});

export default app;
