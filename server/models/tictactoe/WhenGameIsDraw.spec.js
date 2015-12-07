var tictactoeCommandHandler = require('./tictactoeCommandHandler.js');

describe('a game is a draw', function() {
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
      x: 0,
      y: 0,
      side:'X',
      timeStamp: "2015.12.04T21:40:00"
    },{
      id: "888",
      event: "MoveMade",
      userName: "Halldor",
      x: 0,
      y: 1,
      side:'O',
      timeStamp: "2015.12.04T21:42:00"
    },{
      id: "888",
      event: "MoveMade",
      userName: "Anna",
      x: 0,
      y: 2,
      side:'X',
      timeStamp: "2015.12.04T21:44:00"
    },{
      id: "888",
      event: "MoveMade",
      userName: "Halldor",
      x: 1,
      y: 1,
      side:'O',
      timeStamp: "2015.12.04T21:42:00"
    },{
      id: "888",
      event: "MoveMade",
      userName: "Anna",
      x: 1,
      y: 0,
      side:'X',
      timeStamp: "2015.12.04T21:44:00"
    },{
      id: "888",
      event: "MoveMade",
      userName: "Halldor",
      x: 1,
      y: 2,
      side:'O',
      timeStamp: "2015.12.04T21:42:00"
    },{
      id: "888",
      event: "MoveMade",
      userName: "Anna",
      x: 2,
      y: 1,
      side:'X',
      timeStamp: "2015.12.04T21:44:00"
    },{
      id: "888",
      event: "MoveMade",
      userName: "Halldor",
      x: 2,
      y: 0,
      side:'O',
      timeStamp: "2015.12.04T21:42:00"
    }];
  });

  describe('board is full', function() {
    it('should be a draw', function() {
      when = {
        id: "888",
        command: "MakeMove",
        userName: "Anna",
        x: 2,
        y: 2,
        side:'X',
        timeStamp: "2015.12.04T22:13:00"
      };
      then = [{
        id: "888",
        event: "GameDraw",
        name: "SixthGameName",
        timeStamp: "2015.12.04T22:13:00"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    })
  });
});
