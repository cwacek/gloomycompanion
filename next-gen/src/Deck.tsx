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
    debugger
    this.setState({shownCard: this.props.deck.drawCard()})
  }

  render() {
    let cardClasses = [styles.card, styles.ability, styles.draw ]
    if (this.state.shownCard) {
      cardClasses.push(styles.down);
      cardClasses.push(styles.front);
    } else {
      cardClasses.push(styles.up);
      cardClasses.push(styles.back);
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
