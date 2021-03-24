const express = require('express');
const sampleRouter = require('./routers/router');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(sampleRouter.router);

exports.express = app;