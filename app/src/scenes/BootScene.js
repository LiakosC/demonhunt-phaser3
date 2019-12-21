import {BasicScene} from './BasicScene';

export class BootScene extends BasicScene {

    constructor() {
        super(BasicScene.SCENE_boot);
    }
    
    init() {
        //console.log('boot.init');
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
        //console.log('boot.create');
        this.game.scene.disableVisibilityChange = true;
        this.game.config.fps = app.config.Fps();
        this.game.config.backgroundColor = 'red';
        //this.game.scene.stop('boot');
        this.game.scene.start(BasicScene.SCENE_loading);
    }

    update() {
        //this.phscene.update = (time, dt) => { // for debug
        //    console.log('boot', time, dt, this.phgame.config.fps);
        //};
        //this.phscene.update = null;
    }

};