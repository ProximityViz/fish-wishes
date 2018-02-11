var PreloadState = {
  preload: function() {
    this.displayLoadingScreen();

    this.load.text('level', 'assets/data/level.json');

    this.load.image('clickplate', 'assets/images/clickplate.png');
    this.load.image('background', 'assets/images/background.png');
    this.load.image('bubble1', 'assets/images/bubble1.png');
    this.load.spritesheet('player', 'assets/images/player.png', 66, 100, 11, 0, 14);
    // TODO: can i have a shadow?

    this.load.image('lightGroundGreenHuge', 'assets/images/foreground/light_ground_green_huge.png');
    this.load.image('coralGreen1', 'assets/images/foreground/coral_green_1.png');
    this.load.image('coralGreen2', 'assets/images/foreground/coral_green_2.png');
    this.load.image('coralGreen3', 'assets/images/foreground/coral_green_3.png');
    this.load.image('coralGreen4', 'assets/images/foreground/coral_green_4.png');
    this.load.image('coralLeafy1', 'assets/images/foreground/coral_leafy_1.png');
    this.load.image('coralMushroom1', 'assets/images/foreground/coral_mushroom_1.png');
    this.load.image('coralPurple1', 'assets/images/foreground/coral_purple_1.png');
    this.load.image('coralPurple2', 'assets/images/foreground/coral_purple_2.png');
    this.load.image('darkGroundGreen1', 'assets/images/foreground/dark_ground_green_1.png');
    this.load.image('darkGroundPurple1', 'assets/images/foreground/dark_ground_purple_1.png');
    this.load.image('darkGroundRock1', 'assets/images/foreground/dark_ground_rock_1.png');
    this.load.image('lightGroundGreen1', 'assets/images/foreground/light_ground_green_1.png');
    this.load.image('lightGroundOrange1', 'assets/images/foreground/light_ground_orange_1.png');
    this.load.image('lightGroundRock1', 'assets/images/foreground/light_ground_rock_1.png');
    this.load.image('lightGroundRock2', 'assets/images/foreground/light_ground_rock_2.png');
    this.load.image('lightGroundRock3', 'assets/images/foreground/light_ground_rock_3.png');
    // TODO: make transparancy not part of the body

    this.load.image('blowfish', 'assets/images/fish/blowfish.png');
    // this.load.image('blue', 'assets/images/fish/blue.png'); // loaded in BootState
    this.load.image('clam', 'assets/images/fish/clam.png');
    this.load.image('green', 'assets/images/fish/green.png');
    this.load.image('lightblue', 'assets/images/fish/lightblue.png');
    this.load.image('lightgreen', 'assets/images/fish/lightgreen.png');
    this.load.image('lileel', 'assets/images/fish/lileel.png');
    this.load.image('longeel', 'assets/images/fish/longeel.png');
    this.load.image('orange', 'assets/images/fish/orange.png');
    this.load.image('pink', 'assets/images/fish/pink.png');
    this.load.image('purple', 'assets/images/fish/purple.png');
    this.load.image('red', 'assets/images/fish/red.png');
    this.load.image('snail', 'assets/images/fish/snail.png');
    this.load.image('starfish', 'assets/images/fish/starfish.png');
    this.load.image('undead', 'assets/images/fish/undead.png');
  },
  create: function() {
    this.state.start('HomeState');
  },
  displayLoadingScreen: function() {
    var style = { font: '40px Arial', fill: '#2f8ac6'};
    var titleText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Fish Wishes', style);
    titleText.anchor.setTo(0.5);

    var fishLogo = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 60, 'blue');
    fishLogo.anchor.setTo(0.5);

    var progressBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 120, 'progressBar');
    progressBar.anchor.setTo(0.5);
    this.load.setPreloadSprite(progressBar);
  }
};
