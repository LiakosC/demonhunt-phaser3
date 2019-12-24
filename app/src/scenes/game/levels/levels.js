import { Episode } from "./Episode";
import { Level_1_1 } from "./Level_1_1";
import { BaseLevel } from "./BaseLevel";

/*
let levels = {
    
    1: {

    },

    2: {

    },

};
*/

let levels = {
    1: new Episode(),
    2: new Episode(),
};
levels[1].levels = {
    1: new Level_1_1(),
    2: new BaseLevel(),
    3: new BaseLevel(),
    4: new BaseLevel(),
    5: new BaseLevel(),
};

export default levels;