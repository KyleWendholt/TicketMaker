<template>
  <div class="panel">
    <p class="panel-heading">Problems</p>
    <div>
      <TicketComponent v-for="ticket in problemTickets" :ticket="ticket" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import TicketComponent from "./Ticket.vue";
import { Ticket } from "../stores/tickets";
import { getProblemTickets } from "../stores/tickets";
import session from "../stores/session";
import { reAuthenticate } from "../stores/session";

const problemTickets = reactive([] as Ticket[]);
updateTickets();

function updateTickets() {
  getProblemTickets().then((tickets) => {
    if (session.error && session.error.status === 403) {
      if (reAuthenticate()) {
        console.log("reauthenticated");
        updateTickets();
      }
    }
    if (tickets.list) {
      problemTickets.splice(0, problemTickets.length, ...tickets.list);
    }
  });
}
</script>

<style scoped></style>
