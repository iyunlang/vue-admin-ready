import { App } from 'vue';

export function withInstall(...components: any[]) {
  components.forEach((comp) => {
    comp.install = (app: App) => {
      app.component(comp.displayName || comp.name, comp);
    };
  });
}