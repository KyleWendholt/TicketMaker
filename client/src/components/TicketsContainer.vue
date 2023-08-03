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
    <p class="panel-tabs" v-if="sizeOfTabs<ticketsEnvelope.total">
      <a v-for="n in getNumTabs(sizeOfTabs, ticketsEnvelope.total)" :class="{ 'is-active': currentTab===n}" @click="currentTab = n;" >
        {{n}}
      </a>
    </p>
    <TicketComponent
      v-for="ticket in getVisTickets(ticketsEnvelope.list, sizeOfTabs, currentTab)"
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

const props = defineProps<{
  title: string;
  ticketsEnvelope: ListEnvelope<Ticket>;
  showRequester?: boolean;
  sizeOfTabs: number;
}>();

function getNumTabs(tabsize: number, total: number) {
  return Math.ceil(total / tabsize);
}

const currentTab = ref(1);


function getVisTickets(ticketList: Ticket[], tabsize: number, currentTab: number) {
  return ticketList.slice((currentTab - 1) * tabsize, currentTab * tabsize) ;
}

</script>

<style scoped>
.column-headers {
  font-size: medium;
}
</style>
