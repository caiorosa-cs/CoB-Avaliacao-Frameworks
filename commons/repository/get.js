'use strict';

const db = require('../db');

const findData = () => {
  const findOne = async filter => db.collection('express').findOne(filter);

  return {
    findOne,
  };
};

module.exports = findData();
