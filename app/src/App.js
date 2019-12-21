

import {ConfigManager} from './ConfigManager';
import {AssetsManager} from './AssetsManager';

import {BasicScene} from './scenes/BasicScene';
import {BootScene} from './scenes/BootScene';
import {LoadingScene} from './scenes/LoadingScene';
import {CinematicScene} from './scenes/CinematicScene';
import {MenuScene} from './scenes/MenuScene';
import {GameScene} from './scenes/GameScene';
import {VictoryScene} from './scenes/VictoryScene';


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

    }

    Init() {
        this.phgame.scene.add(BasicScene.SCENE_boot, new BootScene());
        this.phgame.scene.add(BasicScene.SCENE_loading, new LoadingScene());
        this.phgame.scene.add(BasicScene.SCENE_cinematic, new CinematicScene());
        this.phgame.scene.add(BasicScene.SCENE_menu, new MenuScene());
        this.phgame.scene.add(BasicScene.SCENE_game, new GameScene());
        this.phgame.scene.add(BasicScene.SCENE_victory, new VictoryScene());
    }

    Start() {
        this.phgame.scene.start(BasicScene.SCENE_boot);
    }
};

//export default App;

//module.exports = App;