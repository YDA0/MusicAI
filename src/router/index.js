import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Main from "../views/main/main.vue"
import MainComposition from "../views/main/composition.vue"
import BoardList from "../views/board/list.vue"
import BoardWrite from "../views/board/write.vue"
import BoardItem from "../views/board/item.vue"
import BoardModify from "../views/board/modify.vue"

import Join from "../views/Join.vue"

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: "/Join",
    component: Join
  },
  {
    path: "/main",
    component: Main
  },
  {
    path: "/composition",
    component: MainComposition
  },
  {
    path: "/board",
    component: BoardList
  },
  {
    path: "/board/write",
    component: BoardWrite
  },
  {
    path: "/board/item/:id",
    component: BoardItem
  },
  {
    path: "/board/modify/:id",
    component: BoardModify
  },
  {
    path: "/join",
    component: Join
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
