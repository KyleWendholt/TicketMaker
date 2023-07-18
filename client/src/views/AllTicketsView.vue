<template>
  <div v-if="session.user">
    <div class="columns is-centered">
      <TicketsContainer :tickets="allTickets" title="All Tickets" class="column is-two-thirds" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import TicketsContainer from "../components/TicketsContainer.vue";
import session from "../stores/session";
import { reAuthenticate } from "../stores/session";
import router from "../router";
import { Ticket, getTickets } from "../stores/tickets";


if (session.user == null) {
  reAuthenticate().then((result) => {
    if (!result) {
      router.push("/login");
    }
  });
}

const allTickets = reactive([] as Ticket[]);
updateTickets();

function updateTickets() {
  getTickets().then((tickets) => {
    if (session.error && session.error.status === 403) {
      reAuthenticate().then((result) => {
        if (result) {
          updateTickets();
        }
      });
    }
    if (tickets.list) {
      allTickets.splice(0, allTickets.length, ...tickets.list);
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