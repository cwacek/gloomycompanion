import React from "react";
import MonsterState, { StatusEffectsType, AllStatusEffects, MonsterStateCtx } from "./context/MonsterState";

import attack from './images/attack.svg';
import move from './images/move.svg';
import range from './images/range.svg';

import styles from './styles/MonsterStatus.module.scss';
import { Popover, PopoverHeader, PopoverBody, ButtonGroup } from "reactstrap";
import autobind from "autobind-decorator";
import Button from "reactstrap/lib/Button";
import {FaRegCheckSquare, FaSquare} from 'react-icons/fa';


interface IProps {
    monster : MonsterState
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

        return <div onClick={this.togglePopover} id={`monsterDetails-${this.props.monster.name.replace(' ', '_')}-${this.props.monster.id}`}>
            <div className={[styles.statusContainer, styles[this.props.monster.type]].join(" ")}>
                {this.context.health > 0 ? null : <div className={styles.dying}/> }
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
                <div className={styles.statsContainer}>
                    <div className={styles.name}>
                        {this.props.monster.name}
                    </div>
                    <div className={styles.stats}>
                        <span className={styles.move}>
                            {this.props.monster.baseAttributes.move}
                        </span>
                        <span className={styles.attack}>
                            {this.props.monster.baseAttributes.attack}
                        </span>
                        <span className={styles.range}>
                            {this.props.monster.baseAttributes.range}
                        </span>
                    </div>
                </div>
            </div>
            <Popover placement="right" 
                isOpen={this.state.popoverOpen}
                target={`monsterDetails-${this.props.monster.name.replace(' ', '_')}-${this.props.monster.id}`}
                >
                <PopoverBody className={styles.monsterActionPane}>
                    <div className={styles.damage}>
                        <div className={styles.damageChange}>{this.state.modDmg}</div>
                        <ButtonGroup style={{width: "100%"}}>
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
        if (this.context.health <= 0) { return }
        this.setState(prevState => {
            if (prevState.popoverOpen) {
                return {
                    modDmg: 0,
                    modEffects: [],
                    popoverOpen: !prevState.popoverOpen
                }
            } else {
                let currentEffects : StatusEffectsType[] = this.context.effects
                return {
                    modDmg: 0,
                    modEffects: currentEffects.slice(),
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