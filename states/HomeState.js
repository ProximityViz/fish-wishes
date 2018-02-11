var HomeState = {
  create: function() {
    var style = { font: '40px Arial', fill: '#2f8ac6', align: 'center'};
    var titleText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Fish Wishes', style);
    titleText.anchor.setTo(0.5);

    var fishLogo = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 60, 'blue');
    fishLogo.anchor.setTo(0.5);

    var objectiveStyle = style;
    objectiveStyle.font = '20px Arial';
    var objectiveText = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 120, 'Collect all the fish species to win!\nTap to begin.', objectiveStyle);
    objectiveText.anchor.setTo(0.5);

    this.game.input.onDown.add(function() {
      this.state.start('GameState');
    }, this);
    // FIXME: onDown doesn't seem to be working on mobile
  }
};
