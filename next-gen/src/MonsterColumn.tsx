
import styles from './styles/layout.module.css';
import React from 'react';
import {MonsterDeck} from './data/cards'
import Deck from './Deck'

interface IProps {
    columnIdx: number
    monsterInfo : MonsterDeck

}

interface IState {}

export default class MonsterColumn extends React.Component<IProps, IState> {
  render() {
    let style: React.CSSProperties = {
      gridColumn: this.props.columnIdx + 1
    };
    return (
      <div
        className={styles["monster-column"]}
        style={style}
        key={this.props.monsterInfo.monster.name}
      >
        <Deck deck={this.props.monsterInfo} />
        <div className={styles["monsters"]} />
      </div>
    );
  }
}