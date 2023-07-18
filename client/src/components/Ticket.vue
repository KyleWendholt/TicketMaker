<template>
  <div class="columns">
    <div class="column">
      <a @click="openTicket(ticket._id)">{{ ticket._id }}</a>
    </div>
    <div class="column">{{ ticket.title }}</div>
    <div class="column">{{ ticket.status }}</div>
    <div v-if="showRequester" class="column">{{ ticket.requestorEmail }}</div>
    <div class="column">{{ ticket.responsibility }}</div>
    <div class="column">{{ getDate(ticket.timestamp) }}</div>
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
}>();

function openTicket(id: string) {
  emit("openTicket", id);
}
</script>

<style scoped>
.columns {
  margin: 0px;
}
</style>
