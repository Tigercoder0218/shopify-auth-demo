# shopify auth demo

Quick demo showing how to use [`shopify-token`](https://github.com/lpinca/shopify-token) with [express](https://expressjs.com) for the [shopify oauth flow](https://help.shopify.com/api/guides/authentication/oauth).

## Usage

First `cp sample.env .env`, then update `.env` with your shopify app's api key
and secret.

Then ...
```
npm install
npm start
```

Once the express app has started ...
```
open http://localhost:8080/?shop=YOUR_SHOP_NAME
```
... where `YOUR_SHOP_NAME` is the name of the shop you'd like your app to get
authorized to access. The shop name is reflected in the url used to access the
shop's storefront (`YOUR_SHOP_NAME.myshopify.com`).


This will initiate the OAuth flow and callout to the Shopify provider, prompting you to authenticate with the shop and explicitly grant the app access.
