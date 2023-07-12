import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import router from './router'
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faHome } from '@fortawesome/free-solid-svg-icons';

library.add(
  faEnvelope,
  faHome,
);


const app = createApp(App)
app.use(router)
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount('#app')
