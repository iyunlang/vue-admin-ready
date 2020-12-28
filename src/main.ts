import { createApp } from 'vue'
import App from "./App.vue"

import { setupRouter } from '/@/router'
import { setupI18n } from '/@/setup/i18n'
import { setupElementPlus } from '/@/setup/elementPuls'

import './styles/index.scss'


const app = createApp(App)

setupRouter(app)

setupI18n(app)

setupElementPlus(app)

app.mount('#app')