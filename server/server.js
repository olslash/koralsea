var globalEmitter = require('./globalEmitter');
var socketRouter = require('./socketRouter');
var io = require('socket.io')(80);

var activeGames = {};

io.on('connection', function (socket) {

  socket.on('registerController', function(gameCode) {
    // this socket is a controller
    // match the gameCode to a socketrouter instance and register this
    // socket as a controller.
    activeGames[gameCode].assignControllerSocket(socket);
  });

  socket.on('registerGame', function(gameCode) {
    // this socket is a game
    // create a new socketrouter and assign this socket to its gamesocket
    activeGames[gameCode] = new socketRouter(gameCode);
    activeGames[gameCode].gameSocket = socket;
  });
});

globalEmitter.on('game-ended', function(gameCode) {
  delete activeGames[gameCode];
});