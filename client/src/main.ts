import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import router from './router'
import './style.scss'



const app = createApp(App)
app.use(router)
app.mount('#app')
