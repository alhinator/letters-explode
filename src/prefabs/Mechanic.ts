import {ParagraphManager} from './ParagraphManager';
import { Letter, UIManager } from "./UIManager";
import { UserInput } from './UserInput';


/**
@class Mechanics for managing game state, timers, and marked letters
 **/

export class Mechanics {
    paraManager:ParagraphManager
    UIManager:UIManager
    InputManager:UserInput

    constructor(_pm:ParagraphManager, _ui:UIManager, _in:UserInput){
        this.paraManager = _pm;
        this.UIManager = _ui;
        this.InputManager = _in;
    }

    
    public setLockedLetter(key: Letter, status: boolean){
        //If true, disable the letter for user input
        if(status){
            this.InputManager.setLockedLetter(key)
        } else {
            this.InputManager.unlockLetter(key)
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
    public submitWord(_word:string){
        for(let item of this.paraManager.paragraph){
                if (_word == item.word)
                    item.isCompleted = true;
        }
    }
    public updateScore(score: number, points: number){
        score += points;
    }

    public tick(){ //does game loop 

    }
    private markForExplosion(key:Letter){
        
    }

}
