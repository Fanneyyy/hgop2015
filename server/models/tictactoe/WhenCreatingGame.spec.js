var tictactoeCommandHandler = require('./tictactoeCommandHandler.js');

describe('create game command', function() {
  var given, when, then;

  it('should create a game', function() {
    given = [];
    when = {
      gameId: "1",
      command: "CreateGame",
      name: "FirstGameName",
      userName: "Fanney",
      timeStamp: "2015.12.03T14:32:00"
    };
    then = [{
      gameId: "1",
      event: "GameCreated",
      name: "FirstGameName",
      userName: "Fanney",
      side: "X",
      timeStamp: "2015.12.03T14:32:00"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

  it('should create another game with different information', function() {
    given = [];
    when = {
      gameId: "2",
      command: "CreateGame",
      name: "SecondGameName",
      userName: "Svavar",
      timeStamp: "2015.12.03T19:19:00"
    };
    then = [{
      gameId: "2",
      event: "GameCreated",
      name: "SecondGameName",
      userName: "Svavar",
      side: "X",
      timeStamp: "2015.12.03T19:19:00"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });
});
