function useLoading() {
  const appStore = useAppStore()
  const { loading } = storeToRefs(appStore)
  const open = () => loading.value = true
  const close = () => loading.value = false
  return { loading, open, close }
}
export default useLoading
