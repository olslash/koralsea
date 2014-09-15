var ConnectControllers = new Phaser.State();


ConnectControllers.preload = function() {
  
};

ConnectControllers.create = function() {
  this.game.gameId = makeGameCode();
  this.game.socket = io('http://localhost:8000');
  this.game.socket.on('connect', function() {
    
    var text = '' + this.game.gameId;
    var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
    var t = this.game.add.text(this.game.world.centerX-100, 0, text, style);

    this.game.socket.emit('registerGame', this.game.gameId);
  }.bind(this));
};

ConnectControllers.update = function() {

};

ConnectControllers.startGame = function() {
  this.game.state.start('Play');
};

ConnectControllers.makeGameCode = function() {
  return Math.floor(Math.random() * 99999);
};

module.exports = ConnectControllers;
