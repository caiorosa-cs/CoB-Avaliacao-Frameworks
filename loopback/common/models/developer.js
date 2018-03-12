'use strict';

module.exports = function (Developer) {
  Developer.add = function (dev, cb) {
    return Developer.create(dev)
      .then((response) => (response))
      .catch((error) => cb(error, null));
  };

  Developer.get = function (name, cb) {
    const filter = {
      where: {
        name: name
      }
    };
    return Developer.findOne(filter)
      .then((response) => (response))
      .catch((error) => cb(error, null));
  }

  Developer.remoteMethod(
    'get', {
      http: {
        path: '',
        verb: 'get',
      },
      accepts: [{
        arg: 'name',
        type: 'string',
        root: true,
        required: true,
        http: {
          source: 'query'
        }
      }],
      returns: {
        arg: 'Developer',
        type: 'Developer',
        root: true,
      }
    }
  )

  Developer.remoteMethod(
    'add', {
      http: {
        path: '',
        verb: 'post',
      },
      accepts: [{
        arg: 'Developer',
        type: 'Developer',
        root: true,
        required: true,
        http: {
          source: 'body'
        }
      }],
      returns: {
        arg: 'Developer',
        type: 'Developer',
        root: true,
      },
    }
  );
};
