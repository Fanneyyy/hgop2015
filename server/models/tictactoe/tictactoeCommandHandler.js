module.exports = function tictactoeCommandHandler(events) {
  return {
    executeCommand: function(cmd) {
      return [{
        id: cmd.id,
        event: "GameCreated",
        name: cmd.name,
        userName: cmd.userName,
        timeStap: cmd.timeStap
      }];
    }
  };
};
