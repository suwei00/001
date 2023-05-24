<template>
  <transition name="fade" v-if="visible && bannerList.length">
    <teleport to="body" v-if="visible && bannerList.length">
      <div class="modal-mask">
        <div class="preferential">
          <span class="close" @click="handleClose" />
          <div class="left">
            <el-scrollbar style="height: calc(100% - 100px)">
              <ul class="tabs">
                <li class="tab" :class="{ active: activeIndex === index }" v-for="(item, index) in bannerList" :key="item.title" @click="handleTabClick(index, item)">
                  <div v-if="readLocal[item.id] || index === 0 ? false : item.is_read === 0" class="star"></div>
                  <div class="title">{{ item.title }}</div>
                </li>
              </ul>
            </el-scrollbar>
          </div>
          <div class="right">
            <ul class="img-list" :style="{ transform: `translateY(${-580 * activeIndex}px)` }">
              <li class="item" @click="handleItemClick(item)" v-for="item in bannerList">
                <app-image :is-google-cloud="true" :src="item.img" alt="" class="item-img" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </teleport>
  </transition>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useVModel } from '@vueuse/core';
import APIs from '@/http/blue-apis';
import { removeNbsp } from '@/utils/format';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/store-pinia';
import { onBannerJump } from '@/utils/helpers';
const { isLogin } = storeToRefs(useAppStore());

interface PromoItem {
  flag: string;
  id: string;
  state: number;
  static: {
    list_web: string;
  };
  path?: string;
}

const readLocal: any = ref({});

const userInfoStore = userInfoStateStore();
const userInfo = storeToRefs(userInfoStore);

const bannerList = computed(() => userInfo.homeAdBanner.value.map((item: any) => ({ ...item, title: removeNbsp(item.title) })));

const props = withDefaults(defineProps<{ modelValue: boolean }>(), {}); // list: any[]
const emit = defineEmits(['update:modelValue', 'onClose']);
const visible = useVModel(props, 'modelValue', emit);
const router = useRouter();

const activeIndex = ref(0);
// 左侧切换
const handleTabClick = (index: any, item: any) => {
  activeIndex.value = index;
  APIs.readMemBanner({ id: item.id }).then(res => {
    readLocal.value[item.id] = true;
  });
};
// 右侧图片点击
const handleItemClick = (item: any) => {
  onBannerJump(item);
};
const handleClose = () => {
  visible.value = false;
  localStorage.setItem('preferentialClosed', 'yes');
  emit('onClose');
};

watch(
  router.currentRoute,
  val => {
    if (val.path && val.path !== '/') {
      visible.value = false;
    } else {
    }
    if (val.path === '' || val.path === '/') {
      if (localStorage.getItem('preferentialClosed') !== 'yes' && isLogin.value) {
        visible.value = true;
      }
    }
  },
  { immediate: true }
);

watch(visible, val => {
  if (!val && isLogin.value) {
    userInfoStore.getHomeAdBanner();
  }
});
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 2020;
  background-color: var(--cg-color-black4);
  padding-top: 216px;
  display: flex;
  justify-content: center;

  .preferential {
    position: relative;
    box-sizing: border-box;
    width: 1000px;
    height: 580px;
    border-radius: 22px;
    display: flex;
    overflow: hidden;
    background-color: var(--cg-color-white);

    .left {
      width: 225px;
      height: 100%;
      position: relative;
      border-radius: 22px 0 0 22px;
      background-color: var(--cg-color-white);
      &::after {
        content: '';
        width: 134px;
        height: 78px;
        position: absolute;
        left: 50px;
        bottom: 5px;
        background-size: contain;
        @include webp($base-img-dir + 'logo/logo1.png');
      }

      .tabs {
        color: var(--cg-color-grey5);
        // text-shadow: 0px 3px 6px #00000029;
        line-height: 20px;
        font-weight: bold;
        border-radius: 22px 0 0 0;

        .tab {
          cursor: pointer;
          padding: 19px 28px 19px 23px;
          border-bottom: 1px solid var(--cg-color-white1);
          // transition: all 0.3s;
          word-wrap: break-word;
          opacity: 1;
          transition: all 0.3s ease;
          font: var(--cg-font-text2);
          line-height: 20px;
          min-height: 78px;
          display: flex;

          &:hover {
          }
          .star {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: var(--cg-color-red);
            margin-right: 8px;
            margin-top: 4px;
          }
          .title {
            flex: 1;
            color: var(--cg-color-grey1);
          }
          &.active {
            background: linear-gradient(270deg, var(--cg-color-blue12) 0%, var(--cg-color-blue3) 100%);
            color: var(--cg-color-white);
            opacity: 1;
            .title {
              color: var(--cg-color-white);
            }
          }

          &:first-child {
            border-radius: 12px 0 0 0;

            &.active {
              border-radius: 12px 0 0 0;
            }
          }

          &:not(.active):hover {
            background: linear-gradient(137.93deg, var(--cg-color-white) 7.21%, var(--cg-color-white1) 49.31%, rgba(97, 206, 255, 0.1) 96.05%);
          }
        }
      }
    }

    .right {
      width: calc(100% - 225px);
      height: 100%;
      overflow: hidden;
      border-radius: 0 22px 22px 0;
      background-color: var(--cg-color-white1);
      .img-list {
        height: 100%;
        transition: all 0.3s;

        .item {
          height: 100%;
          overflow: hidden;
          cursor: pointer;

          .item-img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }
    }

    .close {
      position: absolute;
      right: 16px;
      top: 16px;
      width: 24px;
      height: 24px;
      background-size: contain;
      @include webp($base-img-dir + 'home/ad_close.png');
      transition: all 0.3s;
      z-index: 1;

      &:hover {
        cursor: pointer;
        transform: scale(1.1) rotate(90deg);
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
