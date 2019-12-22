
//const Phaser = require('phaser');

import { BasicScene } from './BasicScene';
import { EpicLoading } from '../EpicLoading';

export class LoadingScene extends BasicScene {

    constructor() {
        super(BasicScene.SCENE_loading);
    }

    init() {
        //console.log('loading.init');
    }

    preload() {
        //console.log("loading.preload");
        //let htmlbox = this.game.canvas.parentNode;
        let htmlbox = app.htmlbox;
        this.epicLoading = new EpicLoading(htmlbox);
        $(this.epicLoading.element).css({
            position: "absolute",
            //backgroundColor: "white",
            left: "0%", top: "0%", width: "100%", height: "100%",
            pointerEvents: "auto"
        });
        this.epicLoading.title.innerHTML = "Demon Hunt";
        this.epicLoading.subtitle.innerHTML = "LiakosZero";
        this.epicLoading.overbar.innerHTML = "Loading...";
        this.epicLoading.underbar.innerHTML = "";
        this.load.on('progress', (progress01) => {
            this.epicLoading.setProgress(progress01);
        });

        // Paths aliases.
        let audio = app.assets.audio();
        let graphics = app.assets.graphics();
        
        // Load cinematic.
        if (global.app.enabledCinematic) {
            this.load.image("cinematic_0", graphics + "/cinematic/0.png");
            this.load.image("cinematic_1", graphics + "/cinematic/1.png");
            this.load.image("cinematic_2", graphics + "/cinematic/2.png");
            this.load.image("cinematic_3", graphics + "/cinematic/3.png");
            this.load.image("cinematic_4", graphics + "/cinematic/4.png");
            this.load.image("cinematic_5", graphics + "/cinematic/5.png");
            this.load.image("cinematic_6", graphics + "/cinematic/6.png");
        }
        
        // Load scenes basics.
        this.load.image("menu-image", graphics + "/menu-image.png");
        //this.load.audio("menu-music", 'include/sp/music/menu.ogg');
        //this.load.audio("button-hover", 'include/sp/gui/foup.wav');
        
        // Load game.
        this.load.image("empty", graphics + "/empty.png");
        this.load.image("black", graphics + "/black.png");
        
        this.load.image("hero", graphics + "/hero/texture.png");
        this.load.image("hero_attack", graphics + "/hero/attack.png");
        this.load.image("hero_jump", graphics + "/hero/jump.png");
        
        this.load.image("skeleton", graphics + "/enemies/skeleton/texture.png");
        this.load.image("skeleton_dead", graphics + "/enemies/skeleton/dead.png");
        this.load.spritesheet("skeleton_attack", graphics + "/enemies/skeleton/attack.png", {frameWidth: 370/5, frameHeight: 350/5, endFrame: 25});
        
        this.load.spritesheet("gold", graphics + "/gold_spritesheet.png",  {frameWidth: 350/7, frameHeight: 50, endFrame: 7});
        this.load.image("Mask of the Demon Hunter", graphics + "/artifacts/Mask of the Demon Hunter.png");
        
        this.load.image("blue-wall", graphics + "/walls/blue-wall.png");
        this.load.image("brick-wall", graphics + "/walls/brick-wallx50.png");
        this.load.image("stone-wall", graphics + "/walls/stone-wall.png");
        this.load.image("death_flash", graphics + "/death_flash.png");
        this.load.image("red-door", graphics + "/red-door.png");
        this.load.image("blue-door", graphics + "/blue-door.png");
        this.load.image("green-door", graphics + "/green-door.png");
        this.load.image("purple-door", graphics + "/purple-door.png");
        this.load.image("exit-door", graphics + "/exit-door.png");
        
        this.load.image("gate150_closed", graphics + "/gate150_closed.png");
        this.load.image("gate150_opened", graphics + "/gate150_opened.png");
        
        this.load.image("sokail", graphics + "/sprites/sokail.png");
        this.load.image("hello_the_moon", graphics + "/sprites/hello_the_moon.png");
        this.load.image("dont_stone", graphics + "/sprites/dont_stone.png");
        this.load.image("level_right", graphics + "/sprites/level_right.png");
        this.load.image("1", graphics + "/sprites/1.png");
        this.load.image("leap", graphics + "/sprites/leap.png");
        this.load.image("moon", graphics + "/sprites/moon.png");
        
        this.load.audio("game-music", audio + "/game.ogg");
        this.load.audio("doom", audio + "/doom.ogg");
        this.load.audio("hop1", audio + "/hop1.ogg");
        this.load.audio("hop2", audio + "/hop2.ogg");
        this.load.audio("hop3", audio + "/hop3.ogg");
        this.load.audio("damaged1", audio + "/damaged1.ogg");
        this.load.audio("damaged2", audio + "/damaged2.ogg");
        this.load.audio("damaged3", audio + "/damaged3.ogg");
        this.load.audio("attack1", audio + "/attack1.wav");
        this.load.audio("attack2", audio + "/attack2.wav");
        this.load.audio("attack3", audio + "/attack3.wav");
        this.load.audio("wallmove", audio + "/wallmove.wav");
        this.load.audio("open", audio + "/open.wav");
        this.load.audio("door", audio + "/door.wav");
        this.load.audio("destroy", audio + "/destroy.wav");
        this.load.audio("gold", audio + "/gold.wav");
        
        // victory
        this.load.image("victory-image", graphics + "/victory-image.png");
        this.load.audio("victory-music", audio + "/victory.ogg");
    }

    create() {
        console.log('loading.create');
        if (true) {
			$(this.epicLoading.element).css({cursor: "pointer"});
			$(this.epicLoading.element).find("*").css({cursor: "pointer"});
			this.epicLoading.overbar.innerHTML = "Loading Completed!";
			this.epicLoading.element.addEventListener("mousedown", () => {
                this.shutdown();
				this.game.scene.start(BasicScene.SCENE_cinematic);
			});
		} else {
            this.game.scene.start(BasicScene.SCENE_cinematic);
		}
    }

    update(time, dt) {
        //console.log(time, dt);
        this.ResizeCanvas();
    }

    shutdown() {
        console.log('loading.destroy');
        this.epicLoading.destroy();
    }

}