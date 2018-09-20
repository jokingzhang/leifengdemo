/* eslint-disable */

const crypto = require('crypto');
const moment = require('moment');
const MongoClient = require('mongodb').MongoClient;

var db,
    users;

/* private encryption & validation methods */

const generateSalt = () => {
    const set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
    let salt = '';
    for (let i = 0; i < 10; i++) {
        const p = Math.floor(Math.random() * set.length);
        salt += set[p];
    }
    return salt;
}

const md5 = (str) => {
    return crypto.createHash('md5').update(str).digest('hex');
}

const saltAndHash = (pass, callback) => {
    const salt = generateSalt();
    callback(salt + md5(pass + salt));
}

const validatePassword = (plainPass, hashedPass, callback) => {
    const salt = hashedPass.substr(0, 10);
    const validHash = salt + md5(plainPass + salt);
    callback(null, hashedPass === validHash);
}


MongoClient.connect(process.env.DB_URL, (e, client) => {
    if (e) {
        console.log(e);
    } else {
        db = client.db(process.env.DB_NAME);
        users = db.collection('users');
        console.log(`mongo :: connected to database :: "${process.env.DB_NAME}"`);
    }
});

exports.manualLogin = (body, callback) => {

    const { username, password, tigerToken } = body;

    if (!username) return callback('invalid-username');
    if (!password) return callback('invalid-password');
    if (!tigerToken) return callback('invalid-tiger-token');

    users.findOne({
        username: username
    }, (e, o) => {
        if (o == null) {
            callback('user-not-found');
        } else if (tigerToken !== o.tigerToken) {
            callback('invalid-tiger-token');
        } else {
            validatePassword(password, o.password, (err, res) => {
                if (res) {
                    callback(null, o);
                } else {
                    callback('invalid-password');
                }
            });
        }
    });
}

exports.addNewUser = (newData, callback) => {
    const { username, password, tigerToken } = newData;

    // console.info('addNewUser==>', newData, !tigerToken);

    if (!username) return callback('invalid-username');
    if (!password) return callback('invalid-password');
    if (!tigerToken) return callback('invalid-tiger-token');

    users.findOne({
        username: username
    }, (e, o) => {
        if (o) {
            callback('username-taken');
        } else {
            saltAndHash(newData.password, (hash) => {
                newData.password = hash;
                // append date stamp when record was created //
                newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
                users.insertOne(newData, {
                    safe: true
                }, callback);
            });
        }
    });
}

