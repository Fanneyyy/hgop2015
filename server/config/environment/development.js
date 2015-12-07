'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/tictactoe-dev'
  },
  event_storage: '/event_storage/memory_storage/memoryStorage',
  seedDB: true
};
