import React, { useEffect, useState } from "react";
import styles from "../tile.module.scss";
import { ViewOptionsContext } from "../ViewOptions";
import { useAuth0 } from "../../context/AuthWrapper";
import { GetTileImageURL, IMapTile } from "../../data/api";

export interface IProps {
    tile : IMapTile;
    center: number[];
    rotation : number;
}

export const MapTile: React.SFC<IProps> = props => {
  const { loading, getTokenSilently } = useAuth0();
  const [tileImgUrl, setTileImgUrl] = useState<string>("");
  useEffect(() => {
    console.log("MapTile fetching data");
    const fetchData = async () => {
      try {
        if (loading) {
          return;
        }
        if (props.tile) {
          setTileImgUrl("");
          const token = await getTokenSilently!();
          let url = await GetTileImageURL(token, props.tile);
          console.log("Setting tile image url");
          setTileImgUrl(url);
        } else {
          setTileImgUrl("");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, props.tile.Name, props.tile.Type]);

  return (
    <ViewOptionsContext.Consumer>
      {viewOptions => (
        <g className={styles.playarea}>
          <g
            transform={`rotate(${props.rotation}, ${props.center[0]}, ${
              props.center[1]
            })
                        translate(${props.center[0] +
                          props.tile.Position.XOffset}, ${props.center[1] +
              props.tile.Position.YOffset})`}
          >
            {viewOptions.displayMapTileImagery && tileImgUrl !== "" ? (
              <image
                xlinkHref={tileImgUrl}
                width={props.tile.Position.Size}
                preserveAspectRatio="xMidYMid meet"
              />
            ) : null}
          </g>
        </g>
      )}
    </ViewOptionsContext.Consumer>
  );
};
