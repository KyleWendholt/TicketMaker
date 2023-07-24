<template>
  <div class="tile is-ancestor" v-if="session.user">
    <div class="tile is-parent">
      <TicketsContainer @refresh="updateProblemTickets()" :tickets="problemTickets" title="Problems" class="tile is-child" />
    </div>
    <div class="tile is-parent">
      <TicketsContainer @refresh="updateResponsibleTickets()" :tickets="responsibleTickets" title="For You" class="tile is-child" />
    </div>
  </div>

</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import TicketsContainer from "../components/TicketsContainer.vue";
import session from "../stores/session";
import { reAuthenticate } from "../stores/session";
import router from "../router";
import { Ticket, getProblemTickets, getTicketsByResponsibility } from "../stores/tickets";

if (session.user == null) {
  reAuthenticate().then((result) => {
    if (!result) {
      router.push("/login");
    }
  });
}

const problemTickets = reactive([] as Ticket[]);
updateProblemTickets();

const responsibleTickets = reactive([] as Ticket[]);
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
      problemTickets.splice(0, problemTickets.length, ...tickets.list);
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
      responsibleTickets.splice(0, problemTickets.length, ...tickets.list);
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
.is-parent{
  height: fit-content;
}
</style>
