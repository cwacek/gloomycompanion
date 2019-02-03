import React, { Component } from 'react';
import {ICard} from './data/cards';

interface IProps {
    card : ICard
}

class Card extends Component<IProps>  {
  render() {
    return (
      <div className="card-container">
        <div className="card ability back up draw" />
        {this.props.card.initiative}
        {this.props.card.actions}
      </div>
    );
  }
}

export default Card;
