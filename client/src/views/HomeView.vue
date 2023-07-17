<template>
  <div v-if="session.user">
    <div class="columns is-centered">
      <Problems class="column is-two-thirds" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Problems from "../components/Problems.vue";
import session from "../stores/session";
import { reAuthenticate } from "../stores/session";
import router from "../router";

if (session.user == null) {
  reAuthenticate().then((result) => {
    if (!result) {
      router.push("/login");
    }
  });
}
</script>

<style scoped>
.columns {
  margin: 0px;
}
.column {
  margin: 0px;
}
</style>
