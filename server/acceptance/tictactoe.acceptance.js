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
      user("Fanney")
        .createsGame("666")
        .named("TheFirstGame")
    )
      .expect("GameCreated")
      .withName("TheFirstGame")
      .byUser("Fanney")
      .isOk(done);
  });

  it('Should execute fluid API test for join game', function (done) {
    given(
      user("Svavar")
        .createsGame("686")
        .named("TheSecondGame")
      )
      .and(
        user("Mani")
          .joinsGame("686")
      )
      .expect("GameJoined")
      .withName("TheSecondGame")
      .byUser("Mani")
      .isOk(done)
  });

  it('Should play game until game is won', function (done) {
    given(
      user("Maren")
        .createsGame("232")
        .named("TheThirdGame")
      )
      .and(
        user("Musli")
          .joinsGame("232")
      )
      .and(
        user("Maren")
          .placeMove(0,0)
      )
      .and(
        user("Musli")
          .placeMove(2,2)
      )
      .and(
        user("Maren")
          .placeMove(0,1)
      )
      .and(
        user("Musli")
          .placeMove(1,2)
      )
      .and(
        user("Maren")
          .placeMove(0,2)
      )
      .expect("GameWon")
      .withName("TheThirdGame")
      .byUser("Maren")
      .isOk(done);
  });
});
