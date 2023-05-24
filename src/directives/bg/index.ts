import { useImage, useIntersectionObserver } from '@vueuse/core'
import type { Directive, DirectiveBinding } from 'vue'
/**
 * @description 设置背景图
 * @param {HTMLDivElement} el
 * @param {*} bind
 * @return {*}
 */
function setImg(el: HTMLSpanElement | HTMLDivElement, bind: DirectiveBinding<{ src: import('vite-plugin-image-presets').ImageAttrs[] | string; thumb?: string } | undefined>) {
  const val = bind.value
  const arg = bind.arg
  const target = ref(el)
  if (!val?.src)
    return
  const imgSrc = typeof (val.src) === 'string' ? val.src : getSupportImage(val.src)
  if (arg === 'lazy') {
    const { execute, isLoading } = useImage({ src: imgSrc }, { immediate: false })
    const { stop } = useIntersectionObserver(
      target,
      async ([{ isIntersecting }]) => {
        if (isIntersecting) {
        // 如果有缩略图，先加载缩略图
          if (val.thumb) {
            el.style.backgroundImage = `url(${val.thumb})`
            el.classList.add('v-bg-loading')
          }
          stop()
          await execute()
          if (!isLoading.value) {
            el.style.backgroundImage = `url(${imgSrc})`
            el.classList.remove('v-bg-loading')
          }
        }
      },
      { rootMargin: '0px 0px 100px 0px' },
    )
  }
  else {
    if (val.thumb) {
      el.style.backgroundImage = `url(${val.thumb})`
      el.classList.add('thumb-loading')
    }
    el.style.backgroundImage = `url(${imgSrc})`
    el.classList.remove('thumb-loading')
  }
}

// 按需加载背景图指令
const bg: Directive< HTMLSpanElement | HTMLDivElement, { src: import('vite-plugin-image-presets').ImageAttrs[]; thumb?: string } | undefined> = {
  mounted(el, bind) {
    setImg(el, bind as any)
  },
  // 更新背景图
  beforeUpdate(el, bind) {
    const val = bind.value
    if (!val?.src)
      return
    const imgSrc = typeof (val.src) === 'string' ? val.src : getSupportImage(val.src)
    el.style.backgroundImage = `url(${imgSrc})`
  },
}

export default bg
