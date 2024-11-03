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
    sound: HTMLAudioElement;
    sound1: HTMLAudioElement;

    constructor(_pm: ParagraphManager, _ui: UIManager, _in: UserInput) {
        this.paraManager = _pm;
        this.UIManager = _ui;
        this.InputManager = _in;
        this.marks = []
        this.gameTimer = maxGameTime;
        this.lockedList = [];
        this.sound = document.getElementById('boom') as HTMLAudioElement;
        this.sound1 = document.getElementById('submit') as HTMLAudioElement;
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
        for (let item of this.paraManager.paragraph){
            if (_word.toLowerCase() === item.word.toLowerCase() && !item.isCompleted) {
                item.isCompleted = true;
                this.sound1.play();
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
        const newLetter = this.randomLetter();
        if (time > this.lastMark) {
            if(this.marks.length < 3){
                this.lastMark += markInterval;
                const newMark = this.markForExplosion(newLetter, this.marks.length as 0 | 1 | 2);
                this.marks.push(newMark);
            }
        }
        this.marks.forEach((m) => {
            //Disable letter key if countdown goes to 0
            if (m.countdown <= 0 && m.cooldown == 0){
                this.setLockedLetter(m.letter, true);
                this.sound.play();
                m.cooldown = Math.floor(Math.random() * 15 + 1); //Start random cooldown
                //console.log(m.cooldown);
            }
            if (m.cooldown  > 0){
                //If cooldown goes to 0, replace the marked letter in the list
                m.cooldown -= _delta;
                if (m.cooldown <= 0){
                    this.setLockedLetter(m.letter, false);
                    const replaceMark = this.markForExplosion(newLetter, m.pos);
                    this.marks.splice(m.pos, 1, replaceMark);
                    //const marks = this.marks.map(item => item.letter);
                    //console.log(marks);
                }
            }
            m.countdown -= _delta;
        });
    }
    private randomLetter (): Letter{
        //Checks if a random letter appears in the paragraph
        let _letter = alphabet[Math.floor(Math.random() * alphabet.length)]
        do {
            _letter = alphabet[Math.floor(Math.random() * alphabet.length)];
        } while (this.paraManager.findLetterCount(_letter) == 0 || this.marks.some(mark => mark.letter == _letter))
        return _letter;
    }

    private markForExplosion(key: Letter, position: 0 | 1 | 2): mark {
        let countdown = this.paraManager.findLetterCount(key);
        if (countdown < Math.min(3, 15)){
            countdown = Math.min(3, 15);
        }
        else if (countdown > Math.max(3, 15)){
            countdown = Math.max(3, 15);
        }
        const new_mark: mark ={pos: position, letter: key, countdown, cooldown: 0}
        this.UIManager.markALetter(position, key, countdown);
        return new_mark;
    }
}
