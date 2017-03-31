var game = new Phaser.Game(252, 144, Phaser.AUTO, '', { preload: preload, create: create, update: update });


function preload() {

  // Initiate tile map and its assets
  game.load.tilemap('map', 'assets/tilemaps/map.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('tiles', 'assets/sheets/tiles.png');

  // Initiate image assets
  game.load.spritesheet('hero', 'assets/sheets/hero.png', 18, 19);
  game.load.spritesheet('slime', 'assets/sheets/slime.png', 16, 16);
  game.load.image('pepper', 'assets/sprites/objects/3.png');

  // Initiate audio files
  game.load.audio('music', ['assets/sound/8-bit_ducky.mp3', 'assets/sound/8-bit_ducky.ogg']);

  // Make the game world larger than the canvas display
  game.world.setBounds(0, 0, 1800, 180);

  // Scale and center the game on the page
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.stage.smoothed = false;

  game.stage.backgroundColor = 0x4745FB;

}


var map;
var hero;
var health_text;
var bg_music;

function create() {

  // Use Phaser's built-in arcade physics
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // Create the tilemap from the asset
  map = game.add.tilemap('map');

  // Foreground tile layer with collision
  map.addTilesetImage('tiles', 'tiles');
  block_layer = map.createLayer('tiles');

  // Background tile layer with no collision
  map.addTilesetImage('bg', 'tiles');
  background_layer = map.createLayer('bg');

  // Set an obscene amount of tiles to have collision enabled
  map.setCollisionBetween(1, 20000, true, 'tiles');

  // Bring in the hero sprite and set physics config
  hero = game.add.sprite(32, 26, 'hero');
  game.physics.arcade.enable(hero);
  hero.enableBody = true;
  hero.body.immovable = true;
  hero.body.bounce.y = 0.2;
  hero.body.gravity.y = 800;
  hero.body.collideWorldBounds = true;

  // Set the walking animations for left and right movement
  hero.animations.add('left', [0, 1, 2, 3], 10, true);
  hero.animations.add('right', [4, 5, 6, 7], 10, true);

  // Add slime enemy
  slime = game.add.sprite(380, 80, 'slime');
  game.physics.arcade.enable(slime);
  slime.enableBody = true;
  slime.body.immovable = true;
  slime.body.bounce.y = 0.2;
  slime.body.gravity.y = 800;
  slime.body.collideWorldBounds = true;

  slime.animations.add('left', [0, 1, 2, 3, 2, 1], 2, true);
  slime.animations.add('right', [4, 5, 6, 7, 6, 5], 2, true);

  // Enable camera following with built-in platformer-style
  game.camera.follow(hero, Phaser.Camera.FOLLOW_PLATFORMER);

  health_text = game.add.text(9, 9, 'Health: 100', { fontSize: '16px', fill: '#fff' });
  health_text.fixedToCamera = true;

  bg_music = game.add.audio('music');
  bg_music.play();

  game.load.start();

}


var hit_platform;
var hit_slime;
var cursors;
var direction = 'right';
var speed = 108;
var slime_move = 0;
var slime_direction = 'left';
var health = 100;

function update() {

  // Set collisions
  hit_platform = game.physics.arcade.collide(hero, block_layer);
  hit_slime = game.physics.arcade.collide(hero, slime);
  game.physics.arcade.collide(slime, block_layer);

  cursors = game.input.keyboard.createCursorKeys();

  // Reset velocity after movement
  hero.body.velocity.x = 0;
  slime.body.velocity.x = 0;

  if (cursors.left.isDown) {
    direction = 'left';
    hero.body.velocity.x = -speed;
    hero.animations.play(direction);
  }
  else if (cursors.right.isDown) {
    direction = 'right';
    hero.body.velocity.x = speed;
    hero.animations.play(direction);
  }
  else {
    // Use "direction" to keep sprite facing last movement
    hero.animations.stop();
    if (direction == 'right') {
      hero.frame = 4;
    }
    else if (direction == 'left') {
      hero.frame = 3;
    }
  }

  // Enable jump on hero
  if (cursors.up.isDown && hit_platform) {
    hero.body.velocity.y = -speed*2.8;
  }

  // Show visual tint on slime contact and reduce hp
  if (hit_slime) {
    hero.tint = 0xff0000;
    health -= 20;
    health_text.text = 'Health: ' + health;
  }
  else {
    hero.tint = 0xffffff;
  }

  if (health <= 0) {
    health_text.text = 'GAME OVER';
  }

  // Basic slime movement
  for (var i = 0; i <= 10; i++) {
    if (slime_direction == 'left') {
      slime.body.velocity.x = -9;
      slime.animations.play(slime_direction);
    }
    else if (slime_direction == 'right') {
      slime.body.velocity.x = 9;
      slime.animations.play(slime_direction);
    }
  }

}
