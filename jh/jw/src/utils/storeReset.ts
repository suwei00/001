// reset pinia store
export default function storeReset({ store }: any) {
  const initialState = cloneDeep(store.$state)
  store.$reset = () => store.$patch(cloneDeep(initialState))
}
