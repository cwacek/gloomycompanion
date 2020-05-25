import React from 'react';
import {useParams} from 'react-router-dom';

import gql from 'graphql-tag'
import { useBoardDetailsQuery, PlacedTile, BoardDetailsDocument } from '../../generated/graphql';
import { Loading, Error } from '../util/query';
import { HexGrid } from '../../board/tilegrid';


export const QUERY_SCENARIO_DETAILS = gql`
query BoardDetails($id: ID!) {
    board(id: $id) {
      name, creator, created, tiles {
        sequence,
        layer,
        tile {
          name, type
        },
        position { q, r }
      }
    }
  }
`


const BorderedSubTitle : React.FC<{title: string}> = (props) => {
  return <div className="w-full">
    <div className="text-lg font-philosopher w-full">{props.title}</div>
      <hr className='mb-2 mt-0 h-1px bg-gray-800 shadow-sm'/>
  </div>
}

const PanelSection : React.FC<{className: string}> = (props) => {
  return <div className={`mx-2 my-0 px-2 py-1 ${props.className}`}>
    {props.children}
  </div>
}

const PlacedTileListItem : React.FC<{tile: Pick<PlacedTile, 'tile'| 'sequence'| 'layer'>}> = (props) => {
  const placement : Pick<PlacedTile, 'tile'| 'sequence'| 'layer'> = props.tile

  return <li>
    <div>{placement.sequence}</div>
    {placement.tile.name}
    {placement.tile.type}
    {placement.layer}
  </li>
}

export const ScenarioEditorContainer : React.FC = () => {
  const {id} = useParams()
  const query = useBoardDetailsQuery({variables: { id: id}})

  if (query.loading) {
    return <Loading/>
  }

  if (query.error) {
    return <Error message={query.error.message} />
  }

  return (
    <div className="mx-auto flex flex-row flex-nowrap">
      <PanelSection className="flex-0 w-64">
        <BorderedSubTitle title="Available tiles" />
        
      </PanelSection>
      <PanelSection className="flex-grow ">
        <BorderedSubTitle title={query.data!.board!.name} />
        <div className="w-3/4">
          <svg viewBox="0 0 300 300">
            <HexGrid onClick={()=>{}} size={5} center={[150, 150]}/>
            </svg>
        </div>

        <ol className="w-1/4">
          {query.data!.board?.tiles.map((tile)=> {
            return <PlacedTileListItem tile={tile}/>
          })}
        </ol>
      </PanelSection>
    </div>
  );
}