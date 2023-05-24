function storeReset({ store }: any) {
  const initialState = cloneDeep(store.$state)
  store.$reset = () => store.$patch(cloneDeep(initialState))
}
const store = createPinia()
store.use(storeReset)

export default store
