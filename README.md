# shopify auth demo

Quick demo showing how to use [`shopify-token`] with [express](https://expressjs.com) for the [shopify oauth flow].

## Usage

First `npm run configure`, to copy the `sample.env` file into `.env`, then update `.env` with your shopify app's api key, secret, and redirect uri.

Then ...
```
source .env
npm install
npm start
```

Once the express app has started you'll see ...
```
open https://{PROXY_TO_LOCALHOST}/?shop={SHOP_TO_REQUEST_ACCESS}
```

`SHOP_TO_REQUEST_ACCESS` should be the name of a shop that you administer.  This will initiate the oauth flow and callout to the Shopify provider, prompting you to authenticate with the shop and explicitly grant the app access.  

The shop name is reflected in the url used to access the shop's storefront (`SHOP.myshopify.com`).  For example, if you have admin level access to a shop named "autopints" (`autopints.myshopify.com`), you can grant your app access to the shop via `https://{PROXY_TO_LOCALHOST}/?shop=autopints`.

`PROXY_TO_LOCALHOST` should be a proxy to `http://localhost:8080`, e.g., a localtunnel that reflects your shopify app's redirect uri.

For example, suppose you set your app's redirect uri to `https://acme.localtunnel.me`.  Start the localtunnel proxy with `lt --port 8080 --subdomain acme`.  Then open `https://acme.localtunnel.me/?shop=autopints` to initiate the oauth flow.
