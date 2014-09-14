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
  if(controllerindex == -1) {
    this.controllerSockets.push(socket);
    
    socket.on('control-update', function(data) {
      // controller updates with its state
      // (buttons, analog inputs, etc)
    });

    socket.on('disconnect', function() {
      this.removeControllerSocket(socket);
    });
  }
};

socketRouter.prototype.removeControllerSocket = function(socket) {
  var controllerIndex = this.controllerSockets.indexOf(socket);
  if(controllerindex !== -1) {
    this.controllerSockets.splice(this.controllerSockets.indexOf(socket), 1);
  }
};

socketRouter.prototype.assignGameSocket = function(socket) {
  if(this.gameSocket === null) {
    this.gameSocket = socket;
    
    socket.on('disconnect', function() {
      this.cleanUp();
      globalEmitter.emit('game-ended', this.gameCode);
    });
  }
};

socketRouter.prototype.cleanUp = function() {
  this.controllerSockets = [];
  this.gameSocket = null;
};

module.exports = socketRouter;