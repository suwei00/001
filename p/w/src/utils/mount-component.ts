import { createApp, Component } from 'vue';
import AppImage from '@/components/app-image/index.vue';

export function mountComponent(RootComponent: Component) {
  const app = createApp(RootComponent);
  app.component('AppImage', AppImage);
  const root = document.createElement('div');

  document.body.appendChild(root);

  return {
    instance: app.mount(root),
    unmount() {
      app.unmount();
      document.body.removeChild(root);
    },
  };
}
