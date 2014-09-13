var Coral = Coral || {};

Coral.Boot = new Phaser.State();

Coral.Boot.preload = function() {

};

Coral.Boot.create = function() {
  this.game.state.start('Preloader');
};