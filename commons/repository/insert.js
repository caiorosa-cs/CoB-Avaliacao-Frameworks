'use strict';

const db = require('../db');

const insertData = () => {
  const insertOne = async data => db.collection('express').insert(data);

  return {
    insertOne,
  };
};

module.exports = insertData();
