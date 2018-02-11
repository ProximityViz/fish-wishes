var GameState = {
  init: function() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.SWIMMING_SPEED = 500; // TODO: slow it back down to 180
  },
  create: function() {
    this.levelData = JSON.parse(this.game.cache.getText('level'));
    this.game.world.setBounds(0, 0, this.levelData.fieldSize.x, this.levelData.fieldSize.y);

    this.background = this.add.sprite(0, 0, 'background');

    this.player = this.add.sprite(this.levelData.playerStart.x, this.levelData.playerStart.y, 'player', 1);
    this.player.anchor.setTo(0.5);
    this.player.animations.add('swimming', [0, 1, 2, 1], 6, true);
    this.game.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;

    var style = { font: '20px Arial', fill: '#fff' };
    this.fishSpecies = _.uniq(_.concat(_.map(this.levelData.foregroundData, 'hiding'), _.map(this.levelData.swimmingFish, 'sprite')));
    this.fishSpecies = _.remove(this.fishSpecies, function(species) {
      return species; // remove any falsy values
    });
    this.scoreText = this.game.add.text(10, 20, '0/' + this.fishSpecies.length + ' species collected', style);
    // FIXME: score text should always be above everything
    this.scoreText.fixedToCamera = true;

    this.caughtSpecies = []; // FIXME: should game state like this live somewhere else?

    this.createClickplate();
    this.createForegroundItems();
    this.createSwimmingFish();
  },
  createSwimmingFish: function() {
    this.swimmingFish = this.add.group();
    this.swimmingFish.enableBody = true;

    this.levelData.swimmingFish.forEach(function(element) {
      var fish = this.swimmingFish.create(element.x, element.y, element.sprite);
      this.createFish(fish, element.sprite);
    }, this);
  },
  createFish: function(fish, name) {
    fish.anchor.setTo(0.5);
    // TODO: animation
    fish.scale.x = _.random(0, 1) ? 1 : -1; // face some left and some right
    fish.inputEnabled = true;
    fish.events.onInputDown.add(this.movePlayer, this);
    fish.customParams = {
      type: 'fish',
      name: name
    }
  },
  createForegroundItems: function() {
    this.foregroundItems = this.add.group();
    this.foregroundItems.enableBody = true;

    this.levelData.foregroundData.forEach(function(element) {
      var item = this.foregroundItems.create(element.x, element.y, element.sprite);
      item.anchor.setTo(0.5, 1); // NOTE: the point marked in the levelData is the bottom center
      item.scale.x = element.scaleX;
      item.customParams = {
        hiding: element.hiding
      };
    }, this);
  },
  createClickplate: function() {
    this.clickplate = this.game.add.sprite(0, 0, 'clickplate');
    this.clickplate.anchor.setTo(0, 0);
    this.clickplate.fixedToCamera = true;
    this.clickplate.inputEnabled = true;
    this.clickplate.events.onInputDown.add(this.movePlayer, this);
    this.game.camera.follow(this.player);
    // NOTE: anything clickable need to be "above" the clickplate
  },
  movePlayer: function(sprite, pointer, customTarget) {
    if (sprite.customParams && sprite.customParams.type === 'fish') {
      this.lastCaptured = sprite;
    }
    this.player.targetX = pointer.worldX;
    this.player.targetY = pointer.worldY;
    console.log('moving from point:', Math.floor(this.player.x) + ',', Math.floor(this.player.y));
    console.log('moving to point:', Math.floor(this.player.targetX) + ',', Math.floor(this.player.targetY));
    if (this.player.x < this.player.targetX) {
      console.log('direction: right');
      this.player.scale.x = 1;
    } else {
      console.log('direction: left');
      this.player.scale.x = -1;
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
      this.collectFish();
    }, this);
  },
  createLevel: function() {
  },
  update: function() {
    this.game.physics.arcade.overlap(this.player, this.foregroundItems, this.rustle, null, this);
  },
  rustle: function(player, item, playerShape, itemShape, equation) {
    // TODO: animate plant if player is moving while touching it
    if (item.customParams.hiding) {
      this.unhideFish(item.customParams.hiding, item.body);
      item.customParams.hiding = null;
    }
  },
  unhideFish: function(fishSprite, itemBody) {
    console.log('startled', fishSprite + '!');
    var fishX = itemBody.position.x + (itemBody.width / 2);
    var fishY = itemBody.position.y + (itemBody.height / 2);
    // TODO: do i want to add the fish to a group?
    var fish = this.add.sprite(fishX, fishY, fishSprite);
    this.createFish(fish, fishSprite);
  },
  collectFish: function() {
    // fish.events.onInputDown.add(this.movePlayer, this);
    // this.movePlayer(fish, event);
    // TODO: block ui?
    // TODO: don't remove the fish until the player has finished moving
    if (this.lastCaptured) {
      var fish = this.lastCaptured;
      console.log(fish.customParams.name, 'collected!');
      this.score += 1;
      // check for uniqueness of species
      if (_.includes(this.caughtSpecies, fish.customParams.name)) {
        console.log('duplicate of already caught');
      } else {
        console.log('new species!');
        this.caughtSpecies.push(fish.customParams.name);
        console.log('species caught:', JSON.stringify(this.caughtSpecies));
      }

      this.scoreText.text = this.caughtSpecies.length + '/' + this.fishSpecies.length + ' species collected';
      // TODO: possibly freeze the UI and animate the player to the fish before collection
      // TODO: animate the fish disappearing
      // TODO: maybe temporarily change the player's z-index to be what the fish's was (change it back when the player moves)
      this.lastCaptured = null;
      fish.kill();
      this.checkForWin();
    }
  },
  checkForWin: function() {
    if (this.caughtSpecies.length >= this.fishSpecies.length) {
      console.log('you win!');
      this.state.start('WinState');
      // TODO: make leaving the game optional, or make coming back to the game after leaving an option
    } else {
      console.log('keep playing...');
    }
  }
};
