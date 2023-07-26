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
    <p class="panel-tabs" v-if="tabs > 1">
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
import { defineProps, defineEmits, ref, reactive } from "vue";
import { ListEnvelope } from "../stores/session";

defineEmits(["refresh"]);

const props = defineProps<{
  title: string;
  ticketEnvelope: ListEnvelope<Ticket>;
  showRequester?: boolean;
  sizeOfTabs: number;
}>();

console.log("props");
console.log(props);

console.log("props.ticketEnvelope");
console.log(props.ticketEnvelope);

const tickets = reactive(props.ticketEnvelope.list);

console.log('ticketEnvelope.total');
console.log(props.ticketEnvelope.total);

const tabs = props.ticketEnvelope.total / props.sizeOfTabs;
console.log("tabs");
console.log(tabs);

function selectTab(tab: number) {
  tickets.splice(
    0,
    tickets.length,
    ...props.ticketEnvelope.list.slice(
      tab * props.sizeOfTabs,
      (tab + 1) * props.sizeOfTabs
    )
  );
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
