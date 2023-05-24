export const useAppStore = defineStore('app', () => {
  const routeList = $ref<Array<string>>([])
  let token = $ref(sessionStorage.getItem('token') ?? '')
  const setToken = (str: string) => {
    if (!str)
      return
    sessionStorage.setItem('token', str)
    token = str
  }

  return $$({
    token,
    setToken,
    routeList,
  })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
