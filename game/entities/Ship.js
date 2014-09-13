var mixin = require('../util/mixin');

var Ship = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'ship', frame);
  _.extend(this, require('../mixins/hasUniqueId'));

  this.anchor.setTo(0.5, 0.1);
  this.scale.setTo(0.5, 0.5);
  game.physics.enable(this, Phaser.Physics.ARCADE);
};

Ship.prototype = Object.create(Phaser.Sprite.prototype);
Ship.prototype.constructor = Ship;

Ship.prototype.updateControlState = function() {

};

Ship.prototype.update = function() {

};

module.exports = Ship;
