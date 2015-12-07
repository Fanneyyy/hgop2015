var should = require('should');
var inMemoryStorage = require('./memoryStorage');

describe('in memory storage', function() {

  it('should return an empty array for an unknown id', function() {

    var localStorage = inMemoryStorage();

    localStorage.loadEvents('1234',function(err, loadedEvents) {
      should(loadedEvents.length).be.exactly(0);
      should(loadedEvents).be.instanceof(Array);
    });

  });

  it('should return events previously stored', function() {

    var localStorage = inMemoryStorage();

    localStorage.loadEvents('1234', [{"id":"1"}]).then(function() {
      localStorage.loadEvents('1234').then(function(loadedEvents) {
        should(loadedEvents).eql([{"id":"1"}]);
      });
    });

  });
});
