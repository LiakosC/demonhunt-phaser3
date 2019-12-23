import { App } from "./App";

export class Speaker {

	/**
	 * @returns {App}
	 */
	app() {
		return global.app;
	}

	constructor(parent) {//
		
		this.element = $("<div>").appendTo(parent).html('\
			<table>\
				<tr>\
					<td><img src="'+this.app().assets.graphics()+'/speak.png"/></td>\
					<td><input/></td>\
				</tr>\
			</table>\
		').addClass("Speaker").css({
			
		}).appendTo(parent)[0];

		this.eventer = new Phaser.Events.EventEmitter();

		window.addEventListener("keydown", (e) => {this._keydown(e);});//

	}

	_cast_talk() {
		if (this._isOpen()) {
			this.eventer.emit(Speaker.EVENT_SPEAK, this._inputValue());
		}
		this.toggle();
	}
	
	_keydown(e) {
		//console.log("keydown", e);
		if (e.key === "Enter") {
			this._cast_talk();	
		}
	}
		
	_isOpen() {
		return $(this.element).is(":visible");
	}

	/**
	 * @returns {String}
	 */
	_inputValue() {
		return $(this.element).find("input")[0].value;	
	}
	
	toggle(flag) {
		if (flag != null) {
			if (flag == true) {
				$(this.element).show();
				$(this.element).find("input")[0].focus();
				this.eventer.emit(Speaker.EVENT_OPEN);
			} else {
				$(this.element).find("input")[0].value = "";
				$(this.element).hide();
				this.eventer.emit(Speaker.EVENT_CLOSE);
			}
		} else {
			var f = this._isOpen();
			this.toggle(!f);
		}
	}
	
	
	destroy() {
		this.element.parentNode.removeChild(this.element);
		this.eventer.destroy();
		window.removeEventListener("keydown", this._keydown);
	}

};

Speaker.EVENT_OPEN = 'open';
Speaker.EVENT_CLOSE = 'close';
Speaker.EVENT_SPEAK = 'speak';