var Coral = Coral || {};

Coral.Play = new Phaser.State();

Coral.Play.preload = function() {

};

Coral.Play.create = function() {
  background = this.game.add.tileSprite(0, 0, 1024, 1024, 'background');
  // background.scale.setTo(0.5, 0.5);
  // game.world.setBounds(0,0,800,600);
  this.game.physics.startSystem(Phaser.Physics.ARCADE);
};