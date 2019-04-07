import React, { Component } from "react";
import axios from "axios";
export const Context = React.createContext();

export class Provider extends Component {
  state = {
    poster_list: [],
    currentQuery: "",
    limit: 6,
    offset: 0
  };

  getPostersList = async (
    query,
    limit = this.state.limit,
    offset = this.state.offset
  ) => {
    this.setState({
      currentQuery: query,
      limit,
      offset
    });
    const { data } = await axios.get(
      `http://cors-anywhere.herokuapp.com/https://staging-ng.morressier.com/events_manager/v3/posters/search?query=${query}&limit=${limit}&offset=${offset}`
    );
    this.setState({ poster_list: data.posters, offset: offset + 6 });
  };

  getNextPage = () => {
    const { currentQuery, limit, offset } = this.state;
    this.getPostersList(currentQuery, limit, offset);
  };

  getPreviousPage = () => {
    const { currentQuery, limit, offset } = this.state;
    this.getPostersList(currentQuery, limit, offset - 6);
  };

  render() {
    return (
      <Context.Provider
        value={{
          posters: this.state.poster_list,
          getPostersList: this.getPostersList,
          getNextPage: this.getNextPage,
          getPreviousPage: this.getPreviousPage
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
