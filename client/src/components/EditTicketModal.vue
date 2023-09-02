<template>
    <div class="modal" :class="{ 'is-active': isActive }">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="field">
                <label class="label">Title</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Title" v-model="title"
                        :class="{ 'is-danger': titleMessage.error }" />
                </div>
                <p class="help is-danger">{{ titleMessage.text }}</p>
            </div>

            <div class="field">
                <label class="label">Responsible</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Department" v-model="responsibility" />
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
                            <option>Problem</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="field">
                <label class="label">Requestor</label>
                <div class="control has-icons-left">
                    <input class="input" type="text" placeholder="Requestor" v-model="requestor" />
                    <span class="icon is-small is-left">
                        <font-awesome-icon icon="envelope" />
                    </span>
                </div>
            </div>

            <div class="field">
                <label class="label">Description</label>
                <div class="control">
                    <textarea class="textarea" placeholder="Description" v-model="description"
                        :class="{ 'is-danger': descriptionMessage.error }"></textarea>
                    <p class="help is-danger">{{ descriptionMessage.text }}</p>

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

            <p class="help" :class="{ 'is-danger': errorMessage.error }">
                {{ errorMessage.text }}
            </p>
            <div class="field is-grouped">
                <div class="control">
                    <button class="button is-link" :class="{ 'is-loading': session.loading }"
                        @click="submitTicket()">Submit</button>
                </div>
                <div class="control">
                    <button class="button is-link is-light" @click="closeModal()">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="closeModal()"></button>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import session, { logout } from "../stores/session";
import { addTicket } from "../stores/tickets";
import { reAuthenticate } from "../stores/session";

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

const titleMessage = reactive({
    error: false,
    text: "",
});

const requestorMessage = reactive({
    error: false,
    text: "",
});

const descriptionMessage = reactive({
    error: false,
    text: "",
});

const errorMessage = reactive({
    error: false,
    text: "",
});

function clearErrors() {
    titleMessage.error = false;
    titleMessage.text = "";
    requestorMessage.error = false;
    requestorMessage.text = "";
    descriptionMessage.error = false;
    descriptionMessage.text = "";
    errorMessage.error = false;
    errorMessage.text = "";
}

function submitTicket() {
    clearErrors();
    if (title.value === "") {
        titleMessage.text = "Title is required";
        titleMessage.error = true;
        errorMessage.error = true;
    }
    if (description.value === "") {
        descriptionMessage.text = "Description is required";
        descriptionMessage.error = true;
        errorMessage.error = true;
    }
    if (responsibility.value === "") {
        responsibility.value = "Unassigned";
    }
    if (requestor.value === "") {
        requestorMessage.text = "Requestor is required";
        requestorMessage.error = true;
    }

    if (errorMessage.error) {
        errorMessage.text = "Form is invalid";
        return;
    }

    const ticket = {
        title: title.value,
        requestorEmail: requestor.value,
        priority: priority.value,
        status: status.value,
        responsibility: responsibility.value,
        _id: "",
        creatorEmail: session.user?.email || "",
        timestamp: new Date(),
        content: {
            description: description.value,
            updates: [],
        },
    };
    addTicket(ticket).then(() => {
        if (session.error && session.error.status === 403) {
            reAuthenticate().then((result) => {
                if (result) {
                    submitTicket();
                    closeModal();
                } else {
                    logout();
                }
            });
        } else {
            closeModal();
        }
    });
}

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
}
</style>
