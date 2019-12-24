import { BaseLevel } from "./BaseLevel";

export class Level_1_1 extends BaseLevel {

    constructor() {
        super();
        this.episode = 1;
        this.level = 1;
    }

    init() {
        console.log('init.1.1');
        console.log(this);
    }

}