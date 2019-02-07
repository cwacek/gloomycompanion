import React, { Component, CSSProperties } from 'react';
import './App.css';

import Deck from './Deck';
import {MonsterDeck, DECKS} from './data/cards';
import Select from 'react-select';

import styles from './styles/layout.module.css';
import plus_circle from './images/plus-circle.svg';

import autobind from 'autobind-decorator';
import { ValueType } from 'react-select/lib/types';
import MonsterColumn from './MonsterColumn';

interface IProps {}
interface IState {
  monsters : MonsterDeck[];
  selectedMonster : string | undefined;
}

interface SelectionType {value : string, label : string};
const monsterOptions : SelectionType[] = Object.keys(DECKS).map(name => {
  return {value: name, label: name}
});


function isSelectionType(
  selection: ValueType<SelectionType>
): selection is SelectionType {
  if (selection) {
    if (selection instanceof Array) return false;
    return true;
  }
  return false;
}

class App extends Component<IProps, IState> {
  state = {
    monsters: [
      new MonsterDeck("Bandit Guard"),
      new MonsterDeck("Rending Drake"),
      new MonsterDeck("Bandit Archer")
    ],
    selectedMonster: undefined
  };

  @autobind
  selectMonster(selection: ValueType<SelectionType>): void {
    if (isSelectionType(selection)) {
      this.setState({ selectedMonster: selection.value });
    }
  }

  @autobind
  addMonster() {
    this.setState((prevState, props) => {
      let newMonsters = prevState.monsters;
      if (prevState.selectedMonster) {
        newMonsters.push(new MonsterDeck(prevState.selectedMonster));
      }

      return {
        selectedMonster: undefined,
        monsters: newMonsters
      };
    });
  }

  render() {
    let monsterColumns: JSX.Element[] = this.state.monsters.map((m, i) => {
      return <MonsterColumn columnIdx={i} monsterInfo={m}/>
    });

    let availableMonsters = monsterOptions.filter(opt => {
      return !this.state.monsters.find((m) => {
        return opt.value == m.monster.name
      })
    })

    return (
      <div className={styles["app-surface"]}>
        <div className={styles.controls}>
          <div className={styles.new_monster}>
            <img
              src={plus_circle}
              onClick={this.addMonster}
              className={styles.expand_icon}
            />
            <Select
              options={availableMonsters}
              onChange={this.selectMonster}
            />
          </div>
        </div>
        <div className={styles["card-area"]}>{monsterColumns}</div>
      </div>
    );
  }
}

export default App;
