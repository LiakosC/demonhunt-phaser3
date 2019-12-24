import { BaseLevel } from "./BaseLevel";

export class Level_1_1 extends BaseLevel {

    constructor() {
        super();
        this.episode = 1;
        this.level = 1;
    }

    init() {
        console.log('init.1.1');
        console.log(this);
        
        let game = this.scene();

        game.SetWorld(12500, 5500);
        
        // create room
        var r0 = game.CreateRoom(50, 50); // creates new Room() and pushes to game.rooms[]
        
        r0.CreateHero(650, 850, 1); // x, y, direction

        // ceiling	
        r0.CreateWall(500, 500, 290, 50, "empty");
        r0.CreateWall(850, 500, 250, 50, "empty");
        r0.CreateTile(500, 500, 600, 50, "brick-wall");
        r0.CreateWall(500, 550, 50, 100, "brick-wall");
        r0.CreateWall(1050, 550, 50, 100, "brick-wall");
        
        // floor
        r0.CreateWall(500, 950, 600, 50, "brick-wall");
        r0.CreateWall(500, 900, 50, 50, "brick-wall");
        r0.CreateWall(1050, 900, 50, 50, "brick-wall");
        
        r0.CreateExitDoor(1000, 900); // top-left 50 50
        //game.CreateCoin(r0, [{x:525,y:775}, {x:525,y:810}, {x:525,y:845}, {x:575, y:925}]);
        r0.CreateManyCoins([{x:525,y:775}, {x:525,y:810}, {x:525,y:845}, {x:575, y:925}]);
        
        //game.victory();
        
        /* OLD BUILD - never delete */
        //celling
        
        
        r0.CreateWall(1500, 2500, 2450, 25, "brick-wall");
        r0.CreateWall(3950, 2350, 50, 50, "brick-wall");
        r0.CreateWall(3900, 2400, 50, 100, "brick-wall");
        
        r0.CreateWall(3800, 2150, 50, 50, "brick-wall");
        r0.CreateWall(3700, 2200, 150, 50, "brick-wall");
        var mw = r0.CreateWall(3700, 2250, 50, 50, "brick-wall"); // moving wall, entrance to ROOM
        mw.MovingWall(r0.G2Rect(3775, 2275, 25, 25), 6000, {x:r0.x+3400});
        mw.onMove.add(function() {roomFog.reveal();});
        r0.CreateWall(3700, 2300, 200, 50, "brick-wall");
        r0.CreateWall(3900, 2200, 50, 50, "brick-wall");
        r0.CreateWall(4000, 2150, 50, 50, "brick-wall");
        r0.CreateWall(4000, 2200, 150, 50, "brick-wall");
        r0.CreateWall(4100, 2250, 50, 50, "brick-wall");
        r0.CreateWall(3950, 2300, 200, 50, "brick-wall");
        
        // COLUMN
        r0.CreateWall(3800, 950, 50, 1200, "stone-wall"); // left column
        r0.CreateWall(4000, 950, 50, 1200, "stone-wall"); // right column
        r0.CreateWall(3900, 1000, 50, 50, "stone-wall");
        r0.CreateWall(3900, 1200, 50, 50, "stone-wall");
        r0.CreateWall(3900, 1400, 50, 50, "stone-wall");
        r0.CreateWall(3900, 1600, 50, 50, "stone-wall");
        r0.CreateWall(3900, 1800, 50, 50, "stone-wall");
        r0.CreateWall(3900, 2000, 50, 50, "stone-wall");
        r0.CreateWall(3850, 1100, 50, 50, "stone-wall"); r0.CreateWall(3950, 1100, 50, 50, "stone-wall");
        r0.CreateWall(3850, 1300, 50, 50, "stone-wall"); r0.CreateWall(3950, 1300, 50, 50, "stone-wall");
        r0.CreateWall(3850, 1500, 50, 50, "stone-wall"); r0.CreateWall(3950, 1500, 50, 50, "stone-wall");
        r0.CreateWall(3850, 1700, 50, 50, "stone-wall"); r0.CreateWall(3950, 1700, 50, 50, "stone-wall");
        r0.CreateWall(3850, 1900, 50, 50, "stone-wall"); r0.CreateWall(3950, 1900, 50, 50, "stone-wall");
        r0.CreateWall(3850, 2100, 50, 50, "stone-wall"); r0.CreateWall(3950, 2100, 50, 50, "stone-wall");
        // head
        r0.CreateWall(3700, 700, 450, 50, "stone-wall");
        r0.CreateWall(3700, 750, 50, 150, "stone-wall"); r0.CreateWall(4100, 750, 50, 150, "stone-wall");
        r0.CreateWall(3700, 900, 150, 50, "stone-wall"); r0.CreateWall(4000, 900, 150, 50, "stone-wall");
        
        // ROOM
        var roomFog = r0.CreateFog(2700, 1850, 1000, 500);
        r0.CreateWall(2700, 1850, 850, 50, "brick-wall");
        r0.CreateWall(2700, 1900, 50, 300, "brick-wall");
        r0.CreateWall(3500, 1900, 50, 300, "brick-wall");
        r0.CreateWall(3500, 2200, 200, 50, "brick-wall");
        r0.CreateWall(2600, 2300, 1100, 50, "brick-wall");
        r0.CreateWall(3100, 2100, 50, 50, "brick-wall");
        r0.CreateDoor(3100, 2050, "red-door", r0, 725, 325);
        // cave
        var caveFog = r0.CreateFog(2600, 2150, 100, 200);
        r0.CreateWall(2600, 2150, 100, 50, "brick-wall");
        r0.CreateWall(2600, 2200, 50, 50, "brick-wall");
        r0.CreateWall(2700, 2250, 50, 50, "brick-wall").MovingWall(r0.G2Rect(2775, 2275, 0, 0), 1500, {x:r0.x+2600}, function() {
            caveFog.reveal();
        }); // bottom secret
        r0.CreateWall(2700, 2200, 50, 50, "brick-wall").MovingWall(r0.G2Rect(2675, 2225, 0, 0), 2500, {x:r0.x+3000}); // upper secret
        
        // FINAL
        //frame
        r0.CreateWall(500, -50, 50, 250, "brick-wall");
        r0.CreateWall(500, 200, 150, 50, "brick-wall");
        r0.CreateWall(650, 250, 50, 100, "brick-wall");
        r0.CreateWall(650, 350, 100, 50, "brick-wall");
        r0.CreateWall(800, 350, 450, 50, "brick-wall");
        r0.CreateWall(1200, 100, 50, 250, "brick-wall");
        //inner
        r0.CreateWall(600, 50, 50, 50, "brick-wall"); r0.CreateWall(800, 50, 50, 50, "brick-wall");
        r0.CreateWall(700, -50, 50, 50, "brick-wall"); r0.CreateWall(700, 150, 50, 50, "brick-wall");
        r0.CreateWall(750, 250, 50, 50, "brick-wall");
        r0.CreateWall(950, 0, 50, 50, "brick-wall");
        r0.CreateWall(900, 150, 200, 50, "brick-wall");
        r0.CreateWall(1100, 200, 100, 50, "brick-wall");
        var gate = r0.CreateGate150(900, 200);
        var mask = r0.CreateArtifact(1038, 250, "Mask of the Demon Hunter");
        mask.onTake.add(function() {
            game.music.stop();
            game.music = ph.add.audio("doom", 1, true);
            game.music.play();
        });
        game.speaker.onSpeak.add(function() {
            if (game.speaker.lastTalk == "hello") {
                if (g2.RectOverRect(game.me.G2Rect(), r0.G2Rect(1150, 150, 50, 50))) {
                    gate.toggle();
                }
            }
        });
        r0.onUpdate.add(function() {
            if (g2.RectOverRect(game.me.G2Rect(), r0.G2Rect(1150, 150, 50, 50))) {
                moon.alpha = 1;
            } else {
                moon.alpha = 0;
            }
        });
        var moon = r0.CreateSprite(1450, 0, "moon");
        moon.alpha = 0;
        //*/

    }

}