'use strict';

const restify = require('restify');
const insertHandler = require('../commons/handlers/insertHandler');
const getHandler = require('../commons/handlers/getHandler');

const server = () => {
  const start = () => {
    const restifyServer = restify.createServer({
      name: 'Restify Server',
      version: '1.0.0',
    });

    // restifyServer.use(restify.plugins.acceptParser(server.acceptable));
    restifyServer.use(restify.plugins.queryParser());
    restifyServer.use(restify.plugins.bodyParser());

    restifyServer.get('/restify', async (req, res) => {
      try {
        const filter = {
          name: req.query.name,
        };
        const foundOnDb = await getHandler.getOne(filter);
        return res.send(foundOnDb);
      } catch (err) {
        return res.send({
          failed: true,
          err,
        });
      }
    });

    restifyServer.post('/restify', async (req, res) => {
      try {
        const response = await insertHandler.insertOne(req.body);
        return res.send(response);
      } catch (err) {
        return res.send({
          failed: true,
          err,
        });
      }
    });

    restifyServer.listen(3000, () => {
      console.log('%s listening at %s', restifyServer.name, restifyServer.url);
    });
  };

  return {
    start,
  };
};

module.exports = server();
