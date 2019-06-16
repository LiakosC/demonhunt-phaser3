

module.exports = class extends require('./BasicScene') {

    constructor(phaserGame) {
        super(phaserGame);
        this._phsceneName = 'menu';
        this.phscene = {

        };
        this.phgame.scene.add(this._phsceneName, this.phscene);
    }

}