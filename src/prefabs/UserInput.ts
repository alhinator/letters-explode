import { Mechanics } from './Mechanic';
import { Letter } from './UIManager';


export class UserInput {

    private userInput: HTMLInputElement;
    private MechManager:Mechanics | undefined;

    constructor(keyboard: HTMLInputElement) {
        this.userInput = keyboard;
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
        this.MechManager?.submitWord(this.userInput.value);
        this.userInput.value = '';

    }
    public setLockedLetter(list: Letter[]){
        this.userInput.addEventListener("keydown", (event) => {
            if (list.includes(event.key as Letter)) {
                    event.preventDefault();
            }
        });
    }


   

}