import React, { Component, CSSProperties } from 'react';
import logo from './logo.svg';
import './App.css';

import Deck from './Deck'
import {MonsterDeck} from './data/cards'

import styles from './styles/layout.module.css';

class App extends Component {
  state = {
    monsters: [new MonsterDeck("Bandit Guard"), new MonsterDeck("Rending Drake")]
  }

  render() {

    let monsterColumns : JSX.Element[] = this.state.monsters.map((m, i) => {
          let style : CSSProperties = {
            gridColumn: i+1
          };
          return <div className={styles['monster-column']} style={style} key={m.monster.name}>
            <Deck deck={m} />
            <div className={styles['monsters']} ></div>
          </div>
    })

    return (
      <div className={styles["app-surface"]}>
        <div className={styles.controls}>Hello</div>
        <div className={styles["card-area"]}>{monsterColumns}</div>
      </div>
    );
  }
}

export default App;
