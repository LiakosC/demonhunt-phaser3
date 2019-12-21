/**    
 * @property {Phaser.Game} phgame
*/
module.exports = class extends require('./BasicScene') {

    /**
     * @param {Phaser.Game} phaserGame 
     */
    constructor(phaserGame) {
        super(phaserGame);
        this._phsceneName = 'boot';
        this.phscene = {};
        this.phscene.init = () => {
            $(this.phgame.canvas).css({width: "100%", height: "100%"});
            this.phgame.canvas.oncontextmenu = () => {return false;}
            //boot.memory.createOptions();
            window.addEventListener("mousemove", () => {
                this.phgame.canvas.parentNode.style.cursor = 'url(' + this.assets.graphics_cursor_default() + '), auto';
                //this.phgame.canvas.parentNode.style.cursor = 'url(' + this.assets.graphics_cursor_pointer() + '), auto';
            });
        };
        this.phscene.create = () => {
            console.log('boot create');
            //this.phgame.scene.disableVisibilityChange = true;
            //this.phgame.config.fps = config.Fps();
            //this.phgame.config.backgroundColor = 'red';
            //scene_loading.Start();
            //this.phgame.scene.stop('boot');
            //this.phgame.scene.start('loading');
            //this.phgame.scene.switch('boot', 'loading');
            //this.phgame.scene.sleep('boot');
            //this.phgame.scene.start('loading');
            global.scene_loading.Start();
        };
        //this.phscene.update = (time, dt) => { // for debug
        //    console.log('boot', time, dt, this.phgame.config.fps);
        //};
        //this.phscene.update = null;
        this.phgame.scene.add(this._phsceneName, this.phscene);
    }

};