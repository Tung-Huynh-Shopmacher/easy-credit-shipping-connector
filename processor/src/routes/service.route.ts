import { Router } from 'express';
import { logger } from '../utils/logger.utils';
import { post } from '../controllers/service.controller';
import { readConfiguration } from '../utils/config.utils';

const serviceRouter = Router();
const config = readConfiguration();

serviceRouter.post(
  '/',
  (req, res, next) => {
    if (req.headers.authorization !== `Bearer ${config.basicAuth}`) {
      logger.error('Unauthorized request', req);
      return res.status(401).send('Unauthorized');
    }
    next();
  },
  async (req, res, next) => {
    logger.info('Service post message received');

    try {
      await post(req, res);
    } catch (error) {
      next(error);
    }
  }
);

export default serviceRouter;
