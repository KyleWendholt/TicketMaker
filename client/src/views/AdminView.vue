<template>
  <div v-if="isAdmin">
    <h1 class="title">Users</h1>
    <UserComponent v-for="user in users" :user="user" />
  </div>
  <div v-else>
    <h1 class="title">You are not authorized to view this page.</h1>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import session from "../stores/session";
import { User, getUsers } from "../stores/users";
import { reAuthenticate } from "../stores/session";
import UserComponent from "../components/User.vue";
import router from "../router";
const users = reactive([] as User[]);

if (session.user == null) {
  reAuthenticate().then((result) => {
    if (!result) {
      router.push("/login");
    }
    else {
      updateUsers();
    }
  });
} else {
  updateUsers();
}

const isAdmin = computed(() => {
  if (session.user) {
    console.log(session.user)
    return session.user.roles.includes("Admin");
  }
  return false;
});

function updateUsers() {
  getUsers().then((result) => {
    console.log("getting users");
    if (session.error && session.error.status === 403) {
      reAuthenticate().then((result) => {
        if (result) {
          //recall parent function
          updateUsers();
        }
      });
    }
    if (result.list) {
      users.splice(0, users.length, ...result.list);
    }
  });
}
</script>

<style scoped></style>
