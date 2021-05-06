import React, { Component } from "react";
import SzavakDataService from "../services/szavak.service";
import { Link } from "react-router-dom";

export default class SzotarList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveSzotar = this.retrieveSzotar.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveSzavak = this.setActiveSzavak.bind(this);
    this.removeAllSzotar = this.removeAllSzotar.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      szotar: [],
      currentSzavak: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveSzotar();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveSzotar() {
    SzavakDataService.getAll()
      .then(response => {
        this.setState({
          szotar: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveSzotar();
    this.setState({
      currentSzavak: null,
      currentIndex: -1
    });
  }

  setActiveSzavak(szavak, index) {
    this.setState({
      currentSzavak: szavak,
      currentIndex: index
    });
  }

  removeAllSzotar()
 {
  SzavakDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentSzavak: null,
      currentIndex: -1
    });

    SzavakDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          szotar: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, szotar, currentSzavak, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Keresés részlet alapján..."
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Keresés
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Szavak listája</h4>

          <ul className="list-group">
            {szotar &&
              szotar.map((szavak, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveSzavak(szavak, index)}
                  key={index}
                >
                  {szavak.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={() => { if (window.confirm('Biztos törölni szeretné az összes szót?')) this.removeAllSzotar() } } 
          >Remove all
            
          </button>
        </div>
        <div className="col-md-6">
          {currentSzavak ? (
            <div>
              <h4>Leírás:</h4>
              <div>
                <label>
                  <strong>Ukrán:</strong>
                </label>{" "}
                {currentSzavak.title}
              </div>
              <div>
                <label>
                  <strong>Magyar:</strong>
                </label>{" "}
                {currentSzavak.description}
              </div>
              <div>
                <label>
                  <strong>Állapot:</strong>
                </label>{" "}
                {currentSzavak.published ? "Ellenőrizve" : "Ellenőrzésre vár"}
              </div>

              <Link
                to={"/szotar/" + currentSzavak.id}
                className="badge badge-warning"
              >
                Szerkesztés
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Kattints rá egy szóra!</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}