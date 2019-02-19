import React from "react";
import MonsterState from "./data/MonsterState";

import skull from './images/icon.png'

interface IProps {
    monster : MonsterState
    onDeath : (id : number) => void
}

interface IState {
}

export default class MonsterStatus extends React.Component<IProps, IState> {

    render() {
        return <div >
            {this.props.monster.id}
            {this.props.monster.name}

            <img src={skull} onClick={() => this.props.onDeath(this.props.monster.id)}/>
        </div>
    }
}