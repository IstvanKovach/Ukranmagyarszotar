import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddSzavak from "./components/add-szavak.component";
import Szavak from "./components/szavak.component";
import SzotarList from "./components/szotar-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/szotar"} className="navbar-brand">
            Ukrán-magyar szótár
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/szotar"} className="nav-link">
                Szótár
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/szerkesztes"} className="nav-link">
                Hozzáadás
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/szotar"]} component={SzotarList} />
            <Route exact path="/szerkesztes" component={AddSzavak} />
            <Route path="/szotar/:id" component={Szavak} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;