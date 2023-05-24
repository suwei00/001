<template>
  <div>
    <div class="bonus-bar div_shadow">
      <div class="wrap">
        <div class="inner">
          <div class="content">
            <cg-big-number class="deep-blue" :money="formatNumberToCurrency(jackpot)" :num-height="76" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeUnmount } from 'vue';
import { random } from 'lodash';
import bus from '@/mixins/bus';

import { CgBigNumber } from '@/components/cg-template-2';
import { getjackpot } from '@/http/blue-apis';
import { formatNumberToCurrency } from '@/utils/format';

const jackpot = ref('888888888');

const changeJackpot = () => {
  jackpot.value = Number(jackpot.value) + random(25, 300) + '';
};

const getJackPot = () => {
  getjackpot().then((res: any) => {
    jackpot.value = res || '8888888888';
    bus.on('jackpot', changeJackpot);
  });
};

getJackPot();

const timer = setInterval(() => {
  // 电子游戏列表页面触发奖金池轮询
  bus.emit('jackpot');
  // 每20秒请求一次服务器时间差
}, 2000);

onBeforeUnmount(() => {
  clearInterval(timer);
  bus.off('jackpot', changeJackpot);
});
</script>

<script lang="ts">
export default {
  name: 'BonusBar'
};
</script>

<style lang="scss">
.bonus-bar {
  width: 658px;
  height: 116px;
  margin: 0 auto;
  background: linear-gradient(270deg, var(--cg-color-blue3) 0%, var(--cg-color-white2) 50.98%, var(--cg-color-blue3) 100%);
  mix-blend-mode: normal;
  border-radius: 12px;
  padding-bottom: 8px;
  .wrap {
    width: 100%;
    background: linear-gradient(0deg, var(--cg-color-white) 0%, var(--cg-color-blue12) 50.98%, var(--cg-color-blue3) 100%);
    height: 100%;
    padding: 4px;
    border-radius: 12px;
    .inner {
      background: linear-gradient(180deg, var(--cg-color-white) 41.15%, var(--cg-color-white1) 100%);
      height: 100%;
      border-radius: 12px;
      .content {
        padding-top: 6px;
      }
    }
  }
}
</style>
