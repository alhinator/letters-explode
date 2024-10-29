import {ParagraphManager} from './ParagraphManager';
import {WordCheck} from './ParagraphManager';
import { MarkedLetter } from './MarkedLetter';
import {UIManager} from './UIManager';
import { Letter } from "./UIManager";

/**
@class Mechanics for handling user input interacting with marked letters and UI
 **/
export class Mechanics {
    private userInput: string;
    constructor(keyboard: HTMLInputElement){
        this.userInput = keyboard;
    }

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
    public wordChecker(textParagraph : Paragraph){
        textParagraph.words.forEach((element) => {
            if (this.userInput == element.word)
                element.isCompleted = true;
        });
    }

}
