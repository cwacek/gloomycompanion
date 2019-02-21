import React, { Component } from 'react';
import {ICard, MonsterDeck} from './data/cards';
import styles from './styles/Card.module.css';
import CardDetails from './CardDetails';

import autobind from 'autobind-decorator';
import { AppContext } from './context/AppContext';

import {IconContext} from 'react-icons';
import {TiDeleteOutline} from 'react-icons/ti'

interface IProps {
    deck : MonsterDeck
}

interface IState {
  shownCard: ICard | null
}

class Deck extends Component<IProps, IState>  {
  static contextType = AppContext
  state : IState = {
    shownCard: null
  }

  static getDerivedStateFromProps(nextProps : IProps, prevState : IState) {
    if (nextProps.deck.drawnCard !== prevState.shownCard) {
      return {shownCard: nextProps.deck.drawnCard}
    }
    return null
  }

  @autobind
  draw (evt : any) : void {
    this.setState((prevState, prevProps) => {
      let newState = {shownCard: prevProps.deck.drawCard()}
      this.context.saveDeckState()
      return newState
    })
  }

  @autobind
  deactivateMonster (evt : any) : void {
    this.context.deactivateMonsterType(this.props.deck.monster.name);
  }

  render() {
    let hiddenCardClasses = [styles.card, styles.ability, styles.back, styles.draw ].join(' ')
    let shownCardClasses = [styles.card, styles.ability, styles.front, styles.discard, styles.pull].join(' ')

    return (
      <div className={styles['card-container']}>
        <IconContext.Provider value={{ color: "white", className: styles.icon }}>
          <div className={styles.removeDeck} onClick={this.deactivateMonster}>
            <TiDeleteOutline />
          </div>
        </IconContext.Provider>
        <div onClick={this.draw}>
          <div className={hiddenCardClasses} />
          <div className={this.state.shownCard ? shownCardClasses : hiddenCardClasses}>
            <span className={styles.name}>
              {this.props.deck.monster.name}
            </span>
            <CardDetails card={this.state.shownCard} />

              </div>

            </div>
      </div>
    );
  }
}

export default Deck;
