<template>
  <div class="panel">
    <div class="panel-heading">
      <div class="has-text-centered level">
        <p class="level-item">{{ title }}</p>
        <a @click="$emit('refresh')" class="icon">
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
    <p class="panel-tabs" v-if="needsTabs">
      <a v-for="tab in tabs" @click="selectTab(tab)">
        {{ tab }}
      </a>
      
    </p>
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
import { defineProps, defineEmits, ref, } from "vue";

defineEmits(["refresh"]);

const props = defineProps<{
  title: string;
  tickets: Ticket[];
  showRequester?: boolean;
}>();

const needsTabs = props.tickets.length > 5;
console.log(props.tickets.length);


const tabs = ref(
  props.tickets.length % 5 === 0
    ? Array.from(Array(props.tickets.length / 5).keys())
    : Array.from(Array(Math.floor(props.tickets.length / 5) + 1).keys())
);

let visibleTickets = ref(props.tickets.slice(0, 5));

function selectTab(tab: number) {
  visibleTickets.value = props.tickets.slice(tab-1 * 5, tab-1 * 5 + 5);
}
</script>

<style scoped>
.column-headers {
  font-size: medium;
}
.icon {
  color: black;
}
</style>
