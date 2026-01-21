<script setup lang="ts">
import router from '@/router';
import LoginPage from '../views/LoginPage.vue';
import { useUserDataStore } from '@/stores/userDataStore'

const store = useUserDataStore();

if (!store.userName && !store.password) {
  router.push({ name: 'Home' });
}

</script>

<template>
  <div v-if="store.userName.length > 0">
    Welcome to Home Page, {{ store.userName }} <br />
  </div>
  <div v-else>
    <LoginPage />
  </div>
</template>
