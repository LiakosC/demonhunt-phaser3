
window.$ = require('jquery');
import {App} from './App';
import {FlexibleWindow} from './FlexibleWindow';

//window.oncontextmenu = function() {return false;};

/**
 * @var {App} global.app
 * @var {App} app
 */
var app = new App();
app.config.enabledCinematic = true;
app.config.fastLoading = true;

app.Init();
app.Start();
global.app = app; window.app = app; // Application is a singleton.