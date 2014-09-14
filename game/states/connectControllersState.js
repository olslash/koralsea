var ConnectControllers = new Phaser.State();


ConnectControllers.preload = function() {
  
};

ConnectControllers.create = function() {
  this.gameId = makeGameCode();
  this.socket = io('http://localhost:8000');
  this.socket.on('connect', function() {
    var text = '' + this.gameId;
    var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

    var t = this.game.add.text(this.game.world.centerX-100, 0, text, style);

    this.socket.emit('registerGame', this.gameId);
  }.bind(this));
};

function startGame() {
  this.game.state.start('Play');
}

function makeGameCode() {
  return Math.floor(Math.random() * 99999);
}

module.exports = ConnectControllers;
