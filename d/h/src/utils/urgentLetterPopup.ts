// import { h, render, defineAsyncComponent } from 'vue'
// const Popup = defineAsyncComponent(() => import(`@/components/${globalConfig.TEMPLATE}/urgentLetter-popup/index.vue`))

// export default function urgentLetterPopup() {
//   if (document.getElementById('urgentLetterPopupID')) return

//   const vnode = h(Popup)
//   const div = document.createElement('div')
//   div.id = 'urgentLetterPopupID'
//   div.style.position = 'fixed'
//   div.style.zIndex = '9999'
//   div.style.top = '0'
//   div.style.left = '0'
//   div.style.width = '100vw'
//   div.style.height = '100vh'
//   document.body.appendChild(div)
//   render(vnode, div)
// }