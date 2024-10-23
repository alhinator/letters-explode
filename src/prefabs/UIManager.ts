export const CURR_WORD_STYLE = {
    fontFamily: 'Avenir',
    fontSize: '36px',
    fontWeight: 150,
    fontStyle: "normal",
    color: "#FFFFFF",
    stroke: "#FFFFFF",
    strokeThickness: 0,
    align: 'center'
}
export const PARA_STYLE = {
    fontFamily: 'Avenir',
    fontSize: '14px',
    fontWeight: 150,
    fontStyle: "normal",
    color: "#FFFFFF",
    stroke: "#FFFFFF",
    strokeThickness: 0,
    align: 'left'
}


/**
@class UIManager a class for managing the UI elements of the game during the gameplay scene.
 **/
export class UIManager {
    scene: Phaser.Scene
    sceneWidth: number
    sceneHeight: number
    //private paragraphText;
    private currentWordText: Phaser.GameObjects.Text | null = null;
    private paragraphText: Phaser.GameObjects.Text | null = null;
    constructor(_scene: Phaser.Scene) {
        console.log("in UIManager constructor")
        this.scene = _scene;
        this.sceneWidth = 0
        this.sceneHeight = 0

    }
    /**
     * @createElements creates the UI elements in the scene and allows them to be accessed via acessor functions.
     */
    public createElements() {
        this.sceneWidth = this.scene.sys.game.canvas.width
        this.sceneHeight = this.scene.sys.game.canvas.height

        this.currentWordText = this.scene.add.text(this.sceneWidth / 2 - 100, this.sceneHeight / 2 - 50, "Start Typing!", CURR_WORD_STYLE)

        this.paragraphText = this.scene.add.text(50, this.sceneHeight/2 + 50, "lorem ipsum dolor set amet", PARA_STYLE)
        this.paragraphText.width = this.sceneWidth - 100;
        this.paragraphText.height = this.sceneHeight/2 - 100;

    }
}