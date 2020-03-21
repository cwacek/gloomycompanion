import React from "react";
import { HexRef } from "./HexRef";
import autobind from "autobind-decorator";
import { IMapTile } from "../data/api";


interface IPlacedTile {tile : IMapTile, center : HexRef, rotation: number};


interface IScenarioState {
  placedMapTiles : IPlacedTile[];
  placeTile : (tile : IPlacedTile) => void;
}

export const ScenarioState = React.createContext<IScenarioState>({
    placedMapTiles: [],
    placeTile: () => {}
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
        <ScenarioState.Provider value={this.state}>
        {this.props.children}
        </ScenarioState.Provider>
        </div>
    }
}