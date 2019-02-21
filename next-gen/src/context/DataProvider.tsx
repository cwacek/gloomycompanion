import React, { Component } from 'react';
import { MonsterDeck, LocalState } from '../data/cards';
import autobind from 'autobind-decorator';
import { IProps, IAppContext, AppContextProvider } from './AppContext';

export default class DataProvider extends Component<IProps, IAppContext> {

  state = {
    activeMonsters: [],
    monsterLevel: 1,
    activateMonsterType: this.activateMonsterType,
    deactivateMonsterType: this.deactivateMonsterType,
    saveDeckState: this.saveDeckState,
    setMonsterLevel: this.setMonsterLevel,
    store: new LocalState(this.props.match.params.id)
  } as IAppContext;

  @autobind
  saveDeckState() {
    LocalState.PersistDecks(this.props.match.params.id, this.state.activeMonsters);
  }

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
  activateMonsterType(name: string): void {
    this.setState((prevState, props) => {
      let newMonsters = prevState.activeMonsters;
      newMonsters.push(new MonsterDeck(name));
      LocalState.PersistDecks(props.match.params.id, newMonsters);
      return {
        activeMonsters: newMonsters
      };
    });
  }

  @autobind
  deactivateMonsterType(name: string): void {
    this.setState((prevState, props) => {
      let newMonsters = prevState.activeMonsters.filter((m: MonsterDeck) => {
        return m.monster.name !== name;
      });
      LocalState.PersistDecks(props.match.params.id, newMonsters);
      LocalState.ClearMonsters(props.match.params.id, name);
      return {
        activeMonsters: newMonsters
      };
    });
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.setState(() => {
        let level: number = 1;
        let levelData = localStorage.getItem(`gloomy:${this.props.match.params.id}:monsterLevel`);
        if (levelData) {
          level = parseInt(levelData);
          if (!level) {
            level = 1;
          }
        }
        return {
          activeMonsters: LocalState.GetDecks(this.props.match.params.id),
          monsterLevel: level,
          sessionId: this.props.match.params.id,
          store: new LocalState(this.props.match.params.id)
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
