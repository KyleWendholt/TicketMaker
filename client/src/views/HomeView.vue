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
import session, { ListEnvelope } from "../stores/session";
import { reAuthenticate } from "../stores/session";
import router from "../router";
import {
  Ticket,
  getProblemTickets,
  getTicketsByResponsibility,
} from "../stores/tickets";

if (session.user == null) {
  reAuthenticate().then((result) => {
    if (!result) {
      router.push("/login");
    }
  });
}

const problemTickets = ref<ListEnvelope<Ticket>>({
  list: [],
  total: 0,
});
updateProblemTickets();

const responsibleTickets = ref<ListEnvelope<Ticket>>({
  list: [],
  total: 0,
});
updateResponsibleTickets();

function updateProblemTickets() {
  getProblemTickets().then((tickets) => {
    if (session.error && session.error.status === 403) {
      reAuthenticate().then((result) => {
        if (result) {
          updateProblemTickets();
        }
      });
    }
    if (tickets.list) {
      problemTickets.value = tickets;
    }
  });
}
function updateResponsibleTickets() {
  getTicketsByResponsibility().then((tickets) => {
    if (session.error && session.error.status === 403) {
      reAuthenticate().then((result) => {
        if (result) {
          updateResponsibleTickets();
        }
      });
    }
    if (tickets.list) {
      responsibleTickets.value = tickets;
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
.is-parent {
  height: fit-content;
}
</style>
