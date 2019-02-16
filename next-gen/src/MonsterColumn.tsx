
import styles from './styles/layout.module.css';
import React from 'react';
import {MonsterDeck} from './data/cards'
import MonsterStatus from './MonsterStatus'
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import Deck from './Deck'
import MonsterState from './data/MonsterState';
import autobind from 'autobind-decorator';

interface IProps {
    columnIdx: number
    monsterInfo : MonsterDeck

}

interface IState {
  currentMonsters : MonsterState[]
  addModalOpen: boolean
  availableIds: number[]
  selectedId?: number
}

export default class MonsterColumn extends React.Component<IProps, IState> {
  state = {
    currentMonsters: [],
    addModalOpen: false,
    availableIds: Array(10).fill(0).map((_, idx) => {return 1 + idx}),
    selectedId: undefined
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

    let monsters = this.state.currentMonsters.map((m : MonsterState) => {
      return <MonsterStatus key={m.id} monster={m} onDeath={this.onMonsterDeath}/>
    })

    return (
      <div
        className={styles["monster-column"]}
        style={style}
        key={this.props.monsterInfo.monster.name}
      >
        <Deck deck={this.props.monsterInfo} />
        <div className={styles.buttonset}>
        <Button color='secondary' size='lg' onClick={this.openAddModal}>Add</Button>
        </div>
        <div className={styles["monsterlist"]} >
        {monsters}
        </div>

        <Modal isOpen={this.state.addModalOpen} toggle={this.cancel}>
          <ModalBody>
            <div className={styles.monsterIdSelector}>
              {monsterIdButtons}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button disabled={this.state.selectedId == null} color='secondary' size='lg' onClick={() => this.addMonster('normal')}>Normal</Button>
            <Button disabled={this.state.selectedId == null} color='secondary' size='lg' onClick={() => this.addMonster('elite')}>Elite</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
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
  addMonster(type : string): any {
    this.setState((prevState, props) => {
      if (!prevState.selectedId) {
        return null;
      }

      let monster = new MonsterState(prevState.selectedId, this.props.monsterInfo.monster)
      prevState.currentMonsters.push(monster);
      return {
        addModalOpen: false,
        selectedId: undefined,
        currentMonsters: prevState.currentMonsters.sort((a,b) => a.id - b.id )
      }
    })
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