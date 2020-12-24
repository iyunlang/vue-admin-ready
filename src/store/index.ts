import { App } from 'vue'
import { createStore } from 'vuex'

const isDev = true

const store = createStore({
  strict: isDev,
})

export function setupStore(app: App<Element>): void {
  app.use(store)
}

export default store