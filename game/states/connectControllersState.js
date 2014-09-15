var controllerService = require('../services/controllerService');

var ConnectControllers = new Phaser.State();


ConnectControllers.preload = function() {
  
};

ConnectControllers.create = function() {
  this.game.gameId = this.makeGameCode();
  this.game.socket = io('http://localhost:8000');
  
  this.game.socket.on('connect', function() {   
    var text = '' + this.game.gameId;
    var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
    var t = this.game.add.text(this.game.world.centerX-100, 0, text, style);

    this.game.socket.emit('registerGame', this.game.gameId);
  }.bind(this));

  this.game.socket.on('controller-connected', this.registerController);
  this.game.socket.on('controller-disconnected', this.unregisterController);

  this.startButton = this.add.button(100, 100, 'button-generic', this.startGame, this);
  this.startButton.kill(); // todo: better syntax?
};

var t;
ConnectControllers.update = function() {
  var connectedPlayers = controllerService.controllers.length;
  if(t === undefined) {
    var text = connectedPlayers + ' players connected';
    var style = { font: "32px Arial", fill: "#ff0044", align: "center" };
    t = this.game.add.text(this.game.world.centerX, 100, text, style);  
  }
  // console.log(t);
  t.setText(connectedPlayers + ' players connected');

  if(connectedPlayers > 0 && !this.startButton.exists) {
    this.startButton.revive();
  } else if(connectedPlayers === 0 && this.startButton.exists) {
    this.startButton.kill();
  }
};


ConnectControllers.registerController = function (controllerId) {
  controllerService.registerController(controllerId);
};

ConnectControllers.unregisterController = function (controllerId) {
  controllerService.unregisterController(controllerId);
};

ConnectControllers.startGame = function() {
  this.game.state.start('Play');
};

ConnectControllers.makeGameCode = function() {
  return Math.floor(Math.random() * 99999);
};

module.exports = ConnectControllers;
