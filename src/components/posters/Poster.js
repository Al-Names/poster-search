import React, { Component } from "react";
import axios from "axios";
export default class Poster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poster: [],
      event: [],
      users: []
    };
  }
  componentDidMount() {
    const posterId = this.props.match.params.posterId;
    axios
      .get(
        `http://cors-anywhere.herokuapp.com/https://staging-ng.morressier.com/events_manager/v2/posters/${posterId}`
      )
      .then(res => {
        console.log(res.data);
        this.setState({
          poster: res.data.poster,
          event: res.data.event,
          users: res.data.users[0].full_name
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.state.poster.title);
    console.log(this.state.users);
    // console.log(this.state.poster.event);
    const { title, thumb_url_large, paper_abstract } = this.state.poster;
    const { name, location, short_name } = this.state.event;

    // const { full_name } = this.state.users;
    return (
      <div>
        <h1>{title}</h1>
        <p className="lead">By {this.state.users}</p>
        <hr />
        <div className="poster-view">
          <img src={thumb_url_large} alt="" />
        </div>
        <hr />
        <div>
          <h3>
            at {name} ({short_name})
          </h3>
          <h4>{location}</h4>
          <hr />
        </div>
        <div>
          <p>{paper_abstract}</p>
        </div>
      </div>
    );
  }
}
