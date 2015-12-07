var utils = require('lodash');

module.exports = function tictactoeCommandHandler(events) {
  var gameState = {
    gameCreatedEvent: events[0],
    gameBoard: [['','',''],['','',''],['','','']]
  };

  var eventHandlers = {
    "MoveMade": function(event) {
      gameState.gameBoard[event.x][event.y] = event.side;
    }
  };

  var gameLogic = {
    "RowWon": function(x, y, side) {
      gameState.gameBoard[x][y] = side;
      if (gameState.gameBoard[x][0] === side
        && gameState.gameBoard[x][1] === side
        && gameState.gameBoard[x][2] === side) {
        return true;
      }
      return false;
    },
    "ColumnWon": function(x, y, side) {
      gameState.gameBoard[x][y] = side;
      if (gameState.gameBoard[0][y] === side
        && gameState.gameBoard[1][y] === side
        && gameState.gameBoard[2][y] === side) {
        return true;
      }
      return false;
    }
  };

  utils.each(events, function(event) {
    var eventFound = eventHandlers[event.event];
    if (eventFound) {
      eventFound(event);
    }
  });

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
      if (!gameState.gameCreatedEvent) {
        return [{
          id: cmd.id,
          event: "GameDoesNotExist",
          name: cmd.name,
          userName: cmd.userName,
          timeStamp: cmd.timeStamp
        }];
      }
      if (gameState.gameCreatedEvent.creatorUserName) {
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
        creatorUserName: gameState.gameCreatedEvent.userName,
        timeStamp: cmd.timeStamp
      }];
    },
    "MakeMove": function(cmd) {
      if (gameState.gameBoard[cmd.x][cmd.y] === '') {
        if (gameLogic.RowWon(cmd.x, cmd.y, cmd.side)
          || gameLogic.ColumnWon(cmd.x, cmd.y, cmd.side)) {
          return [{
            id: cmd.id,
            event: "GameWon",
            name: gameState.gameCreatedEvent.name,
            userName: cmd.userName,
            side: cmd.side,
            timeStamp: cmd.timeStamp
          }];
        }
        return [{
          id: cmd.id,
          event: "MoveMade",
          name: gameState.gameCreatedEvent.name,
          userName: cmd.userName,
          x: cmd.x,
          y: cmd.y,
          side: cmd.side,
          timeStamp: cmd.timeStamp
        }];
      }
      return [{
        id: cmd.id,
        event: "IllegalMove",
        name: gameState.gameCreatedEvent.name,
        userName: cmd.userName,
        x: cmd.x,
        y: cmd.y,
        side: cmd.side,
        timeStamp: cmd.timeStamp
      }];
    }
  };

  return {
    executeCommand: function(cmd) {
      return handlers[cmd.command](cmd);
    }
  };
};
