/* eslint-disable no-console */

const MongoClient = require('mongodb').MongoClient;

let db,
    articles;

MongoClient.connect(process.env.DB_URL, (e, client) => {
    if (e) {
        console.log(e);
    } else {
        db = client.db(process.env.DB_NAME);
        articles = db.collection('articles');
        console.log(`mongo :: connected to database :: "${process.env.DB_NAME}"`);
    }
});

exports.getArticles = (callback) => {
    articles.find().toArray()
        .then(data => {
            const metadata = {
                total_count: data.length
            };
            callback({
                _metadata: metadata,
                articles: data
            });
        })
        .catch(error => {
            console.log(error);
            callback(null);
        });
}
