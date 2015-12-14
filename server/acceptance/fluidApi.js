'use strict';

var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;

module.exports = function given(cmdName) {
  var cmd = [
    cmdName
  ];

  var gameId = cmdName._user.gameId;
  var username = cmdName._user.userName;
  var name = cmdName._user.name;

  var expectations = {
    event: undefined,
    name: undefined,
    otherUser: undefined
  };

  var req = request(acceptanceUrl);

  var givenApi = {

    and: function(nextCommand) {
      if (nextCommand._user.hasOwnProperty("side")) {
        if (nextCommand._user.userName === username) {
          nextCommand._user.side = 'X';
        } else {
          nextCommand._user.side = 'O';
        }
      }
      nextCommand._user.gameId = gameId;
      nextCommand._user.name = name;
      nextCommand._user.creatorUserName = username;
      cmd.push(nextCommand);
      return givenApi;
    },
    expect: function (eventName) {
      expectations.event = eventName;
      return givenApi;
    },
    withName: function (gameName) {
      expectations.name = gameName;
      return givenApi;
    },
    byUser: function (otherUser) {
      expectations.otherUser = otherUser;
      return givenApi;
    },
    isOk: function (done) {
      postCommand(cmd, 0, done);
    }
  };
  return givenApi;

  function postCommand(commands, i, done) {
    if (i < commands.length) {
      req
        .post(commands[i].destination)
        .type('json')
        .send(commands[i]._user)
        .end(function (err, res) {
          if (err) return done(err);
          res.statusCode.should.be.eql(200);
          postCommand(commands, ++i, done);
        });
    } else {
      request(acceptanceUrl)
        .get('/api/gameHistory/' + gameId)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Array);
          should(res.body[res.body.length-1].event).eql(expectations.event);
          should(res.body[res.body.length-1].name).eql(expectations.name);
          should(res.body[res.body.length-1].userName).eql(expectations.otherUser);
          done();
        });
    }
  }
};
