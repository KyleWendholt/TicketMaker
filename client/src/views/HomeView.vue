<template>
  <div class="columns is-centered">
    <Problems class="column is-two-thirds" />
  </div>
  <div class="modal" :class="{'is-active': newTicketModal}">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="field">
        <label class="label">Title</label>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="Title"
            v-model="title"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Requestor</label>
        <div class="control has-icons-left">
          <input
            class="input"
            type="text"
            placeholder="Requestor"
            v-model="requestor"
          />
          <span class="icon is-small is-left">
            <font-awesome-icon icon="envelope" />
          </span>
        </div>
      </div>

      

      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <textarea
            class="textarea"
            placeholder="Description"
            v-model="description"
          ></textarea>
        </div>
      </div>


      <div class="field">
        <label class="label">Priority</label>
        <div class="control">
          <div class="select">
            <select>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>
      </div>


      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link">Submit</button>
        </div>
        <div class="control">
          <button class="button is-link is-light">Cancel</button>
        </div>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close"></button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Problems from "../components/Problems.vue";

const title = ref("");
const requestor = ref("");
const description = ref("");
const priority = ref("");
const status = ref("");
const responsibility = ref("");

const newTicketModal = ref(false);
</script>

<style scoped>
.columns {
  margin: 0px;
}
.column {
  margin: 0px;
}
.modal-content {
  width: 50%;
  background-color: white;
}
</style>
