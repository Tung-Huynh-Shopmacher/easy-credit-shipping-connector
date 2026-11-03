import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

const CONTAINER = 'application-settings';
const CUSTOM_OBJECT_KEY = 'application-settings-object';
export const ORDER_EXTENSION_KEY = 'easycredit-shipping-capture-extension';

export async function createCustomObject(
  apiRoot: ByProjectKeyRequestBuilder,
  applicationUrl: string
): Promise<void> {
  // POST on custom objects upserts by container and key.
  await apiRoot
    .customObjects()
    .post({
      body: {
        key: CUSTOM_OBJECT_KEY,
        container: CONTAINER,
        value: {
          'webhook-url': applicationUrl,
        },
      },
    })
    .execute();
}

export async function deleteCustomObject(
  apiRoot: ByProjectKeyRequestBuilder
): Promise<void> {
  const {
    body: { results: customObjects },
  } = await apiRoot
    .customObjects()
    .withContainer({ container: CONTAINER })
    .get({
      queryArgs: {
        where: `key = "${CUSTOM_OBJECT_KEY}"`,
      },
    })
    .execute();

  if (customObjects.length > 0) {
    await apiRoot
      .customObjects()
      .withContainerAndKey({ container: CONTAINER, key: CUSTOM_OBJECT_KEY })
      .delete()
      .execute();
  }
}

// Calls this service whenever an order is (or stays) Shipped; the handler captures the easyCredit payment once.
export async function createOrderExtension(
  apiRoot: ByProjectKeyRequestBuilder,
  applicationUrl: string,
  basicAuth: string
): Promise<void> {
  await deleteOrderExtension(apiRoot);

  await apiRoot
    .extensions()
    .post({
      body: {
        key: ORDER_EXTENSION_KEY,
        destination: {
          type: 'HTTP',
          url: applicationUrl,
          authentication: {
            type: 'AuthorizationHeader',
            headerValue: `Basic ${basicAuth}`,
          },
        },
        triggers: [
          {
            resourceTypeId: 'order',
            actions: ['Update'],
            condition: 'shipmentState = "Shipped"',
          },
        ],
        // The capture call to the payment connector runs inside the order update.
        timeoutInMs: 10000,
      },
    })
    .execute();
}

export async function deleteOrderExtension(
  apiRoot: ByProjectKeyRequestBuilder
): Promise<void> {
  const {
    body: { results: extensions },
  } = await apiRoot
    .extensions()
    .get({ queryArgs: { where: `key = "${ORDER_EXTENSION_KEY}"` } })
    .execute();

  if (extensions.length > 0) {
    await apiRoot
      .extensions()
      .withKey({ key: ORDER_EXTENSION_KEY })
      .delete({ queryArgs: { version: extensions[0].version } })
      .execute();
  }
}
