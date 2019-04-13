import React, { FormEvent } from "react";
import { Hex, HexRef } from "./HexRef";
import styles from './tile.module.scss';

import { ViewOptionsContext } from "./ViewOptions";
import Select from "react-select";
import { ValueType } from "react-select/lib/types";

import a3a from './tiles/A3a.png';
import a1a from './tiles/A1a.png';
import wood_door_horiz from './tiles/wood_door_horiz.png';

type TileType = "door" | "room"

export interface IMapTile {
    name: string;
    type: TileType;
    background: {
        xlinkHref: string;
        width: number;
        x: number;
        y: number;
     };
    area: HexRef[];
}

interface IProps {
    tile : IMapTile;
    center: number[];
    rotation : number;
}

export const TILES: Map<string, IMapTile> = new Map([
         [
           "a2a",
           {
             name: "a2a",
             type: "room" as TileType,
             area: [
               [0, 0],
               [1, 0],
               [2, 0],
               [-1, 0],
               [-2, 0],
               [-1, -1],
               [0, -1],
               [1, -1],
               [2, -1]
             ].map(HexRef.fromArr),
             background: {
               xlinkHref: a3a,
               width: 78,
               x: -39,
               y: -28
             }
           }
         ],
         [
           "a1a",
           {
             name: "a1a",
             type: "room" as TileType,
             area: [
               [0, 0],
               [1, 0],
               [2, 0],
               [-1, 0],
               [-2, 0],
               [-1, -1],
               [0, -1],
               [1, -1],
               [2, -1]
             ].map(HexRef.fromArr),
             background: {
               xlinkHref: a1a,
               width: 72,
               x: -35,
               y: -24
             }
           }
         ],
         [
           "Horizontal Wood Door",
           {
             name: "Horizontal Wood Door",
               type: "door" as TileType,
             area: [
               [0, 0],
             ].map(HexRef.fromArr),
             background: {
               xlinkHref: wood_door_horiz,
               width: 14,
               x: -7,
               y: -8
             }
           }
         ]
       ]);


type SelectorValueType = ValueType<{ value: string, label: string, data: IMapTile}>

export const TileSelector: React.SFC<{
  onSelect: (tile: IMapTile) => void;
}> = props => {
  const tiles = Array.from(TILES, (v, k) => v[1]).map((t: IMapTile) => {
    return { value: t.name, label: t.name, data: t };
  });

  return (
    <div>
      <Select
        options={tiles}
        onChange={(e: SelectorValueType) => {
          if (!e || e instanceof Array) {
            console.log("N thing doing ");
          } else {
            props.onSelect(e.data);
          }
        }}
      />
    </div>
  );
};


export const MapTile : React.SFC<IProps> = (props) => {
    return <ViewOptionsContext.Consumer>
        {viewOptions => 
            <g className={styles.playarea}>
            <g transform={`rotate(${props.rotation}, ${props.center[0]}, ${props.center[1]})
                        translate(${props.center[0]}, ${props.center[1]})`}>
                {viewOptions.displayMapTileImagery ? 
                    <image {...props.tile.background} preserveAspectRatio="xMidYMid meet"/>             
                    : null }
            {props.tile.area.map(hex => {
                return <Hex key={hex.toString()} center={[0,0]} coords={hex}></Hex>
            })}
            </g>
            </g>
        }
    </ViewOptionsContext.Consumer>
};