'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/gameHistory', function () {

  it('should respond with JSON array with created events for game', function (done) {
    var command = {
      gameId: "999",
      command: "CreateGame",
      userName: "Fanney",
      name: "TheFirstGame",
      timeStamp: "2015-12-02T13:57:29"
    };

    var req = request(app);
    req
      .post('/api/createGame')
      .type('json')
      .send(command)
      .end(function(err, res) {
        if (err) return done(err);
        request(app)
          .get('/api/gameHistory/999')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            if (err) return done(err);
            res.body.should.be.instanceof(Array);
            should(res.body).eql(
              [{
                "gameId": "999",
                "event": "GameCreated",
                "userName": "Fanney",
                "name": "TheFirstGame",
                "side": "X",
                "timeStamp": "2015-12-02T13:57:29"
              }]);
            done();
          });
      });
  });
});
