<template>
  <div class="tile is-ancestor" v-if="session.user">
    <div class="tile is-parent">
      <TicketsContainer
        :tickets-envelope="problemTickets"
        :tickets-per-tab="5"
        title="Problems"
        class="tile is-child"
        :show-responsibility="true"
      />
    </div>
    <div class="tile is-parent">
      <TicketsContainer
        :tickets-envelope="responsibleTickets"
        :tickets-per-tab="5"
        title="Responsible"
        class="tile is-child"
        :show-requester="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import TicketsContainer from "../components/TicketsContainer.vue";
import session, { ListEnvelope, logout } from "../stores/session";
import { reAuthenticate } from "../stores/session";
import router from "../router";
import {
  Ticket,
  getProblemTickets,
  getTicketsByResponsibility,
} from "../stores/tickets";

const problemTickets = ref<ListEnvelope<Ticket>>({
  list: [],
  total: 0,
});

const responsibleTickets = ref<ListEnvelope<Ticket>>({
  list: [],
  total: 0,
});

if (!session.user) {
  reAuthenticate().then((result) => {
    if (result) {
      loadPage();
    }
  });
} else {
  loadPage();
}
async function loadPage() {
  await updateProblemTickets();
  await updateResponsibleTickets();
  if (session.error && session.error.status === 403) {
    reAuthenticate().then((result) => {
      if (result) {
        loadPage();
      }
    });
  }
}

async function updateProblemTickets() {
  const result = await getProblemTickets();
  if (result.list) problemTickets.value = result;
}
async function updateResponsibleTickets() {
  const result = await getTicketsByResponsibility();
  if (result.list) responsibleTickets.value = result;
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
