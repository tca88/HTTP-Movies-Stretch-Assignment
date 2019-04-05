import React, { Component } from "react";
import axios from "axios";

class AddMovieForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {
        title: "",
        director: "",
        metascore: "",
        stars: []
      }
    };
  }

  handleChange = e => {
    e.persist();
    if (e.target.name === "metascore") {
      e.target.value = parseInt(e.target.value, 10);
    }
    if (e.target.name === "stars") {
      this.setState({
        movie: {
          ...this.state.movie,
          stars: e.target.value.split(",")
        }
      });
    }
    if (e.target.name !== "stars") {
      this.setState({
        movie: {
          ...this.state.movie,
          [e.target.name]: e.target.value
        }
      });
    }
  };

  addMovies = e => {
    e.preventDefault();
    this.props.addMovies(this.state.movie);

    this.setState({
      movie: {
        title: "",
        director: "",
        metascore: "",
        stars: []
      }
    });
  };

  render() {
    return (
      <div className="save-wrapper">
        <div className="movie-card">
          <h2>Add a New Movie</h2>
          <form onSubmit={this.addMovies} className="form">
            <input
              name="title"
              placeholder="title"
              onChange={this.handleChange}
              value={this.state.movie.title}
            />
            <input
              type="text"
              name="director"
              placeholder="director"
              onChange={this.handleChange}
              value={this.state.movie.director}
            />
            <input
              name="metascore"
              placeholder="metascore"
              type="number"
              onChange={this.handleChange}
              value={this.state.movie.metascore}
            />
            <input
              name="stars"
              placeholder="stars"
              type="text"
              onChange={this.handleChange}
              value={this.state.movie.stars}
            />
            <button type="submit">Add</button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddMovieForm;
