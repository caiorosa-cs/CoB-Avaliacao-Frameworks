'use strict';

const Joi = require('joi');

const devSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  position: Joi.string().required(),
});

module.exports = devSchema;
