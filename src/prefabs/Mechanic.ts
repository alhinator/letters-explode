import {ParagraphManager} from './ParagraphManager';
import { Letter } from "./UIManager";

/**
@class Mechanics for handling user input interacting with marked letters and UI
 **/

export class Mechanics {
    public userInput: HTMLInputElement;
    public userWord: string

    constructor(keyboard: HTMLInputElement){
        this.userInput = keyboard;
        this.userWord = keyboard.value;
    }

    public resetUserInput(){
        this.userInput.addEventListener('keydown', event => {
            if (event.key === 'Enter') {
                console.log(this.userInput.value);
                this.userInput.value = '';
            }
    });}
    public setLockedLetter(key: Letter, status: boolean){
        //If true, disable the letter for user input
        if(status){
            this.userInput.addEventListener("keydown", (event) => {
                if (event.key === key) {
                        event.preventDefault();
                }
            });
        }
    }
    public setTimer( timeStart: number){
        const timer = setInterval( countDown, 1000);
        function countDown(){
            timeStart -= 1;
            if(timeStart == 0){
		        clearInterval(timer);
            }
        }
    }
    public wordChecker(textParagraph : ParagraphManager){
        for(let items of textParagraph.paragraph){
            items.words.forEach((element) => {
                if (this.userWord == element.word)
                    element.isCompleted = true;
            });
        }
    }
    public updateScore(event: Function, score: number, points: number){
        score += points
    }

}
