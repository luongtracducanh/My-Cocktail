import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CocktailDetail from "../views/CocktailDetail.vue";
import SearchView from "../views/SearchView.vue";
import CategoryView from "../views/CategoryView.vue";
import IngredientView from "../views/IngredientView.vue";
import IngredientDetail from "../views/IngredientDetail.vue";
import AlcoholicView from "../views/AlcoholicView.vue";
import GlassView from "../views/GlassView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    // pass the cocktail id as a prop for the CocktailDetail view
    path: "/detail/:idDrink",
    name: "CocktailDetail",
    component: CocktailDetail,
    props: true,
  },
  {
    // pass the search query as a prop for the SearchView
    path: "/search",
    name: "SearchView",
    component: SearchView,
    props: true,
  },
  {
    path: "/categories/",
    name: "CategoryView",
    component: CategoryView,
  },
  {
    path: "/ingredients/",
    name: "IngredientView",
    component: IngredientView,
  },
  {
    // pass the ingredient name as a prop for the IngredientDetail view
    path: "/ingredient/:name",
    name: "IngredientDetail",
    component: IngredientDetail,
    props: true,
  },
  {
    path: "/alcoholics/",
    name: "AlcoholicView",
    component: AlcoholicView,
  },
  { path: "/glasses/", name: "GlassView", component: GlassView },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
