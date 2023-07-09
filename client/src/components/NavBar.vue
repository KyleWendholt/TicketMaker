<template>
  <nav
    class="navbar is-fixed-top secondary-color"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img src="" width="112" height="28" />
      </a>

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

        <router-link class="navbar-item" to="/profile"> Profile </router-link>
          <router-link
            v-if="session.user?.isAdmin"
            class="navbar-item"
            to="/admin"
          >
            Admin
          </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link
              v-if="session.user"
              class="button is-primary"
              to="/logout"
            >
              <strong>Logout</strong>
            </router-link>
            <router-link v-else class="button is-primary" to="/login">
              <strong>Login</strong>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import session from "../stores/session";

let isMenuActive = ref(false);
</script>

<style scoped></style>
