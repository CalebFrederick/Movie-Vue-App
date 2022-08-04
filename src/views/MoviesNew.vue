<script>
import axios from "axios";
export default {
  data: function () {
    return {
      newMovieParams: { plot: "" },
      status: "",
      errors: [],
    };
  },
  methods: {
    createMovie: function () {
      axios
        .post("/Movies", this.newMovieParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/movies");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          this.status = error.response.status;
        });
    },
  },
};
</script>

<template>
  <div class="movies_new">
    <img v-if="status" :src="`http://http.cat/${status}`" />
    <form v-on:submit.prevent="createMovie()">
      <h1>Create Movie</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>Title:</label>
        <input type="text" v-model="newMovieParams.title" />
      </div>
      <div>
        <label>Plot:</label>
        <input
          type="text"
          v-model="newMovieParams.plot"
          maxlength="140"
          :class="{ exceededMax: 140 - newMovieParams.plot.length === 0 }"
        />
        <small :class="{ exceededMax: 140 - newMovieParams.plot.length === 0 }">
          {{ 140 - newMovieParams.plot.length }} more characters
        </small>
      </div>
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<style>
.exceededMax {
  color: white;
  background-color: red;
  border: 3px, black;
}
</style>
