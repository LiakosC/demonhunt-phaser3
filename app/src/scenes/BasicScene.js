
//const AssetsManager = require('../AssetsManager');
import {Scene} from 'phaser';

/**
 * @property {Phaser.Game} phgame
 * @property {Object} phscene
*/
export class BasicScene extends Scene {

    /**
     * @param {Phaser.Game} phaserGame 
     */
    constructor() {
        super();
        //super('basic');
        //this.phgame = phaserGame;
        //this.keys = {};
        //this.assets = new AssetsManager();
        //console.log('assets', this.assets);
    }

    preload() {

    }

    create() {

    }

    update() {

    }

    ///**
    // * Starts this scene. Uses this._phsceneName.
    // */
    //Start() {
    //    //console.log('starting ', this._phsceneName, this.phgame);
    //    this.phgame.scene.start(this._phsceneName);
    //}
//
    //Fullscreen(flag) {
    //    switch(flag) {
    //        case true:
    //            console.log('Fullscreen 1');
    //        case false:
    //            console.log('Fullscreen 0');
    //    }
    //}
//
    //CreateKeys() {
    //    this.keys.A = ph.input.keyboard.addKey(Phaser.Keyboard.A);
    //    this.keys.D = ph.input.keyboard.addKey(Phaser.Keyboard.D);
    //    this.keys.S = ph.input.keyboard.addKey(Phaser.Keyboard.S);
    //    this.keys.W = ph.input.keyboard.addKey(Phaser.Keyboard.W);
    //    this.keys.space = ph.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    //    this.keys.enter = ph.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    //    this.keys.esc = ph.input.keyboard.addKey(Phaser.Keyboard.ESC);
    //}

    ResizeCanvas() {
        $(this.game.canvas).css({position: "absolute", left: "0%", top: "0%", width: "100%", height: "100%"});
    }

};

BasicScene.SCENE_boot       = 'boot';
BasicScene.SCENE_cinematic  = 'cinematic';
BasicScene.SCENE_game       = 'game';
BasicScene.SCENE_loading    = 'loading';
BasicScene.SCENE_menu       = 'menu';
BasicScene.SCENE_victory    = 'victory';

//module.exports = BasicScene;
//export default BasicScene;

//boot.profileMemoryData = null; // seted in profiles menu page. read only
//boot.SetProfile = function(profileName) {
//	boot.profileMemoryData = memory.data.profiles[profileName];
//}
//boot.StartLevel = function(episodeKey, levelKey) {
//	game.start(episodeKey, levelKey);
//}