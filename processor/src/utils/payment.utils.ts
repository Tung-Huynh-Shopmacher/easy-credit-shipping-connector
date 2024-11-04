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

  const ecPayment = getECPayment(payments);
  if (!ecPayment || !ecPayment.obj) {
    return null;
  }

  const successTransaction = getSuccessTransaction(ecPayment.obj);

  if (successTransaction) {
    return ecPayment.obj.id;
  }

  return null;
};

const getECPayment = (
  payments: PaymentReference[]
): PaymentReference | undefined => {
  return payments.find((payment) => {
    return (
      payment.obj?.paymentMethodInfo?.paymentInterface?.toLowerCase() ===
        EASYCREDIT_PAYMENT_METHOD && payment.obj?.transactions?.length > 0
    );
  });
};

const getSuccessTransaction = (payment: Payment): Transaction | undefined => {
  return payment.transactions.find(
    (transaction) =>
      transaction.type === 'Authorization' && transaction.state === 'Success'
  );
};
