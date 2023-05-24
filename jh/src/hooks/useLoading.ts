function useLoading() {
  const appStore = useAppStore()
  const { loading } = storeToRefs(appStore)
  const openLoading = () => loading.value = true
  const closeLoading = () => loading.value = false
  return { loading, openLoading, closeLoading }
}
export default useLoading
