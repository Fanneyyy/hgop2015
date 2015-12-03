module.exports = function tictactoeCommandHandler(events) {
  return {
    executeCommand: function() {
      return [{
        id: "111",
        event: "GameCreated",
        name: "FirstGameName",
        userName: "Fanney",
        timeStap: "2015.12.03T14:32:00"
      }];
    }
  };
};
