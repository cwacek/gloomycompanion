import React, { Component, CSSProperties, ReactNode } from 'react';
import {RouteComponentProps} from 'react-router-dom'
import {AppContext, AppContextProvider} from './AppContext'
import './App.css';

import {MonsterDeck, DECKS, LocalState } from './data/cards';
import Select from 'react-select';
import {SelectionType, isSelectionType} from './util'

import styles from './styles/layout.module.css';
import plus_circle from './images/plus-circle.svg';

import autobind from 'autobind-decorator';
import { ValueType } from 'react-select/lib/types';
import MonsterColumn from './MonsterColumn';

interface IProps { }
interface IState {
  selectedMonster : string | undefined;
}

const monsterOptions : SelectionType[] = Object.keys(DECKS).map(name => {
  return {value: name, label: name}
});

class App extends Component<IProps, IState> {
  static contextType = AppContext

  state = {
    selectedMonster: undefined,
  } as IState;


  @autobind
  selectMonster(selection: ValueType<SelectionType>): void {
    if (isSelectionType(selection)) {
      this.setState({ selectedMonster: selection.value });
    }
  }

  @autobind
  addMonster() {
    this.context.activateMonsterType(this.state.selectedMonster);
  }

  render() {
    console.log(this.context)
    let monsters : MonsterDeck[] = this.context.activeMonsters
    let monsterColumns: JSX.Element[] = monsters.map((m, i) => {
      return <MonsterColumn key={m.monster.name} columnIdx={i} monsterInfo={m}/>
    });

    let availableMonsters = monsterOptions.filter(opt => {
      return !this.context.activeMonsters.find((m : MonsterDeck) => {
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
