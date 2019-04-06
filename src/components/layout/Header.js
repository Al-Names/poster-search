import React, { Component } from "react";
import { withRouter } from "react-router-dom";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      fireRedirect: false
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
    if (this.props.location.pathname === "/")
      return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">
            Morressier
          </a>
        </nav>
      );
    else
      return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">
              Morressier
            </a>
          </div>
          <form
            className="form-inline my-2 my-lg-0 navbar-right"
            onSubmit={this.searchPosters}
          >
            <input
              className="form-control mr-sm-2 navbar-right"
              type="search"
              placeholder="Search"
              aria-label="Search"
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
          </form>
        </nav>
      );
  }
}

export default withRouter(Header);
