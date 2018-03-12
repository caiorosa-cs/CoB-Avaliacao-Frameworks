'use strict';

const server = require('./server');
const mongo = require('../commons/db');

const init = async () => {
  try {
    const mongoConnect = await mongo.connect('mongodb://localhost:27017');
    if (!mongoConnect) {
      throw new Error('Mongo failed to connect');
    }

    server.start();
  } catch (error) {
    console.error(`App failed to start ${error.message}`);
  }
};


init();
