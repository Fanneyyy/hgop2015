'use strict';

var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;

describe('TEST ENV GET /api/gameHistory', function() {

  it('should have ACCEPTANCE_URL environment variable exported.', function() {
    acceptanceUrl.should.be.ok;
  });

  it('should execute same test using old style', function(done) {

    var command = {
      id : "1234",
      gameId : "999",
      command: "CreateGame",
      userName: "Fanney",
      name: "TheFirstGame",
      timeStamp: "2015-12-07T18:09:29"
    };

    var req = request(acceptanceUrl);
    req
      .post('/api/createGame')
      .type('json')
      .send(command)
      .end(function (err, res) {
        if (err) return done(err);
        request(acceptanceUrl)
          .get('/api/gameHistory/999')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            if (err) return done(err);
            res.body.should.be.instanceof(Array);
            should(res.body).eql(
              [{
                "id": "1234",
                "gameId": "999",
                "event": "GameCreated",
                "userName": "Fanney",
                "name": "TheFirstGame",
                "timeStamp": "2015-12-07T18:09:29"
              }]);
            done();
          });
      });
  });

  it('Should execute fluid API test for create game', function (done) {
    given({
      id : "1234",
      gameId : "999",
      command: "CreateGame",
      userName: "Fanney",
      name: "TheFirstGame",
      timeStamp: "2015-12-07T18:09:29"
    })
      .sendTo('/api/createGame')
      .expect([{
        "id": "1234",
        "gameId": "999",
        "event": "GameCreated",
        "userName": "Fanney",
        "name": "TheFirstGame",
        "timeStamp": "2015-12-07T18:09:29"
      }])
      .when(done);
  });
});

function given(event) {
  var cmd = {
    object: event,
    destination: undefined
  };

  var expectations = [];

  var givenApi = {

    sendTo: function (dest) {
      cmd.destination = dest;
      return givenApi;
    },

    expect: function (eventName) {
      expectations.push(eventName);
      return givenApi;
    },
    //and: givenApi.expect,
    when: function (done) {
      var req = request(acceptanceUrl);
      req
        .post(cmd.destination)
        .type('json')
        .send(cmd.object)
        .end(function (err, res) {
          if (err) return done(err);
          request(acceptanceUrl)
            .get('/api/gameHistory/' + cmd.object.gameId)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
              if (err) return done(err);
              res.body.should.be.instanceof(Array);
              should(res.body).eql(expectations);
            });
          done();
        });
    }
  };
  return givenApi;
}
