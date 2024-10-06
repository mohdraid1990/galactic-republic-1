import { createRouter, createWebHistory } from "vue-router"; // استخدم createRouter و createWebHistory
import HomeView from "@/views/HomeView.vue";
import StarshipDetail from "@/components/StarshipDetail.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/starship/:id", component: StarshipDetail },
];

const router = createRouter({
  history: createWebHistory(), // استخدم createWebHistory
  routes,
});

export default router;
