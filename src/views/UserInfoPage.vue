<script setup lang="ts">
import router from '@/router'
import { useUserDataStore } from '@/stores/userDataStore'

const store = useUserDataStore()

if (!store.userName && !store.password) {
  router.push({ name: 'Home' })
}
</script>

<template>
  <div class="userInfo">
    Welcome to User Info Page <br />
    <br />
    Your username is: {{ store.userName }} <br />
    Your password is: {{ store.password }} <br />
    Your chosen game mode is: {{ store.gameMode }} <br />
  </div>
</template>

<style></style>
