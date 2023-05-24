declare module '*?preset=full' {
  const src: import('vite-plugin-image-presets').ImageAttrs[]
  export default src
}
declare module '*.vue' {
  const vueComponent:import("vue").DefineComponent<{}, {}, any>;
  export default vueComponent;
}