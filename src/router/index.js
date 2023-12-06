import { createRouter, createWebHistory } from "vue-router";
import CreateView from "../views/CreateView.vue";
import DetailsView from "../views/DetailsView.vue";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/posts/:id",
    name: "details",
    component: DetailsView,
    props: true,
  },
  {
    path: "/create",
    name: "create",
    component: CreateView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
