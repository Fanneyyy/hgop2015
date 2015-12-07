var should = require('should');
var inMemoryStore = require('./memoryStorage');

describe('in memory storage', function() {

  it('should return an empty array for an unknown id', function() {

    var localStore = inMemoryStore();

    localStore.loadEvents('1234',function(err, loadedEvents){
      should(loadedEvents.length).be.exactly(0);
      should(loadedEvents).be.instanceof(Array);
    });

  });
});
