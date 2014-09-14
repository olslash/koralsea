var socket = io('http://localhost:8000');
var socketConnected = false;

var controllerState = {
  wheel: {
    rotation : 0 // -90 to 90
  },
  
  throttle: {
    value: 0 // -100 to 100
  },

  buttons: { // targeting, attack, etc
    a: '',
    b: '',
    c: ''
  }
};

socket.on('connect', function() {
  socketConnected = true;
});


$('#gamecode').submit(function(event) {
  var data = +$('#gamecode input:first').val();
  
  if(data > 0 && socketConnected) {
    socket.emit('registerController', data);
    // todo: server response and verification
  }
  // todo: situation where socket is not connected?

  $('.register-screen').hide();
  $('.controller').show();
  event.preventDefault();
});

$('#throttle').on('click', function(event) {
  if(event.target.id === 'throttle-down') {
    throttleDown();
  } else if (event.target.id === 'throttle-up') {
    throttleUp();
  }

  sendState();
});

$('#steering').on('click', function(event) {
  if(event.target.id === 'steering-left') {
    steerLeft();
  } else if (event.target.id === 'steering-right') {
    steerRight();
  }

  sendState();
});

function sendState() {
  socket.emit('control-update', controllerState);
}

function throttleDown() {
  if(controllerState.throttle.value > -100) {
    controllerState.throttle.value -= 1;
  }
}

function throttleUp() {
  if(controllerState.throttle.value < 100) {
    controllerState.throttle.value += 1;
  }
}

function steerLeft() {
  if(controllerState.wheel.rotation > -90) {
    controllerState.wheel.rotation -= 1;
  }
}

function steerRight() {
  if(controllerState.wheel.rotation < 90) {
    controllerState.wheel.rotation += 1;
  }
}