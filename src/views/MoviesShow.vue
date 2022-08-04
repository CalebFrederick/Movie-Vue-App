<script>
import axios from "axios";
export default {
  data: function () {
    return {
      movie: {},
    };
  },
  created: function () {
    axios.get("/movies/" + this.$route.params.id + ".json").then((response) => {
      this.movie = response.data;
    });
  },
  methods: {
    destroyMovie: function () {
      axios
        .delete("/movies/" + this.$route.params.id + ".json")
        .then((response) => {
          console.log("Movie Removed From Database", response.data);
          this.$router.push("/movies");
        });
    },
  },
};
</script>

<template>
  <div class="movies_show">
    <div class="container">
      <h1>
        {{ movie.title }}
      </h1>
      <p>
        {{ movie.plot }}
      </p>
      <router-link to="/movies">Return to Movies Index</router-link> -
      <router-link v-bind:to="`/movies/${movie.id}/edit`"
        >Edit Movie</router-link
      >
      <div>
        <button v-on:click="destroyMovie()">Delete Movie</button>
      </div>
    </div>
  </div>
</template>

<style>
img {
  max-width: 200px;
  max-height: 300px;
}
</style>
