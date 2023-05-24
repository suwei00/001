<script setup lang="ts">
import { onMounted, watch, computed } from 'vue';
import { useAppStore } from '@/store-pinia';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { gameStateStore } from '@/store-pinia/game';
import { useDragStore } from '@/store-pinia/drag';
import useBus from '@/hooks/useBus';
import { useRoute, useRouter } from 'vue-router';
import APIs from '@/http/blue-apis';
import { storeToRefs } from 'pinia';
import { mqttConnect } from '@/http/mqtt';
import { CgDialogClass } from '@/components/cg-template-2/cg-dialog/function-call';
import FinancePopup from '@/components/cg-template-2/finance-popup/index.vue';
import EmergencyLetter from '@/components/cg-template-2/emergency-letter/index.vue';
import CgChatDrag from '@/components/cg-template-2/cg-chat-drag/index.vue';
import Chat from '@/views/cg-template-2/chat/index.vue';
import { useImage } from '@/hooks/useImage';
import { launchVanue } from '@/mixins/gameVenue';

const { localSrc } = useImage();
const Dialog = new CgDialogClass();

const gameState = gameStateStore();
const appStore = useAppStore();
const userInfoStore = userInfoStateStore();
const dragStore = useDragStore();
const { isApp } = storeToRefs(appStore);
const { isSmallGame } = storeToRefs(gameState);
const { userInfo } = storeToRefs(userInfoStore);
const { isShowDrag, isShowGame, showChat } = storeToRefs(dragStore);
const router = useRouter();
const route = useRoute();
const routeName = computed(() => router.currentRoute.value.name);

appStore.init();

// 紧急站内信
const emergency = () => {
  APIs.getEmergency()
    .then(res => {
      if (res && res[0].is_read === 0) {
        Dialog.showDialog({
          template: 'tmp2',
          customComponent: EmergencyLetter,
          confirmText: 'CSKH',
          cancelText: 'TÔI ĐÃ HIỂU',
          redTitle: res[0].title,
          props: { data: res[0] },
          onCancel() {
            APIs.readUserMsg({ id: res[0].id }).then(() => {
              emergency();
            });
          },
          onOk() {
            APIs.readUserMsg({ id: res[0].id }).then(() => {
              emergency();
            });
            router.push('/customer-service');
          }
        });
      }
    })
    .catch(err => {
      console.log('err==>', err);
    });
};

// mqtt
const financeHandler = (mqqtRes: any) => {
  console.log('🚜 ~ file: App.vue:56 ~ financeHandler ~ mqqtRes:', mqqtRes);
  userInfoStore.RefreshBalance();
  const { ty, status, amount, ts } = mqqtRes;
  // 紧急站内信
  if (ty === '3') {
    return emergency();
  }

  const type = ty === '1' ? 'deposit' : ty === '2' ? 'withdraw' : '';
  // 充值通知路由
  const depositArr = ['DepositIndex', 'CGPayInfo', 'OfflineInfo', 'ThreepartyInfo'];
  if (type === 'deposit' && !depositArr.includes(routeName.value?.toString() ?? '')) return;

  // 提现通知路由
  const withdrawArr = ['Withdraw'];
  if (type === 'withdraw' && !withdrawArr.includes(routeName.value?.toString() ?? '')) return;

  Dialog.showDialog({
    template: 'tmp2',
    customComponent: FinancePopup,
    btns: status === 'success' ? 1 : 2,
    props: { status, type, amount, time: ts },
    cancelText: status === 'success' ? '' : 'Tôi Đã Hiểu',
    confirmText: status === 'success' ? 'XÁC NHẬN' : 'CSKH',
    onOk() {
      switch (status) {
        case 'success':
          router.push('/home');
          break;
        case 'failed':
          if (type === 'deposit') {
            return router.replace('/customer-service');
          }
          router.push('/customer-service');
          break;

        default:
          break;
      }
    },
    onCancel() {
      if (type === 'deposit') {
        return router.back();
      }
      location.reload();
    }
  });
};

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

const goToGame = () => {
  if (showChat.value) {
    dragStore.setShowChat(false);
  }
  launchVanue({ id: '46814147030678', key: 'game' });
};

onMounted(() => {
  if (globalConfig.ENVI !== 'prod') {
    document.querySelector('html')?.classList.remove('webp');
  }
  if (appStore.token) {
    userInfoStore.getUserInfo();
    appStore.getBankTree();
  }
  gameState.getGaneList();
  mqttConnectFoo();

  // 监听存提款mqtt
  useBus('mqttQuickTips', financeHandler);
});
</script>

<template>
  <router-view></router-view>
  <template v-if="!route.path.includes('entry/register')">
    <CgChatDrag
      iconName="/icon/i_chat_drag.png"
      :ballY="60"
      @clike="(val: boolean) => dragStore.setShowChat(val)"
      @onDrag="(val: boolean) => dragStore.setIsShowDrag(val)"
      v-if="!isApp && isShowDrag"
    />
    <CgChatDrag
      iconName="/webp/i_game_drag.webp"
      :ballY="120"
      @clike="goToGame"
      @onDrag="(val: boolean) => dragStore.setIsShowGame(val)"
      v-if="isSmallGame && !isApp && isShowGame && route.path !== '/launch-game'"
    />
  </template>

  <Chat :isShow="showChat" />
  <!-- 预加载 -->
  <img
    style="width: 0; height: 0; position: absolute; bottom: 500px"
    :src="`${localSrc}/loading.webp`"
  />
  <img
    style="width: 0; height: 0; position: absolute; bottom: 500px"
    :src="`${localSrc}/home/notice-pop.png`"
  />
  <img
    style="width: 0; height: 0; position: absolute; bottom: 500px"
    :src="`${localSrc}/hourglass.webp`"
  />
  <img
    style="width: 0; height: 0; position: absolute; bottom: 500px"
    :src="`${localSrc}/button/orange_but_active.png`"
  />
  <img
    style="width: 0; height: 0; position: absolute; bottom: 500px"
    :src="`${localSrc}/button/blue_btn_active.png`"
  />
  <img
    style="width: 0; height: 0; position: absolute; bottom: 500px"
    :src="`${localSrc}/loading.webp`"
  />
  <img
    style="width: 0; height: 0; position: absolute; bottom: 500px"
    :src="`${localSrc}/home/notice-pop.png`"
  />
</template>

<style lang="scss">
@import '@/scss/common.scss';
@import '@site/variables.scss';
@import '@site/common-style.scss';
@import '@site/common-style.scss';
</style>
