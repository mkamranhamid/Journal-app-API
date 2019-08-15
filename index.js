const express = require('express');
const bodyParser = require('body-parser');
const ExpressGraphQL = require("express-graphql");
const mongoose = require("mongoose");
require('dotenv').config();

const { dbconnection } = require("./app/connection");
const schema = require("./app/schema");
const isAuth = require("./app/middleware/isAuth");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// mongoose connection
dbconnection();

// Authentication middleware
app.use(isAuth)

// GraphQL
app.use('/graphql', ExpressGraphQL({
    schema: schema,
    graphiql: true
}));

app.listen(port, () => {
    console.log('APP is listening on port:', port);
});