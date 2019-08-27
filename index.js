const express = require('express');
const bodyParser = require('body-parser');
const ExpressGraphQL = require("express-graphql");
const mongoose = require("mongoose");
require('dotenv').config();

const { dbconnection } = require("./app/connection");
const schema = require("./app/schema");
const isAuth = require("./app/middleware/isAuth");

const app = express();
const port = process.env.PORT || 4000;

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    if (req.method == 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// mongoose connection
dbconnection();

// Authentication middleware
app.use(isAuth);

// GraphQL
app.use('/graphql', ExpressGraphQL({
    schema: schema,
    graphiql: true
}));

app.listen(port, () => {
    console.log('APP is listening on port:', port);
});