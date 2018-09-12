/*eslint-disable*/
'use strict';

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const leifenglistData = require('../mockData/leifenglist.json');

(async function() {
  // Connection URL
  const url = 'mongodb://localhost:27017/leifengdemo';
  // Database Name
  const dbName = 'leifengdemo';
  let client;

  try {
    // Use connect method to connect to the Server
    client = await MongoClient.connect(url);

    const db = client.db(dbName);
    await db.collection('articles').deleteMany({});
    if (leifenglistData && leifenglistData.length) {
        await db.collection('articles').insertMany(leifenglistData);
    }
  } catch (err) {
    console.log(err.stack);
  }

  if (client) {
    client.close();
  }
})();