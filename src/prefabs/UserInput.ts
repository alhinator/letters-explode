import { Mechanics } from './Mechanic';
import { Letter } from './UIManager';


export class UserInput {

    private userInput: HTMLInputElement;
    private currentWord: string;
    private MechManager:Mechanics | undefined;

    constructor(keyboard: HTMLInputElement) {
        this.userInput = keyboard;
        this.currentWord = keyboard.value;
        this.userInput.addEventListener('keydown', event => {
            if (event.key === 'Enter') {
                //console.log(this.userInput.value);
                this.submitWord();
            }
        });
    }
    public setMechManager(_m:Mechanics){
        this.MechManager = _m
    }

    private submitWord(){
        this.MechManager?.submitWord(this.currentWord);
        this.userInput.value = '';

    }
    public setLockedLetter(key:Letter){
        this.userInput.addEventListener("keydown", (event) => {
            if (event.key === key) {
                    event.preventDefault();
            }
        });
    }
    public unlockLetter(key:Letter){
        //TODO
    }

   

}