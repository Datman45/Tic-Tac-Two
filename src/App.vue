<script setup lang="ts">
import Header from './navigation/HeaderNav.vue'
import Footer from './navigation/FooterNav.vue'
</script>

<template>
  <div class="app-wrapper">
    <Header />

    <main class="containerBox">
      <RouterView />
    </main>

    <Footer />
  </div>
</template>

<style>
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.containerBox {
  flex: 1;
}
</style>
