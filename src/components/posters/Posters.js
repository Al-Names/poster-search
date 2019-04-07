import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default class Posters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posters: [],
      event: [],
      offset: 0,
      limit: 6,
      total: null
    };
  }
  fetchPosters(search) {
    const { limit, offset } = this.state;
    axios
      .get(
        `http://cors-anywhere.herokuapp.com/https://staging-ng.morressier.com/events_manager/v3/posters/search?query=${search}&limit=${limit}&offset=${offset}`
      )
      .then(res => {
        console.log(res.data.collection);
        this.setState({
          posters: res.data.posters,
          event: res.data.events[0].name,
          total: res.data.collection.total
        });
      })
      .catch(err => console.log(err));
  }
  componentDidMount() {
    const query = this.props.match.params.query;
    this.fetchPosters(query);
  }
  componentDidUpdate(prevProps, prevState) {
    const query = this.props.match.params.query;
    if (prevProps.match.params.query !== this.props.match.params.query) {
      this.setState({
        offset: 0
      });
      this.fetchPosters(query);
    }
    if (prevState.offset !== this.state.offset) {
      this.setState({
        offset: prevState.offset
      });
      this.fetchPosters(query);
    }
  }

  nextPage = () => {
    if (this.state.offset < this.state.total) {
      this.setState(
        {
          offset: (this.state.offset += 6)
        },
        console.log(this.state.offset),
        this.fetchPosters(this.state.query)
      );
    }
  };
  previousPage = () => {
    if (this.state.offset !== 0) {
      this.setState(
        {
          offset: (this.state.offset -= 6)
        },
        console.log(this.state.offset),
        this.fetchPosters(this.state.query)
      );
    }
  };

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
        <div className="buttonBag">
          <button
            onClick={this.previousPage}
            className="btn btn-primary previousButton"
          >
            Previous Page
          </button>
          <button
            onClick={this.nextPage}
            className="btn btn-primary nextButton"
          >
            Next Page
          </button>
        </div>
      </div>
    );
  }
}
