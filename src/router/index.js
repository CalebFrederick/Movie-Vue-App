import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MoviesEdit from "../views/MoviesEdit.vue";
import MoviesIndex from "../views/MoviesIndex.vue";
import MoviesNew from "../views/MoviesNew.vue";
import MoviesShow from "../views/MoviesShow.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/movies",
    name: "movies_index",
    component: MoviesIndex,
  },
  {
    path: "/movies/new",
    name: "movies_new",
    component: MoviesNew,
  },
  {
    path: "/movies/:id",
    name: "movies_show",
    component: MoviesShow,
  },
  {
    path: "/movies/:id/edit",
    name: "movies_edit",
    component: MoviesEdit,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
