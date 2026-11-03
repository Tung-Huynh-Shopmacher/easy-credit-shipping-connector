# easy-credit-shipping-connector

Captures the easyCredit payment when an order is set to `Shipped`.

On deploy, `post-deploy` registers the commercetools API extension `easycredit-shipping-capture-extension`:
- trigger: order `Update` with condition `shipmentState = "Shipped"`
- auth: `Authorization: Basic <BASIC_AUTH>`
- timeout: 10 s

`pre-undeploy` removes it. The handler picks the easyCredit payment with a successful `Authorization` and no `Charge` yet, and calls `POST {PAYMENT_CONNECTOR_URL}/payments/:id/capture`. A failing capture fails the order update.

`CTP_SCOPES` must include `manage_extensions`, `manage_key_value_documents`, `view_orders` and `view_payments`.
