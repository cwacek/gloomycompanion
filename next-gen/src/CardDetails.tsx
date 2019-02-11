
import React, { Component } from 'react';
import {ICard, IMonsterAction} from './data/cards';
import styles from './styles/Card.module.css';
import MonsterAction from './MonsterAction';

import shuffle from './images/shuffle.svg';

import autobind from 'autobind-decorator';

interface IProps {
    card : ICard | null
}

interface IState {
}



export default class CardDetails extends Component<IProps, IState>  {
    render() {
        if (!this.props.card) {
            return null;
        }
        let actions : JSX.Element[] = this.props.card.actions.map((action, index) => {
            let modifiers : JSX.Element[] | null = null
            if (action.modifiers) {
              modifiers = action.modifiers.map((mod, idx) => {
                return (
                  <li key={idx}>
                    <MonsterAction definition={mod} />
                  </li>
                );
              });
            }
            return (
              <li key={index}>
                <MonsterAction definition={action.action} />
                {modifiers ? <ul>{modifiers}</ul> : null}
              </li>
            );
        })

        return (
          <div className={styles.cardDetails}>
            <span className={styles.initiative}>
              {this.props.card.initiative}
            </span>
            {this.props.card.shuffle ? (
              <img className={styles.shuffle} src={shuffle} />
            ) : null}
            <ul>{actions}</ul>
          </div>
        );

    }
}