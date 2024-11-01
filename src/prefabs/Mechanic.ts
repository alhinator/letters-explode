//import { MarkedLetter } from './MarkedLetter';
import { ParagraphManager } from './ParagraphManager';
import { Letter, UIManager } from "./UIManager";
import { UserInput } from './UserInput';


/**
@class Mechanics for managing game state, timers, and marked letters
 **/
const markInterval: number = 15;
const maxGameTime: number = 100;
const alphabet: Letter[] = ["a", "b", "c", "d", "e", "f", "g", "h", "i",
    "j", "k", "l", "m", "n", "o", "p", "q", "r", "s",
    "t", "u", "v", "w", "x", "y", "z"];

export interface mark {
    pos: 0 | 1 | 2,
    letter: Letter
    countdown: number;
    cooldown: number;
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
                    this.lockedList.splice(i);
                }
            }
        }
    }
    public submitWord(_word: string) {
        //console.log("in Mechanic subword");
        _word = _word.replace(/[^a-zA-Z]/g, '');
        const currentWord = this.paragraphWord(this.paraManager)
            if (_word.toLowerCase() === currentWord?.word.toLowerCase()) {
                currentWord.isCompleted = true;
                this.UIManager.refreshParagraph();
                return;
            }
    }
    private paragraphWord(textParagraph: ParagraphManager){
        for (let item of textParagraph.paragraph) {
            if (!item.isCompleted) {
                return item;
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
        for (let m of this.marks){
            //Disable letter key if countdown goes to 0
            if (m.countdown <= 0 && m.cooldown == 0){
                this.setLockedLetter(m.letter, true);
                m.cooldown = 15; //Start cooldown
            }
            if (m.cooldown  > 0){
                //If cooldown goes to 0, clear marks list to create new marked letters
                m.cooldown -= _delta;
                if (m.cooldown <= 0){
                    this.setLockedLetter(m.letter, false);
                    this.marks = [];
                }
            }
            m.countdown -= _delta;
        }
        console.log(this.gameTimer);
    }
    private markForExplosion(key: Letter) {
        if(!this.marks.some(mark => mark.letter == key) && this.paraManager.findLetterCount(key) != 0){
            if(this.marks.length < 3){
                let countdown = this.paraManager.findLetterCount(key);
                if (countdown < Math.min(3, 15)){
                    countdown = Math.min(3, 15);
                }
                else if (countdown > Math.max(3, 15)){
                    countdown = Math.max(3, 15);
                }
                const position = this.marks.length as 0 | 1 | 2;
                const new_mark: mark ={pos: position, letter: key, countdown, cooldown: 0}
                this.marks.push(new_mark);
                this.UIManager.markALetter(position, key, countdown);
            }
        }
    }
}
