
import React, { useState, ChangeEvent, useReducer } from 'react';
import { IMapTile } from '../../data/api';
import { TileSelector, MapTile } from '../playarea';
import { pseudoRandomBytes } from 'crypto';
import { HexGrid } from '../tilegrid';
import { calcYOffset, HexRef, calcXOffset } from '../HexRef';

export const TileEditor : React.FunctionComponent<{}> = () => {

  const tileReducer = (tile : IMapTile, action : {type: string, value : any}) => {
    switch (action.type) { 
      case 'resize':
        return {
        ...{},
        ...tile,
        ...{
          Position: {
            ...tile.Position,
            SizePercent: action.value
          }
        }
      }
      case 'set':
        return action.value
    }
  }
  const [tile, dispatch] = useReducer(tileReducer, null, undefined);

  const size = 5;
  const viewBox = [0, 0, 300, 300];
  const center = [
    (viewBox[2] - viewBox[0]) / 2,
    (viewBox[3] - viewBox[1]) / 2
  ];

    const centerHex = new HexRef(0, 0);
    const playTileCenter = [calcXOffset(centerHex), calcYOffset(centerHex)];

    console.log("Tile", tile)
    return (
      <div>
        <TileSelector onSelect={(t : IMapTile) => dispatch({type: 'set', value: t})}></TileSelector>
        {tile == null ? null : (
          <div>
            <form>
              <input
                type="number"
                value={tile!.Position.SizePercent}
                onChange={(event: ChangeEvent<HTMLInputElement>) => dispatch({'type': 'resize', value: event.target.valueAsNumber})}
              ></input>
            </form>
            <svg viewBox={viewBox.join(" ")}>
              <MapTile
                center={playTileCenter}
                tile={tile}
                rotation={0}
              />

              <HexGrid
                onClick={(e, h) => {}}
                size={size}
                center={center}
              />
            </svg>
          </div>
        )}
      </div>
    );
}


