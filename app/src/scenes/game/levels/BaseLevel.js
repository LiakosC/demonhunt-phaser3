
import { GameScene } from '../../GameScene';

export class BaseLevel {

    constructor() {
        this.episode = null;
        this.level = null;
        this.goldMax = 0;
    }

    /**
     * @returns {GameScene}
     */
    scene() {return global.app.scene_game;}

    init() {

    }

}