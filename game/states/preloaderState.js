var Preloader = new Phaser.State();

Preloader.preload = function() {
  this.game.load.image('background', 'game/assets/oceanbg.png');
  this.game.load.image('ship', 'game/assets/blockship.png');
  this.game.load.image('button-generic', 'game/assets/button.png');
};

Preloader.create = function() {
  this.game.state.start('MainMenu');
};

module.exports = Preloader;
