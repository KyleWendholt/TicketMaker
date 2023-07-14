<template>
  <nav
    class="navbar is-fixed-top secondary-color"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <span class="navbar-item" href="">
        <font-awesome-icon icon="ticket" />
      </span>

      <a
        :class="{ 'is-active': isMenuActive }"
        @click="isMenuActive = !isMenuActive"
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div
      id="navbarContent"
      class="navbar-menu"
      :class="{ 'is-active': isMenuActive }"
    >
      <div class="navbar-start">
        <router-link to="/" class="navbar-item"> Home </router-link>

        <router-link class="navbar-item" to="/tickets"> All Tickets </router-link>

        <router-link class="navbar-item" to="/profile"> Profile </router-link>

        <router-link
          v-if="session.user?.role === 'Admin'"
          class="navbar-item"
          to="/admin"
        >
          Admin
        </router-link>

        <a
          class="navbar-item"
          v-if="session.user"
          @click="
            newTicketsActive = true;          "
        >
          New Ticket
        </a>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a
              v-if="session.user"
              class="button is-primary"
              @click="logout()"
            >
              <strong>Logout</strong>
            </a>
            <router-link v-else class="button is-primary" to="/login">
              <strong>Login</strong>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <new-ticket-modal
  :is-active="newTicketsActive"
  v-if="session.user"
  @close="newTicketsActive = false"/>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import session from "../stores/session";
import { logout } from "../stores/session";
import NewTicketModal from "./NewTicketModal.vue";

const newTicketsActive = ref(false);
const isMenuActive = ref(false);



</script>

<style scoped>

</style>
