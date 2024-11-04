import { Request, Response } from 'express';
import CustomError from '../errors/custom.error';
import { createApiRoot } from '../client/create.client';
import { isHttpError } from '../types/index.types';
import { ExtensionInput, Order } from '@commercetools/platform-sdk';
import { apiSuccess } from '../api/success.api';
import { getAuthorizedECPaymentId } from '../utils/payment.utils';
import { capturePayment } from '../client/easycredit.client';
import { logger } from '../utils/logger.utils';

export const post = async (request: Request, response: Response) => {
  const { action, resource }: ExtensionInput = request.body;

  if (!action || !resource) {
    throw new CustomError(400, 'Bad request - Missing body parameters.');
  }

  let order: Order = JSON.parse(JSON.stringify(resource)).obj;

  if (order.shipmentState !== 'Shipped') {
    logger.info(`Order ${order.id} is not shipped. Skipping capture payment.`);
    return apiSuccess(200, [], response);
  }

  const apiRoot = createApiRoot();
  try {
    const orderId: string = order.id;
    logger.info(`Finding payments of order ${order.id}.`);
    const orders = await apiRoot
      .orders()
      .get({
        queryArgs: {
          limit: 1,
          expand: ['paymentInfo.payments[*]'],
          where: [`id="${orderId}"`],
        },
      })
      .execute();

    order = orders.body.results[0];

    if (!order) {
      logger.info(`Order ${orderId} not exist.`);
      return apiSuccess(200, [], response);
    }

    const paymentId = getAuthorizedECPaymentId(order.paymentInfo?.payments);

    if (!paymentId) {
      logger.info(`No EC authorized payment found for order ${orderId}.`);

      return apiSuccess(200, [], response);
    }
    logger.info(
      `Found authorized payment of ${paymentId} for order ${orderId}.`
    );

    logger.info(
      `Capturing authorized payment of ${paymentId} for order ${orderId}.`
    );

    const result = await capturePayment(paymentId, order.id);

    logger.info(
      `Payment ${paymentId} of order ${orderId} captured with result ${JSON.stringify(result)}.`
    );

    return apiSuccess(200, [], response);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    logger.error(`Error capturing payment: ${error?.message}`, error);
    if (isHttpError(error)) {
      throw new CustomError(error.code, error.message, error.body?.errors);
    } else {
      throw new CustomError(500, 'Internal Server Error');
    }
  }
};
