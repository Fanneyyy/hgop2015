'use strict';

module.exports = function user(person) {
  var cmd = {
    id: "1234",
    gameId: undefined,
    userName: undefined,
    name: undefined,
    command: undefined,
    timeStamp: new Date()
  };
  var userApi = {
    createsGame: function(id) {
      cmd.gameId = id;
      cmd.userName = person;
      cmd.command = "CreateGame";
      userApi.destination = '/api/createGame';
      return userApi;
    },
    named: function(gameName) {
      cmd.name = gameName;
      return userApi;
    },
    joinsGame: function(id) {
      cmd.gameId = id;
      cmd.userName = person;
      cmd.creatorUserName = undefined;
      cmd.command = "JoinGame";
      userApi.destination = '/api/joinGame';
      return userApi;
    },
    placeMove: function(x,y) {
      cmd.command = "MakeMove";
      cmd.x = x;
      cmd.y = y;
      userApi.destination = '/api/makeMove';
      return userApi;
    }
  };

  userApi._user = cmd;

  return userApi;
};
