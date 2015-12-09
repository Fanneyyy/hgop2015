'use strict';

var should = require('should');
var request = require('supertest');
var given = require('./fluidApi.js');
var user = require('./userApi.js');
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
    given(
      user("YourUser")
        .createsGame("TheFirstGame")
    )
      .expect("GameCreated")
      .withName("TheFirstGame")
      .isOk(done);
  });

  it('Should execute fluid API test for join game', function (done) {
    given(
      user("YourUser")
        .createsGame("GameIdOne")
        .named("TheFirstGame")
      )
      .and(
        user("OtherUser")
          .joinsGame("GameIdOne")
      )
      .expect("GameJoined")
      .withName("TheFirstGame")
      .byUser("OtherUser")
      .isOk(done)
  });
});
