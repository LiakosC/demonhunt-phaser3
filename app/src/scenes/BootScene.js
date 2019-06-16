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
        this.phscene = {
            init: () => {
                ///* basic template working on electron too */
                //window.oncontextmenu = function() {return false;};
                //window.addEventListener("keydown", function(e) {
                //    if (e.key == "F10") {
                //        win.fullscreen();
                //    }
                //});
                //window.addEventListener("resize", function(e) {
                //    win.setScale(win.getWindowScale());
                //});
                //win.onFullscreen = function(flag) {
                //    if (flag) {
                //        //win.setScale(win.getScreenScale());
                //        win.setScale(win.getWindowScale());
                //    } else {
                //        if (typeof require !== 'undefined') { // electron
                //            win.setScale(win.getWindowScale());
                //        } else { // browser
                //            win.setScale(1);
                //        }
                //    }
                //};
                ///* -------------------------------------- */
                //
                ////boot.memory.createOptions();
                //window.addEventListener("mousemove", () => {
                //    this.phgame.canvas.parentNode.style.cursor = "default";
                //    this.phgame.canvas.parentNode.style.cursor = "url('include/images/cursor.png'), auto";
                //});
            },
            create: () => {
                //console.log('boot create');
                //this.phgame.scene.disableVisibilityChange = true;
                //this.phgame.time.desiredFps = FPS;
                //this.phgame.state.start("loading");
            }
        }
        this.phgame.scene.add(this._phsceneName, this.phscene);
    }

    Start() {
        super.Start();
    }

};