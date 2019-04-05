import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import AddMovieForm from "./Forms/AddMovieForm";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      savedList: [],
      movies: []
    };
  }

  componentDidMount() {
    // fill me in with an HTTP Request to `localhost:5000/api/movies`

    axios
      .get("http://localhost:5000/api/movies")
      .then(res => {
        const movies = res.data;

        this.setState({ movies });
      })
      .catch(err => {
        console.log(err);
      });
  }

  addMovies = newMovie => {
    axios
      .post("http://localhost:5000/api/movies", newMovie)
      .then(res => {
        this.setState({
          movies: res.data
        });
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };

  addToSavedList = movie => {
    console.log(this.state.savedList);
    const savedList = this.state.savedList;
    savedList.push(movie);
    this.setState({ savedList });
  };

  render() {
    return (
      <div>
        <SavedList list={this.state.savedList} />
        {this.state.movies.length && (
          <Route
            exact
            path="/"
            render={props => (
              <MovieList {...props} movies={this.state.movies} />
            )}
          />
        )}
        <Route
          path="/movies/:id"
          render={props => {
            return <Movie {...props} addToSavedList={this.addToSavedList} />;
          }}
        />
        <Route
          path="/add-movie"
          render={props => (
            <AddMovieForm
              {...props}
              movies={this.state.movies}
              addMovies={this.addMovies}
            />
          )}
        />
      </div>
    );
  }
}
