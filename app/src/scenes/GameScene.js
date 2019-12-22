import { BasicScene } from "./BasicScene";

export class GameScene extends BasicScene {

    constructor(phaserGame) {
        super(BasicScene.SCENE_game);
        this.episode = null;
        this.level = null;
    }

    init() {
        console.log('game.init');
    }

    create() {
        console.log('game.create');
    }

    update() {
        
    }

    shutdown() {
        
    }

}