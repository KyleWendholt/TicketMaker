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
        <div class="column">Title</div>
        <div v-if="showStatus" class="column is-2">Status</div>
        <div v-if="showRequester" class="column">Requester</div>
        <div v-if="showResponsibility" class="column">Responsibility</div>
        <div class="column is-2">Created</div>
      </div>
    </div>
    <p class="panel-tabs" v-if="ticketsPerTab < ticketsEnvelope.total">
      <a
        v-for="n in getNumTabs(ticketsPerTab, ticketsEnvelope.total)"
        :class="{ 'is-active': currentTab === n }"
        @click="currentTab = n"
      >
        {{ n }}
      </a>
    </p>
    <TicketComponent
      v-for="ticket in getVisTickets(
        ticketsEnvelope.list,
        ticketsPerTab,
        currentTab
      )"
      :ticket="ticket"
      class="panel-block"
      :showRequester="showRequester"
      :showResponsibility="showResponsibility"
      :showStatus="showStatus"
    />
  </div>
</template>

<script setup lang="ts">
import TicketComponent from "./Ticket.vue";
import { Ticket } from "../stores/tickets";
import { defineProps, defineEmits, ref, reactive } from "vue";
import { ListEnvelope } from "../stores/session";

// const props = defineProps<{
//   title: string;
//   ticketsEnvelope: ListEnvelope<Ticket>;
//   showRequester?: boolean;
//   showResponsibility?: boolean;
//   ticketsPerTab: number;
// }>();

const props = defineProps({
  title: {
    type: String,
    default: "Tickets",
  },
  ticketsEnvelope: {
    type: Object as () => ListEnvelope<Ticket>,
    required: true,
  },
  showRequester: {
    type: Boolean,
    default: true,
  },
  showResponsibility: {
    type: Boolean,
    default: true,
  },
  showStatus: {
    type: Boolean,
    default: true,
  },
  ticketsPerTab: {
    type: Number,
    default: 10,
  },
});

function getNumTabs(tabsize: number, total: number) {
  return Math.ceil(total / tabsize);
}

const currentTab = ref(1);

function getVisTickets(
  ticketList: Ticket[],
  tabsize: number,
  currentTab: number
) {
  return ticketList.slice((currentTab - 1) * tabsize, currentTab * tabsize);
}
</script>

<style scoped>
.column-headers {
  font-size: medium;
}
</style>
