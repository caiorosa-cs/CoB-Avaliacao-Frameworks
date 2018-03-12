'use strict';

const Hapi = require('hapi');
const controllers = require('./controllers');

const server = () => {
  const start = async () => {
    const hapiServer = new Hapi.Server({
      host: '0.0.0.0',
      port: process.env.PORT || '3000',
    });


    controllers(hapiServer);
    await hapiServer.start();
  };

  return {
    start,
  };
};

module.exports = server();
