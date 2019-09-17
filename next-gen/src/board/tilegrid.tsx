import React, {Component, SyntheticEvent, MouseEvent} from 'react';
//import './tile.module.scss';
import styles from './tile.module.scss';
import autobind from 'autobind-decorator';
import { Hex, HexRef, calcXOffset, calcYOffset} from './HexRef';
import {MapTile, TileSelector } from './playarea';
import { ScenarioState } from './ScenarioStateProvider';
import { IMapTile } from '../data/api';

interface IProps {};
interface IState {
  targetHex?: HexRef;
  activeMapTile? : IMapTile
  activeTileRotation : number
};

class TileGrid extends Component<IProps, IState> {
  static contextType = ScenarioState;
  context!: React.ContextType<typeof ScenarioState>;

  size = 5;
  viewBox = [0, 0, 300, 300];
  center = [
    (this.viewBox[2] - this.viewBox[0]) / 2,
    (this.viewBox[3] - this.viewBox[1]) / 2
  ];

  listener = null;

  state = {
    targetHex: undefined,
    activeMapTile: undefined,
    activeTileRotation: 0
  };

  @autobind
  updateTargetHex(hex?: HexRef) {
    this.setState({
      targetHex: hex
    });
  }

  @autobind
  selectMapTile(tile : IMapTile) {
    this.setState({
      activeMapTile: tile
    });
  }

  @autobind
  handleClick(e: MouseEvent) {
    if (!this.state.activeMapTile) return null;
    this.context.placeTile({
      tile: this.state.activeMapTile!,
      center: this.state.targetHex!,
      rotation: this.state.activeTileRotation
    });
  }

  @autobind
  handleKeyDown(e: KeyboardEvent) {
    console.log(`Keypress: ${e.key}`);
    if (e.key === "r") {
      this.setState(pState => {
        return { activeTileRotation: pState.activeTileRotation + 60 };
      });
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  @autobind
  calculateCenter(tgt: HexRef): [number, number] {
    return [
      this.center[0] + calcXOffset(tgt),
      this.center[1] + calcYOffset(tgt)
    ];
  }

  render() {
    if (this.size % 2 != 1) {
      throw new Error("can't deal with even sized tilegrids");
    }

    let gridHexes: JSX.Element[] = [];
    for (let x = -this.size; x < this.size; x++) {
      for (let y = -this.size; y < this.size; y++) {
        let ref = new HexRef(x, y);
        gridHexes.push(
          <Hex
            key={`tile-${ref}`}
            center={this.center}
            coords={ref}
            hoverState={this.state.targetHex === ref ? "active" : ""}
            onHover={this.updateTargetHex}
          />
        );
      }
    }

    let playTileCenter = [50, 20];
    if (this.state.targetHex) {
      playTileCenter = this.calculateCenter(this.state.targetHex!);
    }

    return (
      <div>
        <div className={styles.boardarea}>
        <div className={styles.selector}>
         <TileSelector onSelect={this.selectMapTile}/>
        </div>
          <svg viewBox={this.viewBox.join(" ")}>
            {this.state.activeMapTile ? (
              <MapTile
                center={playTileCenter}
                tile={this.state.activeMapTile!}
                rotation={this.state.activeTileRotation}
              />
            ) : null}

            {this.context.placedMapTiles.map(t => (
              <MapTile
                key={`${t.tile.Name}_${t.center.toString()}`}
                center={this.calculateCenter(t.center)}
                tile={t.tile}
                rotation={t.rotation}
              />
            ))}

            <g
              className={styles["pod-wrap"]}
              onMouseLeave={() => {
                this.updateTargetHex(undefined);
              }}
              onClick={this.handleClick}
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