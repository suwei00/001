<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useDragStore } from '@/store-pinia/drag';
import { useAppStore } from '@/store-pinia';
import { storeToRefs } from 'pinia';
import { DownloadAppDialog } from '@/mixins/AppDownload';

interface TabItem {
  id: number;
  title: string;
  name: string;
  icon: string;
  path: string;
}

const router = useRouter();
const { isLogin } = storeToRefs(useAppStore());
const dragStore = useDragStore();

const { t } = useI18n();
const tabs = reactive([
  {
    id: 2,
    title: t('bottom_tab.promotion'),
    name: 'promotion',
    icon: 'icon-promotion',
    path: '/promotion'
  },
  { id: 4, title: t('home.chat'), name: 'chat', icon: 'icon-chat', path: '/chat' },
  { id: 1, title: t('bottom_tab.home'), name: 'home', icon: 'icon-home', path: '/home' },
  { id: 7, title: t('home.agent'), name: 'agent', icon: 'icon-agent', path: '/agent' },
  {
    id: 5,
    title: t('bottom_tab.personal'),
    name: 'personal',
    icon: 'icon-personal',
    path: '/personal'
  }
]);

const getActiveId = () => tabs.find(item => item.path === router.currentRoute.value.path)?.id;

const curActive = ref(getActiveId());

const changeTab = (tab: TabItem) => {
  if (tab.id === 4) {
    if (isLogin.value) {
      dragStore.setIsShowDrag(true);
      dragStore.setShowChat(true);
      return;
    }
    router.push('/entry/login');
  } else {
    curActive.value = tab.id;
    router.push(tab.path);
  }
};

watch(router.currentRoute, () => {
  curActive.value = getActiveId();
});
</script>
<template>
  <ul class="bottom-tab-view">
    <li
      v-for="(tab, i) in tabs"
      :key="i"
      @click="DownloadAppDialog(() => changeTab(tab))"
      :class="['tab-item', tab.id === curActive ? 'active' : '']"
    >
      <div :class="['menu-icon', tab.icon]"></div>
      <div :class="['menu-text']">{{ tab.title }}</div>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.bottom-tab-view {
  width: 100%;
  height: 128px;
  background-color: var(--cg-color-white2);
  box-shadow: 0px -4px 2px var(--cg-color-white3);
  display: flex;
  justify-content: space-evenly;
  padding-top: 6px;
  z-index: 99;
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;

  &.show {
    bottom: 0;
  }

  .tab-item {
    color: var(--cg-color-black);
    font: var(--cg-font-text4);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    white-space: nowrap;

    &:nth-of-type(1) {
      width: 147px;
    }

    &:nth-of-type(2) {
      width: 67px;
    }

    &:nth-of-type(3) {
      width: 147px;
    }

    &:nth-of-type(4) {
      width: 80px;
    }

    &:nth-of-type(5) {
      width: 130px;
    }

    .icon-home {
      @include webp($base-img-dir + 'bottom-tab/p3-grey.png');
      background-size: 112px 112px;
    }

    .icon-promotion {
      @include webp($base-img-dir + 'bottom-tab/promotion-grey.png');
    }

    .icon-chat {
      @include webp($base-img-dir + 'bottom-tab/chat-grey.png');
    }

    .icon-agent {
      @include webp($base-img-dir + 'bottom-tab/agent-grey.png');
    }

    .icon-personal {
      @include webp($base-img-dir + 'bottom-tab/personal-grey.png');
    }

    &.active {
      &.tab-item {
        font-weight: 700;
      }

      .icon-home {
        @include webp($base-img-dir + 'bottom-tab/p3.png');
      }

      .icon-promotion {
        @include webp($base-img-dir + 'bottom-tab/promotion.png');
      }

      .icon-egame {
        @include webp($base-img-dir + 'bottom-tab/chat.png');
      }

      .icon-chess {
        @include webp($base-img-dir + 'bottom-tab/agent.png');
      }

      .icon-agent {
        @include webp($base-img-dir + 'bottom-tab/agent.png');
      }

      .icon-personal {
        @include webp($base-img-dir + 'bottom-tab/personal.png');
      }
    }

    .menu-icon {
      width: 64px;
      height: 64px;
      margin-bottom: 8px;
      background-size: 100% 100%;
    }

    .icon-home {
      margin-top: -48px;
      width: 112px;
      height: 112px;
      border-radius: 50%;
      filter: drop-shadow(0px 2.15385px 4.30769px var(--cg-color-blue5));
      position: relative;
      z-index: 20;
    }
  }
}
</style>
