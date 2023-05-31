import { createRouter, createWebHashHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import LogsOverview from "../views/LogsOverview.vue"
import StudentLogView from "../views/StudentLogView.vue"
import ElevView from "../views/ElevView.vue"
import LoginView from "../views/LoginView.vue"
import AdminView from "../views/AdminView.vue"

const routes = [
  { name: "home", path: "/", component: HomeView },
  { name: "login", path: "/login", component: LoginView },
  { name: "elev", path: "/elev", component: ElevView },
  { name: "slog", path: "/slog", component: StudentLogView },
  { name: "admin", path: "/admin", component: AdminView },
  { name: "logs", path: "/logs", component: LogsOverview },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
})
export default router
