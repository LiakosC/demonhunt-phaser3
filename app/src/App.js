
//const ConfigManager = require('./ConfigManager');
//const BootScene = require('./scenes/BootScene');
//const LoadingScene = require('./scenes/LoadingScene');
//const CinematicScene = require('./scenes/CinematicScene.js');
//const MenuScene = require('./scenes/MenuScene.js');
//const GameScene = require('./scenes/GameScene.js');
//const VictoryScene = require('./scenes/VictoryScene.js');
import {BootScene} from './scenes/BootScene';
import {LoadingScene} from './scenes/LoadingScene';

import {ConfigManager} from './ConfigManager';
import { BasicScene } from './scenes/BasicScene';
import { AssetsManager } from './AssetsManager';

export class App {

    constructor() {

        this.config = new ConfigManager();
        this.assets = new AssetsManager();

        this.phgame = new Phaser.Game({
            parent: 'canvas-box',
            type: Phaser.AUTO,
            width: 1280,
            height: 900,
        });

        // Add scenes.
        this.scene_boot = new BootScene(this.phgame);
        this.scene_loading = new LoadingScene(this.phgame);
        
        //this.scene_cinematic = new CinematicScene(this.phgame);
        //this.scene_menu = new MenuScene(this.phgame);
        //this.scene_game = new GameScene(this.phgame);
        //this.scene_victory = new VictoryScene(this.phgame);


    }

    Init() {
        this.phgame.scene.add(BasicScene.SCENE_BOOT, this.scene_boot);
        this.phgame.scene.start(BasicScene.SCENE_BOOT);
    }

    Start() {
        //this.phgame.scene.start('boot');
    }
};

//export default App;

//module.exports = App;