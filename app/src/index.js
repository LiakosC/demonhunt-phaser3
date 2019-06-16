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

window.oncontextmenu = function() {return false;};
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

// scenes are the controllers
let scene_boot = new BootScene(phgame);
let scene_loading = new LoadingScene(phgame);
let scene_cinematic = new CinematicScene(phgame);
let scene_menu = new MenuScene(phgame);
let scene_game = new GameScene(phgame);
let scene_victory = new VictoryScene(phgame);

//setTimeout(() => {
//    scene_boot.Start();
//    //phgame.scene.start('boot');
//}, 1000);

scene_boot.Start();