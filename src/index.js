import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Widget from './components/Widget';
import * as serviceWorker from './serviceWorker';
import 'fontsource-roboto';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <Switch>
          <Route path="/:uid" children={<Widget />} />
        </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
