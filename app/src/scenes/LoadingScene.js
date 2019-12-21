//const EpicLoading = require('../EpicLoading');
const Phaser = require('phaser');

module.exports = class extends require('./BasicScene') {

    constructor(phaserGame) {
        super(phaserGame);
        this._phsceneName = 'loading';
        this.phscene = {};
        this.phscene.init = () => {
            console.log('loaidng init');
        };
        this.phscene.preload = () => {
            console.log("loading preload()");
            let htmlbox = this.phgame.canvas.parentNode;
            this.epicLoading = new EpicLoading(htmlbox);
            //this.epicLoading = new global.EpicLoading(htmlbox);
            $(this.epicLoading.element).css({
                position: "absolute",
                backgroundColor: "white",
                left: "0%", top: "0%", width: "100%", height: "100%",
                pointerEvents: "auto"
            });
            this.epicLoading.title.innerHTML = "Demon Hunt";
            this.epicLoading.subtitle.innerHTML = "LiakosC";
            this.epicLoading.overbar.innerHTML = "Loading...";
            this.epicLoading.underbar.innerHTML = "The nightmare begins..";
            //this.phgame.load.onFileComplete.add(() => {
            console.log(this.load);
            this.phscene.load.on('progress', () => {
                this.epicLoading.setProgress(ph.load.progress / 100);
                //console.log("load", ph.load.progress / 1);
            });
            
            ///* CINEMATIC */
            //if (OFFICIAL || LOAD_CINEMATIC) {
            //    ph.load.image("cinematic_0", "include/graphics/cinematic/0.png");
            //    ph.load.image("cinematic_1", "include/graphics/cinematic/1.png");
            //    ph.load.image("cinematic_2", "include/graphics/cinematic/2.png");
            //    ph.load.image("cinematic_3", "include/graphics/cinematic/3.png");
            //    ph.load.image("cinematic_4", "include/graphics/cinematic/4.png");
            //    ph.load.image("cinematic_5", "include/graphics/cinematic/5.png");
            //    ph.load.image("cinematic_6", "include/graphics/cinematic/6.png");
            //}
            //
            //ph.load.image("menu-image", "include/graphics/menu-image.png");
            //ph.load.audio("menu-music", 'include/sp/music/menu.ogg');
            //ph.load.audio("button-hover", 'include/sp/gui/foup.wav');
            //
            ///* GAME */
            //game.preload();
        };
        this.phscene.create = () => {
            //console.log('loaidng create');
        };
        this.phscene.update = (time, dt) => {
            //console.log(time, dt);
        };
        this.phgame.scene.add(this._phsceneName, this.phscene);
    }

}