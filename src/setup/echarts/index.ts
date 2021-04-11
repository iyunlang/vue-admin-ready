import type { App } from 'vue'

import ECharts from 'vue-echarts'
import { use } from "echarts/core"

import {
    CanvasRenderer
  } from 'echarts/renderers'
  import {
    BarChart
  } from 'echarts/charts'
  import {
    GridComponent,
    TooltipComponent
  } from 'echarts/components'

export function setupEchartsPlus(app:App<Element>) {
  use([
    CanvasRenderer,
    BarChart,
    GridComponent,
    TooltipComponent
  ])
  app.component('v-chart', ECharts)

}
