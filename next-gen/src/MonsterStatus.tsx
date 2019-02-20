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
    currentHealth : number;
}

export default class MonsterStatus extends React.Component<IProps, IState> {
    static contextType = PersistableStateContext
    state = {
        currentHealth: this.props.monster.currentHealth
    }

    render() {
        let activeEffects : JSX.Element[] = this.props.monster.effects.map( effect => {
            return <div className={styles['effect-'+effect]}>{effect}</div>
        })

        let health = this.state.currentHealth/this.props.monster.baseAttributes.health * 100;

        return <div className={[styles.statusContainer, styles[this.props.monster.type]].join(" ")}>
            <div className={styles.statusDetailsContainer}>
                <div className={styles.statusIconContainer}>
                <span>{this.props.monster.id} </span>
                </div>
            
                <div className={styles.statusEffectsContainer}>
                    <div className={styles.health}>
                        <div className={styles.label}>
                            {this.props.monster.currentHealth}
                        </div>
                        <div className={styles.healthBar}
                            style={{width: `${health}%`}}></div>
                    </div>
                    <div className={styles.effects}>{activeEffects}</div>
                </div>
            </div>
            <div className={styles.name}>
                {this.props.monster.name}
            </div>
        </div>
    }


  static getDerivedStateFromProps(nextProps : IProps, prevState : IState) {
    if (nextProps.monster.currentHealth !== prevState.currentHealth) {
      return {
          currentHealth: nextProps.monster.currentHealth
      }
    }
    return null
  }
}