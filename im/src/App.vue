<script setup lang="ts">
import i18n, { messages } from './i18n'
import { Locale } from 'vant'
import { useCache } from "@/store/cacheRouter";
const Cache = useCache();
const route = useRoute();
const userStore = useUserStore()
const indexDBStore = useIndexDBStore()
const { token } = storeToRefs(userStore)
// import CreateMqtt from '@/api/socket'

const cacheList = computed(() => Cache.cacheList);
const routePath = computed(() => route.fullPath);
const tabbarPath: string[] = ["/", "/friend", "/profile"]
const setLanguage = (locale: string) => {
  // @ts-ignore， 这是官方的错误，本身现在它就是一个ComputedRefImpl类型的参数
  if (locale !== i18n.global.locale.value) {
    localStorage.setItem('locale', locale)
    // @ts-ignore
    i18n.global.locale.value = locale
    Locale.use(locale, messages[locale])
    return true
  }
  {
    return false
  }
}

onMounted(() => {
  if (token) {
    indexDBStore.initIdnexDB('test_123')
  }
  //   CreateMqtt.mqttConnect()
  // })
  // onUnmounted(() => {
  //   CreateMqtt.mqttDisconnect()
})
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <transition mode="out-in" name="aside-right" appear>
      <KeepAlive :include="cacheList">
        <component :is="Component" :key="route.fullPath" />
      </KeepAlive>
    </transition>
  </RouterView>

  <!-- <cg-button @click="setLanguage('zh-CN')" type="primary">中文</cg-button>
  <cg-button @click="setLanguage('en-US')" type="primary">英语</cg-button>
  <cg-button @click="setLanguage('vi-VN')" type="primary">越南</cg-button> -->

  <CgTabBar v-if="tabbarPath.includes(routePath)" />
</template>
