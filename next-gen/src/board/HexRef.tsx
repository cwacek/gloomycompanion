
import React from 'react';
import styles from './tile.module.scss';
import { ViewOptionsContext, IViewOptions } from './ViewOptions';

export class HexRef {
    q : number;
    r : number;
    s : number
    constructor(q : number, r : number) {
        this.q = q;
        this.r = r;
        this.s = -q - r;

        if (this.q + this.r + this.s !== 0){
            throw new Error("Bad Hex Coords!")
        }
    }

    static fromArr(qr : number[]) : HexRef {
        return new HexRef(qr[0], qr[1])
    }

    rotateRight() {
        return new HexRef(-this.s, -this.q);
    }

    toString() : string {
        return "" + [this.q, this.r];
    }

    toJSON() : {q: number, r: number} {
        return {q: this.q, r: this.r}
    }

    equals(other : HexRef) : boolean {
        return other.q === this.q && other.r === this.r && other.s === this.s
    }
}

const orientationMatrix = {
  f0: Math.sqrt(3.0),
  f1: Math.sqrt(3.0) / 2.0,
  f2: 0.0,
  f3: 3.0 / 2.0,
  b0: Math.sqrt(3.0) / 3.0,
  b2: -1.0 / 3.0,
  b3: 0.0,
  b4: 2.0 / 3.0,
  start_angle: 0.5
};
  const M = orientationMatrix;

export const calcXOffset = (hex : HexRef) => {
  return (M.f0 * hex.q + M.f1 * hex.r) * 8;
}

export const calcYOffset = (hex : HexRef) => {
    return (M.f2 * hex.q + M.f3 * hex.r) * 8;
}

interface IHexProps {
  center: number[];
  coords: HexRef;
  hoverState?: string;
  onHover?: (hex : HexRef)=>any;
}

export const Hex: React.SFC<IHexProps> = props => {
  const x = calcXOffset(props.coords)
  const y = calcYOffset(props.coords)

  let classes = [styles.hex];
  if (props.hoverState !== undefined) {
    classes.push(styles[props.hoverState]);
  }

  return (
    <ViewOptionsContext.Consumer>
      {(viewOptions: IViewOptions) => (
        <g
          transform={`translate(${props.center[0] + x}, ${props.center[1] +
            y})`}
          className={classes.join(" ")}
          onMouseOver={() => {
            props.onHover && props.onHover(props.coords);
          }}
        >
          <polygon
            stroke="#000000"
            strokeWidth={viewOptions.drawHexGrid ? "0.5" : "0"}
            points="-7,4 -7,-4 0,-8 7,-4 7,4 0,8"
          />
          {viewOptions.drawHexCoordinates ? (
            <text fill="#111" textAnchor="middle" fontSize="3pt">
              {`${props.coords}`}{" "}
            </text>
          ) : null}
        </g>
      )}
    </ViewOptionsContext.Consumer>
  );
};