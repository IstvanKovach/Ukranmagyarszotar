import React, { Component } from "react";
import SzavakDataService from "../services/szavak.service";

export default class Szavak extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getSzavak = this.getSzavak.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateSzavak = this.updateSzavak.bind(this);
    this.deleteSzavak = this.deleteSzavak.bind(this);

    this.state = {
      currentSzavak: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getSzavak(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentSzavak: {
          ...prevState.currentSzavak,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentSzavak: {
        ...prevState.currentSzavak,
        description: description
      }
    }));
  }

  getSzavak(id) {
    SzavakDataService.get(id)
      .then(response => {
        this.setState({
          currentSzavak: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentSzavak.id,
      title: this.state.currentSzavak.title,
      description: this.state.currentSzavak.description,
      published: status
    };

    SzavakDataService.update(this.state.currentSzavak.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentSzavak: {
            ...prevState.currentSzavak,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateSzavak() {
    SzavakDataService.update(
      this.state.currentSzavak.id,
      this.state.currentSzavak
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "A szó sikeresen frissítve lett!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteSzavak() {    
    SzavakDataService.delete(this.state.currentSzavak.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/szotar')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentSzavak } = this.state;

    return (
      <div>
        {currentSzavak ? (
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label htmlFor="title">Ukrán</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentSzavak.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Magyar</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentSzavak.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Állapot:</strong>
                </label>
                {currentSzavak.published ? " Ellenőrizve" : " Ellenőrzésre vár"}
              </div>
            </form>

            {currentSzavak.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                Ellenőrzésre szorul
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Megfelel
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteSzavak}
            >
              Törlés
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateSzavak}
            >
              Frissités
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Kattints egy szóra</p>
          </div>
        )}
      </div>
    );
  }
}