<template>
  <div class="columns">
    <div class="column">{{ user.email }}</div>
    <div class="column">{{ user.firstname }} {{ user.lastname }}</div>
    <div class="column">{{ user.roles }}</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { User } from "../stores/users";

defineProps<{
  user: User;
}>();

</script>

<style scoped></style>
