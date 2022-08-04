<script>
import axios from "axios";
export default {
  data: function () {
    return {
      editMovieParams: {},
      errors: [],
    };
  },
  created: function () {
    axios.get("/movies/" + this.$route.params.id).then((response) => {
      this.editMovieParams = response.data;
    });
  },
  methods: {
    editMovie: function () {
      axios
        .patch("/movies/" + this.$route.params.id, this.editMovieParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/movies/" + this.$route.params.id);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>

<template>
  <div class="movies-edit">
    <form v-on:submit.prevent="editMovie()">
      <h1>Edit Movie</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>Title:</label>
        <input type="text" v-model="editMovieParams.title" />
      </div>
      <div>
        <label>Plot:</label>
        <input type="text" v-model="editMovieParams.plot" />
      </div>
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>
