import React, { useEffect, useState } from "react";
import styles from './tile.module.scss';

import { ViewOptionsContext } from "./ViewOptions";
import { useAuth0 } from "../context/AuthWrapper";
import {GetTiles, IMapTile, GetTileImageURL} from "../data/api";
import { FormGroup, FormLabel } from "react-bootstrap";
import FormControl from 'react-bootstrap/FormControl';


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
  }, [loading, getTokenSilently]);

  const tileOptions = tiles.map(t => <option key={t.value} value={t.value}>{t.label}</option>)

  return (
    <div>
      <FormGroup controlId="tileselelctor">
        <FormLabel>Select Tile</FormLabel>
        <FormControl
          as="select"
          onChange={e => {
            const tile = tiles.find(t => t.value === e.currentTarget.value);
            if (tile) {
              props.onSelect(tile.data);
            }
          }
          }
        >
          {tileOptions}
        </FormControl>
      </FormGroup>
    </div>
  );
};

interface IProps {
    tile : IMapTile;
    center: number[];
    rotation : number;
}


export const MapTile: React.SFC<IProps> = props => {
  const {loading, getTokenSilently} = useAuth0();
  const [tileImgUrl, setTileImgUrl] = useState<string>("")

  useEffect(() => {
    console.log("MapTile fetching data")
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, props.tile.Name, props.tile.Type]);

  return (
    <ViewOptionsContext.Consumer>
      {viewOptions => (
        <g className={styles.playarea}>
          <g
            transform={`rotate(${props.rotation}, ${props.center[0]}, ${props.center[1]})
                        translate(${props.center[0] + props.tile.Position.XOffset}, ${props.center[1] + props.tile.Position.YOffset})`}
          >
            {viewOptions.displayMapTileImagery ? (
              
              <image xlinkHref={tileImgUrl} width={props.tile.Position.Size}
                preserveAspectRatio="xMidYMid meet"
              />
            ) : null}
          </g>
        </g>
      )}
    </ViewOptionsContext.Consumer>
  );
};