import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default class Posters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posters: [],
      event: []
    };
  }
  componentDidMount() {
    const query = this.props.match.params.query;
    axios
      .get(
        `http://cors-anywhere.herokuapp.com/https://staging-ng.morressier.com/events_manager/v3/posters/search?query=${query}`
      )
      .then(res => {
        this.setState({
          posters: res.data.posters,
          event: res.data.events[0].name
        });
      })
      .catch(err => console.log(err));
  }
  componentDidUpdate(prevProps, prevState) {
    const query = this.props.match.params.query;
    if (prevProps.match.params.query !== this.props.match.params.query) {
      axios
        .get(
          `http://cors-anywhere.herokuapp.com/https://staging-ng.morressier.com/events_manager/v3/posters/search?query=${query}`
        )
        .then(res => {
          this.setState({
            posters: res.data.posters
          });
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    const query = this.props.match.params.query;

    return (
      <div>
        <h1>{query}...</h1>
        <hr />

        <div className="card-columns">
          {this.state.posters.map(poster => (
            <div key={poster.id} className="card poster-card">
              <img
                className="card-img-top"
                src={poster.thumb_url_medium}
                alt=""
              />
              <div className="card-body d-flex flex-column card">
                <h3 className="card-title">{poster.title}</h3>
                <p className="card-text lead">{poster.author_names}</p>
                <hr />
                <ul>
                  {poster.keywords
                    ? poster.keywords.map(keywords => (
                        <li key={keywords}>{keywords}</li>
                      ))
                    : null}
                </ul>
              </div>

              <Link to={`/poster/${poster.id}`}>
                <button className="btn btn-success btn-block mt-auto poster-button ">
                  View Poster
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
