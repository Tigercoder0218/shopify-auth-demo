'use strict';

const express = require('express');
const session = require('express-session');
const Auth = require('shopify-token');

const auth = new Auth({
    'apiKey': process.env.SHOPIFY_API_KEY,
    'sharedSecret': process.env.SHOPIFY_SECRET,
    'redirectUri': process.env.SHOPIFY_REDIRECT_URI,
    'scopes':  ['read_products', 'read_orders', 'read_customers'] 
});

const app = express();


app.use(session({
    secret: 'icanhascheezburger',
    saveUninitialized: false,
    resave: false
}));


app.get('/', (req, res) => {

    if (req.session.token) return res.send(`Token ${req.session.token}`);

    // generate a random nonce
    const nonce = auth.generateNonce();

    // generate the authorization URL
    const uri = auth.generateAuthUrl(req.query.shop, undefined, nonce);

    // save nonce in session for later verification
    req.session.state = nonce;
    res.redirect(uri);
});


app.get('/callback', (req, res) => {

    const state = req.query.state;

    if (
        typeof state !== 'string'   ||
        state !== req.session.state ||  // validate state
        !auth.verifyHmac(req.query)     // validate hmac
    ) {
        return res.status(400).send('Security check failed');
    }

    // exchange auth code for permanent access token
    auth.getAccessToken(req.query.shop, req.query.code)
        .then((token) => {

            console.log(token);
            req.session.token = token;
            req.session.state = undefined;
            res.redirect('/');
        })
        .catch((err) => {

            console.error(err.stack);
            res.status(500).send(err);
        });
});

const msg = 'now open http://localhost:8080/?shop={SHOP_TO_REQUEST_ACCESS}';
app.listen(8080, () => console.log(msg));
