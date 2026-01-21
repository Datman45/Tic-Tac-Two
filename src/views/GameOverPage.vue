<script setup lang="ts">
import router from '@/router';
import { useUserDataStore } from '@/stores/userDataStore';

const store = useUserDataStore();


if (!store.userName && !store.password) {
  router.push({ name: 'Home' });
}
</script>

<template>
  <div id="winner" v-if="store.winner">winner player: {{ store.winner }}</div>

  <div id="gameOver">Game Over</div>
</template>

<style></style>
