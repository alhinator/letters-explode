import { ParagraphManager } from './ParagraphManager';
import { Letter, UIManager } from "./UIManager";
import { UserInput } from './UserInput';


/**
@class Mechanics for managing game state, timers, and marked letters
 **/
const markInterval: number = 15;

export class Mechanics {
    paraManager: ParagraphManager
    UIManager: UIManager
    InputManager: UserInput
    lastMark: number = 0;


    constructor(_pm: ParagraphManager, _ui: UIManager, _in: UserInput) {
        this.paraManager = _pm;
        this.UIManager = _ui;
        this.InputManager = _in;
    }


    public setLockedLetter(key: Letter, status: boolean) {
        //If true, disable the letter for user input
        if (status) {
            this.InputManager.setLockedLetter(key)
        } else {
            this.InputManager.unlockLetter(key)
        }
    }
    public setTimer(timeStart: number) {
        const timer = setInterval(countDown, 1000);
        function countDown() {
            timeStart -= 1;
            if (timeStart == 0) {
                clearInterval(timer);
            }
        }
    }
    public submitWord(_word: string) {
        console.log("in Mechanic subword");
        _word = _word.replace(/[^a-zA-Z]/g, '');
        console.log(_word)
        for (let item of this.paraManager.paragraph) {
            if (_word.toLowerCase() === item.word.toLowerCase() && !item.isCompleted) {
                item.isCompleted = true;
                this.UIManager.refreshParagraph();
                return;
            }
        }
    }
    public updateScore(score: number, points: number) {
        score += points;
    }

    public tick(time: number, _delta: number) { //does game loop 
        this.UIManager.tick(_delta);
        if (time > this.lastMark) {
            this.lastMark += markInterval;
            //this.markForExplosion(/*random letter*/)
        }


    }
    private markForExplosion(key: Letter) {

    }

}
