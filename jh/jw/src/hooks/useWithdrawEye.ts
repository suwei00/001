export default function useWithdrawEye() {
  // 控制小眼睛
  const showEye = ref(false)
  const openEye = ref(false)
  const elPasswordRef = ref()
  const clickEye = () => {
    openEye.value = !openEye.value
    showEye.value = !showEye.value
    elPasswordRef.value.focus()
  }

  return {
    showEye, openEye, elPasswordRef, clickEye,
  }
}
