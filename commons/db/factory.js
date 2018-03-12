'use strict';

const {
  MongoClient,
} = require('mongodb');
const bluebird = require('bluebird');

const factory = (state, dbClient = MongoClient, promise = bluebird) => ({
  connect(url, database = 'default') {

    const options = {
      promiseLibrary: promise,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
    };

    return dbClient.connect(url, options)
      .then((client) => {
        console.log(`MongoDb Connected on ${url}`);
        state.client = client;
        state.db = client.db(database);

        return client;
      });
  },

  disconnect() {
    return state.client.close()
      .then(() => {
        state.client = null;
        state.db = null;
      });
  },

  collection(collectionName) {
    if (!state.client) throw new Error('There is no connection to the database.');

    return state.db.collection(collectionName);
  },

  get db() {
    return state.db;
  },
});

module.exports = factory;
