var tictactoeCommandHandler = require('./tictactoeCommandHandler.js');

describe('winning a game', function() {
  var given, when, then;

  beforeEach(function() {
    given = [{
      id: "898",
      event: "GameCreated",
      name: "SixthGameName",
      userName: "Halldor",
      timeStamp: "2015.12.04T20:50:00"
    },{
      id: "888",
      event: "GameJoined",
      name: "SixthGameName",
      userName: "Anna",
      creatorUserName: "Halldor",
      timeStamp: "2015.12.04T21:31:00"
    },{
      id: "888",
      event: "MoveMade",
      userName: "Anna",
      x: 1,
      y: 1,
      side:'X',
      timeStamp: "2015.12.04T21:40:00"
    },{
      id: "888",
      event: "MoveMade",
      userName: "Anna",
      x: 0,
      y: 0,
      side:'X',
      timeStamp: "2015.12.04T21:42:00"
    },{
      id: "888",
      event: "MoveMade",
      userName: "Anna",
      x: 0,
      y: 1,
      side:'X',
      timeStamp: "2015.12.04T21:44:00"
    }];
  });

  describe('on a complete row', function() {
    it('should win game', function() {
      when = {
        id: "888",
        command: "MakeMove",
        userName: "Anna",
        x: 0,
        y: 2,
        side:'X',
        timeStamp: "2015.12.04T21:52:00"
      };
      then = [{
        id: "888",
        event: "GameWon",
        name: "SixthGameName",
        userName: "Anna",
        side: 'X',
        timeStamp: "2015.12.04T21:52:00"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    })
  });

  describe('on a complete column', function() {
    it('should win game', function() {
      when = {
        id: "888",
        command: "MakeMove",
        userName: "Anna",
        x: 2,
        y: 1,
        side:'X',
        timeStamp: "2015.12.04T23:52:00"
      };
      then = [{
        id: "888",
        event: "GameWon",
        name: "SixthGameName",
        userName: "Anna",
        side: 'X',
        timeStamp: "2015.12.04T23:52:00"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    })
  });
});
