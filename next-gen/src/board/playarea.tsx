import React, { useEffect, useState } from "react";

import { useAuth0 } from "../context/AuthWrapper";
import {GetTiles, IMapTile, GetTileData} from "../data/api";
import { FormGroup, FormLabel, Spinner, Row, Col } from "react-bootstrap";
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

  const updateTileOnSelect = async (tile: IMapTile) => {
    if (loading) {
      return;
    }
    const token = await getTokenSilently!();
    const updated = await GetTileData(token, tile);
    const tileState = tiles.map(d => {
      if (d.value === updated.Name) {
        return { value: d.value, label: d.label, data: updated };
      } else {
        return d
      }
    });

    setTiles(tileState);
    props.onSelect(updated);
  };


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

        <Row>
          <Col>
            <FormControl
              disabled={loading}
              as="select"
              onChange={e => {
                const tile = tiles.find(t => t.value === e.currentTarget.value);
                if (tile) {
                  updateTileOnSelect(tile.data);
                }
              }}
            >
              {tileOptions}
            </FormControl>
          </Col>
          <Col sm={1}>
            {loading ? (
              <Spinner
                variant="secondary"
                size="sm"
                animation="border"
                as="span"
              />
            ) : null}
          </Col>
        </Row>
      </FormGroup>
    </div>
  );
};
