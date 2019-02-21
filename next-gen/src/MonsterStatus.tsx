import React from "react";
import MonsterState, { StatusEffectsType, AllStatusEffects, MonsterStateCtx } from "./data/MonsterState";

import skull from './images/icon.png'
import { PersistableStateContext } from "./util";

import styles from './styles/MonsterStatus.module.scss';
import { Popover, PopoverHeader, PopoverBody, ButtonGroup } from "reactstrap";
import autobind from "autobind-decorator";
import Button from "reactstrap/lib/Button";
import {FaRegCheckSquare, FaSquare} from 'react-icons/fa';


interface IProps {
    monster : MonsterState
    onDeath : (id : number) => void
}

interface IState {
    popoverOpen : boolean;
    modDmg : number;
    modEffects : StatusEffectsType[];
}

export default class MonsterStatus extends React.Component<IProps, IState> {
    static contextType = MonsterStateCtx;
    state = {
        popoverOpen : false,
        modDmg: 0,
        modEffects: []
    }

    render() {
        let activeEffects : JSX.Element[] = this.context.effects.map( (effect : StatusEffectsType) => {
            return <span key={effect} className={styles.effect}>{effect}</span>
        })

        let effectController : JSX.Element[] = AllStatusEffects.map(effect => {
            return <div key={effect} onClick={()=> {this.toggleModEffect(effect)}}>
                {this.state.modEffects.find( tgt => tgt === effect) != null ?
                <FaRegCheckSquare/> : <FaSquare/>
                }
                <span className={styles.label}>{effect}</span>
            </div>
        })

        let health = this.context.health/this.props.monster.baseAttributes.health * 100;

        return <div onClick={this.togglePopover} id='monsterDetails'>
            <div className={[styles.statusContainer, styles[this.props.monster.type]].join(" ")}>
                <div className={styles.statusDetailsContainer}>
                    <div className={styles.statusIconContainer}>
                        <span>{this.props.monster.id} </span>
                    </div>

                    <div className={styles.statusEffectsContainer}>
                        <div className={styles.health}>
                            <div className={styles.label}>
                                {this.context.health}
                            </div>
                            <div className={styles.healthBar}
                                style={{ width: `${health}%` }}></div>
                        </div>
                        <div>
                        {activeEffects}
                        </div>
                    </div>
                </div>
                <div className={styles.name}>
                    {this.props.monster.name}
                </div>
            </div>
            <Popover placement="right" 
                isOpen={this.state.popoverOpen}
                target='monsterDetails'
                >
                <PopoverBody className={styles.monsterActionPane}>
                    <div className={styles.damage}>
                        <div className={styles.damageChange}>{this.state.modDmg}</div>
                        <ButtonGroup>
                            <Button color="secondary" onClick={this.decrementDmg}>-</Button>
                            <Button color="danger" onClick={this.incrementDmg}>+</Button>
                        </ButtonGroup>
                    </div>
                    <div className={styles.effects}>
                        {effectController}
                    </div>
                    <Button color="info" onClick={this.applyMods}>Apply</Button>
                </PopoverBody>
            </Popover>
        </div>
    }

    @autobind
    incrementDmg() : void { this.setState(p => {return {modDmg:p.modDmg+1}})}

    @autobind
    decrementDmg() : void { this.setState(p => {return {modDmg:p.modDmg-1}})}

    @autobind
    togglePopover() : void {
        this.setState(prevState => {
            if (prevState.popoverOpen) {
                return {
                    modDmg: 0,
                    modEffects: [],
                    popoverOpen: !prevState.popoverOpen
                }
            } else {
                return {
                    modDmg: 0,
                    modEffects: this.context.effects,
                    popoverOpen: !prevState.popoverOpen
                }
            }
        });
    }

    @autobind
    applyMods() {
        this.setState(pState => {
            this.context.applyDamage(this.state.modDmg);
            this.context.applyEffects(this.state.modEffects);

            return {
                modDmg: 0,
                modEffects: [],
                popoverOpen: false
            }
        })
    }

    @autobind
    toggleModEffect(effect: string) {
        this.setState(pState => {
            let existing = pState.modEffects.find(e => e === effect)
            if (existing) {
                return {
                    modEffects: pState.modEffects.filter(e => e !== effect)
                }
            } else {
                pState.modEffects.push(effect as StatusEffectsType)
                return {
                    modEffects: pState.modEffects
                }
            }
        })
    }
}