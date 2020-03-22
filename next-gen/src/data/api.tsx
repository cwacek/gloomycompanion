
import config from "../auth_config.json";


export interface ITilePosition {
    XOffset: number;
    YOffset: number;
    Size: number;
}

export interface IMapTile {
  Name: string;
  Type: TileType;
  Position: ITilePosition;
  imageUrl?: string;
}

type TileType = "door" | "room"

export const GetTiles = async (token : string) : Promise<IMapTile[]> => {
        const response = await fetch(`${config.gloomyserver_api}/v1/tiles`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        return response.json().then(val => val as IMapTile[])
}

export const UpdateTile = async (token: string, t: IMapTile) : Promise<Response>=> {
  return fetch(
    `${config.gloomyserver_api}/v1/tiles/${t.Type}/${t.Name}`,
    {
      method: "PATCH",
      body: JSON.stringify(t),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};


function arrayBufferToBase64(buffer : ArrayBuffer) : string{
  let binary = '';
    let  bytes = [].slice.call(new Uint8Array(buffer));
  
    bytes.forEach((b) => binary += String.fromCharCode(b));
  
    return window.btoa(binary);
  };

export const GetTileData = async (token : string, tile : IMapTile) : Promise<IMapTile> => {
      const response = await fetch(
        `${config.gloomyserver_api}/v1/tiles/${tile.Type}/${tile.Name}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
          }
        }
      );
      console.log("Got response", response)
      const json = await response.json()
      console.log("Tile:", json)
      let tileData : IMapTile = json
      return tileData
}

export const GetTileImageURL = async (token : string, tile : IMapTile) => {
      const response = await fetch(
        `${config.gloomyserver_api}/v1/tiles/${tile.Type}/${tile.Name}?cache=true`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "image/png"
          }
        }
      );
      let buf = await response.arrayBuffer();
      console.log("Received image data")
      let dataUrl = `data:image/png;base64,${arrayBufferToBase64(buf)}`
      console.log("Wrote image data to data url")
      return dataUrl
}