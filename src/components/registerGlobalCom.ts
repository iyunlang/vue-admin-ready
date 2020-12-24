import Icon from './Icon'
import {
  ElSelect,
  ElInput,
  ElDialog,
  ElAlert,
  ElAside
} from 'element-plus'
import { getApp } from '/@/setup/App'

const compList = [ Icon ]

let registered = false;

export function registerGlobalCom() {
  if(registered) return
  compList.forEach((comp: any) => {
    getApp().component(comp.name, comp)
  })

  registered = true

  getApp()
    .use(ElSelect)
    .use(ElInput)
    .use(ElDialog)
    .use(ElAlert)
    .use(ElAside)
}