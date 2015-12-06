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
      x: 1,
      y: 1,
      side:'X',
      timeStamp: "2015.12.04T21:45:00"
    };
    then = [{
      id: "888",
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
      id: "888",
      event: "GameJoined",
      name: "SixthGameName",
      userName: "Anna",
      creatorUserName: "Halldor",
      timeStamp: "2015.12.04T21:31:00"
    },{
      id: "888",
      event: "MoveMade",
      name: "SixthGameName",
      userName: "Anna",
      x: 1,
      y: 1,
      side: 'X',
      timeStamp: "2015.12.04T21:45:00"
    }];
    when = {
      id: "888",
      command: "MakeMove",
      userName: "Halldor",
      x: 1,
      y: 1,
      side: 'O',
      timeStamp: "2015.12.04T22:13:00"
    };
    then = [{
      id: "888",
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
      id: "999",
      event: "GameJoined",
      name: "SeventhGameName",
      userName: "Elva",
      creatorUserName: "Siggi",
      timeStamp: "2015.12.04T23:01:00"
    },{
      id: "999",
      event: "GameJoined",
      name: "SeventhGameName",
      userName: "Elva",
      x: 2,
      y: 1,
      side: 'X',
      timeStamp: "2015.12.04T23:03:00"
    }];
    when = {
      id: "999",
      command: "MakeMove",
      userName: "Siggi",
      x: 1,
      y: 3,
      side: 'O',
      timeStamp: "2015.12.04T23:05:00"
    };
    then = [{
      id: "999",
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
