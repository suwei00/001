/// <reference types="vite/client" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*?preset=full' {
  const src: import('vite-plugin-image-presets').ImageAttrs[]
  export default src
}

interface CGDialogProps {
  title: string
  content: string
  content2?: string
  cancelText?: string
  confirmText?: string
  isCancel?: boolean
  onOk: () => void
}

declare module 'vue3-emoji-picker'
declare module 'vue-virtual-scroller'
declare module 'ali-oss'
declare module 'precompiled-mqtt'