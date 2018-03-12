'use strict';

const getHandler = require('../commons/handlers/getHandler');
const insertHandler = require('../commons/handlers/insertHandler');

const hapiControllers = (server) => {

  const get = {
    method: 'GET',
    path: '/hapi',
    options: {
      // validate: {
      //   params: getPostByFriendlyNameSchema,
      // },
      handler: async (request, h) => {
        // const post = await postHandler.getByFriendlyName(
        //   request.params.category,
        //   request.params.friendlyName
        // );

        const filter = {
          name: request.query.name,
        };

        const foundOnDb = await getHandler.getOne(filter);
        return h.response(foundOnDb);
      },
    },
  };

  const post = {
    method: 'POST',
    path: '/hapi',
    options: {
      // validate: {
      //   params: getPostByFriendlyNameSchema,
      // },
      handler: async (request, h) => {

        const insertedOnDb = await insertHandler.insertOne(request.payload);

        return h.response(insertedOnDb)
          .code(200);
      },
    },
  };

  server.route([get, post]);

};

module.exports = hapiControllers;
