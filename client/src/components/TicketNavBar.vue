<template>
  <nav
    class="navbar is-fixed-top"
    role="navigation"
    aria-label="main navigation"
  >
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

    <div
      id="navbarContent"
      class="navbar-menu"
      :class="{ 'is-active': isMenuActive }"
      >      <div class="navbar-start">
        <a @click='open' class='navbar-item'>Update</a>
        <a class='navbar-item'>Edit</a>
        <a class='navbar-item'>Assign</a>
        <a class='navbar-item'>Refresh</a>
      </div>

        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { setTheme } from "../stores/session";
import session from "../stores/session";
import { logout } from "../stores/session";

const isMenuActive = ref(false);
const themeDropdown = ref(false);

defineEmits(["new-ticket"]);
</script>

<style scoped>
a {
  user-select: none;
}
</style>
