const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
app.use(express.static('static'));
app.use(bodyParser.json());

const dbCfg = {
  url: 'mongodb://localhost:27017/leifengdemo',
  name: 'leifengdemo',
}

let db;

app.get('/api/articles', (req, res) => {
  db.collection('articles').find().toArray()
  .then(articles => {
    const metadata = { total_count: articles.length };
    res.json({
      _metadata: metadata,
      articles
    });
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});

MongoClient.connect(dbCfg.url).then(connection => {
  db = connection.db(dbCfg.name);
  app.listen(3000, () => {
    console.log('App started on port 3000');
  });
}).catch(error => {
  console.log('ERROR:', error);
});
