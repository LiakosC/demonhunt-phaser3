
window.$ = require('jquery');
import {App} from './App';
import {FlexibleWindow} from './FlexibleWindow';

//window.oncontextmenu = function() {return false;};

window.win = new FlexibleWindow('window', 1280, 900);
$(win.element).addClass('bg-dark');
win.MaxStretch();
win.Center();
$(window).on('resize', (e) => {
    win.MaxStretch();
    win.Center();
});

window.app = new App();
window.app.Init();
window.app.Start();
//global.app = app;
//window.app = app; // Application is a singleton.