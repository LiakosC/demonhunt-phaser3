/*
var memory = new JSONMemory("key");
memory.logEnabled = false;
memory.Init({
	profiles: {},
	options: {}
});
...
memory.data.profiles["user"].x += 5;
memory.Save();
*/

export class JSONMemory {

	constructor(localStorageKey) {
		var THIS = this;
	
		this._localStorageKey = localStorageKey; // string to select local storage
	
		this.data = null; // holds runtime data linked to storaged data
		this.defaultData;
		this.logEnabled = false;
	}

	Load() {
		try {
			this.Log("Loading..");
			var strData = localStorage.getItem(this._localStorageKey);
			this.Log("Loading String Data: " + strData);
			if (strData == null) { // first time playing
				this.Log("Could not load. String is null.");
				return false;
			} else if (strData == "") {
				this.Log("Could not load. String is empty.");
				return false;
			} else {
				this.Log("Loading Successfull.");
				this.data = JSON.parse(strData);
				return true;
			}
		} catch(e) {
			return false;
		}
	}

	Save() {
		try {
			var strData = JSON.stringify(this.data);
			localStorage.setItem(this._localStorageKey, strData);
			return true;
		} catch(e) {
			return false;
		}
	}

	Init(defaultData) {
		this.Log("Initializing with defaultData:");
		this.Log(defaultData);
		this.data = null;
		this.defaultData = defaultData;
		this.Log("Initial Load()");
		if (this.Load()) {
			this.Log("Inited Successfully.");
			return true;
		} else {
			this.Log("Loading False. Trying to reset memory");
			this.Reset();
			return false; // you should warn users that data is reseted
		}
	}

	Purge() {
		this.Log("Purging..");
		this.data = null;
		delete localStorage[this._localStorageKey];
		this.Log("Purged Ended.");
	}

	// resets everything, even local storage, to defaultData
	Reset() {
		this.Log("Resetting..");
		this.Purge();
		this.Log("Reconstructing memory.");
		var strData = JSON.stringify(this.defaultData);
		localStorage.setItem(this._localStorageKey, strData);
		this.data = JSON.parse(JSON.stringify(this.defaultData));
	}

	Log(str) {
		if (this.logEnabled) {console.log("JSONMemory: " , str);}
	}

	Report() {
		console.log("JSONMemory Report:");
		console.log("\tLocal: ", localStorage[this._localStorageKey]);
		console.log("\tDefault Data: ", THIS.defaultData);
		console.log("\tRuntime Data: ", THIS.data);
	}

}







