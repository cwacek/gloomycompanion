
import React from "react";
import {Link} from "react-router-dom"
import gql from 'graphql-tag'
import { useBoardListQuery, BoardListQuery } from "../../generated/graphql";
import { Loading, Error } from "../util/query";


export const QUERY_SCENARIO_LIST = gql`
query BoardList {
    boards { id, name, creator, created }
  }
`

export const ScenarioListContainer : React.FC = () => {
  const {data, error, loading} = useBoardListQuery()

  let inner : JSX.Element

  if (loading) {
    inner = <Loading></Loading>
  } else if (error) {
    inner = <Error message={error.message}></Error>
  } else {
    inner = <ScenarioCards data={data!}></ScenarioCards>
  }

  return <div id="container" className="max-w-xl overflow-hidden mx-auto mt-2">
    {inner}
  </div>
}

const ScenarioCards : React.FC<{data : BoardListQuery}> = (props) =>{
  return (
    <ul id="card-board" className="flex flex-row">
      {props.data.boards.map((board) => (
        <li
          key={board.id}
          className="max-w-md w-64 rounded shadow-sm overflow-hidden px-4 py-3 border border-gray-100"
        >
          <div className="flex">
            <div className="w-3/5">
              <div className="font-bold text-black text-lg mb-2">
                {board.name}
              </div>
              <div className="text-gray-900 text-sm font-italic"> {board.creator} </div>
            </div>
            <div className="w-2/5 flex flex-column space-y-1">
              <button disabled type="button" className="rounded bg-blue-600 shadow-xs text-white">Play</button>
              <Link to={`/board/${board.id}`} className="rounded bg-blue-600 shadow-xs text-white text-center">Edit</Link>
            </div>
          </div>
          <div className="text-gray-500 text-xs font-italic mt-4">
            {board.created}
          </div>
        </li>
      ))}
    </ul>
  );
}

