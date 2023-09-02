<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import NewTicketModal from "./components/NewTicketModal.vue";
import session from "./stores/session";
import { ref } from "vue";
import TicketNavBar from './components/TicketNavBar.vue';

const ticketNav = ref(false);
const newTicketsActive = ref(false);

</script>

<template>
  <div :class="session.theme">
    <header>
      <NavBar v-if="!ticketNav" @new-ticket="newTicketsActive = true" />
      <TicketNavBar v-else />
    </header>
    
    <router-view @setTicketNav="ticketNav = true" />

    <new-ticket-modal :is-active="newTicketsActive" v-if="session.user" @close="newTicketsActive = false" />
  </div>
</template>

<style scoped></style>
