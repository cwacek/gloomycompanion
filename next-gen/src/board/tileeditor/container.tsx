
import React, { useState, ChangeEvent, useReducer, Reducer, useMemo, useCallback } from 'react';
import { IMapTile, UpdateTile, ITilePosition } from '../../data/api';
import { TileSelector, MapTile } from '../playarea';
import styles from '../tile.module.scss';
import { HexGrid, HexGridPerf } from '../tilegrid';
import { calcYOffset, HexRef, calcXOffset } from '../HexRef';
import Form from 'react-bootstrap/Form'
import FormGroup from 'react-bootstrap/FormGroup'
import FormControl from 'react-bootstrap/FormControl'
import FormLabel from 'react-bootstrap/FormLabel'
import { FormControlProps, InputGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useAuth0 } from '../../context/AuthWrapper';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { NumericInput } from '../../components/NumericInput';

type Attr = keyof ITilePosition
type Action = 
  |  {type: "set", value: IMapTile}
  |  {type: "resize", value: number}
  |  {type: "incrementAttr",  attribute: Attr, value: number}
  |  {type: "setAttr",  attribute: Attr, value: number};

  const tileReducer = (tile: IMapTile | undefined, action: Action) => {
    switch (action.type) {
      case "incrementAttr":
        if (tile) {
          return {
            ...{},
            ...tile,
            ...{
              Position: {
                ...tile.Position,
                [action.attribute]: tile.Position[action.attribute] + action.value
              }
            }
          };
        }
      case "setAttr":
        if (tile) {
          return {
            ...{},
            ...tile,
            ...{
              Position: {
                ...tile.Position,
                [action.attribute]: action.value
              }
            }
          };
        }
      case "resize":
        if (tile) {
          return {
            ...{},
            ...tile,
            ...{
              Position: {
                ...tile.Position,
                Size: action.value ? action.value : 0
              }
            }
          };
        }
      case "set":
        return action.value as IMapTile;
    }
  };


export const TileEditor: React.FunctionComponent<{}> = () => {
  const {loading, getTokenSilently} = useAuth0();
  const [tile, dispatch] = useReducer<Reducer<IMapTile | undefined, Action>>(
    tileReducer,
    undefined
  );

  const size = 5;
  const viewBox = [0, 0, 300, 300];
  const center = useMemo(() => {
    return [(viewBox[2] - viewBox[0]) / 2, (viewBox[3] - viewBox[1]) / 2];
  }, []);

  const noEffect = useCallback(()=>{}, [])

  const centerHex = new HexRef(0, 0);
  const playTileCenter = [
    center[0] + calcXOffset(centerHex),
    center[1] + calcYOffset(centerHex)
  ];

  const saveTile = async (t : IMapTile) => {

        const token = await getTokenSilently!();
        UpdateTile(token, t);
  }

  return (
    <div className={styles.tileeditor}>
      <Form>
        <FormGroup controlId="Tile">
          <FormLabel>Tile</FormLabel>
          <TileSelector
            onSelect={(t: IMapTile) => dispatch({ type: "set", value: t })}
          ></TileSelector>
        </FormGroup>
        {!tile ? null : (
          <div>
            <NumericInput<Attr> label="% Size" attribute="Size"
            value={tile.Position.Size}
            onSet={(attribute, value) => dispatch({type:'setAttr', attribute, value} )}
            onIncrement={(attribute, value) => dispatch({type:'incrementAttr', attribute, value} )}
            />
            <NumericInput<Attr> label="X Offset" attribute="XOffset"
            value={tile.Position.XOffset}
            onSet={(attribute, value) => dispatch({type:'setAttr', attribute, value} )}
            onIncrement={(attribute, value) => dispatch({type:'incrementAttr', attribute, value} )}
            />
            
            <NumericInput<Attr> label="Y Offset" attribute="YOffset"
            value={tile.Position.YOffset}
            onSet={(attribute, value) => dispatch({type:'setAttr', attribute, value} )}
            onIncrement={(attribute, value) => dispatch({type:'incrementAttr', attribute, value} )}
            />
            
            <Button variant="success" onClick={tile ? () => saveTile(tile) : undefined}>Save</Button>
          </div>
        )}
      </Form>
      <div className={styles.viewer}>
        <svg className={styles.renderer} viewBox={viewBox.join(" ")}>
          {tile == null ? null : (
            <MapTile center={playTileCenter} tile={tile} rotation={0} />
          )}

          <HexGridPerf onClick={noEffect} size={size} center={center} />
        </svg>
      </div>
    </div>
  );
};

