var BootState = {
  init: function() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; // TODO: if we want to change this and make the game use the whole screen, the clickplate needs to cover all of it
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  },
  preload: function() {
    this.load.image('blue', 'assets/images/fish/blue.png');
    this.load.image('progressBar', 'assets/images/bar.png');
  },
  create: function() {
    this.game.stage.backgroundColor = '#aad5e5';

    this.state.start('PreloadState');
  }
};
