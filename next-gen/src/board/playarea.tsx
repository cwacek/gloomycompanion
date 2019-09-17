import React, { FormEvent, useEffect, useState } from "react";
import { Hex, HexRef } from "./HexRef";
import styles from './tile.module.scss';

import { ViewOptionsContext } from "./ViewOptions";
import Select from "react-select";
import { ValueType } from "react-select/lib/types";
import { useAuth0 } from "../context/AuthWrapper";
import {GetTiles, IMapTile, GetTileImageURL} from "../data/api";
import { string } from "prop-types";

type TileType = "Door" | "Room"

/*
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
*/

export function MapTileAsJSON(t : IMapTile) : any {
    return {
        name: t.Name,
        type: t.Type,
        //area: t.area.map(h => h.toJSON())
    }
}


interface IProps {
    tile : IMapTile;
    center: number[];
    rotation : number;
}

/*
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
               xlinkHref: "",//a3a,
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
               xlinkHref: "",//a1a,
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
               xlinkHref: "",//wood_door_horiz,
               width: 14,
               x: -7,
               y: -8
             }
           }
         ]
       ]);
       */


type SelectorValueType = ValueType<{ value: string, label: string, data: IMapTile}>

export const TileSelector: React.SFC<{
  onSelect: (tile: IMapTile) => void;
}> = props => {

  const {loading, getTokenSilently} = useAuth0();
  const [tiles, setTiles] = useState<{value :string, label: string, data : IMapTile}[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (loading) {
          return
        }
        const token = await getTokenSilently!();

        const tiles = await GetTiles(token);
        const tileState =  tiles.map((d) => {
            return { value: d.Name, label: d.Name, data: d };
          })

        setTiles(tileState);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [loading]);

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


export const MapTile: React.SFC<IProps> = props => {
  const {loading, getTokenSilently} = useAuth0();
  const [tileImgUrl, setTileImgUrl] = useState<string>("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (loading) {
          return
        }

        if (props.tile) {
              const token = await getTokenSilently!();
              let url = await GetTileImageURL(token, props.tile)
              setTileImgUrl(url);
        } else {
          setTileImgUrl("");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData()
  }, [loading, props.tile]);
  /*
            {props.tile.area.map(hex => {
                return <Hex key={hex.toString()} center={[0,0]} coords={hex}></Hex>
            })}
            */
  return (
    <ViewOptionsContext.Consumer>
      {viewOptions => (
        <g className={styles.playarea}>
          <g
            transform={`rotate(${props.rotation}, ${props.center[0]}, ${props.center[1]})
                        translate(${props.center[0]}, ${props.center[1]})`}
          >
            {viewOptions.displayMapTileImagery ? (
              
              <image href={tileImgUrl}
                preserveAspectRatio="xMidYMid meet"
              />
            ) : null}
          </g>
        </g>
      )}
    </ViewOptionsContext.Consumer>
  );
};