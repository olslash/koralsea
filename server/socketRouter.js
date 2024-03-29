var globalEmitter = require('./globalEmitter');
// represents routing between the controllers for to a single game,
// and the game itself.
function socketRouter(gameCode) {
  this.gameCode = gameCode;
  this.gameSocket = null;
  this.controllerSockets = [];
}

socketRouter.prototype.assignControllerSocket = function(socket) {
  var controllerIndex = this.controllerSockets.indexOf(socket);
  if(controllerIndex === -1) {
    console.log(this.gameCode, 'controller connected');
    this.controllerSockets.push(socket);

    // notify game that a controller is connected
    this.gameSocket.emit('controller-connected', socket.id);
    
    socket.on('control-update', function(data) {
      // controller updates with its state
      // (buttons, analog inputs, etc)
      console.log(this.gameCode, 'got control update', data);
    }.bind(this));

    socket.on('disconnect', function() {
      this.removeControllerSocket(socket);
    }.bind(this ));
  }
};

socketRouter.prototype.removeControllerSocket = function(socket) {
  var controllerIndex = this.controllerSockets.indexOf(socket);
  if(controllerIndex !== -1) {
    this.gameSocket.emit('controller-disconnected', socket.id);
    this.controllerSockets.splice(controllerIndex, 1);
  }
};

socketRouter.prototype.assignGameSocket = function(socket) {
  if(this.gameSocket === null) {
    this.gameSocket = socket;
    
    socket.on('disconnect', function() {
      this.cleanUp();
      globalEmitter.emit('game-ended', this.gameCode);
    }.bind(this));
  }
};

socketRouter.prototype.cleanUp = function() {
  this.controllerSockets.forEach(function(socket) {
    socket.disconnect();
  });
  
  this.controllerSockets = [];
  this.gameSocket = null;
};

module.exports = socketRouter;
