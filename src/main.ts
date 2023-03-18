import { createApp } from 'vue'
import './style.css'

import { createPinia } from "pinia";
const pinia = createPinia();

import App from './App.vue'
const app = createApp(App)

app.use(pinia);

import router from "./router"
app.use(router);

app.mount('#app');
