import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import Tile from './board/tile';
import * as serviceWorker from './serviceWorker';
import {Route, RouteComponentProps, HashRouter, Switch} from 'react-router-dom';
import DataProvider from "./context/DataProvider";

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route exact path="/board" render={(props: RouteComponentProps) => <Tile />} />
      <Route
        path="/:id?"
        render={(props: RouteComponentProps) => (
          <DataProvider {...props}>
            <App />
          </DataProvider>
        )}
      />
    </Switch>
  </HashRouter>,
  document.getElementById("root")
);
/*
ReactDOM.render(<App />  ,document.getElementById('root'));
*/


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
