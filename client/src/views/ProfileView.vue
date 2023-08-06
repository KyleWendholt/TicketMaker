<template>
  <div v-if="session.user">
    <div class="panel">
      <div class="panel-heading">
        <div class="has-text-centered level">
          <p class="level-item">Profile</p>
        </div>
      </div>
      <UserComponent :user="session.user!" />

    </div>
  </div>
</template>

<script setup lang="ts">
import session, { reAuthenticate } from "../stores/session";
import UserComponent from "../components/User.vue";
import router from "../router";

if (!session.user) {
  reAuthenticate().then((result) => {
    if (!result) {
      router.push("/login");
    }
  });
}
</script>

<style scoped></style>
