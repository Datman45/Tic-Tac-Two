<script setup lang="ts">
import { useUserDataStore } from '../stores/userDataStore.ts'
import { RouterLink, useRouter } from 'vue-router'

const store = useUserDataStore()
const router = useRouter()
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand">TIC-TAC-TWO</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link active" to="/">{{
              store.userName.length > 0 ? 'Home' : 'Log in'
              }}</RouterLink>
          </li>
          <li v-if="store.userName.length > 0" class="nav-item">
            <RouterLink class="nav-link active" to="/UserInfo">User Info</RouterLink>
          </li>
          <li v-if="store.userName.length > 0" class="nav-item">
            <RouterLink class="nav-link active" to="/Game">Game</RouterLink>
          </li>
          <li v-if="store.userName.length > 0 && store.winner" class="nav-item">
            <RouterLink class="nav-link active" to="/GameOver">GameOver</RouterLink>
          </li>
          <li v-if="store.userName.length > 0" class="nav-item">
            <a @click="
              () => {
                store.userName = ''
                router.push('/')
              }
            " class="nav-link active" style="cursor: pointer">Log out</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
