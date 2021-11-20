import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/styles/global.css'
import eventBus from 'vue3-eventbus'

createApp(App).use(eventBus).mount('#app')
