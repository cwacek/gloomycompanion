import React from "react";
import { Hex, HexRef } from "./HexRef";
import styles from './tile.module.scss';

import a3a from './tiles/A3a.png';
import a1a from './tiles/A1a.png';
import { ViewOptionsContext } from "./ViewOptions";

export interface IMapTile {
    name: string;
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
         ]
       ]);

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