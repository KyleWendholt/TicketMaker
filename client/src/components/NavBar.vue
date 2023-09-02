<template>
    <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="https://github.com/KyleWendholt/TicketMaker">
                <font-awesome-icon icon="ticket" />
            </a>

            <a :class="{ 'is-active': isMenuActive }" @click="isMenuActive = !isMenuActive" role="button"
                class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbarContent" class="navbar-menu" :class="{ 'is-active': isMenuActive }">
            <div class="navbar-start">
                <router-link to="/" class="navbar-item"> Home </router-link>

                <router-link class="navbar-item" to="/tickets">
                    All Tickets
                </router-link>

                <router-link class="navbar-item" to="/profile"> Profile </router-link>

                <router-link v-if="session.user?.roles.includes('Admin')" class="navbar-item" to="/admin">
                    Admin
                </router-link>

                <a class="navbar-item" v-if="session.user" @click="$emit('new-ticket')">
                    New Ticket
                </a>
            </div>

            <div class="navbar-end">
                <!-- 
          for themeing, not currently working on
          <div
          class="navbar-item has-dropdown"
          :class="{ 'is-active': themeDropdown }"
        >
          <a class="navbar-link" @click="themeDropdown = !themeDropdown"
            >Current theme: {{ session.theme }}</a
          >
          <div class="navbar-dropdown">
            <a
              class="navbar-item"
              :class="{ 'is-active': theme === session.theme }"
              @click="
                setTheme(theme);
                themeDropdown = !themeDropdown;
              "
              v-for="theme in session.themes"
            >
              {{ theme }}
            </a>
          </div>
        </div> -->

                <div class="navbar-item">
                    <div class="buttons">
                        <button v-if="session.user" class="button is-danger" @click="logout()">
                            <strong>Logout</strong>
                        </button>
                    </div>
                </div>
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
