import { getMonsterAttrs, MonsterTypes, MonsterAttrs } from "./monster_stats";
import React, { Component } from "react";
import autobind from "autobind-decorator";
import { AppContextConsumer, AppContext } from "../context/AppContext";
import { PersistableStateContext } from "../util";
import { LocalState } from "./cards";

export type StatusEffectsType = 'wound' | 'poison' | 'immobilize' | 'strengthen' | 'stun' | 'disarm'
export const AllStatusEffects : StatusEffectsType[] =  ['wound' , 'poison' , 'immobilize' , 'strengthen' , 'stun' , 'disarm']
const TemporaryEffects : StatusEffectsType[] = ['immobilize', 'strengthen', 'stun', 'disarm']

export interface MonsterStateJSON {
    id : number;
    name : string;
    level : number;
    type : MonsterTypes;
    health : number;
    effects : string[];
}

interface IState {
    health : number;
    effects : string[];
    attrs? : MonsterAttrs;
    applyEffects : (effect : StatusEffectsType[]) => void;
    applyDamage : (dmg : number) => void;
}

interface IProps{
    id : number;
    name :string;
    level : number;
    type :MonsterTypes;
    onDeath : (id : number) => void
}

export const MonsterStateCtx = React.createContext<IState| null>(null);
export class MonsterStateProvider extends React.Component<IProps, IState> {
    static contextType = AppContext

    static getDerivedStateFromProps(nProps :IProps, pState :IState) {
        if (!pState.attrs)  {
            let attrs = getMonsterAttrs(nProps.name, nProps.level, nProps.type)

            return {
                attrs: getMonsterAttrs(nProps.name, nProps.level, nProps.type),
                health: attrs.health,
            }
        }
        return null;
    }

    state = {
        health: 0,
        effects: [],
        applyEffects: this.applyEffects,
        applyDamage: this.applyDamage
    }

    @autobind
    applyDamage(dmg: number) {
        this.setState(pState => {
            let nextHealth = Math.max(0, Math.min(pState.health - dmg, pState.attrs!.health))

            if (nextHealth == 0) {
                this.context.store.Clear(`monsters:${this.props.name}:${this.props.type}:${this.props.id}`);
                setTimeout(()=> {
                    this.props.onDeath(this.props.id);
                }, 5000)
            }
            return {
                health: nextHealth
            }
        }, this.persist)

    }

    @autobind
    applyEffects(active : StatusEffectsType[]) {
        this.setState({
            effects: active.sort()
        }, this.persist)
    }

    @autobind
    toggleEffect(effect : StatusEffectsType) {
        this.setState((pState : IState) => {
            if (pState.effects.includes(effect)) {
                return {
                    effects: pState.effects.filter(e => e !== effect)
                }
            } else {
                pState.effects.push(effect)
                return {
                    effects: pState.effects
                }
            }
        })
    }

    render() {
        return <MonsterStateCtx.Provider value={this.state}>
        {this.props.children}
        </MonsterStateCtx.Provider>
    }

    @autobind
    persist() {
        let store : LocalState = this.context.store
        store.Put(`monsters:${this.props.name}:${this.props.type}:${this.props.id}`, this);
    }

    componentDidMount() {
        let store: LocalState = this.context.store
        let saved = store.Get<MonsterStateJSON>(`monsters:${this.props.name}:${this.props.type}:${this.props.id}`)
        if (saved != null) { this.loadFromJSON(saved)};
    };

    loadFromJSON(json: MonsterStateJSON) {
        this.setState({
            health: json.health,
            effects: json.effects
        })
    }

    toJSON() : MonsterStateJSON {
        return {
            id: this.props.id,
            name : this.props.name,
            level : this.props.level,
            type : this.props.type,
            health : this.state.health,
            effects: this.state.effects,
        }
    }

}

export default class MonsterState{
    readonly id: number
    readonly name: string
    readonly level :number
    readonly type : MonsterTypes
    private activeEffects : Map<StatusEffectsType, boolean>
    health: number
    readonly baseAttributes : MonsterAttrs;

    constructor(id : number, name : string, level : number, type : MonsterTypes, state? :MonsterStateJSON) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.type = type;
        this.activeEffects = new Map([
            ['wound' as StatusEffectsType, false],
            ['immobilize' as StatusEffectsType, false],
            ['stun' as StatusEffectsType, false],
            ['disarm' as StatusEffectsType, false],
            ['poison' as StatusEffectsType, false],
            ['strengthen' as StatusEffectsType, false],
        ]);

        this.baseAttributes = getMonsterAttrs(name, level, type);
        this.health = this.baseAttributes.health;

        if (state) {
            state.effects.forEach((s) => {
                let status = s as StatusEffectsType
                this.activeEffects.set(status, true);
            })

            this.health = state.health;
        }
    }

    get effects() : StatusEffectsType[] {
        let result : StatusEffectsType[] = []
        for (let [key, value] of this.activeEffects.entries()) {
            if (value) {
                result.push(key as StatusEffectsType);
            }
        }

        return result;
    }

    hasEffect(effect : StatusEffectsType) : boolean{
        let hasIt = this.activeEffects.get(effect);
        return hasIt == null ? false : hasIt;
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

    applyEffects(active : StatusEffectsType[]) {
        AllStatusEffects.forEach(effect => {
            if (active.includes(effect)) {
                this.activeEffects.set(effect, true);
            } else {
                this.activeEffects.set(effect, false);
            }
        })
    }

    applyEffect(effect : StatusEffectsType) {
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
        TemporaryEffects.forEach((effect : StatusEffectsType) => {
            this.activeEffects.set(effect, false);
        })
    }
}