import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
// import AddMovieForm from "../Forms/AddMovieForm";
export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    console.log(this.props.movies);
    // fill me in with an HTTP Request to `localhost:5000/api/movies`
    // axios
    //   .get("http://localhost:5000/api/movies")
    //   .then(res => {
    //     this.setState({ movies: res.data });
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    this.setState({
      movies: this.props.movies
    });
  }

  // addMovies = newMovie => {
  //   axios
  //     .post("http://localhost:5000/api/movies", newMovie)
  //     .then(res => {
  //       this.setState({
  //         movies: res.data
  //       });
  //       this.props.history.push("/");
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  render() {
    return (
      <div className="movie-list">
        {this.state.movies.map(movie => (
          <MovieDetails key={movie.id} movie={movie} />
        ))}
      </div>
    );
  }
}

function MovieDetails({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <MovieCard movie={movie} />
    </Link>
  );
}
