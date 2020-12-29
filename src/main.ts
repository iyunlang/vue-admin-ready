import { createApp } from 'vue'
import App from "./App.vue"

import { setupRouter } from '/@/router'
import { setupI18n } from '/@/setup/i18n'
import { setupElementPlus } from '/@/setup/elementPuls'

// import '//at.alicdn.com/t/font_2101671_40p2ivrq6wr.css'
import './styles/index.scss'


const app = createApp(App)

setupRouter(app)

setupI18n(app)

setupElementPlus(app)

app.mount('#app')