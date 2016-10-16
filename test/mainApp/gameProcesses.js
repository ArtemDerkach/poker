'use strict';

const chai = require('chai');
const assert = chai.assert;

const Game = require('../../mainApp/gameProcesses.js').Game;

const Round = require('../../mainApp/gameProcesses.js').Round;
const Dealer = require('../../mainApp/dealerClass.js').Dealer;
const Bank = require('../../mainApp/bankClass.js').Bank;
const Table = require('../../mainApp/tableClass.js').Table;
// const Player = require('../../mainApp/playerClass.js').Player;
// const table = new Table();

describe('Game class', () => {

  describe('properties', () => {

    const game = new Game();

    describe('table property', () => {
      it('should have Table constructor', () => {
        assert.strictEqual(game.table.constructor, Table);
      });
    });
    describe('dealer property', () => {
      it('should have Dealer constructor', () => {
        assert.strictEqual(game.dealer.constructor, Dealer);
      });
    });
    describe('bank property', () => {
      it('should have Bank constructor', () => {
        assert.strictEqual(game.bank.constructor, Bank);
      });
    });
    describe('rounk property', () => {
      it('should have Round constructor', () => {
        assert.strictEqual(game.round.constructor, Round);
      });
    });
    describe('players property', () => {
      it('should be an object', () => {
        assert.isObject(game.players);
      });
    });
    describe('playersInGame property', () => {
      it('should be an array', () => {
        assert.isArray(game.playersInGame);
      });
    });
  });

  describe('methods', () => {

    const game = new Game();
    const names = ['Vasia', 'Petia', 'Grisha', 'Shura', 'Masha'];
    for (let i = 0; i < names.length - 2; i += 1) {
      game.addPlayer(names[i]);
    }

    describe('addPlayer method', () => {
      it('should return true if player arent in players property', () => {
        assert.isOk(game.addPlayer(names[3]));
      });
      it('should return false if player olready in players property', () => {
        assert.isNotOk(game.addPlayer(names[3]));
      });
      it('should add player to player property', () => {
        assert.property(game.players, [names[0]]);
      });
      it('should add player name to playersInGame property', () => {
        assert.include(game.playersInGame, names[1]);
      });
      it('should increase playersInGame property length by 1', () => {
        const numOfPlayersBeforeAdd = game.playersInGame.length;
        game.addPlayer(names[4]);
        assert.strictEqual(numOfPlayersBeforeAdd, game.playersInGame.length - 1);
      });
    });
    describe('removePlayer method', () => {

      const game = new Game();
      const names = ['Vasia', 'Petia', 'Grisha', 'Shura'];
      for (let i = 0; i < names.length; i += 1) {
        game.addPlayer(names[i]);
      }

      it('should return true if delete player', () => {
        assert.isOk(game.removePlayer(names[0]));
      });
      it('should return false if no player name in players property', () => {
        assert.isNotOk(game.removePlayer('Kesha'));
      });
      it('should remove player from players property', () => {
        game.removePlayer(names[1]);
        assert.notProperty(game.players, names[1]);
      });
      it('should decrease playersInGame property length by 1', () => {
        const numOfPlayersBeforeRemove = game.playersInGame.length;
        game.removePlayer(names[2]);
        assert.strictEqual(numOfPlayersBeforeRemove, game.playersInGame.length + 1);
      });
    });
    describe('takeBlindsFromPlayers method', () => {

      const game = new Game();
      const names = ['Vasia', 'Petia', 'Grisha', 'Shura'];

      it('should return false if there is not enough players to give blinds', () => {
        assert.isNotOk(game.takeBlindsFromPlayers());
      });
      it('should return true if there is enough players to give blinds', () => {
        for (let i = 0; i < names.length; i += 1) {
          game.addPlayer(names[i]);
        }
        assert.isOk(game.takeBlindsFromPlayers());
      });
      it('should mark first player with smallBlind === true', () => {
        assert.isOk(game.players[game.playersInGame[0]].smallBlind);
      });
      it('should mark second player with bigBlind === true', () => {
        assert.isOk(game.players[game.playersInGame[1]].bigBlind);
      });
      it('should decrease first player money by smallBlind cost', () => {
        game.players[game.playersInGame[0]].smallBlind = false;
        const playersMoneyBeforeBlind = game.players[game.playersInGame[0]].money;
        game.takeBlindsFromPlayers();
        assert.deepEqual(game.players[game.playersInGame[0]].money + 1, playersMoneyBeforeBlind);
      });
      it('should decrease second player money by bigBlind cost', () => {
        game.players[game.playersInGame[0]].smallBlind = false;
        const playersMoneyBeforeBlind = game.players[game.playersInGame[1]].money;
        game.takeBlindsFromPlayers();
        assert.deepEqual(game.players[game.playersInGame[1]].money + 2, playersMoneyBeforeBlind);
      });
      it('should increase bank pot by smallBlind + bigBlind', () => {
        const bankPotBeforeBlinds = game.bank.pot;
        game.takeBlindsFromPlayers();
        assert.deepEqual(game.bank.pot - 3, bankPotBeforeBlinds);
      });
      it('should change position of playersInGame property (if first player in array olready give small blind) to make it possible to follow on blinds', () => {
        game.players[game.playersInGame[0]].smallBlind = true;
        const firstPlayer = game.players[game.playersInGame[0]];
        game.takeBlindsFromPlayers();
        assert.strictEqual(game.players[game.playersInGame[game.playersInGame.length - 1]], firstPlayer);
      });
    });
  });

});

describe('Round class', () => {

  describe('properties', () => {
    describe('players properties', () => {
      it('should be an object', () => {
        assert.
      })
    })
  });


});
