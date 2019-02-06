import React, { Component } from 'react';
import {ICard, MonsterDeck} from './data/cards';
import styles from './styles/Card.module.css';
import CardDetails from './CardDetails';

import autobind from 'autobind-decorator';

interface IProps {
    deck : MonsterDeck
}

interface IState {
  shownCard: ICard | null
}

class Deck extends Component<IProps, IState>  {
  state : IState = {
    shownCard: null
  }

  @autobind
  draw (evt : any) : void {
    console.debug("drawing card")
    this.setState({shownCard: this.props.deck.drawCard()})
  }

  render() {
    let hiddenCardClasses = [styles.card, styles.ability, styles.back, styles.draw ].join(' ')
    let shownCardClasses = [styles.card, styles.ability, styles.front, styles.discard, styles.pull].join(' ')

    return (
      <div className={styles['card-container']} onClick={this.draw}>
        <div className={hiddenCardClasses} />
        <div className={this.state.shownCard ? shownCardClasses : hiddenCardClasses}>
          <span className={styles.name}>
            {this.props.deck.monster.name}
          </span>
          <CardDetails card={this.state.shownCard}/>

        </div>
      </div>
    );
  }
}

export default Deck;
