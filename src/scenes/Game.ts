
/**
 * @class GameplayScene the scene in which the game actually takes place
 */

import { UIManager } from "../prefabs/UIManager";

 export default class GameplayScene extends Phaser.Scene {
    UI: UIManager
    constructor() {
        super({ key: "game" });

        this.UI = new UIManager(this);
    }
    /**
     * @init use this function to initialize any important things before preload() and create().
     */
    init() {

    }
    /**
     * @preload use this function to load assets into the scene.
     */
    preload() {

    }
    /**
     * @create use this function to create gameObjects inside the scene.
     */
    create(_data:any) {
        this.UI.createElements();
    }
    update(_time: number, _delta: number): void {

    }
}
