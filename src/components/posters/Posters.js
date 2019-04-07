import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { Context, Consumer } from "../../context";

export default class Posters extends Component {
  static contextType = Context;

  componentDidMount = () => {
    this.context.getPostersList(this.props.match.params.query);
  };

  componentDidUpdate(prevProps) {
    const query = this.props.match.params.query;
    if (prevProps.match.params.query !== query) {
      this.context.getPostersList(query, 6, 0);
    }
  }

  render() {
    const query = this.props.match.params.query;

    return (
      <Consumer>
        {({ posters, getNextPage, getPreviousPage }) => (
          <div>
            <h1>{query}...</h1>
            <hr />

            <div className="card-columns">
              {posters.map(poster => (
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
            <div className="buttonBag">
              <button
                onClick={getPreviousPage}
                className="btn btn-primary previousButton"
              >
                Previous Page
              </button>
              <button
                onClick={getNextPage}
                className="btn btn-primary nextButton"
              >
                Next Page
              </button>
            </div>
          </div>
        )}
      </Consumer>
    );
  }
}
