<script setup lang="ts">
import { ref } from 'vue'

import { useUserDataStore } from '../stores/userDataStore.ts'

const store = useUserDataStore()

const userName = ref('')
const password = ref('')
const gameMode = ref('')

const doLogin = () => {
  if (userName.value.length > 0 && password.value.length > 0 && gameMode.value) {
    store.userName = userName.value
    store.password = password.value
    store.gameMode = gameMode.value
  }
}
</script>

<template>
  <div class="form-container">
    <form @submit.prevent="doLogin">
      <div class="form-floating mb-3">
        <input v-model="userName" type="username" class="form-control" id="floatingInput"
          placeholder="name@example.com" />
        <label for="floatingInput">Username</label>
      </div>
      <div class="form-floating">
        <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password" />
        <label for="floatingPassword">Password</label>
      </div>
      <div class="mb-2 mt-2">Select Game Mode:</div>
      <div class="form-check">
        <div>
          <input v-model="gameMode" class="form-check-input" type="radio" name="gameMode" id="humanVsHuman"
            value="humanVsHuman" />
          <label class="form-check-label" for="humanVsHuman"> Human Vs Human </label>
        </div>
        <div>
          <input v-model="gameMode" class="form-check-input" type="radio" name="gameMode" id="humanVsAi"
            value="humanVsAi" />
          <label class="form-check-label" for="humanVsAi"> human Vs Ai </label>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<style>
.form-floating {
  width: 300px;
}

.form-container {
  max-width: 400px;
  margin: 0 auto;
}
</style>
