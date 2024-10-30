
/**
 * @class GameplayScene the scene in which the game actually takes place
 */

import { UIManager } from "../prefabs/UIManager";
import { Mechanics } from "../prefabs/Mechanic";
import { ParagraphManager } from "../prefabs/ParagraphManager";

export default class GameplayScene extends Phaser.Scene {
    UI: UIManager
    Mech: Mechanics
    eventTracker: EventTarget;
    ParaManager: ParagraphManager;
    constructor() {
        super({ key: "game" });


        this.eventTracker = new EventTarget();
        const newWord = document.getElementById("userInput") as HTMLInputElement;
        this.ParaManager = new ParagraphManager("MEDIUM");
        this.UI = new UIManager(this, this.eventTracker, this.ParaManager);
        this.Mech = new Mechanics(newWord);
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
    create(_data: any) {
        this.UI.createElements();
        this.Mech.resetUserInput();
        this.Mech.setLockedLetter("h", true)
        
    }
    update(_time: number, _delta: number): void {
        this.UI.tick(_delta / 1000);
    }
}
