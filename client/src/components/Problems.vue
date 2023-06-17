<template>
  <div class="panel">
    <p class="panel-heading">Problems</p>
    <div>
      <TicketComponent v-for="ticket in problemTickets" :ticket="ticket" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import TicketComponent from './Ticket.vue'
import { Ticket } from '../stores/tickets';
import { getProblemTickets } from '../stores/tickets';

const problemTickets = reactive([] as Ticket[]);
updateTickets();

function updateTickets() {
  getProblemTickets().then((tickets) => {
    problemTickets.splice(0, problemTickets.length, ...tickets.list);
  });
}
</script>

<style scoped>

</style>