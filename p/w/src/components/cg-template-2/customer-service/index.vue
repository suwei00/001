<template>
  <Teleport to="body">
    <Transition name="fade">
      <template v-if="unfold">
        <div :class="{ 'customer-service-unfold': unfold }" class="customer-service">
          <app-image width="170" src="/sidemenu/side_game.gif" alt="wow" class="game" @click="sideGameClick" />

          <ul :class="{ unfold }">
            <li
              v-for="(item, index) in customerServices"
              :key="index"
              :class="['service-item', !!item.url ? 'has-url' : 'no-url', !!item.content ? 'has-content' : 'no-content', item.title?.toLowerCase().split(' ').join('-'), +item.kf_type === 2 ? 'content-hover' : '']"
              @click="() => openWin(item)"
            >
              <template v-if="index < 8">
                <div class="img-box"><app-image width="38" :is-google-cloud="true" :src="item.img" :alt="item.title" class="item-img" /></div>
                <div class="desc">
                  <div class="title">{{ item.title }}</div>
                  <div v-if="item.content" class="content">
                    <p v-if="item.content.indexOf(',') == -1" :style="{ cursor: item.url ? 'pointer' : 'unset' }" :key="item.title">
                      {{ item.content }}
                    </p>
                    <template v-else>
                      <p v-for="(i, index) in item.content.split(',') || []" :key="index">
                        {{ i }}
                      </p>
                    </template>
                  </div>
                </div>
              </template>
            </li>
            <div class="li" @click="$event => openWin({})">
              <div class="app-down">
                <img v-show="qrcodeImg" class="qrcode" :src="qrcodeImg" />
                <div class="ios-android">
                  <div class="title">APP</div>
                  <div>
                    <app-image width="14" src="/sidemenu/i_ios.png" alt="ios" />
                    IOS
                  </div>
                  <div>
                    <app-image width="14" src="/sidemenu/i_android.png" alt="android" />
                    Android
                  </div>
                </div>
              </div>
            </div>
          </ul>

          <div v-if="unfold" class="close-btn" @click="unfold = false">
            <app-image width="18" src="/sidemenu/i_close.png" alt="close" class="" />
          </div>
        </div>
      </template>
    </Transition>
    <Transition name="fade">
      <template v-if="!unfold">
        <div :class="{ 'customer-service-unfold': unfold }" class="customer-service">
          <ul :class="{ unfold }">
            <li
              v-for="(item, index) in customerServices"
              :key="index"
              :class="['service-item', !!item.url ? 'has-url' : 'no-url', !!item.content ? 'has-content' : 'no-content', item.title?.toLowerCase().split(' ').join('-')]"
              @click="() => openWin(item)"
            >
              <template v-if="index < 8">
                <div class="img-box"><app-image width="38" :is-google-cloud="true" :src="item.img" :alt="item.title" class="item-img" /></div>
              </template>
            </li>
            <div class="li" @click="$event => openWin({})">
              <div><app-image height="31" src="/sidemenu/i_app.png" alt="app download" class="item-img" /></div>
            </div>
          </ul>
        </div>
      </template>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { getQrcode } from '@/mixins/qrcode';
import { useAppStore } from '@/store-pinia';
import { storeToRefs } from 'pinia';
import CustomerService from './index.d';
import { useVModel } from '@vueuse/core';
import { useRouter } from 'vue-router';
import { launchVanue } from '@/utils/gameVenue';

interface Props extends CustomerService.Props {
  modelValue: boolean;
}

const props = defineProps<Props>();

const router = useRouter();

const emit = defineEmits(['update:modelValue']);

const data = useVModel(props, 'modelValue', emit);

const appStore = useAppStore();

const { customerServices } = storeToRefs(appStore);

const { qrcodeImg } = getQrcode('#000', 142);

const unfold = ref(false);

const openWin = (item: any) => {
  let url;
  if (unfold.value && item.url && item.url.length) {
    url = item.url.split(',');
    window.open(url[0], '_blank');
    return;
  }
  if (!unfold.value) unfold.value = true;
};

const sideGameClick = () => {
  launchVanue({id: '39636407564188' });
}

watch(
  router.currentRoute,
  () => {
    if (router.currentRoute.value.fullPath === '' || router.currentRoute.value.fullPath === '/') {
      unfold.value = true;
    } else {
      unfold.value = false;
    }
  },
  {
    immediate: true
  }
);
</script>

<script lang="ts">
export default {
  name: 'CustomerService'
};
</script>

<style lang="scss" scoped>
img {
  display: block;
}
/* 下面我们会解释这些 class 是做什么的 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-200px) translateY(-50%);
  opacity: 0;
}

.customer-service {
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2012;
  // animation: aniFadeOut 500ms linear;
  // transition: width 500ms linear;
  &.customer-service-unfold {
    // animation: aniFadeIn 500ms linear;
  }
  ul {
    width: 58px;
    display: flex;
    flex-direction: column;
    border-radius: 12px 0px 0px 12px;
    background: linear-gradient(180deg, var(--cg-color-white) 96.35%, var(--cg-color-white1) 100%);
    border: 2px solid var(--cg-color-blue3);
    border-right: 0;
    box-shadow: 0px 6px 12px rgba(190, 215, 239, 0.6);
    transition: all 100ms linear;
    // li > a {
    //   display: flex;
    //   align-items: center;
    //   justify-content: space-around;
    //   height: 100%;
    //   width: 100%;
    // }
    li,
    .li {
      cursor: pointer;
      min-height: 49px;
      border-bottom: 1px solid var(--cg-color-blue3);
      display: flex;
      align-items: center;
      justify-content: space-around;
      .img-box {
        width: 38px;
        flex: none;
      }
      .desc {
        padding-left: 8px;
        position: relative;
        height: 48px;
        flex: 1;
        width: calc(100% - 49px);
        .title {
          font: var(--cg-font-text2);
          line-height: 48px;
          opacity: 1;
          transition: all 100ms linear;
          color: var(--cg-color-grey1);
        }
        .content {
          transition: all 100ms linear;
          // padding-top: 7px;
          // display: none;
          opacity: 0;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          font: var(--cg-font-text1);
          line-height: 17px;
          color: var(--cg-color-blue12);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          p {
            text-align: left;
          }
        }
      }
      &:last-child {
        border-bottom: 0;
      }
      .app-down {
        padding-top: 12px;
        .ios-android {
          padding: 6px 0 8px;
          font: var(--cg-font-text8);
          line-height: 14px;
          text-align: center;
          color: var(--cg-color-grey1);
          display: flex;
          align-items: center;
          justify-content: space-around;
          > div {
            img {
              display: inline-block;
              vertical-align: text-bottom;
              margin-right: 2px;
            }
          }
          .title {
            font-weight: 700;
          }
        }
      }
    }
    &.unfold {
      width: 182px;
      li.service-item {
        justify-content: flex-start;
        padding-left: 11px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      // .service-item.no-url:hover {
      // .service-item.has-content:hover {
      // li:last-of-type:hover {
        .service-item.content-hover:hover {
        .desc {
          .title {
            // display: none;
            opacity: 0;
          }
          .content {
            // display: block;
            opacity: 1;
          }
        }
      }
    }
  }
  .close-btn {
    width: 50px;
    height: 50px;
    margin: 0 auto;
    background: url(link($base-img-dir + '/sidemenu/i_closebg.png')) no-repeat;
    background-size: 100% 100%;
    background-position: center;
    padding-left: 16px;
    padding-top: 12px;
    cursor: pointer;
    transform: scale(0.8);
  }
  .game {
    display: block;
    margin: 0 auto;
    cursor: pointer;
  }
}
</style>
