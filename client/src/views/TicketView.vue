<template>
  <div v-if="ticket">
    <h1 class="title">{{ ticket.title  }}</h1>
    <h2 class="subtitle">{{ ticket.requestorEmail }}</h2>
    <h2 class="subtitle">responsible</h2>
    <h2>time</h2>
    <h2>status</h2>
    <h2>content</h2>
    <h2>{{ticket}}</h2>
  </div>
  <div v-else-if="session.loading">
    <h1 class="title">Loading...</h1>
  </div>
  <div v-else>
    <h1 class="title">Ticket id:{{ id }} not found</h1>
    {{ session.error }}{{ ticket }}
  </div>
</template>

<script setup lang="ts">
import session from '../stores/session';
import { getTicket } from '../stores/tickets';
import { reAuthenticate, REFRESH_INTERVAL } from '../stores/session';
import { Ticket } from '../stores/tickets';
import { reactive, ref } from 'vue';
import EditTicketModal from '../components/EditTicketModal.vue';

const ticket = ref<Ticket | null>(null);

const props = defineProps<{
    id: string;
}>()

const emit = defineEmits(['setTicketNav']);
emit('setTicketNav');

if (!session.user) {
    reAuthenticate().then((result) => {
        if (result) {
            loadPage();
        }
    });
} else {
    loadPage();
}
async function loadPage() {
    await updateTicket();
    if (session.error && session.error.status === 403) {
        reAuthenticate().then((result) => {
            if (result) {
                loadPage();
            }
        });
    }
}
async function updateTicket() {
    const result = await getTicket(props.id);
    if (result) ticket.value = result;
}
</script>

<style scoped></style>
