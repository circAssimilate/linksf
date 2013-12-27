var _             = require('underscore'),
    Facility      = require('cloud/models/facility');

var queryFunction = function(runWhere) {
  return _.partial(Parse.Cloud.run, "browse");
};

var submit = function(params) {
  var deferred = $.Deferred();

  performQuery(params, deferred);

  return deferred.promise();
};

var performQuery = function(params, deferred) {
  var query = queryFunction('browser');

  query(params, {
    success: function(result) {
      deferred.resolve({data: result.slice(1), offset: result[0]});
    },

    error: function(err) {
      deferred.reject(err);
    }
  });
};

// TODO -- hoist this up a layer into "browse" -- or wherever we keep the direct parse communication lib.
var getByID = function(id) {
  var deferred = $.Deferred(),
      q = new Parse.Query(Facility);

  q.include('services');
  q.get(id, {
    success: function(result) {
      deferred.resolve(result);
    },
    error: function(err) {
      deferred.reject(err);
    }
  });

  return deferred.promise();
};

module.exports = {
  submit: submit,
  getByID: getByID
};
