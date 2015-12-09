'use strict';

var express = require('express');

module.exports = function(eventStore) {
  console.log("Called api/joinGame/index");
  var controller = require('../command.controller')(eventStore);

  var router = express.Router();
  router.post('/', controller.executeCommand);

  return {
    router:router
  }
};
