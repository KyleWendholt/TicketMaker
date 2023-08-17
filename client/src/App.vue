<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import NewTicketModal from "./components/NewTicketModal.vue";
import session from "./stores/session";
import { ref } from "vue";

const hasNav = ref(true);
const newTicketsActive = ref(false);
</script>

<template>
  <div :class="session.theme">
    <header>
      <NavBar v-if="hasNav" @new-ticket="newTicketsActive = true" />
    </header>
    
    <router-view @hideNav="hasNav = false" />

    <new-ticket-modal :is-active="newTicketsActive" v-if="session.user" @close="newTicketsActive = false" />
  </div>
</template>

<style scoped></style>
