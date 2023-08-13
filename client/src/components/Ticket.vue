<template>
  <div class="columns">
    <div class="column" @click="openTicket(ticket._id)">
      <a>{{ ticket.title }}</a></div>
    <div v-if="showStatus" class="column is-2">{{ ticket.status }}</div>
    <div v-if="showRequester" class="column">{{ ticket.requestorEmail }}</div>
    <div v-if="showResponsibility" class="column">{{ ticket.responsibility }}</div>
    <div class="column is-2">{{ getDate(ticket.timestamp) }}</div>
  </div>
</template>

<script setup lang="ts">
import { Ticket } from "../stores/tickets";

const emit = defineEmits(["openTicket"]);

function getDate(timestamp: Date) {
  timestamp = new Date(timestamp);
  if (timestamp.getDate() === new Date().getDate()) {
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

function openTicket(id: string) {
  emit("openTicket", id);
}
</script>

<style scoped>
.columns {
  margin: 0px;
}
div {
  word-wrap: break-word;
}
</style>
