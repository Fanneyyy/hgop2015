'use strict';

describe('Factory: TicTacToeState', function () {

  var gameState;
  // load the controller's module
  beforeEach(module('tictactoeApp'));


  // Initialize the controller and a mock scope
  beforeEach(inject(function (_gameState_) {
    gameState = _gameState_();
  }));

  it('Should add other player to game state when gameJoined', function () {
    gameState.mutate([{
        event: 'GameJoined',
        userName: 'Fanney',
        name: 'TheFirstGame',
        timeStamp: '2014-12-02T11:29:29'
      }]
    );

    expect(gameState.joiningUser).toBe('Fanney');
  });

  it('Should store gameid and name from game created in game state.', function () {
    gameState.mutate([{
        event: 'GameCreated',
        gameId: '198299',
        userName: 'Fanney',
        name: 'TheFirstGame',
        timeStamp: '2014-12-02T11:29:29'
      }]
    );

    expect(gameState.gameId).toBe('198299');
    expect(gameState.name).toBe('TheFirstGame');
    expect(gameState.creatingUser).toBe('Fanney');
  });

  it('Should add moves 0,1 to game board', function () {

    gameState.mutate([{
        event: 'MovePlaced',
        userName: 'Fanney',
        name: 'TheFirstGame',
        timeStamp: '2014-12-02T11:29:29',
        x: '0',
        y: '1',
        side: 'X'
      }]
    );

    expect(gameState.board[0][1]).toBe('X');

  });

  it('Should add move 2,2 to board.', function () {

    gameState.mutate([{
        event: 'MoveMade',
        userName: 'Fanney',
        name: 'TheFirstGame',
        timeStamp: '2014-12-02T11:29:29',
        x: '2',
        y: '2',
        side: 'X'
      }]
    );

    expect(gameState.board[2][2]).toBe('X');

  });

  it('Should mark nextTurn as opposite from last event.', function () {
    gameState.me = {side: 'O'};
    gameState.mutate([{
        event: 'MoveMade',
        userName: 'Fanney',
        name: 'TheFirstGame',
        timeStamp: '2014-12-02T11:29:29',
        x: '2',
        y: '2',
        side: 'X'
      }]
    );

    expect(gameState.nextTurn).toBe('O');
  });

  it('nextTurn should default to X', function () {
    gameState.me = {side: 'X'};
    gameState.mutate([{
        event: 'GameCreated',
        userName: 'Fanney',
        name: 'TheFirstGame',
        timeStamp: '2014-12-02T11:29:29'
      }]
    );

    expect(gameState.nextTurn).toBe('X');
  });

  it('GameWon should set nextTurn to GameOver',function(){
    gameState.me = {side: 'X'};
    gameState.mutate([{
        event: 'GameWon',
        userName: 'Fanney',
        name: 'TheFirstGame',
        timeStamp: '2014-12-02T11:29:29'
      }]
    );

    expect(gameState.nextTurn).toBe('GameOver');
    expect(gameState.winner).toBe('Fanney');
  });

  it('GameDraw should set nextTurn to GameOver',function(){
    gameState.me = {side: 'X'};
    gameState.mutate([{
        event: 'GameDraw',
        userName: 'Fanney',
        name: 'TheFirstGame',
        timeStamp: '2014-12-02T11:29:29'
      }]
    );

    expect(gameState.nextTurn).toBe('GameOver');
    expect(gameState.gameDraw).toBe(true);
  });
});
