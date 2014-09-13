var Ship = require('../entities/Ship');

var Play = new Phaser.State();

Play.preload = function() {

};

Play.create = function() {
  background = this.game.add.tileSprite(0, 0, 2048, 2048, 'background');
  background.scale.setTo(0.5, 0.5);
  this.game.physics.startSystem(Phaser.Physics.ARCADE);

  this.testShip = new Ship(this.game, 100, this.game.height/2);
  this.game.add.existing(this.testShip);
  this.testShip2 = new Ship(this.game, 200, this.game.height/2);
  this.game.add.existing(this.testShip2);
};

module.exports = Play;
