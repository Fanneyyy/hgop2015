module.exports = function tictactoeCommandHandler(events) {
  var gameCreatedEvent = events[0];

  return {
    executeCommand: function(cmd) {
      if (cmd.command === "CreateGame") {
        return [{
          id: cmd.id,
          event: "GameCreated",
          name: cmd.name,
          userName: cmd.userName,
          timeStamp: cmd.timeStamp
        }];
      }
      if (cmd.command === "JoinGame") {
        if (gameCreatedEvent === undefined) {
          return [{
            id: cmd.id,
            event: "GameDoesNotExist",
            name: cmd.name,
            userName: cmd.userName,
            timeStamp: cmd.timeStamp
          }];
        }
        return [{
          id: cmd.id,
          event: "GameJoined",
          name: cmd.name,
          userName: cmd.userName,
          creatorUserName: gameCreatedEvent.userName,
          timeStamp: cmd.timeStamp
        }];
      }
    }
  };
};
