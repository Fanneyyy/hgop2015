'use strict';
var boundedContext = require('../models/tictactoe/tictactoeBoundedContext');
var tictactoeHandler = require('../models/tictactoe/tictactoeCommandHandler');

var app = require('../app');

module.exports = function (store) {
  return {
    executeCommand: function (req, res) {
      try {
        var context = boundedContext(store, tictactoeHandler);

        context.handleCommand(req.body).then(function (result) {
          res.json(result);
        }, function (err) {
          res.json(err);
        });
      }
      catch (e) {
        res.json(e)
      }
    }
  };
};
