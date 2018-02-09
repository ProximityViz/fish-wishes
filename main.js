var game = new Phaser.Game(1136, 640, Phaser.AUTO);

var GameState = {
  init: function() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; // TODO: if we want to change this and make the game use the whole screen, the clickplate needs to cover all of it
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.SWIMMING_SPEED = 180;
  },
  preload: function() {
    game.stage.backgroundColor = '#aad5e5';

    this.load.text('level', 'assets/data/level.json');

    this.load.image('ground', 'assets/images/ground.png');
    this.load.image('clickplate', 'assets/images/clickplate.png');
    // FIXME: clickplate needs to either be the full game field size or frozen somehow
    // TODO: anything clickable need to be "above" the clickplate
    this.load.spritesheet('player', 'assets/images/player_spritesheet.png', 28, 30, 5, 1, 1);
  },
  create: function() {
    this.levelData = JSON.parse(this.game.cache.getText('level'));
    console.log(this.levelData);
    this.game.world.setBounds(0, 0, this.levelData.fieldSize.x, this.levelData.fieldSize.y);
    this.ground = this.add.sprite(0, 568, 'ground');
    this.game.physics.arcade.enable(this.ground);
    this.ground.body.immovable = true;

    this.player = this.add.sprite(this.levelData.playerStart.x, this.levelData.playerStart.y, 'player', 3);
    this.player.anchor.setTo(0.5);
    this.player.animations.add('swimming', [0, 1, 2, 1], 6, true);
    this.game.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;

    this.createClickplate();
  },
  createClickplate: function() {
    this.clickplate = this.game.add.sprite(0, 0, 'clickplate');
    this.clickplate.anchor.setTo(0, 0);
    this.clickplate.fixedToCamera = true;
    this.clickplate.inputEnabled = true;
    this.clickplate.events.onInputDown.add(this.movePlayer, this);
    this.game.camera.follow(this.player);
  },
  movePlayer: function(sprite, pointer, customTarget) {
    this.player.targetX = pointer.worldX;
    this.player.targetY = pointer.worldY;
    console.log('moving from x:', this.player.x, 'to', this.player.targetX);
    console.log('moving from y:', this.player.y, 'to', this.player.targetY);
    if (this.player.x < this.player.targetX) {
      console.log('direction: right');
      this.player.scale.x = -1;
    } else {
      console.log('direction: left');
      this.player.scale.x = 1;
    }
    var duration = (this.game.physics.arcade.distanceToXY(this.player, this.player.targetX, this.player.targetY) / this.SWIMMING_SPEED) * 1000;
    this.player.animations.play('swimming');
    this.playerTween = this.game.add.tween(this.player).to({
      x: this.player.targetX,
      y: this.player.targetY
    }, duration, Phaser.Easing.Linear.None, true);
    this.playerTween.onComplete.add(function() {
      // this.player.animations.play('idleAnimation') // TODO
      this.player.animations.stop();
      this.player.frame = 1;
    }, this);

  },
  createLevel: function() {
  },
  update: function() {

  }
};

game.state.add('GameState', GameState);
game.state.start('GameState');
