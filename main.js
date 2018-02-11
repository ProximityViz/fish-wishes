var game = new Phaser.Game(1136, 640, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.add('BootState', BootState);
game.state.add('PreloadState', PreloadState);
game.state.add('HomeState', HomeState);
game.state.add('WinState', WinState);
game.state.start('BootState');
