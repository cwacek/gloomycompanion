
import config from "../auth_config.json";


export interface IMapTile {
  Name: string;
  Type: TileType;
  Position: {
    XOffset: number;
    YOffset: number;
    SizePercent: number;
  };
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

function arrayBufferToBase64(buffer : ArrayBuffer) : string{
  let binary = '';
    let  bytes = [].slice.call(new Uint8Array(buffer));
  
    bytes.forEach((b) => binary += String.fromCharCode(b));
  
    return window.btoa(binary);
  };

export const GetTileImageURL = async (token : string, tile : IMapTile) => {
      //const imageURL = `${config.gloomyserver_api}/v1/tiles/show?type=${tile.Type}&name=${tile.Name}`;
      const response = await fetch(
        `${config.gloomyserver_api}/v1/tiles/show?type=${tile.Type}&name=${tile.Name}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "image/png"
          }
        }
      );
      let buf = await response.arrayBuffer();
      let dataUrl = `data:image/png;base64,${arrayBufferToBase64(buf)}`
      return dataUrl
}