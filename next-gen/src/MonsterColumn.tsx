
import styles from './styles/layout.module.scss';
import React from 'react';
import {LocalState, IMonster} from './data/cards'
import { DeckStateProvider } from "./context/MonsterDeck";
import MonsterStatus from './MonsterStatus'
import {Button, Modal, ModalBody, ModalFooter} from 'reactstrap';
import Deck from './Deck'
import MonsterState, { MonsterStateProvider } from './context/MonsterState';
import autobind from 'autobind-decorator';
import { AppContext } from './context/AppContext';
import { createMandatoryContext, PersistableStateContext } from './util';
import { MonsterTypes } from './data/monster_stats';

interface IProps {
    columnIdx: number;
    monsterInfo : IMonster;
}

interface IState {
  currentMonsters : MonsterState[]
  addModalOpen: boolean
  availableIds: number[]
  selectedId?: number
}

export default class MonsterColumn extends React.Component<IProps, IState> {
  static contextType = AppContext
  context! : React.ContextType<typeof AppContext>
  state = {
    currentMonsters: [],
    addModalOpen: false,
    availableIds: Array(10).fill(0).map((_, idx) => {return 1 + idx}),
    selectedId: undefined
  }

  componentDidMount() {
      this.setState(() => {
      return {
        currentMonsters: LocalState.GetMonsters(this.context!.sessionId, this.props.monsterInfo.name),
      }
    });
  }

  render() {
    let style: React.CSSProperties = {
      gridColumn: this.props.columnIdx + 1
    };

    let monsterIdButtons: JSX.Element[] = Array(10).fill(0).map((_, idx) => {
      return <Button
        key={idx}
        outline
        color='secondary'
        className={styles.monsterIdButton}
        disabled={this.state.currentMonsters.find((m : MonsterState) => m.id === idx+1) != null}
        onClick={() => this.setState({ selectedId: idx + 1 })}
        active={this.state.selectedId === idx + 1}
      >{idx + 1}</Button>
    })

    let monsters = this.state.currentMonsters.map((m: MonsterState) => {
      return <MonsterStateProvider key={m.id} name={this.props.monsterInfo.name}
        level={this.context!.monsterLevel}
        id={m.id}
        type={m.type}
        onDeath={this.onMonsterDeath} 
      >
        <MonsterStatus monster={m} />
      </MonsterStateProvider>
    })

    return (
      <div
        className={styles["monster-column"]}
        style={style}
        key={this.props.monsterInfo.name}
      >
      <DeckStateProvider monster={this.props.monsterInfo}>

        <Deck monster={this.props.monsterInfo} />
        <div className={styles.buttonset}>
        <Button color='secondary' size='lg' onClick={this.openAddModal}>Add</Button>
        </div>
        <div className={styles["monsterlist"]} >
        {monsters}
        </div>
      </DeckStateProvider>

        <Modal isOpen={this.state.addModalOpen} toggle={this.cancel}>
          <ModalBody>
            <div className={styles.monsterIdSelector}>
              {monsterIdButtons}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button disabled={this.state.selectedId == null} color='secondary' size='lg' onClick={() => this.addMonster('normal')}>Normal</Button>
            <Button disabled={this.state.selectedId == null} color='warning' size='lg' onClick={() => this.addMonster('elite')}>Elite</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

  @autobind
  onDraw() : void {
    LocalState.PersistMonsters(
      this.context!.sessionId,
      this.props.monsterInfo.name,
      this.state.currentMonsters);
  }

  @autobind
  persist() : void {
    LocalState.PersistMonsters(
      this.context!.sessionId,
      this.props.monsterInfo.name,
      this.state.currentMonsters);
  }

  @autobind
  openAddModal() : any {
    this.setState({addModalOpen: true})
  }

  @autobind
  cancel() : any {
    this.setState({addModalOpen: false})
  }

  @autobind
  addMonster(type : MonsterTypes): any {
    this.setState((prevState, props) => {
      if (!prevState.selectedId) {
        return null;
      }

      let monster = new MonsterState(
        prevState.selectedId,
        this.props.monsterInfo.name,
        this.context!.monsterLevel,
        type
      )
      prevState.currentMonsters.push(monster);
      return {
        addModalOpen: false,
        selectedId: undefined,
        currentMonsters: prevState.currentMonsters.sort((a,b) => a.id - b.id )
      }
    }, this.persist)
  }

  @autobind
  onMonsterDeath(id : number) : void {
    this.setState((prevState) => {
      let monsters = prevState.currentMonsters.filter(m => m.id !== id)
      return {
        currentMonsters: monsters
      }
    })

  }

}