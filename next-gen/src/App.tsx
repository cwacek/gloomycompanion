import React, { Component } from 'react';
import {AppContext } from './context/AppContext'
import './App.css';

import {DECKS, IMonster } from './data/cards';
import Select from 'react-select';
import {SelectionType, isSelectionType, range, DeckTypes} from './util'

import styles from './styles/layout.module.scss';
import plus_circle from './images/plus-circle.svg';

import autobind from 'autobind-decorator';
import { ValueType } from 'react-select/lib/types';
import MonsterColumn from './MonsterColumn';
import { MONSTER_STATS } from './data/monster_stats';
import Button from 'reactstrap/lib/Button';

interface IProps { }
interface IState {
  selectedMonster : SelectionType | undefined;
}

const monsterOptions: SelectionType[] = Object.keys(DECKS)
  .filter((f) => f !== "Boss")
  .map((name: string) => {
    return { value: name, label: name, type: "monster" as DeckTypes }
  })
  .concat(Object.keys(MONSTER_STATS.bosses)
    .map((name: string) => {
      return { value: name, label: name, type: "boss" as DeckTypes }
    })
  )

class App extends Component<IProps, IState> {
  static contextType = AppContext
  context!: React.ContextType<typeof AppContext>;

  state = {
    selectedMonster: undefined,
  } as IState;


  @autobind
  selectMonster(selection: ValueType<SelectionType>): void {
    if (isSelectionType(selection)) {
      this.setState({ selectedMonster: selection});
    }
  }

  @autobind
  clearState() {
    if (window.confirm("This will clear all monster state information. Are you sure?")) {
      this.context!.store.ClearAll()
      window.location.reload()
    }
  }

  @autobind
  addMonster() {
    if (this.state.selectedMonster) {
      this.context!.activateMonsterType(this.state.selectedMonster.value, this.state.selectedMonster.type);
      this.setState({selectedMonster: undefined})
    }
  }

  render() {
    let monsters : IMonster[] = this.context!.activeMonsters
    let monsterColumns: JSX.Element[] = monsters.map((m, i) => {
      return <MonsterColumn key={m.name} columnIdx={i} monsterInfo={m}/>
    });

    let availableMonsters = monsterOptions.filter(opt => {
      return !this.context!.activeMonsters.find((m : IMonster) => {
        return opt.value === m.name
      })
    })

    return (
      <div className={styles["app-surface"]}>
        <div className={styles.controls}>
          <div className={styles.new_monster}>
            <img
              alt="add monster"
              src={plus_circle}
              onClick={this.addMonster}
              className={styles.expand_icon}
            />
            <Select
              options={availableMonsters}
              onChange={this.selectMonster}
              className={styles.monster_select}
            />
          </div>
          <div className={styles.clearButton}>
            <Button color='warning' onClick={this.clearState}>Clear State</Button>
          </div>
          <div className={styles.monsterLevel}>
          Level
            <select name="level" id="monsterLevel"
              onChange={(e) => {
                let lvl = parseInt(e.target.value);
                if (lvl == null) {
                  throw new Error("Failed to parse valid level from selection");
                }
                this.context!.setMonsterLevel(lvl)
              }}
              disabled={this.context!.activeMonsters.length > 0}
              value={this.context!.monsterLevel}
            >
              {range(9).map((idx) => <option key={idx} value={idx}>{idx}</option>)}
            </select>
          </div>
        </div>
          <div className={styles["card-area"]}>{monsterColumns}</div>
      </div>
    );
  }
}

export default App;
