import { createApp, Component } from 'vue';
import AppImage from '@/components/app-image/index.vue';
import VueI18n from '@/language/index';
import { Swipe, SwipeItem, Field } from 'vant';

export function mountComponent(RootComponent: Component) {
  const app = createApp(RootComponent);
  app.component('AppImage', AppImage);
  app.component('VanField', Field);
  app.use(VueI18n).use(Swipe).use(SwipeItem)

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
