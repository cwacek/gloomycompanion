import React from 'react';
import {useParams} from 'react-router-dom';

import gql from 'graphql-tag'


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

export const ScenarioEditorContainer : React.FC = () => {
  const {id} = useParams()

  return <div className="mx-auto">
    <h4>Hi.</h4>

    <span className="text-lg">You loaded {id}</span>
  </div>
}