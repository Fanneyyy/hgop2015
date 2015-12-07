/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app, config) {

  var eventStorage = require('.' + config.event_storage)();

  // Insert routes below
  app.get("/api/testApi", function(req, res){
    res.json({"test":"test"});
  });

  app.use('/api/gameHistory', require('./api/gameHistory')(eventStorage).router);
  app.use('/api/createGame', require('./api/createGame')(eventStorage).router);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
