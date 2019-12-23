import { BasicScene } from "./BasicScene";
import { Speaker } from "../Speaker";

export class GameScene extends BasicScene {

    constructor() {
        super(BasicScene.SCENE_game);
        this.episode = null;
        this.level = null;
        this.input = null;
        this.speaker = null;
    }

    init() {
        console.log('game.init');//
        this.speaker = new Speaker(this.app().htmlbox);
        //this.input = 
        
        this.speaker.toggle(false);

    }

    create() {
        console.log('game.create');
    }

    update() {
        
    }

    shutdown() {
        this.speaker.destroy();
		this.exitDiv.parentNode.removeChild(game.exitDiv);
		this.input.Destroy();
		this.music.destroy();
    }

    createGate150(x, y) {
        var gate = {};
        gate.sprite = ph.add.sprite(x, y, "gate150_closed");
        ph.physics.arcade.enable(gate.sprite);
        gate.sprite.body.immovable = true;
        gate.sprite.body.setSize(50, 150);
        gate.updateCB = function() {
            ph.physics.arcade.collide(game.me.sprite, gate.sprite);
        }
        game.onUpdate.add(gate.updateCB);
        gate.opened = false;
        gate.close = function() {
            gate.sprite.loadTexture("gate150_closed");
            game.onUpdate.add(gate.updateCB);
            gate.opened = false;
            gate.sound.play();
        }
        gate.open = function() {
            gate.sprite.loadTexture("gate150_opened");
            game.onUpdate.remove(gate.updateCB);
            gate.opened = true;
            gate.sound.play();
        }
        gate.toggle = function() {if (gate.opened) {gate.close();} else {gate.open();}}
        gate.sound = ph.add.audio("open");
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
        //if (game.level > json.profiles[boot.profile].episodes[game.episode].levelWon) {
        //	json.profiles[boot.profile].episodes[game.episode].levelWon = game.level;
        //}
        //localStorage.data = JSON.stringify(json);
        var episodeData = boot.profileMemoryData.episodes[game.episode];
        var levelData = episodeData.levels[game.level];
        levelData.completed = true;
        levelData.gold = game.goldGained;
        // artifacts gained have their flag set to true in memory
        for (var i=0; i<game.artifactsGained.length; i++) {
            var artifactName = game.artifactsGained[i];
            episodeData.artifacts[artifactName] = true;
        }
        memory.Save();
        victory.start(); // victory uses game data
        //boot.menu.runProfile(boot.profile);
    }

    defeat() {
        game.start(game.episode, game.level);
    }

    CreateCoin(room, x, y) {
        if (Array.isArray(x)) { // game.CreateCoin(room, [{x:, y:}, {x:, y:}])
            var coins = x; // coins = [{x,y}, {x,y}]
            for (var i=0; i<coins.length; i++) {game.CreateCoin(room, coins[i]);}
        } else if (typeof x === 'object') { // game.CreateCoin(room, {x:, y:})
            var coin = x;
            game.CreateCoin(room, coin.x, coin.y);
        } else { // game.CreateCoin(x, y)
            var coin = new game.Coin();
            coin.SetPosition(x, y);
            room.coins.push(coin);
            game.levelGold += 1;
            return coin;
        }
    }
    SetWorld(sizeX, sizeY) {
        ph.world.setBounds(0, 0, sizeX, sizeY);
    }
    CreateRoom(x, y) {
        var room = new game.Room(x, y);
        game.rooms.push(room);
        return room;
    }
    CreateHero(room, x, y, direction) {
        var hero = new game.HeroUnit();
        hero.room = room;
        hero.SetPosition(x, y);
        ph.camera.follow(hero.GetBodySprite());
        //console.log("hero pos", hero.pointSprite.x, hero.pointSprite.y);
        hero.onDeath.add(function() {
            game.defeat();
        });
        hero.onUpdate.add(function() {
            if (hero.y > Y_TO_DIE) {
                hero.Die();
            }
        });
        room.units.push(hero);
        game.me = hero; // used for input (check if hero is null)
        return hero;
    }

    CreateTile(room, x, y, w, h, texture) {
        var wall = new game.Wall(x, y, w, h, texture);
        wall.room = room;
        room.walls.push(wall);
        return wall;
    }

    CreateWall(room, x, y, w, h, texture) {
        var wall = new game.Wall(x, y, w, h, texture);
        wall.room = room;
        wall.EnableCollider();
        room.walls.push(wall);
        return wall;
    }

}