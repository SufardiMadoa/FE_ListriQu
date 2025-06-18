// main.js
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify imports

// Material Design Icons
import '@mdi/font/css/materialdesignicons.css'

import App from './App.vue'
import router from './router'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';

const queryClient = new QueryClient();

// Buat instance Vuetify dengan konfigurasi lengkap

const app = createApp(App)
app.use(VueQueryPlugin, { queryClient });
app.use(createPinia())
app.use(router)

app.mount('#app')
