import {ParagraphManager} from './ParagraphManager';
import { Mechanics } from './Mechanic';
import { UIManager } from './UIManager';


export class UserInput{

    private manager: ParagraphManager;

    constructor(textParagrpah: ParagraphManager){
        this.manager = textParagrpah;
    }

    private takeWord(){
        //prompt user to enter word
        const newWord = document.getElementById("userInput") as HTMLInputElement;
        return newWord;
    }

    private checkWordValid(check_word: string){
        //check if word is in paragraph/check if word is available (not exploded)
        //depending on yes or no, play a small sound
        for(let word in this.manager.paragraph){
            if (word == check_word && word
        }
    }

}