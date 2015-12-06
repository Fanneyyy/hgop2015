module.exports = function tictactoeCommandHandler(events) {
  var gameCreatedEvent = events[0];

  var handlers = {
    "CreateGame": function(cmd) {
      {
        return [{
          id: cmd.id,
          event: "GameCreated",
          name: cmd.name,
          userName: cmd.userName,
          timeStamp: cmd.timeStamp
        }];
      }
    },
    "JoinGame": function(cmd) {
      if (!gameCreatedEvent) {
        return [{
          id: cmd.id,
          event: "GameDoesNotExist",
          name: cmd.name,
          userName: cmd.userName,
          timeStamp: cmd.timeStamp
        }];
      }
      if (gameCreatedEvent.creatorUserName) {
        return [{
          id: cmd.id,
          event: "GameIsFull",
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
    },
    "MakeMove": function(cmd) {
      return [{
        id:"888",
        event:"MoveMade",
        userName:"Anna",
        name:"TheFirstGame",
        x:1,
        y:1,
        side:'X',
        timeStamp: "2015.12.04T21:45:00"
      }];
    }
  }

  return {
    executeCommand: function(cmd) {
      return handlers[cmd.command](cmd);
    }
  };
};
