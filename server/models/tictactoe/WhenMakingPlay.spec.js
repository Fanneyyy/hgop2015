var tictactoeCommandHandler = require('./tictactoeCommandHandler.js');

describe('making a play command', function() {
  var given, when, then;

  it('should make a play on a new game', function() {
    given = [{
      id: "888",
      event: "GameJoined",
      name: "SixthGameName",
      userName: "Anna",
      creatorUserName: "Halldor",
      timeStamp: "2015.12.04T21:31:00"
    }];
    when = {
      id: "888",
      command: "MakeMove",
      userName: "Anna",
      x:1,
      y:1,
      side:'X',
      timeStamp: "2015.12.04T21:45:00"
    };
    then = [{
      id:"888",
      event:"MoveMade",
      userName:"Anna",
      name:"TheFirstGame",
      x:1,
      y:1,
      side:'X',
      timeStamp: "2015.12.04T21:45:00"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });
});
