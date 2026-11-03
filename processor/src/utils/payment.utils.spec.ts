import { PaymentReference } from '@commercetools/platform-sdk';
import { getAuthorizedECPaymentId } from './payment.utils';

const payment = (id: string, paymentInterface: string, state: string, extra: object[] = []) =>
  ({
    typeId: 'payment',
    id,
    obj: { id, paymentMethodInfo: { paymentInterface }, transactions: [{ type: 'Authorization', state }, ...extra] },
  }) as unknown as PaymentReference;

describe('getAuthorizedECPaymentId', () => {
  it('skips a failed easyCredit attempt and returns the authorized one', () => {
    const payments = [payment('cancelled-bill', 'easycredit', 'Failure'), payment('installment', 'easycredit', 'Success')];
    expect(getAuthorizedECPaymentId(payments)).toBe('installment');
  });

  it('ignores authorized payments of other providers', () => {
    expect(getAuthorizedECPaymentId([payment('mollie', 'mollie', 'Success')])).toBeNull();
  });

  it('does not capture twice when a shipped order is updated again', () => {
    expect(getAuthorizedECPaymentId([payment('bill', 'easycredit', 'Success', [{ type: 'Charge', state: 'Pending' }])])).toBeNull();
    expect(getAuthorizedECPaymentId([payment('bill', 'easycredit', 'Success', [{ type: 'Charge', state: 'Failure' }])])).toBeNull();
  });

  it('returns null without an authorized easyCredit payment', () => {
    expect(getAuthorizedECPaymentId([payment('bill', 'easycredit', 'Failure')])).toBeNull();
    expect(getAuthorizedECPaymentId(undefined)).toBeNull();
  });
});
