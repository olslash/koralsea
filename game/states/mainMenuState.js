var Coral = Coral || {};

Coral.MainMenu = new Phaser.State();

// Coral.MainMenu.preload = function() {

// };

Coral.MainMenu.create = function() {
  this.startButton = this.add.button(100, 100, 'button-generic', this.startGame, this);
};

Coral.MainMenu.startGame = function() {
  this.game.state.start('Play');
};