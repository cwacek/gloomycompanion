import React from "react";
import { IMapTile, MapTileAsJSON } from "./playarea";
import { HexRef } from "./HexRef";
import autobind from "autobind-decorator";
import LoginBar from "./LoginBar"





interface IPlacedTile {tile : IMapTile, center : HexRef, rotation: number};


interface IScenarioState {
  placedMapTiles : IPlacedTile[];
  placeTile : (tile : IPlacedTile) => void;
}

export const ScenarioState = React.createContext<IScenarioState>({
    placedMapTiles: [],
    placeTile: (t) => {}
})

export class ScenarioStateProvider extends React.Component<{}, IScenarioState> {

    componentDidMount() {
    }

    state = {
        placedMapTiles: [],
        placeTile: this.placeTile
    }

    @autobind
    placeTile(t : IPlacedTile) {
        this.setState(pState => {
            return {
                placedMapTiles: pState.placedMapTiles.concat([t])
            }
        })
    }

    render () {
        return <div>
            <header>
        <LoginBar />

            </header>
        <ScenarioState.Provider value={this.state}>
        {this.props.children}
        </ScenarioState.Provider>
        </div>
    }
}