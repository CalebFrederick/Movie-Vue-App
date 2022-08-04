<script>
import axios from "axios";
export default {
  data: function () {
    return {
      movies: [],
      newMovieParams: {},
      editMovieParams: {},
    };
  },
  created: function () {
    this.indexMovies();
  },
  methods: {
    indexMovies: function () {
      axios.get("http://localhost:3000/movies").then((response) => {
        this.movies = response.data;
        console.log("All Movies: ", this.movies);
      });
    },
    createMovie: function () {
      axios
        .post("http://localhost:3000/movies", this.newMovieParams)
        .then((response) => {
          console.log("movie added to database", response.data);
          this.movies.push(response.data);
          this.newmovieParams = {};
        })
        .catch((error) => (this.errorMessage = error));
    },
    showMovie: function (movie) {
      console.log(movie);
      document.querySelector("#movie-details").showModal();
      this.currentMovie = movie;
      this.editMovieParams = movie;
    },
    updateMovie: function (movie) {
      axios
        .patch("http://localhost:3000/movies/" + movie.id, this.editMovieParams)
        .then((response) => {
          console.log("Movie Updated", response.data);
        });
    },
    destroyMovie: function (movie) {
      axios
        .delete("http://localhost:3000/movies/" + movie.id)
        .then((response) => {
          console.log("Movie Destroyed", response.data);
          var index = this.movies.indexOf(movie);
          this.movies.splice(index, 1);
        });
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>Welcome to Movies App</h1>
    <div>
      <label for="title">title:</label>
      <input type="text" v-model="newMovieParams.title" id="title" />
    </div>
    <div>
      <label for="year">year:</label>
      <input type="text" v-model="newMovieParams.year" id="year" />
    </div>
    <div>
      <label for="plot">plot:</label>
      <input type="text" v-model="newMovieParams.plot" id="plot" />
    </div>
    <div>
      <button v-on:click="createMovie()">Create</button>
    </div>
    <div v-for="movie in movies" v-bind:key="movie.id">
      <h5>{{ movie.title }}</h5>
      <h6>{{ movie.year }}</h6>
      <div>
        <button v-on:click="showMovie(movie)">More Info!</button>
      </div>
      <hr />
    </div>
    <dialog id="movie-details">
      <form method="dialog">
        <div>
          <label for="editTitle">Title:</label>
          <input type="text" v-model="editMovieParams.title" id="editTitle" />
        </div>
        <br />
        <div>
          <label for="editPlot">Plot:</label>
          <input type="text" v-model="editMovieParams.plot" id="editPlot" />
        </div>
        <br />
        <div>
          <label for="editYear">Year:</label>
          <input type="text" v-model="editMovieParams.year" id="editYear" />
        </div>
        <button v-on:click="updateMovie(currentMovie)">Update Movie</button>
        <button>Close</button>
        <button v-on:click="destroyMovie(currentMovie)">Destroy Movie</button>
      </form>
    </dialog>
  </div>
</template>

<style></style>
