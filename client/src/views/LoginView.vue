<template>
  <div class="container">
    <form class="box" @submit.prevent="login(email,password)">
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
        <div class="control">
          <button class="button is-link">Login</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { login } from '../stores/session';
import session from '../stores/session';

const password = ref("");
const email = ref("");
</script>

<style scoped>

</style>