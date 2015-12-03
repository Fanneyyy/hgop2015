var tictactoeCommandHandler = require('./tictactoeCommandHandler.js');

describe('join game command', function() {
  var given, when, then;

  it('should join game', function() {
    given = [{
      id: "333",
      event: "GameCreated",
      name: "ThirdGameName",
      userName: "Fanney",
      timeStamp: "2015.12.03T19:31:00"
    }];
    when = {
      id: "444",
      command: "JoinGame",
      name: "ThirdGameName",
      userName: "Svavar",
      timeStamp: "2015.12.03T19:34:00"
    };
    then = [{
      id: "444",
      event: "GameJoined",
      name: "ThirdGameName",
      userName: "Fanney",
      secondUserName: "Svavar",
      timeStamp: "2015.12.03T19:34:00"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });
});

