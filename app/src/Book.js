

/*

30/1/2018

nice class to switch between app 'pages' or menu 'pages'.
better than phaser state ;)

var menuBook = new Book();
// set your pages
menuBook.pageStart("main", function() {
	var button = ...
	menuBook.pageEnd("main", function() {
		button.destroy();
	});
});
menuBook.pageStart("options", function() {
	var bar = ...
	menuBook.pageEnd("options", function() {
		bar.destroy();
	});
});

// now switch between pages ;)
menuBook.start("main");
menuBook.start("options");
menuBook.end(); // ends a started page if there is any
*/

export class Book  {

	constructor() {
		this._pagesStartCallbacks = {}; // map <string, function>
		this._pagesEndCallbacks = {}; // map <string, function>
		this.page = ""; // string
	}
	
	// SET PAGE FUNCTIONS INSIDE CODE
	pageStart(pageKey, callback) {
		this._pagesStartCallbacks[pageKey] = callback;
	};

	pageEnd(pageKey, callback) {
		this._pagesEndCallbacks[pageKey] = callback;
	};
	
	// USE START TO SWITCH PAGES
	start(pageKey) {
		if (this._pagesStartCallbacks[pageKey] != null) {
			if (this.page != "") {
				this._pagesEndCallbacks[this.page]();
			}
			this._pagesStartCallbacks[pageKey]();
			this.page = pageKey;
		}
	};
	end() {
		if (this.page != "") {
			this._pagesEndCallbacks[this.page]();
			this.page = "";
		}
	}
};

