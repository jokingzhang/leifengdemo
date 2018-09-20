/* eslint-disable consistent-return */
const path = require('path');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const USER = require('./modules/user');
const ARTICLE = require('./modules/article');
const ACCOUNT = require('./modules/account');

module.exports = (app) => {

    app.post('/api/login', (req, res) => {
        USER.manualLogin(req.body, (e, o) => {
            if (!o) {
                res.status(400).send(e);
            } else {

                const token = jwt.sign(o, process.env.DB_NAME, {
                    expiresIn: 86400 // expires in 24 hours
                });

                res.status(200).send({
                    ...o,
                    success: true,
                        message: 'Enjoy your token!',
                        token: token
                });
            }
        });
    });

    app.post('/api/signup', (req, res) => {
        USER.addNewUser({
            username: req.body.username,
            password: req.body.password,
            tigerToken: req.body.tigerToken
        }, (e) => {
            if (e) {
                res.status(400).send(e);
            } else {
                res.status(200).send('ok');
            }
        });
    });

    app.use((req, res, next) => {

        // check header or url parameters or post parameters for token
        const token = req.body.token || req.param('token') || req.headers['x-access-token'];

        // console.info('token', token)

        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, process.env.DB_NAME, (err, decoded) => {
                if (err) {
                    return res.json({
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });

        } else {

            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }

    });

    app.get('/api/articles', (req, res) => {
        ARTICLE.getArticles((o) => {
            if (o != null) {
                res.json(o);
            } else {
                res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
        })
    });

    app.get('/api/accounts', (req, res) => {
        ACCOUNT.getAccounts((o) => {
            if (o != null) {
                res.json(o);
            } else {
                res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
        })
    });

    app.get('*', (req, res) => {
        res.sendFile(path.resolve('static/index.html'));
    });

};
