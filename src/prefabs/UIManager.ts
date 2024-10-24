import { HexColorString } from 'discord.js-selfbot-v13';
import BBCodeText from 'phaser3-rex-plugins/plugins/bbcodetext.js';

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
}

interface colorWordPair {
    color: HexColorString,
    word: string
}

/**
@class UIManager a class for managing the UI elements of the game during the gameplay scene.
 **/
export class UIManager {
    scene: Phaser.Scene
    sceneWidth: number
    sceneHeight: number
    private currentWordText: Phaser.GameObjects.Text | undefined;
    private paragraphText: BBCodeText | undefined;
    private eventSystem: EventTarget;

    //private paragraphObject:ParagraphObject
    private pairs:colorWordPair[];

    constructor(_scene: Phaser.Scene, _el: EventTarget /* _p:ParagraphObject*/) {
        console.log("in UIManager constructor")
        this.scene = _scene;
        this.sceneWidth = 0
        this.sceneHeight = 0

        //TODO: implement mechanic manager -> subscribe to its "word-changed" listener
        this.eventSystem = _el;
        this.eventSystem.addEventListener("word-changed", this.updateCurrentWord);

        //TODO: implement colorwordpair: grab each word from paragraph and assign it an index and the default untyped color.
        /*this.paragraphObject = _p
        */
       //this.pairs = [this.paragraphObject.numWords];
        //TEMP CODE BELOW
        this.pairs = [];


    }
    /**
     * @createElements creates the UI elements in the scene and allows them to be accessed via acessor functions.
     */
    public createElements() {
        this.sceneWidth = this.scene.game.canvas.width
        this.sceneHeight = this.scene.game.canvas.height

        this.currentWordText = this.scene.add.text(this.sceneWidth / 2 - 100, this.sceneHeight / 2 - 50, "Start Typing!", CURR_WORD_STYLE)

        this.paragraphText = new BBCodeText(this.scene, 50, this.sceneHeight / 2 + 50, "", PARA_STYLE)
        this.initializeParagraphText();
        this.scene.add.existing(this.paragraphText);
        this.paragraphText.width = this.sceneWidth - 100;
        this.paragraphText.height = this.sceneHeight / 2 - 100;

    }
    private updateCurrentWord() {
        if (!this.currentWordText) { throw ("UIManager: updateCurrentWord: currentWordText has not been created yet."); return }
        //GET a word and SET
        let tmpWord = "" // + gameManager.getCurrentWord()
        this.currentWordText.text = tmpWord;
    }

    private initializeParagraphText(){
        if (!this.paragraphText){throw("UIManager: initializeParagraphText: paragraphText has not been created yet."); return}
        // this.paragraphObject.words.foreach((_daWord)=>{
        //     pairs.append(new colorWordPair(color:#FFFFFF, word:_daWord))
        // })
        let tmpString:string = "";
        this.pairs.forEach((pair)=>{
            tmpString +=("[color=" + pair.color + "]" + pair.word + " ")
        });
        this.paragraphText.text = tmpString;
    }

}