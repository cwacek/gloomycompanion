import React, {Component, SyntheticEvent} from 'react';
import './tile.module.scss';
import styles from './tile.module.scss';
import autobind from 'autobind-decorator';
import { Hex, HexRef, calcXOffset, calcYOffset} from './HexRef';
import MapTile, { TILES, IMapTile } from './playarea';

interface IProps {};
interface IState {
  targetHex?: HexRef;
  activeMapTile? : IMapTile
  activeTileRotation : number
};

class TileGrid extends Component<IProps, IState> {
    size = 5;
    viewBox = [0, 0, 300, 300]
    center = [
      (this.viewBox[2] - this.viewBox[0]) / 2,
      (this.viewBox[3] - this.viewBox[1]) / 2
    ];

    listener= null;

    state = {
      targetHex: undefined,
      activeMapTile: TILES.get('a1a'),
      activeTileRotation: 0
    }

    @autobind
    updateTargetHex (hex? : HexRef) {
      this.setState({
        targetHex: hex
      });
    }

    @autobind
    selectMapTile(evt: React.FormEvent<HTMLSelectElement>) {
      console.log("onSelect: ", evt)
      this.setState({
        activeMapTile: TILES.get(evt.currentTarget.value)
      })
    } 

    @autobind
    handleKeyDown(e: KeyboardEvent) {
      console.log(`Keypress: ${e.key}`)
      if (e.key === 'r') {
        this.setState(pState => {return {activeTileRotation: pState.activeTileRotation + 60}})
      }
    }

    componentDidMount() {
      document.addEventListener('keydown', this.handleKeyDown);
    }

    render () {
        if (this.size %2 != 1) {
          throw new Error("can't deal with even sized tilegrids")
        }

        let gridHexes : JSX.Element[] = []
        for (let x = -this.size; x < this.size; x++) {
          for (let y = -this.size; y < this.size; y++) {
              let ref = new HexRef(x, y);
            gridHexes.push(
              <Hex
                key={`tile-${ref}`}
                center = {this.center}
                coords={ref}
                hoverState={this.state.targetHex === ref ? 'active' : ''} 
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
            <div className={styles.boardarea}>
              <select onChange={this.selectMapTile}
                      value={this.state.activeMapTile ? (this.state.activeMapTile! as IMapTile).name : undefined}>
                {Array.from(TILES, (v, k) => v[1]).map(
                  (t: IMapTile) => (
                    <option key={t.name} value={t.name} >{t.name}</option>
                  )
                )}
              </select>
              <svg viewBox={this.viewBox.join(" ")}>
                {this.state.activeMapTile ? (
                  <MapTile
                    center={playTileCenter}
                    tile={this.state.activeMapTile!}
                    rotation={this.state.activeTileRotation}
                  />
                ) : null}

                <g
                  className={styles["pod-wrap"]}
                  onMouseLeave={() => {
                    this.updateTargetHex(undefined);
                  }}
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