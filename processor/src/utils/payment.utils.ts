import {
  Payment,
  PaymentReference,
  Transaction,
} from '@commercetools/platform-sdk/dist/declarations/src/generated/models/payment';

const EASYCREDIT_PAYMENT_METHOD = 'easycredit';

export const getAuthorizedECPaymentId = (
  payments: PaymentReference[] | undefined
): string | null => {
  if (!payments) {
    return null;
  }

  // A cancelled or switched attempt (e.g. invoice, then installment) stays on the order with a failed
  // Authorization, so pick the easyCredit payment whose Authorization succeeded, not the first one.
  const ecPayment = payments.find(
    (payment) =>
      payment.obj?.paymentMethodInfo?.paymentInterface?.toLowerCase() ===
        EASYCREDIT_PAYMENT_METHOD &&
      !!payment.obj &&
      !!getSuccessTransaction(payment.obj) &&
      // The extension also fires on later updates of a shipped order; capture only once.
      !hasCharge(payment.obj)
  );

  return ecPayment?.obj?.id ?? null;
};

const hasCharge = (payment: Payment): boolean =>
  !!payment.transactions?.some(
    (transaction) =>
      transaction.type === 'Charge' && transaction.state !== 'Failure'
  );

const getSuccessTransaction = (payment: Payment): Transaction | undefined => {
  return payment.transactions?.find(
    (transaction) =>
      transaction.type === 'Authorization' && transaction.state === 'Success'
  );
};
