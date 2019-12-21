
import {BasicScene} from './BasicScene';

export class CinematicScene extends BasicScene {

    constructor() {
        super(BasicScene.SCENE_cinematic);
    }

    init() {
        console.log('this.init');
    }

    _TransitionImage(callback, yoyo = true) {
        return this.tweens.add({
            targets: this.image,
            duration: 2000,
            yoyo: yoyo,
            alpha: 1,
            onComplete: () => {callback();}
        });
    }

    create() {	
		this.keys = {};
		this.keys.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
		this.keys.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		this.keys.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		this.keys.esc.on('down', () => {this.Skip();});
		this.keys.enter.on('down', () => {this.Skip();});
        this.keys.space.on('down', () => {this.Skip();});
        
        //let esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
		
		this.background = this.add.sprite(0, 0, "cinematic_0");
        this.image = this.add.sprite(this.game.canvas.width/2, this.game.canvas.height/2, "cinematic_1");
		this.image.alpha = 0;
        let tween;
		this.time.delayedCall(500, () => {
            //tween = this.add.tween(this.image).to({alpha: 1}, 2000, null, true);
            tween = this._TransitionImage(() => {
                this.image.setTexture('cinematic_2');
                tween = this._TransitionImage(() => {
                    this.image.setTexture('cinematic_3');
                    tween = this._TransitionImage(() => {
                        this.image.setTexture('cinematic_4');
                        tween = this._TransitionImage(() => {
                            this.image.setTexture('cinematic_5');
                            tween = this._TransitionImage(() => {
                                this.image.setTexture('cinematic_6');
                                tween = this._TransitionImage(() => {
                                    
                                }, false);
                            });
                        });
                    });
                });
            });
        });
    }

    update() {

    }
    
	render() {
        //this.debug.text("ESC / Enter / Spacebar to exit cinematic", 5, 15);
        console.log('1');
	}

    Skip() {
        this.scene.start(BasicScene.SCENE_menu);
    }

}