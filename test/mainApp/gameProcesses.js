'use strict';

const chai = require('chai');
const assert = chai.assert;

const Game = require('../../mainApp/gameProcesses.js').Game;
const Round = require('../../mainApp/gameProcesses.js').Round;
const Dealer = require('../../mainApp/dealerClass.js').Dealer;
const Bank = require('../../mainApp/bankClass.js').Bank;
const Table = require('../../mainApp/tableClass.js').Table;
const Player = require('../../mainApp/playerClass.js').Player;
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
    describe('round property', () => {
      it('should should be undefined at the start', () => {
        assert.isUndefined(game.round);
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
    describe('startGame method', () => {
    });
    describe('endGame method', () => {
    });
  });

});

describe('Round class', () => {

  const players = {
    Vasia: new Player(100),
    Ksusha: new Player(100),
    Stepa: new Player(100),
    Masha: new Player(101)
  };
  const round = new Round(players, new Dealer(), new Bank());

  describe('properties', () => {
    describe('players property', () => {
      it('should be an object', () => {
        assert.isObject(round.players);
      });
      it('should have length 2 or greater', () => {
        assert.isAtLeast(Object.keys(round.players).length, 2);
      });
      it('each player should have Player constructor', () => {
        for (const playerName in round.players) {
          if (round.hasOwnProperty(players[playerName])) {
            assert.strictEqual(round.players[playerName].constructor, Player);
          }
        }
      });
    });
    describe('playersInRound property', () => {
      it('should be an array', () => {
        assert.isArray(round.playersInRound);
      });
      it('should have length same as num of players in players property', () => {
        assert.lengthOf(round.playersInRound, Object.keys(round.players).length);
      });
      it('should be same names as in players property', () => {
        assert.sameMembers(round.playersInRound, Object.keys(round.players));
      });
    });
    describe('dealer property', () => {
      it('should have Dealer constructor', () => {
        assert.strictEqual(round.dealer.constructor, Dealer);
      });
    });
    describe('bank property', () => {
      it('should have Bank constructor', () => {
        assert.strictEqual(round.bank.constructor, Bank);
      });
    });
    describe('game stages property', () => {
      it('should be array of strings', () => {
        assert.deepEqual(round.gameStage, ['preflop', 'flop', 'tern', 'reaver']);
      });
    });
    describe('playersAction property', () => {
      it('should be undefined at start', () => {
        assert.isUndefined(round.playersAction);
      });
    });
  });

  describe('round methods', () => {
    describe('iteratePlayersInRound method', () => {
      const playersBeforeIteration = round.playersInRound;
      round.iteratePlayersInRound();
      it('should change an array so that first player in array should be the last', () => {
        assert.strictEqual(playersBeforeIteration[0], round.playersInRound[round.playersInRound.length - 1]);
      });
      it('playersInRound property should stay the same after calling this method', () => {
        assert.sameMembers(playersBeforeIteration, round.playersInRound);
      });
    });
    describe('removePlayerFromRound method', () => {
      it('should return true if player was founded', () => {
        assert.isOk(round.removePlayerFromRound('Vasia'));
      });
      it('should return false if no player found', () => {
        assert.isNotOk(round.removePlayerFromRound('NoNaMe'));
      });
      it('should decrisse playersInRound property by 1', () => {
        const beforeRemove = round.playersInRound;
        round.removePlayerFromRound(round.playersInRound[0]);
        assert.strictEqual(beforeRemove.length, round.playersInRound.length + 1);
      });
    });
    describe('isRoundEnded method', () => {
      it('should return false if playersInRound.length > 1', () => {
        assert.isNotOk(round.isRoundEnded());
      });
      it('should return true if playersInRound.length <= 1', () => {
        round.playersInRound.length = 1;
        assert.isOk(round.isRoundEnded());
      });
    });
    describe('start method', () => {
    });
    describe('stages method', () => {
    });
  });

});
