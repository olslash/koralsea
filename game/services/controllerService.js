// var controllerService = (function() {
//   var instance;

//   function init() {
//     // constructor

//     return {
//       // Public methods and variables
//       publicMethod: function () {
//         console.log( "The public can see me!" );
//       },
 
//       publicProperty: "I am also public",
 
//       getRandomNumber: function() {
//         return privateRandomNumber;
//       }
 
//     };
//   }

//   return {
//      getInstance: function () {
//        if ( !instance ) {
//          instance = init();
//        }
  
//        return instance;
//      }
//   };
// })();

// store controllers connected to a game by their ID (provided by server)
var controllerService = {
  controllers: [],
  
  registerController: function(controllerId) {
    if(!this.controllers[controllerId]) {
      this.controllers.push(controllerId);
    }
  },

  unregisterController: function(controllerId) {
    var controllerIndex = this.controllers.indexOf(controllerId);
    if( controllerIndex !== -1) {
      this.controllers.splice(controllerIndex, 1);
    }
  }
};

module.exports = controllerService;
