/* eslint-disable no-console */

const MongoClient = require('mongodb').MongoClient;

let db,
    accounts;

MongoClient.connect(process.env.DB_URL, (e, client) => {
    if (e) {
        console.log(e);
    } else {
        db = client.db(process.env.DB_NAME);
        accounts = db.collection('accounts');
        console.log(`mongo :: connected to database :: "${process.env.DB_NAME}"`);
    }
});

exports.getAccounts = (callback) => {
    accounts.find().toArray()
        .then(data => {
            const metadata = {
                total_count: data.length
            };
            callback({
                _metadata: metadata,
                accounts: data
            });
        })
        .catch(error => {
            console.log(error);
            callback(null);
        });
}
