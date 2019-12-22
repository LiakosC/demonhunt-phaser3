

import {ConfigManager} from './ConfigManager';
import {AssetsManager} from './AssetsManager';

import {BasicScene} from './scenes/BasicScene';
import {BootScene} from './scenes/BootScene';
import {LoadingScene} from './scenes/LoadingScene';
import {CinematicScene} from './scenes/CinematicScene';
import {MenuScene} from './scenes/MenuScene';
import {GameScene} from './scenes/GameScene';
import {VictoryScene} from './scenes/VictoryScene';
import { JSONMemory } from './JSONMemory';


export class App {

    constructor() {

        this.config = new ConfigManager();
        this.assets = new AssetsManager();

        this.gamebox = $("<div>").prop("id", "gamebox").appendTo(win.element).css({
            position: "absolute",
            left: "0%", top: "0%", width: "100%", height: "100%"
        })[0];

        this.htmlbox = $("<div>").prop("id", "htmlbox").appendTo(win.element).css({
            position: "absolute",
            left: "0%", top: "0%", width: "100%", height: "100%"
        })[0];

        this.phgame = new Phaser.Game({
            parent: this.gamebox,
            type: Phaser.AUTO,
            width: 1280,
            height: 900,
        });

        // Save scenes instances so I can access their variables through console.
        this.scene_boot = new BootScene();
        this.scene_loading = new LoadingScene();
        this.scene_cinematic = new CinematicScene();
        this.scene_menu = new MenuScene();
        this.scene_game = new GameScene();
        this.scene_victory = new VictoryScene();

        this.memory = new JSONMemory('demonhunt-ph3');
        var memoryStruct_level = function() {return {completed: false, gold: 0, goldMax: 0};};
        var memoryStruct_profile = function() {
            return {
                    episodes: {
                    "1": {
                        levels: {
                            "1": memoryStruct_level(),
                            "2": memoryStruct_level(),
                            "3": memoryStruct_level(),
                            "4": memoryStruct_level(),
                            "5": memoryStruct_level()
                        },
                        artifacts: {
                            "Mask of the Demon Hunter": false
                        }
                    },
                    "2": {
                        levels: {
                            "1": memoryStruct_level(),
                            "2": memoryStruct_level(),
                            "3": memoryStruct_level(),
                            "4": memoryStruct_level(),
                            "5": memoryStruct_level(),
                            "6": memoryStruct_level()
                        },
                        artifacts: {
                            metallion: false,
                            blade_of_souls: false,
                            diamond: false
                        }
                    }
                }
            };
        }
        this.memory.Init({
            profiles: {
                "Default Player": memoryStruct_profile()
            }, options: {}
        });

        this.profileMemoryData = null;

    }

    /**
     * Select a profile.
     * @param {String} profileName 
     */
    SetProfile(profileName) {
        this.profileMemoryData = this.memory.data.profiles[profileName];
    }

    StartLevel(episodeKey, levelKey) {
        this.scene_game.episode = episodeKey;
        this.scene_game.level = levelKey;
        this.phgame.scene.start(BasicScene.SCENE_game);
    }

    Init() {
        this.phgame.scene.add(BasicScene.SCENE_boot, this.scene_boot);
        this.phgame.scene.add(BasicScene.SCENE_loading, this.scene_loading);
        this.phgame.scene.add(BasicScene.SCENE_cinematic,this.scene_cinematic);
        this.phgame.scene.add(BasicScene.SCENE_menu, this.scene_menu);
        this.phgame.scene.add(BasicScene.SCENE_game, this.scene_game);
        this.phgame.scene.add(BasicScene.SCENE_victory, this.scene_victory);
        
    }

    Start() {
        this.phgame.scene.start(BasicScene.SCENE_boot);
    }
};

//export default App;

//module.exports = App;