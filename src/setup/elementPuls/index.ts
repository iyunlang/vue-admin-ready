import type { App } from 'vue'

import {
  ElLoading,
  // ElMessage,
  // ElMessageBox,
  ElInput,
  ElButton,
  ElForm,
  ElFormItem,
} from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

export function setupElementPlus(app:App<Element>) {
  app.config.globalProperties.$ELEMENT = {}
  app
    .use(ElInput)
    .use(ElButton)
    .use(ElForm)
    .use(ElFormItem)
    .use(ElLoading)
}
