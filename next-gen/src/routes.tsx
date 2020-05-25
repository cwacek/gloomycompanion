import React from "react";
import { TileEditor } from "./board/tileeditor/container";
import { ScenarioListContainer } from "./components/scenarios/ScenarioList";
import { ScenarioEditorContainer } from "./components/scenarios/ScenarioEditor";
import { Switch, Route, useLocation, useRouteMatch } from "react-router-dom";

interface RouteRenderers  {
    main: JSX.Element;
    title: JSX.Element;
}

interface IRoute {
  exact?: boolean;
  path: string;
  components : RouteRenderers
}

const NotFound : React.FC = () => {
    return <div className="w-screen h-screen flex flex-nowrap content-center items-center justify-center">
        <div className="max-w-md w-64 rounded shadow-sm overflow-hidden px-4 py-3 border border-gray-100">
        <div className="text-4xl text-center font-pirate">That's not on any maps...</div>

        </div>
    </div>
}

export const routes: IRoute[] = [
  {
    path: "/boards",
    components: {
      main: <ScenarioListContainer></ScenarioListContainer>,
      title: <span>Scenarios</span>,
    },
  },
  {
    path: "/board/:id",
    components: {
      main: <ScenarioEditorContainer></ScenarioEditorContainer>,
      title: <span>Scenario Editor</span>,
    },
  },
  {
    path: "/tileeditor",
    components: {
      main: <TileEditor></TileEditor>,
      title: <span>Tiles!</span>,
    },
  },
  {
      path: "*",
      components: {
          main: <NotFound></NotFound>,
          title: <span>Error</span>
      }
  }
];

export const RenderRoutes : React.FC<{which : keyof RouteRenderers}> = (props) => {
    const { path, url} = useRouteMatch()

    const routeBlock = routes.map((r, idx) => {
      const component = r.components[props.which];
      const elem = (
        <Route
          key={idx}
          path={`${r.path}`}
          exact={r.exact}
          render={(renderProps) => {
            console.log(
              `Rendering route for ${path}${r.path} with`,
              r.components[props.which]
            );
            return component;
          }}
        />
      );
      return elem;
    });

    console.log(`Rendering routeBlock with ${routeBlock.length} rotues`);

    return (
      <Switch>
      {routeBlock}
      </Switch>
    );
}
