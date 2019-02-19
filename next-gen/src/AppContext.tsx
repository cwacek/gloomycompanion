import React, {Component, ReactNode} from 'react';
import { MonsterDeck, LocalState, ICard } from './data/cards';
import { RouteComponentProps } from 'react-router';
import autobind from 'autobind-decorator';
import { createMandatoryContext } from './util';

interface IAppContext {
  sessionId? : string
  activeMonsters: MonsterDeck[]
  activateMonsterType: (name : string) => void
  deactivateMonsterType: (name : string) => void
  saveDeckState: (monsterName : string) => void
}

interface IProps extends RouteComponentProps<any> { }

export const AppContext = React.createContext<IAppContext|null>(null)
export const AppContextProvider = AppContext.Provider
export const AppContextConsumer = AppContext.Consumer

export default class DataProvider extends Component<IProps, IAppContext> {
  state = {
    activeMonsters: [],
    activateMonsterType: this.activateMonsterType,
    deactivateMonsterType: this.deactivateMonsterType,
    saveDeckState: this.saveDeckState
  } as IAppContext

  @autobind
  saveDeckState() {
    LocalState.PersistDecks(this.props.match.params.id, this.state.activeMonsters);
  }

  @autobind
  activateMonsterType(name: string): void {
    this.setState((prevState, props) => {
      let newMonsters = prevState.activeMonsters;
      newMonsters.push(new MonsterDeck(name));
      LocalState.PersistDecks(props.match.params.id, newMonsters);

      return {
        activeMonsters: newMonsters
      }
    })
  }

  @autobind
  deactivateMonsterType(name: string): void {
    this.setState((prevState, props) => {
      let newMonsters = prevState.activeMonsters.filter((m : MonsterDeck)=> {
        return m.monster.name !== name
      });
      LocalState.PersistDecks(props.match.params.id, newMonsters);

      return {
        activeMonsters: newMonsters
      }
    })
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.setState({
        activeMonsters: LocalState.GetDecks(this.props.match.params.id),
        sessionId: this.props.match.params.id
      })
    } else {
      this.props.history.push({
        pathname: '/' +Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8),
    })
    }
  }

  render() {
    return <AppContextProvider value={this.state}>
      {this.props.children }
      </AppContextProvider>
  }
}