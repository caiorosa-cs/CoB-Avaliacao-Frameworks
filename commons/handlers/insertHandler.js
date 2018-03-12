'use strict';

const insertRepository = require('../repository/insert');
const _ = require('lodash');
const Boom = require('boom');

const insertHandler = () => {
  const insertOne = async (payload) => {
    try {

      const insertedOnDb = await insertRepository.insertOne(payload);
      const responseBody = {
        inserted: !!insertedOnDb,
        _id: _.get(insertedOnDb, 'insertedIds.0'),
      };
      return responseBody;
    } catch (err) {
      return Boom.badRequest('We failed to insert the data =(');
    }
  };

  return {
    insertOne,
  };
};

module.exports = insertHandler();
