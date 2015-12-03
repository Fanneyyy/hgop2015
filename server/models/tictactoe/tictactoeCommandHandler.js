module.exports = function tictactoeCommandHandler(events) {
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
        return [{
          id: "444",
          event: "GameJoined",
          name: "ThirdGameName",
          userName: "Fanney",
          secondUserName: "Svavar",
          timeStamp: "2015.12.03T19:34:00"
        }];
      }
    }
  };
};
