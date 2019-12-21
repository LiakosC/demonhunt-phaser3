import {BasicScene} from './BasicScene';

export class BootScene extends BasicScene {

    constructor(phaserGame) {
        //super(phaserGame);
        super('boot');
        //this._phsceneName = 'boot';
        //this.phgame.scene.add(this._phsceneName, this);
        //console.log('boot construct');
        //this.create = this.create;
        //this.test = 'test';
    }
    
    init() {
        $(this.game.canvas).css({width: "100%", height: "100%"});
        this.game.canvas.oncontextmenu = () => {return false;}
        //boot.memory.createOptions();
        window.addEventListener("mousemove", () => {
            this.game.canvas.parentNode.style.cursor = 'url(' + app.assets.graphics_cursor_default() + '), auto';
            //this.phgame.canvas.parentNode.style.cursor = 'url(' + this.assets.graphics_cursor_pointer() + '), auto';
        });
    };

    preload() {

    }

    create() {
        //console.log('boot create');
        console.log(this.test);
        //this.phgame.scene.disableVisibilityChange = true;
        //this.phgame.config.fps = config.Fps();
        //this.phgame.config.backgroundColor = 'red';
        //scene_loading.Start();
        //this.phgame.scene.stop('boot');
        //this.phgame.scene.start('loading');
        //this.phgame.scene.switch('boot', 'loading');
        //this.phgame.scene.sleep('boot');
        //this.phgame.scene.start('loading');
        //global.scene_loading.Start();
    }

    update() {
        //this.phscene.update = (time, dt) => { // for debug
        //    console.log('boot', time, dt, this.phgame.config.fps);
        //};
        //this.phscene.update = null;
    }

};