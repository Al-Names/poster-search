import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import { Provider } from "./context";

import Header from "../src/components/layout/Header";
import Index from "../src/components/layout/Index";
import Poster from "../src/components/posters/Poster";
import Posters from "../src/components/posters/Posters";

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Index} />
              <Route exact path="/search/:query" component={Posters} />
              <Route exact path="/poster/:posterId" component={Poster} />
              {/* <Route component={NotFoundPage} /> */}
            </Switch>
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default App;
