'use strict';

var app = require('../../app');

// gameHistory
module.exports = function (eventStorage) {
  return {
    index: function (req, res) {
      eventStorage.loadEvents(req.params.gameId).then(function (events) {
        res.json(events);
      }, function (err) {
        res.json(err);
      });
    }
  }
};
