<template>
  <div class="panel">
    <div class="panel-heading">
      <div class="has-text-centered level">
        <p class="level-item">{{ title }}</p>
        <a  @click="$emit('refresh')" class="icon">
          <font-awesome-icon :icon="['fas', 'arrows-rotate']"
        /></a>
      </div>
      <div class="columns column-headers">
        <div class="column">Id</div>
        <div class="column">Title</div>
        <div class="column">Status</div>
        <div v-if="showRequester" class="column">Requester</div>
        <div class="column">Responsibility</div>
        <div class="column">Created</div>
      </div>
    </div>
    <TicketComponent
      v-for="ticket in tickets"
      :ticket="ticket"
      class="panel-block"
      :showRequester="showRequester"
    />
  </div>
</template>

<script setup lang="ts">
import TicketComponent from "./Ticket.vue";
import { Ticket } from "../stores/tickets";

defineEmits(["refresh"]);

defineProps<{
  title: string;
  tickets: Ticket[];
  showRequester?: boolean;
}>();
</script>

<style scoped>
.column-headers {
  font-size: medium;
}
.icon {
  color: black;
}
</style>
