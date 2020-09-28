const functions = require('firebase-functions');
const express = require("express");
const cors = require("cors");

const stripe = require("stripe")("sk_test_51HWABbE00jXC3EzQ7TcHXvdMCxLbscTBQgURY56sXSL1BIiAUBj8b4fViWc5rfdvrD4CGAdsjYyq95BtfGG7a87N00k5rHRTou");

//api

//app config
const app = express();
//middlewares
app.use(cors({origin: true}));
app.use(express.json());
//api routes
app.get('/', (request, response) => response.status(200).send("hello world"))

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;
    console.log("payment received", total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd"
    });
    //ok created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

//listen command
exports.api = functions.https.onRequest(app)


//example endpoint
//http://localhost:5001/clone-ddae1/us-central1/api