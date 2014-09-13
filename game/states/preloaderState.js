var Coral = Coral || {};

// Coral.boot = function(game) {};
Coral.Preloader = new Phaser.State();

Coral.Preloader.preload = function() {
  this.game.load.image('background', 'game/assets/oceanbg.png');
  this.game.load.image('ship', 'game/assets/blockship.png');
  this.game.load.image('button-generic', 'game/assets/button.png');
};

Coral.Preloader.create = function() {
  this.game.state.start('MainMenu');
};