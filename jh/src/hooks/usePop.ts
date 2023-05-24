function usePop() {
  const appStore = useAppStore()
  const { pop } = storeToRefs(appStore)
  const openPop = () => pop.value = true
  const closePop = () => pop.value = false
  return { pop, openPop, closePop }
}
export default usePop

