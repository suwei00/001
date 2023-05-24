<script setup lang="ts">
import { ref, watch, nextTick, onBeforeUnmount } from 'vue';
import { CgIcon, CgScrollBar, CgAmount } from '@/components/cg-template-2';
import { useAppStore } from '@/store-pinia';
import { storeToRefs } from 'pinia';

const appStore = useAppStore();
const { copyMarquee, marquee } = storeToRefs(appStore);

const gameIconList = {
  2: 'i_prize_video',
  3: 'i_prize_fishing',
  4: 'i_prize_electronic',
  5: 'i_prize_lottery',
  6: 'i_prize_sports',
  7: 'i_prize_chess',
  8: 'i_prize_esports',
  9: 'i_prize_cockfighting'
};
const showPopup = ref(false);
function handleClickMarquee() {
  showPopup.value = true;
}

const desensitization = (name: string) => {
  const surplus = name.slice(3);
  let tail = '';
  for (let i = 0; i < surplus.length; i++) {
    tail = tail + '*';
  }
  return name.slice(0, 3) + tail;
};

let scrollTop = 0;
watch(marquee, () => {
  const scrollRef = document.getElementById('contentBoxID');
  if (scrollRef) {
    scrollTop = scrollRef?.scrollTop;
    nextTick(() => {
      scrollRef.scrollTop = scrollTop;
    });
  }
});
</script>
<template>
  <div class="marquee">
    <div class="speak" />
    <van-notice-bar @replay="appStore.copyHomeData()" class="notice-bar">
      <template #default>
        <template v-if="copyMarquee && copyMarquee.length">
          <div
            class="flex-middle"
            style="padding-right: 20px"
            v-for="item in copyMarquee"
            :key="item.id"
            @click="handleClickMarquee"
          >
            {{ desensitization(item.list[2]) }} <span class="game">{{ item.list[1] }}</span> Trúng
            <cg-amount
              :amount="item.list[3]"
              class="amount"
              :weight="700"
              color="blue1"
              :segmentation="true"
              suffix="K"
              padding="2"
            />
          </div>
        </template>
      </template>
    </van-notice-bar>
  </div>

  <!-- 中奖弹窗 -->
  <van-popup :show="showPopup">
    <div class="popup">
      <div class="content-mask">
        <div class="content">
          <cg-scroll-bar scrollBarHeight="95%" scrollBarTop="2%" yellowStyle>
            <div
              class="item flex ai-c"
              v-for="(item, indx) in marquee"
              :key="item.id"
              :class="{ animation: indx === 0, bd: item.even }"
            >
              <cg-icon width="60" :name="gameIconList[item.list[4] ?? '3']" />
              <div class="flex-1 right">
                <div>
                  <span class="first">{{ desensitization(item.list[2]) }}</span>
                  <span class="game_name">{{ item.list[1] }}</span>
                </div>
                <div class="flex">
                  <span class="first">Trúng</span>
                  <cg-amount
                    :amount="item.list[3]"
                    class="amount"
                    :weight="700"
                    color="blue1"
                    :segmentation="true"
                    suffix="K"
                    padding="2"
                  />
                </div>
              </div>
            </div>
          </cg-scroll-bar>
        </div>
      </div>
      <app-image src="/home/Ingots.png" class="ingots" />
      <div class="close" @click="showPopup = false"></div>
    </div>
  </van-popup>
</template>

<style lang="scss" scoped>
.marquee {
  width: 100%;
  height: 48px;
  background: var(--cg-gradient-marquee);
  box-shadow: 0px 3px 6px var(--cg-color-white), inset 0px 3px 6px var(--cg-color-white4);
  border-radius: 30px;
  position: relative;
  overflow: visible;

  .notice-bar {
    font: var(--cg-font-text2);
    height: 100%;
    padding-left: 0;
    background-color: transparent;
    color: var(--cg-color-black1);

    :deep(.van-notice-bar__content) {
      display: flex;
      align-items: center;
    }

    .game {
      color: var(--cg-color-blue1);
      font-weight: 700;
      padding: 0 4px;
    }

    .amount {
      margin-left: 4px;
    }
  }

  .speak {
    @include webp($base-img-dir + 'home/notice.png');
    display: block;
    width: 80px;
    height: 80px;
    float: left;
    transform: translate(-10px, -10px);
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
}

.popup {
  @include webp($base-img-dir + 'home/notice-pop.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 648px;
  height: 993.1px;
  padding-top: 239px;
  padding-left: 50px;
  box-sizing: border-box;
  position: relative;

  .content-mask {
    width: 100%;
    height: 90%;
    overflow: hidden;
    border-radius: var(--cg-border-radius);
  }

  .content {
    width: 91%;
    height: 100%;
    background-color: var(--cg-color-white);
    border-radius: var(--cg-border-radius);
    :deep(.bar-box) {
      height: 94%;
      width: 8px;
      top: 20px;
      right: -18px;
    }
    .item {
      width: 100%;
      padding-left: 44px;
      height: 80px;
      box-sizing: border-box;
      font: var(--cg-font-text4);
      color: var(--cg-color-black1);

      .right {
        margin-left: 26px;
        overflow: hidden;
      }

      .first {
        margin-right: 8px;
      }

      .game_name {
        font-weight: 700;
        color: var(--cg-color-orange);
      }
    }
  }

  .close {
    width: 58px;
    height: 58px;
    position: absolute;
    right: 1%;
    top: 9%;
  }
}

.ingots {
  position: absolute;
  width: 140px;
  bottom: 0;
  left: 0;
  z-index: 20;
}

.animation {
  animation: UD 0.3s linear;
}

@keyframes UD {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(0);
  }
}

.bd {
  background-color: var(--cg-color-white7);
}
</style>
