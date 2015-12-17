var tictactoeCommandHandler = require('./tictactoeCommandHandler.js');

describe('making a play command', function() {
  var given, when, then;

  it('should make a play on a new game', function() {
    given = [{
      gameId: "555",
      event: "GameCreated",
      name: "SixthGameName",
      userName: "Halldor",
      side: "X",
      timeStamp: "2015.12.04T20:50:00"
    },{
      gameId: "555",
      event: "GameJoined",
      name: "SixthGameName",
      userName: "Anna",
      side: "O",
      creatorUserName: "Halldor",
      timeStamp: "2015.12.04T21:31:00"
    }];
    when = {
      gameId: "555",
      command: "MakeMove",
      userName: "Anna",
      x: 1,
      y: 1,
      side:'X',
      timeStamp: "2015.12.04T21:45:00"
    };
    then = [{
      gameId: "555",
      event: "MoveMade",
      name: "SixthGameName",
      userName: "Anna",
      x: 1,
      y: 1,
      side: 'X',
      timeStamp: "2015.12.04T21:45:00"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

  it('making a play on a non-empty box should be illegal', function() {
    given = [{
      gameId: "555",
      event: "GameCreated",
      name: "SixthGameName",
      userName: "Halldor",
      side: "X",
      timeStamp: "2015.12.04T20:50:00"
    },{
      gameId: "555",
      event: "GameJoined",
      name: "SixthGameName",
      userName: "Anna",
      side: "O",
      creatorUserName: "Halldor",
      timeStamp: "2015.12.04T21:31:00"
    },{
      gameId: "555",
      event: "MoveMade",
      name: "SixthGameName",
      userName: "Anna",
      x: 1,
      y: 1,
      side: 'X',
      timeStamp: "2015.12.04T21:45:00"
    }];
    when = {
      gameId: "555",
      command: "MakeMove",
      userName: "Halldor",
      x: 1,
      y: 1,
      side: 'O',
      timeStamp: "2015.12.04T22:13:00"
    };
    then = [{
      gameId: "555",
      event: "IllegalMove",
      name: "SixthGameName",
      userName: "Halldor",
      x: 1,
      y: 1,
      side: 'O',
      timeStamp: "2015.12.04T22:13:00"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

  it('making a play on a box that is out of bounds should be illegal', function() {
    given = [{
      gameId: "555",
      event: "GameCreated",
      name: "SeventhGameName",
      userName: "Siggi",
      side: "X",
      timeStamp: "2015.12.04T22:50:00"
    },{
      gameId: "555",
      event: "GameJoined",
      name: "SeventhGameName",
      userName: "Elva",
      side: "O",
      creatorUserName: "Siggi",
      timeStamp: "2015.12.04T23:01:00"
    }];
    when = {
      gameId: "555",
      command: "MakeMove",
      userName: "Siggi",
      x: 1,
      y: 3,
      side: 'O',
      timeStamp: "2015.12.04T23:05:00"
    };
    then = [{
      gameId: "555",
      event: "IllegalMove",
      name: "SeventhGameName",
      userName: "Siggi",
      x: 1,
      y: 3,
      side: 'O',
      timeStamp: "2015.12.04T23:05:00"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });
});
