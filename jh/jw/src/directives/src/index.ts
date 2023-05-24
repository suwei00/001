export default {
  created(el: HTMLImageElement, binding: { value: import('vite-plugin-image-presets').ImageAttrs[] }) {
    const val = binding.value
    el.src = getSupportImage(val)
  },
  beforeUpdate(el: HTMLImageElement, binding: { value: import('vite-plugin-image-presets').ImageAttrs[] }) {
    const val = binding.value
    el.src = getSupportImage(val)
  },
}
