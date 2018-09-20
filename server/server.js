/* eslint-disable no-console */

const http = require('http');
const express = require('express');
// const session = require('express-session');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
// const cookieParser = require('cookie-parser');
// const MongoStore = require('connect-mongo')(session);
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

const app = express();

app.locals.pretty = true;

app.set('port', process.env.PORT || 3000);
app.use(express.static('static'));
// app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

process.env.DB_HOST = process.env.DB_HOST || 'localhost'
process.env.DB_PORT = process.env.DB_PORT || 27017;
process.env.DB_NAME = process.env.DB_NAME || 'leifengdemo';
process.env.DB_URL = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`;

// app.use(session({
//     secret: 'faeb4453e5d14fe6f6d04637f78077c76c73d1b4',
//     proxy: true,
//     resave: true,
//     saveUninitialized: true,
//     store: new MongoStore({ url: process.env.DB_URL })
//     })
// );

require('./routes')(app);

http.createServer(app).listen(app.get('port'), () => {
    console.log(`Express server listening on port ${app.get('port')}`);
});



