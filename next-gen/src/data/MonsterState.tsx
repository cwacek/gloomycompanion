import { getMonsterAttrs, MonsterTypes, MonsterAttrs } from "./monster_stats";

type StatusEffects = 'wound' | 'poison' | 'immobilize' | 'strengthen' | 'stun' | 'disarm'
const TemporaryEffects : StatusEffects[] = ['immobilize', 'strengthen', 'stun', 'disarm']

export interface MonsterStateJSON {
    id : number;
    name : string;
    level : number;
    type : MonsterTypes;
    health : number;
    effects : string[];
}

export default class MonsterState {
    readonly id: number
    readonly name: string
    readonly level :number
    readonly type : MonsterTypes
    private activeEffects : Map<StatusEffects, boolean>
    private health: number
    readonly baseAttributes : MonsterAttrs;

    constructor(id : number, name : string, level : number, type : MonsterTypes, state? :MonsterStateJSON) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.type = type;
        this.activeEffects = new Map([
            ['wound' as StatusEffects, false],
            ['immobilize' as StatusEffects, false],
            ['stun' as StatusEffects, false],
            ['disarm' as StatusEffects, false],
            ['poison' as StatusEffects, false],
            ['strengthen' as StatusEffects, false],
        ]);

        this.baseAttributes = getMonsterAttrs(name, level, type);
        this.health = this.baseAttributes.health;

        if (state) {
            state.effects.forEach((s) => {
                let status = s as StatusEffects
                this.activeEffects.set(status, true);
            })

            this.health = state.health;
        }
    }

    get currentHealth() : number {
        return this.health
    }

    get effects() : StatusEffects[] {
        let result : StatusEffects[] = []
        for (let entry in this.activeEffects.entries()) {
            if (entry[1]) {
                result.push(entry[0] as StatusEffects);
            }
        }

        return result;
    }

    static fromJSON(json: MonsterStateJSON): MonsterState {
        return new MonsterState(json.id, json.name, json.level, json.type, json );
    }

    toJSON() : MonsterStateJSON {
        let effects : string[] = []
        this.activeEffects.forEach((active, status) => {
            if (active) {
                effects.push(status)
            }
        })

        return {
            id: this.id,
            name : this.name,
            level : this.level,
            type : this.type,
            health : this.health,
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