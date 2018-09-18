/*eslint-disable*/
'use strict';

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const leifenglistData = require('../mockData/accountList.json');

(async function() {
    // Database Name
    const dbName = 'leifengdemo';
    // Connection URL
    const url = `mongodb://localhost:27017/${dbName}`;
    let client;

    try {
        // Use connect method to connect to the Server
        client = await MongoClient.connect(url);

        const db = client.db(dbName);
        await db.collection('accounts').deleteMany({});
        if (leifenglistData && leifenglistData.length) {
            await db.collection('accounts').insertMany(leifenglistData);
        }
    } catch (err) {
        console.log(err.stack);
    }

    if (client) {
        client.close();
    }
})();
