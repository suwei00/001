<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

interface Props {
  unit: string;
  num: number;
  title: string;
  desc: string;
  isVisible: boolean;
}
const props = defineProps<Props>();

const dasharray = ref(110);
const _num = ref(Math.ceil(props.num / 2));

watch(
  () => props.isVisible,
  newVal => {
    if (newVal) {
      setTimeout(() => {
        init();
      }, 500);
    }
  }
);

// const init = () => {
//   _num.value = Math.ceil(props.num / 2);
//   const Interval = setInterval(() => {
//     if (_num.value < props.num) {
//       _num.value = _num.value + 1;
//     } else {
//       clearInterval(Interval);
//       _num.value = props.num;
//     }
//   }, 20);
// };

const init = () => {
  dasharray.value = 320;
  _num.value = Math.ceil(props.num / 2);
  const Interval = setInterval(() => {
    if (dasharray.value <= 10) {
      clearInterval(Interval);
      dasharray.value = 10;
      _num.value = props.num;
    }
    if (_num.value < props.num) {
      _num.value = _num.value + 1;
    }
    dasharray.value = dasharray.value - 5;
  }, 20);
};
</script>

<template>
  <div class="meter">
    <div class="contain pos-a">
      <svg width="138px" height="138px">
        <defs>
          <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#1B75F0" />
            <stop offset="100%" stop-color="#61CEFF" />
          </linearGradient>
        </defs>
        <path
          stroke-dasharray="320"
          :stroke-dashoffset="dasharray"
          id="myPath"
          d="M 42 102  
          A 45 45 0 1 1 114 68"
          stroke="url(#linear)"
          stroke-width="10"
          stroke-linecap="round"
          fill="none"
        />
      </svg>
    </div>
    <div class="view fdr-c flex-middle">
      <div class="num">{{ _num }}</div>
      <div class="unit">{{ unit }}</div>
    </div>
    <div class="flex-middle fdr-c describe">
      <p class="title">{{ title }}</p>
      <p class="desc">{{ desc }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.meter {
  position: relative;
  width: 138px;
  height: 138px;
  @include webp($base-img-dir + '/meter/meter_track.png');
  background-size: cover;
  background-position: center;
  .view {
    position: absolute;
    top: 0;
    left: 0;
    width: 138px;
    height: 138px;
    .num {
      color: var(--cg-color-blue12);
      font: var(--cg-font-text12);
    }
    .unit {
      color: var(--cg-color-blue3);
      font: var(--cg-font-text);
    }
  }

  .describe {
    width: 100%;
    position: absolute;
    bottom: -30px;
    .title {
      color: var(--cg-color-grey1);
      font: var(--cg-font-text7);
    }

    .desc {
      color: var(--cg-color-grey5);
      font: var(--cg-font-text);
    }
  }
}
</style>
