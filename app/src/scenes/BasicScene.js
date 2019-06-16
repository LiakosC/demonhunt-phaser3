
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
    }

    Start() {
        //console.log('starting ', this._phsceneName, this.phgame);
        this.phgame.scene.start(this._phsceneName);
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