var q = require('q');

module.exports = function(){
  var storage = {};

  return {
    loadEvents : function(id){
      var deferred = q.defer();
      deferred.resolve(storage[id] || []);
      return deferred.promise;
    }
  }
};
