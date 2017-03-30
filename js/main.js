var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var hero;

function preload() {

  game.load.atlasJSONHash('sheet', './assets/sheets/sheet.png', './assets/sheets/sheet.json');
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    //have the game centered horizontally
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;

}

function create() {

  hero = game.add.sprite(20, 30, 'sheet', 'hero/walk/1.png');

  hero.scale.setTo(20, 20);
  hero.smoothed = false;

  hero.animations.add('walk');
  hero.animations.play('walk', true);

  game.load.start();

}

function update() {

}
