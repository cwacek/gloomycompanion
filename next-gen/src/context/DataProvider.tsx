import React, { Component } from 'react';
import { LocalState, DECKS, IMonster } from '../data/cards';
import autobind from 'autobind-decorator';
import { IProps, IAppContext, AppContextProvider } from './AppContext';
import { DeckTypes } from '../util';

export default class DataProvider extends Component<IProps, IAppContext> {

  state = {
    sessionId: "",
    activeMonsters: [],
    monsterLevel: 1,
    activateMonsterType: this.activateMonsterType,
    deactivateMonsterType: this.deactivateMonsterType,
    setMonsterLevel: this.setMonsterLevel,
    store: new LocalState(this.props.match.params.id)
  } as IAppContext;

  @autobind
  setMonsterLevel(level: number) {
    this.setState(() => {
      return {
        monsterLevel: level
      };
    }, () => {
      console.log(level);
      localStorage.setItem(`gloomy:${this.props.match.params.id}:monsterLevel`, "" + level);
    });
  }

  @autobind
  activateMonsterType(name: string, type : DeckTypes): void {
    this.setState((prevState, props) => {
      let newMonsters = prevState.activeMonsters;
      if (type === "monster") {
        newMonsters.push(DECKS[name]);
      } else {
        newMonsters.push(DECKS["Boss"]);
      }

      prevState.store.Put('decks', newMonsters);
      return {
        activeMonsters: newMonsters
      };
    });
  }

  @autobind
  deactivateMonsterType(name: string): void {
    this.setState((prevState, props) => {
      let newMonsters = prevState.activeMonsters.filter((m: IMonster) => {
        return m.name !== name;
      });
      prevState.store.Put('decks', newMonsters);
      LocalState.ClearMonsters(props.match.params.id, name);
      return {
        activeMonsters: newMonsters
      };
    });
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.setState(() => {
        let store = new LocalState(this.props.match.params.id);

        let level: number = 1;
        let levelData = localStorage.getItem(`gloomy:${this.props.match.params.id}:monsterLevel`);
        if (levelData) {
          level = parseInt(levelData);
          if (!level) {
            level = 1;
          }
        }
        let activeMonsters = store.Get<IMonster[]>('decks');
        return {
          activeMonsters: activeMonsters ? activeMonsters : [],
          monsterLevel: level,
          sessionId: this.props.match.params.id,
          store: store
        };
      });
    }
    else {
      this.props.history.push({
        pathname: '/' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8),
      });
    }
  }

  render() {
    return <AppContextProvider value={this.state}>
      {this.props.children}
    </AppContextProvider>;
  }
}
