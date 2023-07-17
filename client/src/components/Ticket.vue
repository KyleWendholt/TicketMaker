<template>
  <div class="columns">
    <div class="column">
      <a @click="openTicket(ticket._id)">{{ ticket._id }}</a>
    </div>
    <div class="column">{{ ticket.title }}</div>
    <div class="column">{{ ticket.status }}</div>
    <div class="column">{{ ticket.responsibility }}</div>
    <div class="column">{{ ticket.timestamp }}</div>
  </div>
</template>

<script setup lang="ts">
import { Ticket } from "../stores/tickets";

const emit = defineEmits(["openTicket"]);

defineProps<{
  ticket: Ticket;
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
