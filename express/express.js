'use strict';

const server = require('./server');
const mongo = require('../commons/db');

const init = async () => {
  try {
    // const showConnections = () => {
    //   server.connections.forEach(({ info }) => logger.info(`App running on ${info.protocol}://${info.host}:${info.port}`));
    // };

    const mongoConnect = await mongo.connect('mongodb://localhost:27017');
    if (!mongoConnect) {
      throw new Error('Mongo failed to connect');
    }

    server.start();

    // server.start(showConnections);
  } catch (error) {
    console.error(`App failed to start ${error.message}`);
  }
};


init();
