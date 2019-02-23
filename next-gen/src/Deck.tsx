import React, { Component, useContext } from 'react';
import {ICard, IMonster} from './data/cards';
import styles from './styles/Card.module.css';
import CardDetails from './CardDetails';

import {IconContext} from 'react-icons';
import {TiDeleteOutline} from 'react-icons/ti'
import { DeckStateCtx } from './context/MonsterDeck';

interface IProps {
  monster : IMonster
}

const hiddenCardClasses = [styles.card, styles.ability, styles.back, styles.draw ].join(' ')
const shownCardClasses = [styles.card, styles.ability, styles.front, styles.discard, styles.pull].join(' ')

const Deck = (props : IProps) => {
  const context = useContext(DeckStateCtx);
    return (
      <div className={styles['card-container']}>
        <IconContext.Provider value={{ color: "white", className: styles.icon }}>
          <div className={styles.removeDeck} onClick={context!.deactivate}>
            <TiDeleteOutline />
          </div>
        </IconContext.Provider>
        <div onClick={context!.drawCard}>
          <div className={hiddenCardClasses} />
          <div className={context!.shownCard ? shownCardClasses : hiddenCardClasses}>
            <span className={styles.name}>
              {props.monster.name}
            </span>
            <CardDetails card={context!.shownCard} />

              </div>

            </div>
      </div>
    );
}

export default Deck;
