import React, { Component } from "react";
import axios from "axios";
const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.types) {
    case "SEARCH_POSTERS":
      return {
        ...state,
        poster_list: action.payload,
        heading: "Search Results"
      };
    default:
      return state;
  }
};
export class Provider extends Component {
  state = {
    poster_list: [],
    heading: "Top Posters",
    dispatch: action => this.setState(state => reducer(state, action))
  };

  //   componentDidMount() {
  //     axios
  //       .get(
  //         "http://cors-anywhere.herokuapp.com/https://staging-ng.morressier.com/events_manager/v3/posters"
  //       )
  //       .then(res => console.log(res.data))
  //       .catch(err => console.log(err));
  //   }
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
