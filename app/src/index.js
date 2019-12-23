
window.$ = require('jquery');
import {App} from './App';

/**
 * @var {App} app
 */
var app = new App();
app.config.enabledCinematic = false;
app.config.fastLoading = true;
if (true) {
    app.config.menuCallback = () => {
        app.scene_menu.shutdown();
        app.scene_menu.scene.stop();
        app.StartLevel(1, 1);
    };
}

app.Init();
app.Start();
global.app = app; window.app = app; // Application is a singleton.