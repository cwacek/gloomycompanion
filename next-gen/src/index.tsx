import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import TileGrid from "./board/tilegrid";
import * as serviceWorker from "./serviceWorker";
import {
  Route,
  RouteComponentProps,
  HashRouter,
  Switch,
  Link
} from "react-router-dom";
import DataProvider from "./context/DataProvider";
import ViewOptionsProvider from "./board/ViewOptions";
import { ScenarioStateProvider } from "./board/ScenarioStateProvider";
import { Auth0Provider } from "./context/AuthWrapper";
import authConfig from "./auth_config.json";
import { TileEditor } from "./board/tileeditor/container";
import LoginBar from "./board/LoginBar";

// A function that routes the user to the right place
// after login
const onRedirectCallback = (appState: {
  targetUrl: string | null | undefined;
}) => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};
ReactDOM.render(
  <Auth0Provider
    initOptions={{
      ...authConfig,
      redirect_uri: `${window.location.protocol}//${window.location.host}`
    }}
    onRedirectCallback={onRedirectCallback}
  >
    <HashRouter>
      <Switch>
        <Route
          path="/board"
          render={(props: RouteComponentProps) => (
            <div>
            <header>
                <LoginBar />
                <Link to={`${props.match.url}/grid`}>Board</Link>
                <Link to={`${props.match.url}/tileeditor`}>Tile Editor</Link>
            </header>
              <Route
                path={`${props.match.path}/grid`}
              render={(props: RouteComponentProps) => (
              <ScenarioStateProvider>
                <ViewOptionsProvider>
                  <TileGrid />
                </ViewOptionsProvider>
              </ScenarioStateProvider>
              )}/>
              <Route
                path={`${props.match.path}/tileeditor`}
                component={TileEditor}
              />
            </div>
          )}
        />
        <Route
          path="/:id?"
          render={(props: RouteComponentProps) => (
            <DataProvider {...props}>
              <App />
            </DataProvider>
          )}
        />
      </Switch>
    </HashRouter>
  </Auth0Provider>,
  document.getElementById("root")
);
/*
ReactDOM.render(<App />  ,document.getElementById('root'));
*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
