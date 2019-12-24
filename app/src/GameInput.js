import {GameScene} from './scenes/GameScene';

/**
 * @property {Object.<Phaser.Input.Keyboard.Key>} keys
 */
export class GameInput {

    /**
     * 
     * @param {GameScene} gameScene 
     */
    constructor(gameScene) {
        this.gameScene = gameScene;

        ///** @param {Object.<Phaser.Input.Keyboard.Key>} this.keys */
        this.keys = {
            left: this.gameScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.gameScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            down: this.gameScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            up: this.gameScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            use: this.gameScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACEBAR),
            chat: this.gameScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER),
            esc: this.gameScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC),
            attack_left: this.gameScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            attack_right: this.gameScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
        };
        this.keys.left.on('down', () => {this._MoveStateChanged();});
        this.keys.left.on('up', () => {this._MoveStateChanged();});
        this.keys.right.on('down', () => {this._MoveStateChanged();});
        this.keys.right.on('up', () => {this._MoveStateChanged();});
        this.keys.up.on('down', () => {this._CastJump();});
        this.keys.use.on('down', () => {this._CastUse();});
        this.keys.attack_left.on('down', () => {this._CastAttack(-1);});
        this.keys.attack_right.on('down', () => {this._CastAttack(+1);});
        
        this.gameScene.input.keyboard.clearCaptures(); // Somehow this allows the keyboard to write in input elements.
    }

    /* ---------------------- LINKS -------------------------- */
    _CastDirectionMove(direction) {
        if (this.gameScene.me != null) {
            this.gameScene.me.CastDirectionMove(direction);
            console.log("move", direction);
        }
    }
    _CastJump() {
        if (this.gameScene.me != null) {
            this.gameScene.me.CastJump();
        }
    }
    _CastAttack(direction) { // -1 or +1
        if (this.gameScene.me != null) {
            this.gameScene.me.CastDirectionAttack(direction);
        }
    }
    _CastUse() {
        if (this.gameScene.me != null) {
            this.gameScene.me.CastUse();
        }
    }
    /* ---------------------- LINKS -------------------------- */

    _CreateKeys() {
    }
    
    Toggle(flag) {
        if (flag) {
            for (const [code, phKey] of Object.entries(this.keys)) {
                phKey.enabled = true;
            }
        } else {
            for (const [code, phKey] of Object.entries(this.keys)) {
                phKey.enabled = false;
            }
        }
    }
    
    _MoveStateChanged() {
        console.log('_MoveStateChanged');
        if (this.keys.left.isDown && this.keys.right.isDown) {
            this._CastDirectionMove(0);
        } else if (this.keys.left.isDown) {
            this._CastDirectionMove(-1);
        } else if (this.keys.right.isDown) {
            this._CastDirectionMove(+1);
        } else {
            this._CastDirectionMove(0);
        }
    }
        
    Destroy() {
        for (const [k, phKey] of Object.entries(this.keys)) {
            phKey.destroy();
        }
    }

}