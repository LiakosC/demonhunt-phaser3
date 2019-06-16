global.$ = require('jquery');
const Phaser = require('phaser');
const FlexibleWindow = require('./FlexibleWindow');
const ConfigManager = require('./ConfigManager');

const BasicScene = require('./scenes/BasicScene.js');
const BootScene = require('./scenes/BootScene.js');
const LoadingScene = require('./scenes/LoadingScene.js');
const CinematicScene = require('./scenes/CinematicScene.js');
const MenuScene = require('./scenes/MenuScene.js');
const GameScene = require('./scenes/GameScene.js');
const VictoryScene = require('./scenes/VictoryScene.js');

global.config = new ConfigManager();

//window.oncontextmenu = function() {return false;};
window.win = new FlexibleWindow('window', 1280, 900);
$(win.element).addClass('bg-dark');
win.MaxStretch();
win.Center();
$(window).on('resize', (e) => {
    win.MaxStretch();
    win.Center();
});

let phgame = new Phaser.Game({
    parent: 'canvas-box',
    type: Phaser.AUTO,
    width: 1280,
    height: 900,
});

// scenes are the controllers. these are the only global variables
// all inherit from BasicScene. put common properties inside BasicScene
global.scene_boot = new BootScene(phgame);
global.scene_loading = new LoadingScene(phgame);
global.scene_cinematic = new CinematicScene(phgame);
global.scene_menu = new MenuScene(phgame);
global.scene_game = new GameScene(phgame);
global.scene_victory = new VictoryScene(phgame);

scene_boot.Start();