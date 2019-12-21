
const AssetsManager = require('../AssetsManager');

/**
 * @property {Phaser.Game} phgame
 * @property {Object} phscene
*/
module.exports = class {

    /**
     * @param {Phaser.Game} phaserGame 
     */
    constructor(phaserGame) {
        this.phgame = phaserGame;
        this.phscene = null;
        this._phsceneName = ''; // name of phaser scene like boot | cinematic | menu | game | victory
        this.keys = {};
        this.assets = new AssetsManager();
        console.log('assets', this.assets);
    }

    Start() {
        //console.log('starting ', this._phsceneName, this.phgame);
        this.phgame.scene.start(this._phsceneName);
    }

    Fullscreen(flag) {
        switch(flag) {
            case true:
                console.log('Fullscreen 1');
            case false:
                console.log('Fullscreen 0');
        }
    }

    CreateKeys() {
        this.keys.A = ph.input.keyboard.addKey(Phaser.Keyboard.A);
        this.keys.D = ph.input.keyboard.addKey(Phaser.Keyboard.D);
        this.keys.S = ph.input.keyboard.addKey(Phaser.Keyboard.S);
        this.keys.W = ph.input.keyboard.addKey(Phaser.Keyboard.W);
        this.keys.space = ph.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.keys.enter = ph.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.keys.esc = ph.input.keyboard.addKey(Phaser.Keyboard.ESC);
    }

};

//boot.profileMemoryData = null; // seted in profiles menu page. read only
//boot.SetProfile = function(profileName) {
//	boot.profileMemoryData = memory.data.profiles[profileName];
//}
//boot.StartLevel = function(episodeKey, levelKey) {
//	game.start(episodeKey, levelKey);
//}