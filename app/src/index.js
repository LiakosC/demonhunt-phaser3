const $ = require('jquery');
const FlexibleWindow = require('./FlexibleWindow');

window.win = new FlexibleWindow('window', 1280, 900);
$(win.element).addClass('bg-dark');
win.MaxStretch();
win.Center();
$(window).on('resize', (e) => {
    win.MaxStretch();
    win.Center();
});

console.log(1);
