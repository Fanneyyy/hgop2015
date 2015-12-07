'use strict';
var express = require('express');

module.exports = function(eventStorage) {

  var router = express.Router();

  var controller = require('../command.controller.js')(eventStorage);
  router.post('/', controller.executeCommand);

  return {
    router:router
  }
};
