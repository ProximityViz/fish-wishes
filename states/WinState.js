var WinState = {
  preload: function() {
    this.game.camera.reset();
    this.game.world.setBounds(0, 0, 1136, 640);
  },
  create: function() {
    var style = { font: '40px Arial', fill: '#2f8ac6', align: 'center'};
    var titleText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'You win!', style);
    titleText.anchor.setTo(0.5);

    var fishLogo = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 60, 'blue');
    fishLogo.anchor.setTo(0.5);

    var creditsStyle = style;
    creditsStyle.font = '20px Arial';
    var creditsText = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 120, 'Credits:', creditsStyle);
    creditsText.anchor.setTo(0.5);
    // TODO: credits

    this.game.input.onDown.add(function() {
      this.state.start('HomeState');
    }, this);
  }
};
