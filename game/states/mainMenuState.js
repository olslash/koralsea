var MainMenu = new Phaser.State();

// var MainMenu.preload = function() {

// };

MainMenu.create = function() {
  this.startButton = this.add.button(100, 100, 'button-generic', this.startGame, this);
};

MainMenu.startGame = function() {
  this.game.state.start('ConnectControllers');
};

module.exports = MainMenu;
