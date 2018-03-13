'use strict';

const restify = require('restify');
const insertHandler = require('../commons/handlers/insertHandler');
const getHandler = require('../commons/handlers/getHandler');
const devSchema = require('../commons/schemas/dev.schema');
const Boom = require('boom');

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
        const payload = req.body;
        console.log(payload);
        const validation = devSchema.validate(payload);
        if (validation.error) {
          return res.send(Boom.badRequest('Bad input'));
        }
        console.log(validation);

        const response = await insertHandler.insertOne(req.body);
        return res.send(response);
      } catch (err) {
        return res.send({
          failed: true,
          err,
        });
      }
    });

    restifyServer.listen(8080, () => {
      console.log('%s listening at %s', restifyServer.name, restifyServer.url);
    });
  };

  return {
    start,
  };
};

module.exports = server();
