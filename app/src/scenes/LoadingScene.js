

module.exports = class extends require('./BasicScene') {

    constructor(phaserGame) {
        super(phaserGame);
        this._phsceneName = 'loading';
        this.phscene = {};
        this.phscene.init = () => {
            console.log('loaidng init');
        };
        this.phscene.create = () => {
            console.log('loaidng create');
        };
        this.phscene.update = (time, dt) => {
            //console.log(time, dt);
        };
        this.phgame.scene.add(this._phsceneName, this.phscene);
    }

}