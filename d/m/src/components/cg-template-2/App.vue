<script setup lang="ts">
import { ref, provide, nextTick, onMounted, watch } from 'vue';
import { useAppStore } from '@/store-pinia';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { mqttConnect } from '@/http/mqtt';
import { CustomerService } from '@/components/cg-template-2';
import emergency from '@/mixins/emergency';
import useBus from '@/hooks/useBus';
import { useImage } from '@/hooks/useImage';
import Chat from '@/components/cg-template-2/cg-chat/index.vue';
import { ElConfigProvider } from 'element-plus'
import viLocale from 'element-plus/lib/locale/lang/vi';
import SmallGame from '@/components/cg-template-2/cg-small-game/index.vue';
import { gameStateStore } from '@/store-pinia/game';

const gameState = gameStateStore();
const { localSrc } = useImage();
const appStore = useAppStore();
const userInfoStore = userInfoStateStore();
const { userInfo } = storeToRefs(userInfoStore);
const { isSmallGame } = storeToRefs(gameState);

appStore.init();

const { getEmergency } = emergency(false);

const locale = ref(viLocale);

// 刷新页面
const isRouterActive = ref(true);
// 子组件刷新页面
provide('reloadPage', () => {
  isRouterActive.value = false;
  nextTick(() => {
    isRouterActive.value = true;
  });
});

const mqttConnectFoo = () => {
  const { prefix, uid } = userInfo.value;
  mqttConnect(prefix, uid);
};

watch(
  () => userInfo.value,
  (newVal, oldVal) => {
    const { prefix, uid } = newVal;
    if (prefix && uid) {
      if (!oldVal.prefix || prefix !== oldVal.prefix) {
        mqttConnectFoo();
      }
    } else {
      mqttConnect();
    }
  }
);

onMounted(() => {
  // if (globalConfig.ENVI !== 'prod') {
  //   document.querySelector('html')?.classList.remove('webp');
  //   document.querySelector('html')?.classList.remove('avif');
  // }
  if (appStore.token) {
    userInfoStore.getUserInfo();
    getEmergency();
  }

  mqttConnectFoo();

  useBus('monitorEmergencyModal', () => getEmergency());
});
</script>
<template>
  <el-config-provider :locale="locale">
    <router-view v-if="isRouterActive"></router-view>
  </el-config-provider>
  <CustomerService :model-value="true" />
  <!-- 预加载 -->
  <img style="width: 0; height: 0; position: absolute; bottom: 500px" :src="`${localSrc}/loading.webp`" alt="" />
  <img style="width: 0; height: 0; position: absolute; bottom: 500px" :src="`${localSrc}/loading/hourglass.webp`"
    alt="" />
  <Chat />
  <SmallGame v-if="isSmallGame" />
</template>
<style lang="scss">
@import '@site/variables.scss';
@import '@site/common-style.scss';
@import '@site/variables-cover.scss';
</style>
