<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import NewTicketModal from "./components/NewTicketModal.vue";
import session from "./stores/session";
import { ref } from "vue";

const newTicketsActive = ref(false);
</script>

<template>
  <div :class="session.theme">
    <header><NavBar @new-ticket="newTicketsActive = true" /></header>

    <RouterView class="body"/>

    <new-ticket-modal
      :is-active="newTicketsActive"
      v-if="session.user"
      @close="newTicketsActive = false"
    />
  </div>
</template>

<style scoped></style>
