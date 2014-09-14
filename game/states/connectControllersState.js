var ConnectControllers = new Phaser.State();

ConnectControllers.create = function() {
  this.game.state.start('Play');
};

module.exports = ConnectControllers;
