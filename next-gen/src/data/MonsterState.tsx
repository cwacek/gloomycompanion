import { IMonster } from "./cards";

type StatusEffects = 'wound' | 'poison' | 'immobilize' | 'strengthen' | 'stun' | 'disarm'
const TemporaryEffects : StatusEffects[] = ['immobilize', 'strengthen', 'stun', 'disarm']

export interface MonsterStateJSON {
    id : number;
    name : string;
    health : number;
    effects : string[];
}

export default class MonsterState {
    readonly id: number
    readonly name: string
    //private activeEffects : {[key in StatusEffects] : boolean} 
    private activeEffects : Map<StatusEffects, boolean>
    private health: number

    constructor(id : number, name : string, state? :MonsterStateJSON) {
        this.id = id;
        this.name = name;
        this.activeEffects = new Map([
            ['wound' as StatusEffects, false],
            ['immobilize' as StatusEffects, false],
            ['stun' as StatusEffects, false],
            ['disarm' as StatusEffects, false],
            ['poison' as StatusEffects, false],
            ['strengthn' as StatusEffects, false],
        ]);

        this.health = 10;

        if (state) {
            state.effects.forEach((s) => {
                let status = s as StatusEffects
                this.activeEffects.set(status, true);
            })

            this.health = state.health;
        }
    }

    static fromJSON(json: MonsterStateJSON): MonsterState {
        return new MonsterState(json.id, json.name, json );
    }

    toJSON() : MonsterStateJSON {
        let effects : string[] = []
        this.activeEffects.forEach((active, status) => {
            if (active) {
                effects.push(status)
            }
        })

        return {
            name : this.name,
            health : this.health,
            id: this.id,
            effects: effects,
        }
    }

    applyEffect(effect : StatusEffects) {
        this.activeEffects.set(effect, true);
    } 

    /** 
     * Perform all actions associated with the beginning of a monster turn, including applying status
     * effects, etc.
     */
    initializeTurn() {
        if (this.activeEffects.get('wound')) {
            this.health--;
        }

        //Clear all temporary effects
        TemporaryEffects.forEach((effect : StatusEffects) => {
            this.activeEffects.set(effect, false);
        })
    }
}