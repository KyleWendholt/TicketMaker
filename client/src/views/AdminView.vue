<template>
  <div v-if="session.user && session.user.role == 'Admin'">
    <UserComponent/>
  </div>
  <div v-else>
    <h1 class="title">You are not authorized to view this page.</h1>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import session from "../stores/session";
import { User, getUsers } from "../stores/users";
import { reAuthenticate } from "../stores/session";
import UserComponent from "../components/User.vue";


const users = reactive([] as User[]);
updateUsers();



function updateUsers() {
  getUsers().then((result) => {
    if (session.error && session.error.status === 403) {
      if (reAuthenticate()) {
        console.log("reauthenticated");
        updateUsers();
      }
    }
    if (result.list){
      users.splice(0, users.length, ...result.list);    
    }
  });
  }
</script>

<style scoped>

</style>