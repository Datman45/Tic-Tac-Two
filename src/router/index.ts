import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomePage.vue'
import UserInfo from '../views/UserInfoPage.vue'
import Game from '../views/GamePage.vue'
import GameOver from '../views/GameOverPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/UserInfo',
    name: 'UserInfo',
    component: UserInfo,
  },
  {
    path: '/Game',
    name: 'Game',
    component: Game,
  },
  {
    path: '/GameOver',
    name: 'GameOver',
    component: GameOver,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
