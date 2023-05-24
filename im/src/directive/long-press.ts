import { App } from 'vue'

export default (app: App<Element>) => {
  app.directive('long-press', {
    beforeMount: (el, binding) => {
      let pressTimer: ReturnType<typeof setTimeout> | null = null

      const start = (e: MouseEvent | TouchEvent) => {
        if (e.type === 'click' && (e as MouseEvent).button !== 0) {
          return
        }

        if (pressTimer === null) {
          pressTimer = setTimeout(() => {
            if (typeof binding.value === 'function') {
              binding.value()
            }
          }, 1000)
        }
      }

      const cancel = () => {
        if (pressTimer !== null) {
          clearTimeout(pressTimer)
          pressTimer = null
        }
      }
      el.addEventListener('mousedown', start)
      el.addEventListener('touchstart', start)
      el.addEventListener('click', cancel)
      el.addEventListener('mouseout', cancel)
      el.addEventListener('touchend', cancel)
      el.addEventListener('touchcancel', cancel)
    }
  })
}
