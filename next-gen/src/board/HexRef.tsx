
import React from 'react';
import styles from './tile.module.scss';

export type HexRef = [number, number];

interface IHexProps {
  center: number[];
  row: number;
  position:  number;
  hoverState?: string;
  onHover?: (hex : HexRef)=>any;
}

const rotateRadians = (2 * Math.PI)/6

export const rotateRight = (hexes : HexRef[]) => {
    let xPrime;
    let offset
    let newHexes = hexes.map(hex => {
      console.log("Start ", hex);
          // We need to make an adjustment for our slightly screwy coordinate system
          // in even length rows.
      if (Math.abs(hex[0]) % 2 == 1) {
          offset = hex[1] < 0 ? -1.5 : 1.5;
      } else {
          offset = 1
      }
    let xPrime =
            hex[0] * Math.cos(rotateRadians) - (hex[1] * offset) * Math.sin(rotateRadians);
      let yPrime =
        hex[0] * Math.sin(rotateRadians) + (hex[1] * offset) * Math.cos(rotateRadians);

      console.log("Calc ", xPrime, yPrime);
      let updated = [Math.round(xPrime/offset), Math.round(yPrime+offset)];
      updated = updated.map(v => v == 0 ? 0 : v)
      console.log("New Position ", updated);
      return updated;
    });
    
    return newHexes as HexRef[];
}

export const calcXOffset = (hex : HexRef) => {
  const rowOffset = Math.abs(hex[0]) % 2 == 1 ? -7 : 0;
  const negAdjust = hex[1]< 0 ? -1 : 1;
  return ((rowOffset + Math.abs(hex[1] * 14)) *  negAdjust)
}

export const calcYOffset = (hex : HexRef) => {
    return hex[0] * 12;
}

export const Hex: React.SFC<IHexProps> = (props) => {
  const translateX = props.center[0] + calcXOffset([props.row, props.position])
  const translateY = props.center[1] + calcYOffset([props.row, props.position])
  let classes = [styles.hex];
  if (props.hoverState != undefined) {
    classes.push(styles[props.hoverState])
  }

  return (
    <g transform={`translate(${translateX}, ${translateY})`}
        className={classes.join(" ")}
        onMouseOver={()=>{props.onHover && props.onHover([props.row, props.position])}}>
      <polygon
        stroke="#000000"
        strokeWidth="0.5"
        points="-7,4 -7,-4 0,-8 7,-4 7,4 0,8"
      />
      <text fill="#111" textAnchor="middle" fontSize="3pt">{`${props.row}, ${props.position}`}</text>
    </g>
  );
 }