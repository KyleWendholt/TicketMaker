<template>
  <div v-if="session.user">
    <h1>Profile</h1>
    <UserComponent :user="session.user!" />
  </div>
</template>

<script setup lang="ts">
import session, { reAuthenticate } from "../stores/session";
import UserComponent from "../components/User.vue";
import router from "../router";

if (session.user == null) {
  reAuthenticate().then((result) => {
    if (!result) {
      router.push("/login");
    }
  });
}
</script>

<style scoped></style>
