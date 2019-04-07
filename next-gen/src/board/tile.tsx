import React, {Component} from 'react';
import './tile.module.scss';
import styles from './tile.module.scss';
import autobind from 'autobind-decorator';

interface IProps {};
interface IState {
  targetHex?: HexRef;
};

interface HexRef {
  row: number;
  position: number;
}

const sameHex = (h1? : HexRef, h2? :HexRef) => h1 && h2 && h1.position === h2.position && h1.row === h2.row

interface IHexProps {
  viewBox: number[];
  row: number;
  position:  number;
  hoverState?: string;
  onHover: (hex : HexRef)=>any;
}

const Hex: React.SFC<IHexProps> = (props) => {
  const center = [
    (props.viewBox[2] - props.viewBox[0]) / 2,
    (props.viewBox[3] - props.viewBox[1]) / 2
  ];

  const rowOffset = Math.abs(props.row) % 2 == 1 ? -7 : 0;
  const negAdjust = props.position < 0 ? -1 : 1

  const translateX = center[0] + ((rowOffset + Math.abs(props.position * 14)) *  negAdjust)
  const translateY = center[1] + props.row * 12;
  let classes = [styles.hex];
  if (props.hoverState != undefined) {
    classes.push(styles[props.hoverState])
  }

  return (
    <g transform={`translate(${translateX}, ${translateY})`}
        className={classes.join(" ")}
        onMouseOver={()=>{props.onHover({row: props.row, position: props.position})}}>
      <polygon
        stroke="#000000"
        strokeWidth="0.5"
        points="-7,4 -7,-4 0,-8 7,-4 7,4 0,8"
      />
    </g>
  );
 }

class TileGrid extends Component<IProps, IState> {
    size = 11;
    viewBox = [0, 0, 300, 300]
    state = {
      targetHex: undefined
    }

    @autobind
    updateTargetHex (hex? : HexRef) {
      this.setState({
        targetHex: hex
      });
    }

    render () {
        if (this.size %2 != 1) {
          throw new Error("can't deal with even sized tilegrids")
        }

        let gridHexes : JSX.Element[] = []
        for (let rowIdx = 0; rowIdx < this.size; rowIdx++) {
          let row = rowIdx % 2 == 0 ? rowIdx / 2 : -1 * Math.ceil(rowIdx / 2);
          let rowLength = this.size - Math.ceil(rowIdx/2)

          for (let i = 0; i < rowLength; i++) {
            let position : number;
            if (rowLength % 2 == 1) {
              // There's a center grid
              position = i % 2 == 0 ? i / 2 : -1 * Math.ceil(i / 2);
            } else {
              let offset = i+1;
              position = offset % 2 == 0 ? offset / 2 : -1 * Math.ceil(offset / 2);
            }

            gridHexes.push(
              <Hex
                key={`tile-${rowIdx}-${i}`}
                viewBox={this.viewBox}
                position={position}
                row={row}
                hoverState={sameHex(this.state.targetHex, {row: row, position: position}) ? 'active' : ''} 
                onHover={this.updateTargetHex}
              />
            );
          }
        }

        return (
          <div>
            <div className={styles.boardarea} >
              <svg viewBox={this.viewBox.join(" ")}>

                <g className={styles['pod-wrap']} 
                  onMouseLeave={()=>{this.updateTargetHex(undefined)}}
                >
                {gridHexes}
                </g>
              </svg>
            </div>
          </div>
        );
    }

}

export default TileGrid;