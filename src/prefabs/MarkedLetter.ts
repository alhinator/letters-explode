import { CURR_WORD_STYLE, Letter } from "./UIManager";

export class MarkedLetter {
    letter: Letter
    timeRemaining: number
    maxTime: number
    markedText: Phaser.GameObjects.Text;
    timerBar: Phaser.GameObjects.Rectangle
    constructor(_scene: Phaser.Scene, _letter: Letter, _maxTime: number, xpos: number, ypos: number) {

        this.letter = _letter;
        this.markedText = _scene.add.text(xpos, ypos, this.letter, CURR_WORD_STYLE);
        this.maxTime = _maxTime;
        this.timeRemaining = _maxTime;
        this.timerBar = _scene.add.rectangle(xpos + 50, ypos + 50, 100, 20, 0xffffff, 1);

    }
}