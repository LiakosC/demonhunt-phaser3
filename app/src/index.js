
window.$ = require('jquery');
import {App} from './App';

/**
 * @var {App} app
 */
var app = new App();
app.config.enabledCinematic = false;
app.config.fastLoading = true;

app.Init();
app.Start();
global.app = app; window.app = app; // Application is a singleton.