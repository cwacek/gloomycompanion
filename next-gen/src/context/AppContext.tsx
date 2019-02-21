import React, {ReactNode} from 'react';
import { MonsterDeck, LocalState, ICard } from '../data/cards';
import { RouteComponentProps } from 'react-router';

export interface IAppContext {
  sessionId? : string
  activeMonsters: MonsterDeck[]
  monsterLevel : number
  activateMonsterType: (name : string) => void
  deactivateMonsterType: (name : string) => void
  saveDeckState: (monsterName : string) => void
  setMonsterLevel: (level : number) => void
  store : LocalState
}

export interface IProps extends RouteComponentProps<any> { }

export const AppContext = React.createContext<IAppContext|null>(null)
export const AppContextProvider = AppContext.Provider
export const AppContextConsumer = AppContext.Consumer

