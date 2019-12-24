import { BasicScene } from "./BasicScene";
import { Speaker } from "../Speaker";
import { GameInput } from "../GameInput";
import { BaseLevel } from "./game/levels/BaseLevel";
import { Room } from "./game/entities/Room";
import { HeroUnit } from "./game/entities/HeroUnit";

/**
 * @class GameScene
 */
export class GameScene extends BasicScene {

    constructor() {
        super(BasicScene.SCENE_game);
        this.episode = null;
        this.level = null;
        this.inputer = null;
        this.speaker = null;

        /**
         * @type {BaseLevel}
         */
        this.currentLevel = null;
    }

    init() {
        console.log('this.init');//
        this.speaker = new Speaker(this.app().htmlbox);
        this.inputer = new GameInput(this);
        
		this.speaker.eventer.on(Speaker.EVENT_OPEN, () => {
            this.inputer.Toggle(false);
        });
        
		this.speaker.eventer.on(Speaker.EVENT_CLOSE, () => {
            this.inputer.Toggle(true);
        });
        
		this.speaker.eventer.on(Speaker.EVENT_SPEAK, (text) => {
			console.log(text);
		});
        
        this.speaker.toggle(false);

    }

    create() {
        console.log('this.create');
		this.spritesGroup 		= this.add.group();
		this.doorsGroup 		= this.add.group();
		this.meGroup			= this.add.group();
		this.goldGroup			= this.add.group();
		this.artifactsGroup		= this.add.group();
		this.wallsGroup 		= this.add.group();
		this.tilesGroup 		= this.add.group();
		this.enemiesGroup		= this.add.group();
		this.fogGroup			= this.add.group();
		this.deathSpriteGroup 	= this.add.group();
		
		this.rooms = [];
		
		this.goldGained = 0;
		this.levelGold = 0; // this.CreateCoin increases this value. it is explored and then saved in memory level as goldMax
		this.artifactsGained = []; // names of artifacts gained in level

		//this.lighter = new G2_Phaser_Lighter(ph);
        
        this.currentLevel = this.app().levels[this.episode].levels[this.level];
        this.currentLevel.init();
        this.currentLevel.goldMax = this.levelGold;
		//boot.episodes[this.episode].levels[this.level].init();
		//boot.profileMemoryData.episodes[this.episode].levels[this.level].goldMax = this.levelGold;
        
		this.goldInfo = {
            sprite: this.add.sprite(28, 25, "gold"),
            text: this.add.text(54, 14, "?", {font: "bold 18pt Arial", fill: "white"}),
            update: () => {
                this.goldInfo.text.setText(this.goldGained + " / " + this.levelGold);
            },
        };
        let coinDance = this.anims.create({
            key: 'goldInfo.coinDance',
            frames: this.anims.generateFrameNumbers('gold'),
            frameRate: 18,
            repeat: -1,
        });
        this.goldInfo.sprite.anims.play(coinDance);
        //this.goldInfo.sprite.anims.skipMissedFrames = true;
        this.goldInfo.sprite.fixedToCamera = true;
        this.goldInfo.sprite.setScale(0.6);
        this.goldInfo.text.setShadow(1, 1, "black");
        this.goldInfo.text.fixedToCamera = true;
        this.goldInfo.update();
		
		this.levelText = this.add.text(this.game.canvas.width / 2, 14, "Level " + this.level, {font: "bold 18pt Arial", fill: "white"});
        this.levelText.fixedToCamera = true;
        this.levelText.setOrigin(0.5, 0);
		//this.levelText.anchor.setTo(0.5, 0);
		this.levelText.setShadow(1, 1, "black");
		
		this.exitDiv = $("<div>").css({
			position: "absolute",
			right: "1.8%", bottom: "2.5%",
			width: "5%", height: "10%"
		}).prop("title", "Exit").appendTo(htmlbox)[0];
		var exit_btn = $("<button>").css({
			backgroundImage: "url(" + this.app().assets.graphics() + "/exit.png",
			backgroundSize: "100% 100%",
			width: "100%", height: "100%"
		}).on("click", () => {
            this.shutdown();
            this.scene.stop();
            this.app().config.menuCallback = () => {};
            this.app().scene_menu.Start('levels');
			//menu.start(function() {menu.BK.start("episodes");});
		}).appendTo(this.exitDiv);
		
		this.sounds = {};
		
		this.music = this.sound.add("game-music", 1, true);
		this.music.play();
        //if (this.startCB !== undefined) {this.startCB(); delete this.startCB;}
    }

    update() {
        
    }

    shutdown() {
        this.speaker.destroy();
		this.exitDiv.parentNode.removeChild(this.exitDiv);
		this.inputer.Destroy();
		this.music.destroy();
    }

    createGate150(x, y) {
        var gate = {};
        gate.sprite = this.add.sprite(x, y, "gate150_closed");
        this.physics.arcade.enable(gate.sprite);
        gate.sprite.body.immovable = true;
        gate.sprite.body.setSize(50, 150);
        gate.updateCB = function() {
            this.physics.arcade.collide(this.me.sprite, gate.sprite);
        }
        this.onUpdate.add(gate.updateCB);
        gate.opened = false;
        gate.close = function() {
            gate.sprite.loadTexture("gate150_closed");
            this.onUpdate.add(gate.updateCB);
            gate.opened = false;
            gate.sound.play();
        }
        gate.open = function() {
            gate.sprite.loadTexture("gate150_opened");
            this.onUpdate.remove(gate.updateCB);
            gate.opened = true;
            gate.sound.play();
        }
        gate.toggle = function() {if (gate.opened) {gate.close();} else {gate.open();}}
        gate.sound = this.add.audio("open");
        return gate;
    }
    
    // teleport. x and y are word coords (not room). use room.x+x as parameter
    tp(object, room, x, y) {
        object.SetPosition(x, y);
        if (room != null) {
            object.room.RemoveUnit(object);
            room.units.push(object);
            object.room = room;
        } else throw "teleporting to null room"
    }

    Victory() {
        //var json = JSON.parse(localStorage.data);
        //if (this.level > json.profiles[boot.profile].episodes[this.episode].levelWon) {
        //	json.profiles[boot.profile].episodes[this.episode].levelWon = this.level;
        //}
        //localStorage.data = JSON.stringify(json);
        var episodeData = boot.profileMemoryData.episodes[this.episode];
        var levelData = episodeData.levels[this.level];
        levelData.completed = true;
        levelData.gold = this.goldGained;
        // artifacts gained have their flag set to true in memory
        for (var i=0; i<this.artifactsGained.length; i++) {
            var artifactName = this.artifactsGained[i];
            episodeData.artifacts[artifactName] = true;
        }
        memory.Save();
        victory.start(); // victory uses game data
        //boot.menu.runProfile(boot.profile);
    }

    defeat() {
        this.start(this.episode, this.level);
    }

    CreateCoin(room, x, y) {
        if (Array.isArray(x)) { // this.CreateCoin(room, [{x:, y:}, {x:, y:}])
            var coins = x; // coins = [{x,y}, {x,y}]
            for (var i=0; i<coins.length; i++) {this.CreateCoin(room, coins[i]);}
        } else if (typeof x === 'object') { // this.CreateCoin(room, {x:, y:})
            var coin = x;
            this.CreateCoin(room, coin.x, coin.y);
        } else { // this.CreateCoin(x, y)
            var coin = new this.Coin();
            coin.SetPosition(x, y);
            room.coins.push(coin);
            this.levelGold += 1;
            return coin;
        }
    }

    /**
     * 
     * @param {Number} sizeX 
     * @param {Number} sizeY 
     * @deprecated
     */
    SetWorld(sizeX, sizeY) {
        //this.world.setBounds(0, 0, sizeX, sizeY);
    }

    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     * @returns {Room}
     */
    CreateRoom(x, y) {
        var room = new Room(x, y);
        this.rooms.push(room);
        return room;
    }

    CreateHero(room, x, y, direction) {
        var hero = new HeroUnit();
        hero.room = room;
        hero.SetPosition(x, y);
        this.camera.follow(hero.GetBodySprite());
        //console.log("hero pos", hero.pointSprite.x, hero.pointSprite.y);
        hero.onDeath.add(function() {
            this.defeat();
        });
        hero.onUpdate.add(function() {
            if (hero.y > Y_TO_DIE) {
                hero.Die();
            }
        });
        room.units.push(hero);
        this.me = hero; // used for input (check if hero is null)
        return hero;
    }

    CreateTile(room, x, y, w, h, texture) {
        var wall = new this.Wall(x, y, w, h, texture);
        wall.room = room;
        room.walls.push(wall);
        return wall;
    }

    CreateWall(room, x, y, w, h, texture) {
        var wall = new this.Wall(x, y, w, h, texture);
        wall.room = room;
        wall.EnableCollider();
        room.walls.push(wall);
        return wall;
    }

}

GameScene.EVENT_update = 'ev_update';
GameScene.EVENT_render = 'ev_render';