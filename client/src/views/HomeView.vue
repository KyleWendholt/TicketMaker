<template>
  <div v-if="session.user">
    <div class="columns is-centered">
      <TicketsContainer :tickets="problemTickets" title="Problems" class="column is-two-thirds" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import TicketsContainer from "../components/TicketsContainer.vue";
import session from "../stores/session";
import { reAuthenticate } from "../stores/session";
import router from "../router";
import { Ticket, getProblemTickets } from "../stores/tickets";


if (session.user == null) {
  reAuthenticate().then((result) => {
    if (!result) {
      router.push("/login");
    }
  });
}

const problemTickets = reactive([] as Ticket[]);
updateTickets();

function updateTickets() {
  getProblemTickets().then((tickets) => {
    if (session.error && session.error.status === 403) {
      reAuthenticate().then((result) => {
        if (result) {
          updateTickets();
        }
      });
    }
    if (tickets.list) {
      problemTickets.splice(0, problemTickets.length, ...tickets.list);
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
