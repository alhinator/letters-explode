import { ParagraphManager } from './ParagraphManager';
import { Letter, UIManager } from "./UIManager";
import { UserInput } from './UserInput';


/**
@class Mechanics for managing game state, timers, and marked letters
 **/
const markInterval: number = 15;
const maxGameTime: number = 100;
const alphabet: ["a", "b", "c", "d", "e", "f", "g", "h", "i",
    "j", "k", "l", "m", "n", "o", "p", "q", "r", "s",
    "t", "u", "v", "w", "x", "y", "z"];

export interface mark {
    pos: 0 | 1 | 2,
    letter: Letter
    timeRemaining: number;
}

export class Mechanics {
    paraManager: ParagraphManager
    UIManager: UIManager
    InputManager: UserInput
    lastMark: number = 0;
    marks: mark[]
    gameTimer:number;
    lockedList: Letter[];

    constructor(_pm: ParagraphManager, _ui: UIManager, _in: UserInput) {
        this.paraManager = _pm;
        this.UIManager = _ui;
        this.InputManager = _in;
        this.marks = []
        this.gameTimer = maxGameTime;
        this.lockedList = [];
    }


    public setLockedLetter(key: Letter, status: boolean) {
        //If true, disable the letter for user input
        if (status) {
            this.lockedList.push(key);
            this.InputManager.setLockedLetter(this.lockedList);
        } else {
            for (let i = 0; i < this.lockedList.length; i++){
                if (this.lockedList[i] == key){
                    delete this.lockedList[i];
                }
            }
        }
    }
    public incTimer(_time: number) {
        this.gameTimer -= _time;
    }
    public submitWord(_word: string) {
        //console.log("in Mechanic subword");
        _word = _word.replace(/[^a-zA-Z]/g, '');
        //console.log(_word)
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
            const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
            this.markForExplosion(randomLetter);
        }
        this.incTimer(_delta);
    }
    private markForExplosion(key: Letter) {

    }

}
