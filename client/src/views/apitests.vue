<template>
  <div>
    <h1>API Tests</h1>
    <form class="box" @submit.prevent="login(username, password).then(x => {
    session.token = x.accessToken;
  });">
      <div class="field">
        <label class="label">Username</label>
        <div class="control">
          <input class="input" type="text" v-model="username" placeholder="Username">
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
    <form class="box" @submit.prevent="registerUser()">
      <div class="field">
        <label class="label">Username</label>
        <div class="control">
          <input class="input" type="text" v-model="username" placeholder="Username">
        </div>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input class="input" type="password" v-model="password" placeholder="Password">
        </div>
      </div>
      <div class="field">
        <label class="label">First Name</label>
        <div class="control">
          <input class="input" type="text" v-model="firstName" placeholder="Firstname">
        </div>
      </div>
      <div class="field">
        <label class="label">lastName</label>
        <div class="control">
          <input class="input" type="text" v-model="lastName" placeholder="lastname">
        </div>
      </div>
      <div class="field">
        <label class="label">role</label>
        <div class="control">
          <input class="input" type="text" v-model="role" placeholder="role">
        </div>
      </div>
      <div class="field">
        <label class="label">profilePic</label>
        <div class="control">
          <input class="input" type="text" v-model="profilePic" placeholder="Profile Pic">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-link">register</button>
        </div>
      </div>
    </form>
    <form class="box" @submit.prevent="getTickets()">
    <button class="button is-link">Tickets</button>
    </form>
    <form class="box" @submit.prevent="
    refreshToken().then(x => {
      session.token = x.accessToken;
    });"
    >
    <button class="button is-link">Refresh Token</button>
    </form>
  </div>
  
</template>

<script setup lang="ts">
import { getTickets } from '../stores/tickets';
import { ref } from 'vue';
import { login, refreshToken, register } from '../stores/session';
import session from '../stores/session';

const password = ref("");
const username = ref("");
const profilePic = ref("");
const role = ref("");
const firstName = ref("");
const lastName = ref("");


function registerUser() {
  register({username:username.value, password:password.value, profilePic:profilePic.value,role:role.value,firstname:firstName.value,lastname:lastName.value,_id:null}).then(x => {
    session.token = x.accessToken;
  });
}

</script>

<style scoped>

</style>