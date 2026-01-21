<script setup lang="ts">
import { useUserDataStore } from '@/stores/userDataStore';
import FullGame from '../components/FullGame.vue';
import router from '@/router';

const store = useUserDataStore()

if (!store.userName && !store.password) {
  router.push({ name: 'Home' });
}
</script>

<template>
  <div v-if="store.gameMode === 'humanVsHuman'" id="gameModeTitle"> Game Mode: Human vs Human</div>
  <FullGame v-if="store.gameMode === 'humanVsHuman'" />
  <div v-if="store.gameMode === 'humanVsAi'" id="gameModeTitle"> Game Mode: Human vs Ai</div>
  <FullGame v-if="store.gameMode === 'humanVsAi'" />
</template>

<style></style>
