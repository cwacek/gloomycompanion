import React, {  } from "react";
import autobind from "autobind-decorator";
import styles from './tile.module.scss';

export interface IViewOptions {
    displayMapTileImagery : boolean;
    drawHexGrid : boolean;
    drawHexCoordinates: boolean;
}

export const ViewOptionsContext = React.createContext<IViewOptions>({
        displayMapTileImagery: true,
        drawHexCoordinates: true,
        drawHexGrid: true
})

export default class ViewOptionsProvider extends React.Component<{}, IViewOptions> {

    state = {
        displayMapTileImagery: true,
        drawHexCoordinates: true,
        drawHexGrid: true
    }

    @autobind
    handleInputChange(e : React.ChangeEvent<HTMLInputElement>) {
        let target : keyof IViewOptions = e.currentTarget.name as keyof IViewOptions
        this.setState((pState : IViewOptions) => {
            return {
            [target] : !pState[target]
          } as { [K in keyof IViewOptions]: IViewOptions[K] };
        });
    }

    render () {
        return (
          <div className={styles.viewOptions}>
            <form className="form-inline">
              <div className="form-group">
                <input
                  type="checkbox"
                  name="displayMapTileImagery"
                  checked={this.state.displayMapTileImagery}
                  onChange={this.handleInputChange}
                />
                <label>Display Map Tiles</label>
              </div>
              <div className="form-group">
                <input
                  type="checkbox"
                  name="drawHexCoordinates"
                  checked={this.state.drawHexCoordinates}
                  onChange={this.handleInputChange}
                />
                <label>Draw Hex Coordinates</label>
              </div>
              <div className="form-group">
                <input
                  type="checkbox"
                  name="drawHexGrid"
                  checked={this.state.drawHexGrid}
                  onChange={this.handleInputChange}
                />
                <label>Draw Hex Grid</label>
              </div>
            </form>

            <ViewOptionsContext.Provider value={this.state}>
              {this.props.children}
            </ViewOptionsContext.Provider>
          </div>
        );
    }
}