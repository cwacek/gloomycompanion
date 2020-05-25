import React from 'react'
import LoginBar from "./LoginBar"
import { Link, Switch } from "react-router-dom"
import { RenderRoutes } from '../../routes';


export const NavBar: React.FC = () => {

  return (
    <div id="nav-container" className="w-screen mb-2 mt-2 ">
      <div
        id="nav-contents"
        className="flex flex-row items-center font-philosopher mx-2"
      >
        <div className="flex-none">
          <Link className="font-philosopher" to={`/boards`}>
            Boards
          </Link>
          <Link to={`/tileeditor`}>Tile Editor</Link>
        </div>
        <div className="flex-auto px-3 text-3xl">
          <Switch>
            <RenderRoutes which="title" />
          </Switch>
        </div>
        <LoginBar className="flex-none" />
      </div>
      <hr className='mb-2 mt-0 h-1 bg-gray-800 shadow-sm'/>
    </div>
  );
};

export default NavBar