'use strict';

var user = require('../acceptance/userApi');
var given = require('../acceptance/fluidApi');

describe('Capacity testing', function() {
  it('Should play 1000 games in x seconds.', function (done) {
    var doneCount = 0;
    var gamesToPlay = 15;
    var x = 6;

    this.timeout(x * 1000);

    var QED = function () {
      if (gamesToPlay === ++doneCount) {
        done();
      }
    };

    for (var gameId = 0; gameId < gamesToPlay; gameId++) {
      given(user("Palpatine").createsGame("" + gameId).named("TheUltimateGame" + gameId))
        .and(user("BobaFett").joinsGame("" + gameId))
        .and(user("Palpatine").placeMove(0, 0))
        .and(user("BobaFett").placeMove(0, 1))
        .and(user("Palpatine").placeMove(0, 2))
        .and(user("BobaFett").placeMove(1, 1))
        .and(user("Palpatine").placeMove(1, 0))
        .and(user("BobaFett").placeMove(1, 2))
        .and(user("Palpatine").placeMove(2, 1))
        .and(user("BobaFett").placeMove(2, 0))
        .and(user("Palpatine").placeMove(2, 2))
        .expect("GameDraw")
        .withName("TheUltimateGame" + gameId)
        .isOk(QED);
    }
  });
});
