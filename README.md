# shopify auth demo

Quick demo showing how to use [`shopify-token`](https://github.com/lpinca/shopify-token) with [express](https://expressjs.com) for the [shopify oauth flow](https://help.shopify.com/api/guides/authentication/oauth).

## Usage

First `npm run configure`, to copy the `sample.env` file into ``.env`, then update `.env` with your shopify app's api
key, secret, and redirect uri.

Then ...
```
source .env
npm install
npm start
```

Once the express app has started ...
```
open http://localhost:8080/?shop=YOUR_SHOP_NAME
```
... where `YOUR_SHOP_NAME` is the name of a shop that you administer.  This will initiate the OAuth flow and callout to the Shopify provider, prompting you to authenticate with the shop and explicitly grant the app access.  

The shop name is reflected in the url used to access the shop's storefront (`YOUR_SHOP_NAME.myshopify.com`).  For example, if you have admin level access to a shop named "autopints" (`autopints.myshopify.com`), you can grant your app access to the shop via `http://localhost:8080/?shop=autopints`.
