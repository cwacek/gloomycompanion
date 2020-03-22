
import React, { useState, useReducer, Reducer, useMemo, useCallback, useEffect } from 'react';
import { IMapTile, UpdateTile, ITilePosition } from '../../data/api';
import { TileSelector } from '../playarea';
import { MapTile } from "../components/MapTile";
import styles from '../tile.module.scss';
import { HexGridPerf } from '../tilegrid';
import { calcYOffset, HexRef, calcXOffset } from '../HexRef';
import Form from 'react-bootstrap/Form'
import FormGroup from 'react-bootstrap/FormGroup'
import FormLabel from 'react-bootstrap/FormLabel'
import { Alert } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useAuth0 } from '../../context/AuthWrapper';
import { NumericInput } from '../components/NumericInput';
import { withShortcut, IWithShortcut } from 'react-keybind';

const HEXSIZE = 5;
const VIEWBOX = [0, 0, 300, 300];

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
        break;
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
        break;
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
        break;
      case "set":
        return action.value as IMapTile;
    }
  };

  type FlashType = "warning" | "info" | "success"
interface Flash {
  message: string,
  type: FlashType
}

const TileEditorRaw: React.FunctionComponent<IWithShortcut> = (props) => {
  const {getTokenSilently} = useAuth0();
  const [tile, dispatch] = useReducer<Reducer<IMapTile | undefined, Action>>(
    tileReducer,
    undefined
  );

  const [status, setStatus] = useState<Flash | undefined>(undefined)

  useEffect(() => {
    if (status !== undefined) {
    setTimeout(()=>setStatus(undefined), 5000)
    }
  }, [status])

  useEffect(() => {
    console.log("Loading shortcuts")
    props.shortcut!.registerShortcut!(
      () =>
        dispatch({ type: "incrementAttr", attribute: "XOffset", value: -1 }),
      ["a", "leftarrow"],
      "left",
      "move left"
    );
    props.shortcut!.registerShortcut!(
      () =>
        dispatch({ type: "incrementAttr", attribute: "XOffset", value: 1 }),
      ["d", "rightarrow"],
      "rigth",
      "move right"
    );
    props.shortcut!.registerShortcut!(
      () =>
        dispatch({ type: "incrementAttr", attribute: "YOffset", value: -1 }),
      ["w", "uparrow"],
      "up",
      "move up"
    );
    props.shortcut!.registerShortcut!(
      () =>
        dispatch({ type: "incrementAttr", attribute: "YOffset", value: 1 }),
      ["s", "downarrow"],
      "down",
      "move down"
    );
    props.shortcut!.registerShortcut!(
      () =>
        dispatch({ type: "incrementAttr", attribute: "Size", value: -1 }),
      ["q", "/"],
      "smaller",
      "make smaller"
    );
    props.shortcut!.registerShortcut!(
      () =>
        dispatch({ type: "incrementAttr", attribute: "Size", value: 1 }),
      ["e", "'"],
      "bigger",
      "make bigger"
    );
    return () => {
      props.shortcut!.unregisterShortcut!(["e", "'"])
      props.shortcut!.unregisterShortcut!(["q", "/"])
      props.shortcut!.unregisterShortcut!(["w", "uparrow"])
      props.shortcut!.unregisterShortcut!(["s", "downarrow"])
      props.shortcut!.unregisterShortcut!(["d", "rightarrow"])
      props.shortcut!.unregisterShortcut!(["a", "leftarrow"])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const center = useMemo(() => {
    return [(VIEWBOX[2] - VIEWBOX[0]) / 2, (VIEWBOX[3] - VIEWBOX[1]) / 2];
  }, []);

  const noEffect = useCallback(()=>{}, [])

  const centerHex = new HexRef(0, 0);
  const playTileCenter = [
    center[0] + calcXOffset(centerHex),
    center[1] + calcYOffset(centerHex)
  ];

  const saveTile = async (t : IMapTile) => {
        const token = await getTokenSilently!();
        UpdateTile(token, t)
        .then((r) => {
          if (r.ok) {
          setStatus({message: "Saved!", type: "success"})
          } else {
            r.text().then((t)=> setStatus({message: t, type: "warning"}))
          }
        })
        .catch((e) => setStatus({message: e, type: "warning" })
        );
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
            {status ? 
            <Alert variant={status.type}>{status.message}</Alert>
              : null }
          </div>
        )}
      </Form>
      <div className={styles.viewer}>
        <svg className={styles.renderer} viewBox={VIEWBOX.join(" ")}>
          {tile == null ? null : (
            <MapTile center={playTileCenter} tile={tile} rotation={0} />
          )}

          <HexGridPerf onClick={noEffect} size={HEXSIZE} center={center} />
        </svg>
      </div>
    </div>
  );
};

export const TileEditor = withShortcut(TileEditorRaw);