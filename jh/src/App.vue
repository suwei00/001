<script lang="ts" setup>
import { useUserInfoStore } from '~/store/userInfo'
import { useAppStore } from '~/store/app'
import { dragStateStore } from '~/store/drag'

const { getVenueWalletList, setToken } = useUserInfoStore()
const { getVenueList, getBankList } = useAppStore()
const dragState = dragStateStore()
const { isShowDrag, showChat } = storeToRefs(dragState)
const { token } = storeToRefs(useUserInfoStore())

let httpToken: any = ''
if (location.href.includes('token')) {
  httpToken = location.href.split('token=')[1].split('&')[0]
  setToken(httpToken)
}

watch(() => token.value, (newVal) => {
  if (newVal)
    getVenueWalletList()
})
getVenueList()
getBankList()

const setSource = () => {
  // 是否有source字段
  const search = location.search.replace('?', '')
  const searchList = search.split('&')
  try {
    const source = searchList.find(item => item.split('=')[0] === 'source' && item.split('=')[1] === 'app')
    if (source)
      localStorage.setItem('source', 'app')

    else
      localStorage.removeItem('source')
  }
  catch (e) {}
}

onMounted(() => {
  setSource()
  showHeader()
  if (token.value) {
    getTutorialState().then((re: any) => {
      if (re.status)
        dragState.setGuideVisible(!re.data)
    })
  }
})
</script>

<template>
  <main id="appMain">
    <drag v-if="isShowDrag" />
    <chat :is-show="showChat" />
    <popRealName />
    <Loading />
    <router-view />
    <Footer />
  </main>
</template>
