<script>
import axios from "axios";
export default {
  data: function () {
    return {
      movies: [],
      currentMovie: {},
    };
  },
  created: function () {
    this.indexMovies();
  },
  methods: {
    indexMovies: function () {
      axios.get("/movies.json").then((response) => {
        this.movies = response.data;
        console.log("All Movies:", this.movies);
      });
    },
  },
};
</script>

<template>
  <div
    v-for="movie in movies"
    v-bind:key="movie.id"
    v-on:click="currentMovie = movie"
    :class="{ selected: movie === currentMovie }"
  >
    <router-link :to="`/movies/${movie.id}`">
      <h1>{{ movie.title }}</h1>
    </router-link>
    <p>
      {{ movie.plot }}
    </p>
    <hr />
  </div>
</template>

<style>
img {
  max-width: 200px;
  max-height: 300px;
}
.selected {
  color: white;
  background-color: maroon;
  transition: background-color 2s ease;
}
</style>
