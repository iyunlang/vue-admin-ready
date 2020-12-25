import { createApp } from 'vue'
import App from "./App.vue"

import { setupRouter } from '/@/router'
import { setupI18n } from '/@/setup/i18n'

import './styles/index.scss'


const app = createApp(App)

setupRouter(app)

setupI18n(app);

app.mount('#app')