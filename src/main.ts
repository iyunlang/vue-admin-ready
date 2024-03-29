import { createApp } from 'vue'
import App from "./App.vue"

import { setupRouter } from '/@/router'
import { setupI18n } from '/@/setup/i18n'
import { setupElementPlus } from '/@/setup/elementPuls'
// import { setupEchartsPlus } from '/@/setup/echarts'

// import '//at.alicdn.com/t/font_2101671_40p2ivrq6wr.css'
import './styles/index.scss';
import 'element-plus/lib/theme-chalk/index.css';
import 'element-plus/lib/theme-chalk/el-icon.css';

const app = createApp(App)

setupRouter(app)

setupI18n(app)

setupElementPlus(app)

// setupEchartsPlus(app)

app.mount('#app')