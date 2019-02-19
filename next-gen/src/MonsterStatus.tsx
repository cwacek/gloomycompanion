import React from "react";
import MonsterState from "./data/MonsterState";

import skull from './images/icon.png'
import { PersistableStateContext } from "./util";

import styles from './styles/MonsterStatus.module.scss';

interface IProps {
    monster : MonsterState
    onDeath : (id : number) => void
}

interface IState {
}

export default class MonsterStatus extends React.Component<IProps, IState> {
    static contextType = PersistableStateContext

    render() {
        let activeEffects : JSX.Element[] = this.props.monster.effects.map( effect => {
            return <div className={styles['effect-'+effect]}>{effect}</div>
        })

        return <div className={styles.statusContainer}>
            <div className={styles.statusDetailsContainer}>
                <div className={styles.statusIconContainer}>
                <span>{this.props.monster.id} </span>
                </div>
            
                <div className={styles.statusEffectsContainer}>
                    <div className={styles.health}>
                    {this.props.monster.currentHealth}
                    </div>
                    <div className={styles.effects}>{activeEffects}</div>
                </div>
            </div>
            <div className={styles.name}>
                {this.props.monster.name}
            </div>
        </div>
    }
}