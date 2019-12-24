import { BaseLevel } from "./BaseLevel";

/**
 * @type {Episode}
 * @property {Object.<BaseLevel>} levels
 * @property {String[]} artifacts
 */
export class Episode {

    /**
     * @prop {String} this.artifacts
     */
    constructor() {
        this.name = "[Episode Name]";
        ///** @type {Object.<integer, BaseLevel>} this.levels */
        ///** @param {Object.<integer, BaseLevel>} this.levels */
        this.episodeLevel = 0;
        this.levels = {};
		this.artifacts = [];
        for (const [levelKey, level] of Object.entries(this.levels)) {
            //level.
        }
    }

}