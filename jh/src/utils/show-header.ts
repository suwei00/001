import { ref } from 'vue'
import { useRoute } from 'vue-router'

const list = ['/entry/register', '/entry/login']

export default function () {
  const route = useRoute()
  const dragState = dragStateStore()
  const isShowHeader = ref(true)
  if (route.query.plat || list.includes(location.pathname)) {
    isShowHeader.value = false
    dragState.setIsShowDrag(false)
  }
  else {
    dragState.setIsShowDrag(true)
  }

  return { isShowHeader }
}
