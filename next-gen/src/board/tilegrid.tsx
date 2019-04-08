import React, {Component} from 'react';
import './tile.module.scss';
import styles from './tile.module.scss';
import autobind from 'autobind-decorator';
import { Hex, HexRef, calcXOffset, calcYOffset, rotateRight } from './HexRef';
import PlayArea from './playarea';

interface IProps {};
interface IState {
  targetHex?: HexRef;
  playtileArea : HexRef[];
};

const sameHex = (h1? : HexRef, h2? :HexRef) => h1 && h2 && h1[0]===h2[0] && h1[1]===h2[1]


class TileGrid extends Component<IProps, IState> {
    size = 11;
    viewBox = [0, 0, 300, 300]
    center = [
      (this.viewBox[2] - this.viewBox[0]) / 2,
      (this.viewBox[3] - this.viewBox[1]) / 2
    ];

    state = {
      targetHex: undefined,
      playtileArea: [[0,0],[0,1],[0,2],[0,3],[0,4],[1,4]] as HexRef[]
    }

    @autobind
    updateTargetHex (hex? : HexRef) {
      this.setState({
        targetHex: hex
      });
    }

    @autobind
    handleKeyDown(e: KeyboardEvent) {
      console.log(`Keypress: ${e.key}`)
      if (e.key === 'r') {
        this.setState((pState: IState) => {
          return {
            playtileArea: rotateRight(pState.playtileArea)
          };
        });
      }
    }

    componentWillUnmount() {

    }

    componentDidMount() {
      document.addEventListener('keydown', this.handleKeyDown);
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
                center = {this.center}
                position={position}
                row={row}
                hoverState={sameHex(this.state.targetHex, [row, position]) ? 'active' : ''} 
                onHover={this.updateTargetHex}
              />
            );
          }
        }

        let playTileCenter = [50, 20];
        if (this.state.targetHex) {
          playTileCenter = [
            this.center[0] + calcXOffset(this.state.targetHex!),
            this.center[1] + calcYOffset(this.state.targetHex!),
          ]
        }

        return (
          <div>
            <div className={styles.boardarea} >
              <svg viewBox={this.viewBox.join(" ")}>

                <PlayArea center={playTileCenter} area={this.state.playtileArea}/>

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