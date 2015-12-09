var tictactoeCommandHandler = require('./tictactoeCommandHandler.js');

describe('join game command', function() {
  var given, when, then;

  it('should join game', function() {
    given = [{
      id: "333",
      gameId: "555",
      event: "GameCreated",
      name: "ThirdGameName",
      userName: "Fanney",
      timeStamp: "2015.12.03T19:31:00"
    }];
    when = {
      id: "444",
      gameId: "555",
      command: "JoinGame",
      name: "ThirdGameName",
      userName: "Svavar",
      timeStamp: "2015.12.03T19:34:00"
    };
    then = [{
      id: "444",
      gameId: "555",
      event: "GameJoined",
      name: "ThirdGameName",
      userName: "Svavar",
      creatorUserName: "Fanney",
      timeStamp: "2015.12.03T19:34:00"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

  it('should not join game that does not exist', function() {
    given = [];
    when = {
      id: "555",
      gameId: "555",
      command: "JoinGame",
      name: "FourthGameName",
      userName: "Mani",
      timeStamp: "2015.12.03T20:37:00"
    };
    then = [{
      id: "555",
      gameId: "555",
      event: "GameDoesNotExist",
      name: "FourthGameName",
      userName: "Mani",
      timeStamp: "2015.12.03T20:37:00"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

  it('should not join game that already has a second user', function() {
    given = [{
      id: "777",
      gameId: "555",
      event: "GameJoined",
      name: "FifthGameName",
      userName: "Maren",
      creatorUserName: "Arni",
      timeStamp: "2015.12.03T20:55:00"
    }];
    when = {
      id: "888",
      gameId: "555",
      command: "JoinGame",
      name: "FifthGameName",
      userName: "Soffia",
      timeStamp: "2015.12.03T20:56:00"
    };
    then = [{
      id: "888",
      gameId: "555",
      event: "GameIsFull",
      name: "FifthGameName",
      userName: "Soffia",
      timeStamp: "2015.12.03T20:56:00"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });
});
