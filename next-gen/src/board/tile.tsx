import React, {Component} from 'react';
import './tile.module.scss';
import styles from './tile.module.scss';

interface IProps {};
interface IState {};

interface ITileProps {
  viewBox: number[];
  row: number;
  position:  number;
}

const Tile: React.SFC<ITileProps> = (props) => {
  const center = [
    (props.viewBox[2] - props.viewBox[0]) / 2,
    (props.viewBox[3] - props.viewBox[1]) / 2
  ];

  const rowOffset = Math.abs(props.row) % 2 == 1 ? -7 : 0;
  const negAdjust = props.position < 0 ? -1 : 1

  const translateX = center[0] + ((rowOffset + Math.abs(props.position * 14)) *  negAdjust)
  const translateY = center[1] + props.row * 12;

  return <use xlinkHref="#podz" transform={`translate(${translateX}, ${translateY})`}/>
 }
    /*
                  <use xlinkHref="#pod" transform="translate(35, 50)" />
                  <use xlinkHref="#pod" transform="translate(65, 50)" />
                  <use xlinkHref="#pod" transform="translate(50, 59)" />
                  */

class TileGrid extends Component<IProps, IState> {
    size = 11;
    viewBox = [0, 0, 300, 300]

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
            console.log(`Row ${row} element ${i}: ${position}`)

            gridHexes.push(
              <Tile
                key={`tile-${rowIdx}-${i}`}
                viewBox={this.viewBox}
                position={position}
                row={row}
              />
            );
          }
        }

        return (
          <div>
            <div className={styles.boardarea}>
              <svg viewBox={this.viewBox.join(" ")}>
                <defs>
                  <g id="podz">
                    <polygon
                      stroke="#000000"
                      strokeWidth="0.5"
                      points="-7,4 -7,-4 0,-8 7,-4 7,4 0,8"
                    />
                  </g><g id="pod">
                    <polygon
                      stroke="#000000"
                      strokeWidth="0.5"
                      points="5,-9 -5,-9 -10,0 -5,9 5,9 10,0"
                    />
                  </g>
                </defs>

                <g className={styles['pod-wrap']}>
                {gridHexes}
                </g>
              </svg>
              Hi
            </div>
          </div>
        );
    }

}

export default TileGrid;