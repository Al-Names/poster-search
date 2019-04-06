import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Consumer } from "../../context";
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
    this.searchPosters = this.searchPosters.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  searchPosters = e => {
    e.preventDefault();
    this.props.history.push(`/search/${this.state.query}`);
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <h1 className="display-4 text-center">Search For A Poster</h1>
        <p className="lead text-center">Morressier</p>
        <div className="mx-auto">
          <form className="form-inline " onSubmit={this.searchPosters}>
            <div className="form-group">
              <input
                className="form-control form-control-lg mr-sm-2"
                type="search"
                placeholder="Search"
                name="query"
                value={this.state.query}
                onChange={this.onChange}
              />

              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <hr />
      </div>
    );
  }
}
export default withRouter(Search);
