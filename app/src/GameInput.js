import {GameScene} from './scenes/GameScene';

export class GameInput {

    /**
     * 
     * @param {GameScene} gameScene 
     */
    constructor(gameScene) {
        this.gameScene = gameScene;
        this._CreateKeys();
        this._ClearCaptures();
    }

    /* ---------------------- LINKS -------------------------- */
    _CastDirectionMove(direction) {
        if (this.gameScene.me != null) {
            this.gameScene.me.CastDirectionMove(direction);
            //console.log("move", direction);
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

    _ClearCaptures() { // somehow this frees the keyboard and enables it to write in input elements
        this.gameScene.input.keyboard.clearCaptures();
    }
    _CreateKeys() {
        this.keys = {};
        this.keys.left = this.gameScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keys.right = this.gameScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keys.down = this.gameScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keys.up = this.gameScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keys.use = this.gameScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACEBAR);
        this.keys.chat = this.gameScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.keys.esc = this.gameScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.keys.attack_left = this.gameScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.keys.attack_right = this.gameScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    _RemoveKeys() {
        this.gameScene.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.gameScene.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.gameScene.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.gameScene.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.gameScene.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.SPACEBAR);
        this.gameScene.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.gameScene.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.gameScene.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.gameScene.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    
    Toggle(flag) {
        var THIS = this;
        if (flag) {
            this.keys.left.onDown.add(THIS._MoveStateChanged, THIS);
            this.keys.left.onUp.add(THIS._MoveStateChanged, THIS);
            this.keys.right.onDown.add(THIS._MoveStateChanged, THIS);
            this.keys.right.onUp.add(THIS._MoveStateChanged, THIS);
            this.keys.up.onDown.add(function() {THIS._CastJump();});
            this.keys.use.onDown.add(function() {THIS._CastUse();});
            this.keys.attack_left.onDown.add(function() {THIS._CastAttack(-1);});
            this.keys.attack_right.onDown.add(function() {THIS._CastAttack(1);});
        } else {
            this.keys.left.onDown.removeAll();
            this.keys.left.onUp.removeAll();
            this.keys.right.onDown.removeAll();
            this.keys.right.onUp.removeAll();
            this.keys.up.onDown.removeAll();
            this.keys.use.onDown.removeAll();
            this.keys.attack_left.onDown.removeAll();
            this.keys.attack_right.onDown.removeAll();
        }
    }
    
    _MoveStateChanged() {
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
        this._RemoveKeys();
    }
}