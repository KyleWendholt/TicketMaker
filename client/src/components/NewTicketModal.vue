<template>
  <div class="modal" :class="{ 'is-active': isActive }">
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
        <label class="label">Responsible</label>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="Department"
            v-model="responsibility"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Status</label>
        <div class="control">
          <div class="select">
            <select v-model="status">
              <option>Resolved</option>
              <option selected="true">New</option>
              <option>In Process</option>
            </select>
          </div>
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
            <select v-model="priority">
              <option>High</option>
              <option selected="true">Medium</option>
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
          <button
            class="button is-link is-light"
            @click="closeModal()"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      @click="closeModal()"
    ></button>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import session from '../stores/session';

defineProps({
  isActive: Boolean,
});

const emit = defineEmits(["close"]);

const title = ref("");
const requestor = ref(session.user!.email);
const description = ref("");
const priority = ref("Medium");
const status = ref("New");
const responsibility = ref("");


function closeModal() {
  resetValues();
  emit("close");
}

function resetValues() {
  title.value = "";
  requestor.value = session.user!.email;
  description.value = "";
  priority.value = "Medium";
  status.value = "New";
  responsibility.value = "";
}

</script>

<style scoped>
.modal-content {
  width: 50%;
  background-color: white;
  padding: 2rem;
}</style>
