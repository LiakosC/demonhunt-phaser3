const $ = require('jquery');
const Phaser = require('phaser');
const FlexibleWindow = require('./FlexibleWindow');

const BasicScene = require('./scenes/BasicScene.js');
const BootScene = require('./scenes/BootScene.js');
const LoadingScene = require('./scenes/LoadingScene.js');
const CinematicScene = require('./scenes/CinematicScene.js');
const MenuScene = require('./scenes/MenuScene.js');
const GameScene = require('./scenes/GameScene.js');
const VictoryScene = require('./scenes/VictoryScene.js');

window.win = new FlexibleWindow('window', 1280, 900);
$(win.element).addClass('bg-dark');
win.MaxStretch();
win.Center();
$(window).on('resize', (e) => {
    win.MaxStretch();
    win.Center();
});

// scenes are the controllers
let scene_boot = new BootScene();
let scene_loading = new LoadingScene();
let scene_cinematic = new CinematicScene();
let scene_menu = new MenuScene();
let scene_game = new GameScene();
let scene_victory = new VictoryScene();

let phgame = new Phaser.Game({
    parent: 'canvas-box',
    type: Phaser.AUTO,
    width: 1280,
    height: 900,
});

phgame.scene.add('boot', scene_boot);
phgame.scene.add('loading', scene_loading);
phgame.scene.add('cinematic', scene_cinematic);
phgame.scene.add('menu', scene_menu);
phgame.scene.add('game', scene_game);
phgame.scene.add('victory', scene_victory);

phgame.scene.start('boot');