import { readConfiguration } from '../utils/config.utils';
import { Buffer } from 'buffer';

const config = readConfiguration();

export const capturePayment = async (paymentId: string, orderId: string) => {
  const response = await fetch(
    `${config.paymentConnectorUrl}/payments/${paymentId}/capture`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getAccessToken()}`,
      },
      body: JSON.stringify({ orderId }),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to capture payment: ${response.statusText}`);
  }

  return await response.text();
};

const getAccessToken = async (): Promise<string> => {
  return fetch(`https://auth.${config.region}.commercetools.com/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${config.clientId}:${config.clientSecret}`).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
    }),
  }).then(async (response) => {
    if (!response.ok) {
      throw new Error(`Failed to get access token: ${response.statusText}`);
    }

    const { access_token } = await response.json();

    return access_token;
  });
};
