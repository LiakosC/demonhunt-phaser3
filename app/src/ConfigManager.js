

export class ConfigManager {

    constructor() {
        this.enabledCinematic = true;
        this.fastLoading = false;
        this.width = 800;
        this.height = 600;
        this.menuCallback = () => {}; // Called after menu scene is created.
    }

    Fps() {return 10;}

}