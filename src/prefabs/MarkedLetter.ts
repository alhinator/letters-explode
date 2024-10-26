import BBCodeText from "phaser3-rex-plugins/plugins/bbcodetext";
import { Letter } from "./UIManager";

export const MARKED_STYLE = {
    fontFamily: 'Avenir',
    fontSize: '36px',
    fontWeight: 150,
    fontStyle: "normal",
    color: "#FFFFFF",
    stroke: "#FFFFFF",
    strokeThickness: 0,
    justify: "center"
}

export class MarkedLetter {
    letter: Letter
    timeRemaining: number
    maxTime: number
    markedText: BBCodeText;
    timerBar: Phaser.GameObjects.Rectangle
    defused:boolean
    constructor(_scene: Phaser.Scene, _letter: Letter, _maxTime: number, xpos: number, ypos: number) {

        this.letter = _letter;
        this.markedText = _scene.add.rexBBCodeText(xpos, ypos, "", MARKED_STYLE);
        this.markedText.text = "[color=white]" + this.letter + "[/color]";

        this.maxTime = _maxTime;
        this.timeRemaining = _maxTime;
        this.timerBar = _scene.add.rectangle(xpos + 50, ypos + 50, 100, 20, 0xffffff, 1);
        this.defused = false;
    }

    public resetEverything(_letter: Letter,) {
        this.letter = _letter
        this.timeRemaining = this.maxTime;
        this.markedText.text = "[color=white]" + this.letter + "[/color]";
        this.timerBar.width = 100;
        this.defused = false;
    }

    public tick(_delta: number) {
        if(this.defused){return};
        this.timeRemaining -= _delta;
        this.timerBar.width = 100 * (this.timeRemaining / this.maxTime);
        this.timerBar.width < 0 ? this.timerBar.width = 0 : true;
        if (this.timeRemaining < this.maxTime / 2) {
            this.markedText.text = "[color=red]" + this.letter + "[/color]";
        }
    }

    public defuse(){
        this.defused = true;
    }
}