var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var hero;

function preload() {

  game.load.atlasJSONHash('sheet', './assets/sheets/sheet.png', './assets/sheets/sheet.json');

}

function create() {

  hero = game.add.sprite(20, 30, 'sheet', 'hero/walk/1.png');

  hero.scale.setTo(20, 20);
  hero.smoothed = false;

  hero.animations.add('walk', Phaser.Animation.generateFrameNames('hero/walk/', 1, 4, '', 1), 10, true, false);
  hero.animations.play('walk');

  game.load.start();

}

function update() {

}
