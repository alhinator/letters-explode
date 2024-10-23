
/**
 * @class GameplayScene the scene in which the game actually takes place
 */

import { UIManager } from "../prefabs/UIManager";

export class GameplayScene extends Phaser.Scene {
    interfaceManager:UIManager
    constructor(name: string) {
        super({ key: name });
        this.interfaceManager = new UIManager(this.scene.scene);
    }
    init(){
        
    }
    preload(){

    }
    create(){

    }
    update(_time: number, _delta: number): void {
        
    }
}
