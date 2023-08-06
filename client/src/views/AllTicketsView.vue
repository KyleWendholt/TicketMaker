<template>
  <div class="tile is-ancestor" v-if="session.user">
    <div class="tile is-parent">
      <TicketsContainer
        :tickets-per-tab="25"
        :tickets-envelope="allTicketsEnvelope"
        title="All Tickets"
        class="tile is-child"
        :show-requester="true"
        :show-responsibility="true"
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
import { Ticket, getTickets } from "../stores/tickets";

const allTicketsEnvelope = ref<ListEnvelope<Ticket>>({
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
  await updateTickets();
  if (session.error && session.error.status === 403) {
    reAuthenticate().then((result) => {
      if (result) {
        loadPage();
      }
    });
  }
}

async function updateTickets() {
  const result = await getTickets();
  if (result.list) {
    allTicketsEnvelope.value = result;
  }
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
