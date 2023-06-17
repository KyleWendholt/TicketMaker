<template>
  <div>
    <div class="columns">
      <div class="column">{{ ticket._id }}</div>
      <div class="column">{{ticket.title}}</div>
      <div class="column">{{ticket.status}}</div>
      <div class="column">{{ticket.responsibility}}</div>
      <div class="column">{{ticket.timestamp}}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ticket } from '../stores/tickets';

const props = defineProps<{
  ticket: Ticket;
}>();


</script>

<style scoped>
.columns {
  margin: 0px;
}
</style>