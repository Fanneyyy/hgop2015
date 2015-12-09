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
    given(
      user("YourUser")
        .createsGame("TheFirstGame")
    )
      .expect("GameCreated")
      .withName("TheFirstGame")
      .isOk(done);
  });
});

function given(cmdName) {
  var cmd = {
    commandName: cmdName,
    destination: '/api/createGame'
  };
  delete cmd.commandName.createsGame;

  var expectations = [];

  var givenApi = {

    expect: function (eventName) {
      expectations.push({event:eventName});
      return givenApi;
    },
    withName: function (gameName) {
      expectations.push({name:gameName});
      return givenApi;
    },
    isOk: function (done) {
      var req = request(acceptanceUrl);
      req
        .post(cmd.destination)
        .type('json')
        .send(cmd.commandName)
        .end(function (err, res) {
          if (err) return done(err);
          request(acceptanceUrl)
            .get('/api/gameHistory/' + cmd.commandName.gameId)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
              if (err) return done(err);
              res.body.should.be.instanceof(Array);
              should(res.body.event).eql(expectations.event);
              should(res.body.name).eql(expectations.name);
              done();
            });
        });
    }
  };
  return givenApi;
}

function user(person) {
  var user = {
    id: "1234",
    gameId: "999",
    userName: person,
    name: undefined,
    command: undefined,
    timeStamp: new Date(),
    createsGame: function(gameName) {
      user.name = gameName;
      user.command = "CreateGame";
      return user;
    }
  };
  return user;
}
