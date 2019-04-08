import React from "react";
import { Hex, HexRef } from "./HexRef";
import styles from './tile.module.scss';


interface IProps {
    area: HexRef[];
    center: number[];
}
interface IState {}

export default class PlayArea extends React.Component<IProps, IState> {


    render () {
        return <g className={styles.playarea}>
        {this.props.area.map(hex => {
            return <Hex key={hex.join('-')} center={this.props.center} position={hex[1]} row={hex[0]} ></Hex>
        })}
        </g>
    }

}