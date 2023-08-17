<template>
  <div class="columns">
    <div class="column" >
      <a @click="openTicketWin(ticket._id)">{{ ticket.title }}</a></div>
    <div v-if="showStatus" class="column is-2">{{ ticket.status }}</div>
    <div v-if="showRequester" class="column">{{ ticket.requestorEmail }}</div>
    <div v-if="showResponsibility" class="column">{{ ticket.responsibility }}</div>
    <div class="column is-2">{{ getDate(ticket.timestamp) }}</div>
  </div>
</template>

<script setup lang="ts">
import { Ticket, openTicketWin } from "../stores/tickets";

const emit = defineEmits(["openTicket"]);

function getDate(timestamp: Date) {
  timestamp = new Date(timestamp);
  const today = new Date();
  const isSameDate =
    timestamp.getDate() === today.getDate() &&
    timestamp.getMonth() === today.getMonth() &&
    timestamp.getFullYear() === today.getFullYear();
  if (isSameDate) {
    return timestamp.toLocaleTimeString();
  }
  else {
    return timestamp.toLocaleDateString();
  }
}

defineProps<{
  ticket: Ticket;
  showRequester?: boolean;
  showResponsibility?: boolean;
  showStatus?: boolean;
}>();


</script>

<style scoped>
.columns {
  margin: 0px;
}
div {
  word-wrap: break-word;
}
</style>
