
/**
 * Requires jquery.
 * 2019-06-09
 * @type {FlexibleWindow}
 * @method default_w
 * @method default_h
 * @method ratio
 */
export class FlexibleWindow {

	/**
	 * @param {JQuery|HTMLElement|String|null} divElement 
	 * @param {Number} width 
	 * @param {Number} height
	 */
	constructor(divElement, width, height) {
		if (typeof divElement === 'string') {
			this.element = document.getElementById(divElement);
			//console.log(this.element);
			if (this.element == null) throw Error('Element id does not exist.');
		} else if (divElement instanceof HTMLElement) {
			this.element = divElement;
		} else if (divElement === null) {
			this.element = null;
		} else { // jquery element
			this.element = divElement[0];
			//throw Error('Invalid type for 1st parameter.');
		}
		
		this._width = width;
		this._height = height;
		this._x = 0;
		this._y = 0;
		this._scaleX = 1;
		this._scaleY = 1;
		this.scaleX = {
			get: () => {
				return this._scaleX;
			},
			set: (x) => {
				this._scaleX = x;
				this._RefreshElement();
			},
		};
		this.scaleY = {
			get: () => {
				return this._scaleY;
			},
			set: (y) => {
				this._scaleY = y;
				this._RefreshElement();
			},
		};
		if (this.element == null) { // if element is null, create it
			this.element = document.createElement('div');
			document.body.appendChild(this.element);
		}
		this._InitMouseInfo();
		this._InitElement();
		this._RefreshElement();
	}

	_InitElement() {
		this.element.style.position = "absolute";
		this.element.style.overflow = "hidden";
		//this.element.style.left = "0px";
		//this.element.style.top = "0px";
		//this.element.style.right = "0px";
		//this.element.style.bottom = "0px";
		//this.element.style.margin = "auto";
	}

	_RefreshElement() {
		this.element.style.left = this._x + "px";
		this.element.style.top = this._y + "px";
		this.element.style.width = this.current_W() + "px";
		this.element.style.height = this.current_H() + "px";
		this.element.style.fontSize = this._scaleX * 100 + "%";
	}
	
	default_W() {return this._width;}
	default_H() {return this._height;}
	Ratio() {return this._width / this._height;}
	
	current_W() {return parseInt(this._width * this._scaleX);}
	current_H() {return parseInt(this._height * this._scaleY);}

	parent_W() {return window.innerWidth;}
	parent_H() {return window.innerHeight;}
	parent_Ratio() {return this.parent_W() / this.parent_H();}
	
	
	_InitMouseInfo() {
		this.mouseX = 0;
		this.mouseY = 0;
		window.addEventListener("mousemove", (e) => {
			this.mouseX = (e.clientX - this.element.offsetLeft) / this._scaleX;
			if (this.mouseX < 0) this.mouseX = 0; else if (this.mouseX > this._width) this.mouseX = this._width;
			this.mouseY = (e.clientY - this.element.offsetTop) / this._scaleY;
			if (this.mouseY < 0) this.mouseY = 0; else if (this.mouseY > this._height) this.mouseY = this._height;
			//console.log(this.mouseX, this.mouseY);
		});
	}

	MaxStretch() {
		let ratio = this.Ratio();
		let winRatio = this.parent_Ratio();
		let scale;
		if (ratio >= winRatio) { // flexible_window has more width
			scale = this.parent_W() / this.default_W();
		} else { // flexible_window has more height
			scale = this.parent_H() / this.default_H();
		}
		this.scaleX.set(scale);
		this.scaleY.set(scale);
		this._RefreshElement();
	}

	Center() {
		this._x = (this.parent_W() - this.current_W()) / 2;
		this._y = (this.parent_H() - this.current_H()) / 2;
		this._RefreshElement();
	}

	//this.center = function() { no need. margin auto will do the work
	//	this.element.style.left = (window.innerWidth - this.getCurrentWidth())/2 + "px";
	//	this.element.style.top = (window.innerHeight - this.getCurrentHeight())/2 + "px";
	//}
	//this.getWindowScale = function() {
	//	var boxRatio = window.innerWidth / window.innerHeight;
	//	if (boxRatio > this.ratio) { // box too much width
	//		return window.innerHeight / this.height;
	//	} else { // box too much height
	//		return window.innerWidth / this.width;
	//	}
	//}
	//this.getScreenScale = function() {
	//	var boxRatio = screen.width / screen.height;
	//	if (boxRatio > this.ratio) { // box too much width
	//		return screen.height / this.height;
	//	} else { // box too much height
	//		return screen.width / this.width;
	//	}
	//}
	
	
	/*
	var FULLSCREEN_INTERVAL = 80;
	var fullscreenTarget = this.element;
	if (fullscreenTarget.webkitRequestFullScreen != null) {
		this.requestFullScreen = function() {fullscreenTarget.webkitRequestFullScreen();}
		this.cancelFullScreen = function() {document.webkitCancelFullScreen();}
	} else if (fullscreenTarget.mozRequestFullScreen != null) {
		this.requestFullScreen = function() {fullscreenTarget.mozRequestFullScreen();}
		this.cancelFullScreen = function() {document.mozCancelFullScreen();}
	} else {
		this.requestFullScreen = fullscreenTarget.requestFullScreen;
		this.cancelFullScreen = fullscreenTarget.cancelFullScreen;
	}
	this.isFullscreen = false;
	this.fullscreen = function(toggle) {
		if (toggle != undefined) {
			if (toggle) {
				this.requestFullScreen();
				this.isFullscreen = true;
			} else {
				this.cancelFullScreen();
				this.isFullscreen = false;
			}
		} else { // toggle not set
			this.fullscreen(!this.isFullscreen);
		}
	}
	var ar = ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "msfullscreenchange"];
	ar.forEach(
		eventType => document.addEventListener(eventType, function() {
			THIS.onFullscreen(THIS.isFullscreen);
		}, false)
	);
	
	this.onFullscreen = function(itis) {} // OR

	*/
	
	
	/*
	this.resizeNWWindow = function(width, height) {
		var nwgui = (typeof require !== 'undefined') ? require("nw.gui") : null;
		nwgui.Window.get().width = width;
		nwgui.Window.get().height = height;
		if (true) { // fix an error to nwgui until it's patched
			var error_dx = window.innerWidth - nwgui.Window.get().width;
			var error_dy = window.innerHeight - nwgui.Window.get().height;
		}
		nwgui.Window.get().width = width - parseInt(error_dx);
		nwgui.Window.get().height = height - parseInt(error_dy);
	}
	*/
	
	px_to_pc_X(px) {return px * 100 / this.default_W();}
	px_to_pc_Y(px) {return px * 100 / this.default_H();}
	pc_to_px_X(percent) {return parseInt(percent / 100 * this.default_W());}
	pc_to_px_Y(percent) {return parseInt(percent / 100 * this.default_H());}

}

export default FlexibleWindow;

//module.exports = FlexibleWindow;



