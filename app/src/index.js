
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

let app = new App();
app.Init();
app.Start();
window.app = app; // Application is a singleton.