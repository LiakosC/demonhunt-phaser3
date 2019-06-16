

module.exports = class extends require('./BasicScene') {

    constructor(phaserGame) {
        super(phaserGame);
        this._phsceneName = 'game';
        this.phscene = {

        };
        this.phgame.scene.add(this._phsceneName, this.phscene);
    }
}