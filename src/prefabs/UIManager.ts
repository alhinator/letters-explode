/**
@class UIManager a class for managing the UI elements of the game during the gameplay scene.
 **/
export class UIManager {
    scene: Phaser.Scene
    constructor(_scene: Phaser.Scene) {
        this.scene = _scene;
    }
}