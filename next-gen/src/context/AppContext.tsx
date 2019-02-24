import React, {ReactNode} from 'react';
import { LocalState, ICard, IMonster } from '../data/cards';
import { RouteComponentProps } from 'react-router';
import { DeckTypes } from '../util';


export interface IAppContext {
  sessionId : string
  activeMonsters: IMonster[]
  monsterLevel : number
  activateMonsterType: (name : string, type : DeckTypes) => void
  deactivateMonsterType: (name : string) => void
  setMonsterLevel: (level : number) => void
  store : LocalState
}

export interface IProps extends RouteComponentProps<any> { }

export const AppContext = React.createContext<IAppContext|null>(null)
export const AppContextProvider = AppContext.Provider
export const AppContextConsumer = AppContext.Consumer

