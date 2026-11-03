# easy-credit-shipping-connector

Captures the easyCredit payment when an order is set to `Shipped`.

On deploy, `post-deploy` registers the commercetools API extension `easycredit-shipping-capture-extension`:
- trigger: order `Update` with condition `shipmentState = "Shipped"`
- auth: `Authorization: Basic <BASIC_AUTH>`
- timeout: 10 s

`pre-undeploy` removes it. The handler picks the easyCredit payment with a successful `Authorization` and no `Charge` yet, and calls `POST {PAYMENT_CONNECTOR_URL}/payments/:id/capture`. A failing capture fails the order update, so an order is never shipped without a capture request.

The extension runs synchronously on every update of a shipped order in the project, including orders paid with other methods. If this service is down or slower than 10 s, those updates fail. Each payment is captured at most once: a payment that already has a `Charge`, in any state, is skipped, and a failed capture is not retried automatically.

`CTP_SCOPES` must include `manage_extensions`, `manage_key_value_documents`, `view_orders` and `view_payments`.
