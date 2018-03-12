'use strict';

const getRepository = require('../repository/get');
const _ = require('lodash');
const Boom = require('boom');

const getHandler = () => {
  const getOne = async (filter) => {
    try {
      const foundOnDb = await getRepository.findOne(filter);

      if (!foundOnDb) {
        return Boom.notFound('Nothing was found');
      }

      const responseBody = {
        found: !!foundOnDb,
        data: foundOnDb,
      };
      return responseBody;
    } catch (err) {
      return Boom.badRequest('We failed to insert the data =(');
    }
  };

  return {
    getOne,
  };
};

module.exports = getHandler();
