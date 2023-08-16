<template>
  <div class="container">
    <form class="box" @submit.prevent="attemptLogin()">
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input class="input" type="text" v-model="email" placeholder="Email">
        </div>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input class="input" type="password" v-model="password" placeholder="Password">
        </div>
      </div>
      <div class="field">
        <p class="help is-danger">{{ errorMessage }}</p>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-link" :class="{'is-loading': session.loading}">Login</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { login } from '../stores/session';
import session from '../stores/session';
import router from '../router';

const errorMessage = ref("");

if (session.user) {
    router.push("/");
}

function attemptLogin() {
  login(email.value, password.value).then((res) => {
    if (!res && session.error?.status === 403) {
      errorMessage.value = "Invalid email or password";
    }
  })
}

const password = ref("");
const email = ref("");
</script>

<style scoped>

</style>