import { IMonster } from "./cards";

type StatusEffects = 'wound' | 'poison' | 'immobilize' | 'strengthen' | 'stun' | 'disarm'
const TemporaryEffects : StatusEffects[] = ['immobilize', 'strengthen', 'stun', 'disarm']


export default class MonsterState {
    readonly id: number
    readonly name: IMonster
    private activeEffects : {[key in StatusEffects] : boolean} 
    private health: number

    constructor(id : number, name :IMonster) {
        this.id = id;
        this.name = name;
        this.activeEffects = {
            wound: false,
            immobilize: false,
            strengthen: false,
            stun: false,
            disarm: false,
            poison: false,
        };

        this.health = 10;
    }

    applyEffect(effect : StatusEffects) {
        this.activeEffects[effect] = true;
    } 

    /** 
     * Perform all actions associated with the beginning of a monster turn, including applying status
     * effects, etc.
     */
    initializeTurn() {
        if (this.activeEffects.wound) {
            this.health--;
        }

        //Clear all temporary effects
        TemporaryEffects.forEach((effect : StatusEffects) => {
            this.activeEffects[effect] = false;
        })
    }
}