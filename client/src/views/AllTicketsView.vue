<template>
  <div v-if="session.user">
    <div class="columns is-centered">
      <TicketsContainer
        :size-of-tabs="50"
        :tickets="allTicketsEnvelope.list"
        title="All Tickets"
        class="column is-two-thirds"
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
updateTickets();

function updateTickets() {
  getTickets().then((tickets) => {
    console.log("ticfsad;ljsadkjlkets");
    console.log(tickets);
    if (session.error && session.error.status === 403) {
      reAuthenticate().then((result) => {
        if (result) {
          updateTickets();
        }
        else {
          logout();
          router.push("/login");
        }
      });
    }
    if (tickets.list) {
      allTicketsEnvelope.value = tickets;
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
