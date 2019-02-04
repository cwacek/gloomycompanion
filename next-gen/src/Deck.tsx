import React, { Component } from 'react';
import {ICard, MonsterDeck} from './data/cards';
import styles from './styles/Card.module.css';

import autobind from 'autobind-decorator';

interface IProps {
    deck : MonsterDeck
}

interface IState {
  shownCard?: ICard
}

class Deck extends Component<IProps, IState>  {
  state = {
    shownCard: undefined
  }

  @autobind
  draw (evt : any) : void {
    this.setState({shownCard: this.props.deck.drawCard()})
  }

  render() {
    let cardClasses = [styles.card, styles.ability ]
    if (this.state.shownCard) {
      cardClasses.push(styles.front);
      cardClasses.push(styles.discard);
      cardClasses.push(styles.pull);
    } else {
      cardClasses.push(styles.up);
      cardClasses.push(styles.back);
      cardClasses.push(styles.draw)
    }

    return (
      <div className="card-container" onClick={this.draw}>
        <div className={cardClasses.join(" ")} >
        <span className={styles.name}>{this.props.deck.monster.name}</span>
        </div>
      </div>
    );
  }
}

export default Deck;
