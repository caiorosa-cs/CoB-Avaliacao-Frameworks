'use strict';

const express = require('express');
const insertHandler = require('../commons/handlers/insertHandler');
const getHandler = require('../commons/handlers/getHandler');
const bodyParser = require('body-parser');

const server = () => {
  const app = express();
  app.use(bodyParser.json());

  const start = () => {
    app.get('/express', async (req, res) => {
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

    app.post('/express', async (req, res) => {
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

    app.listen(3000, () => console.log('Express is up on port 3000'))
  };

  return {
    start,
  };
};

module.exports = server();