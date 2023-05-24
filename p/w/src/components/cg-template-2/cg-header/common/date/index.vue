<script setup lang="ts">
import { CgIcon } from '@/components/cg-template-2';
import { timeStampToVietnamformatStr, getTimeStampToDay, timeStampToVietnam, timeToVietnam } from '@/utils/time';
import { onBeforeMount, onMounted, ref } from 'vue';
const time = ref(new Date().valueOf());
const timePeriod = ref('i_daytime'); // night
let timer: any = null;

const run = () => {
  time.value = new Date().valueOf();
  const hour = timeToVietnam(time.value).get('h');
  if (hour >= 18 || hour < 6) {
    timePeriod.value = 'i_night';
  } else {
    timePeriod.value = 'i_daytime';
  }
};

onMounted(() => {
  run();
  timer = setInterval(run, 100);
});
onBeforeMount(() => {
  clearInterval(timer);
});
</script>

<template>
  <div class="date">
    <p>{{ timeStampToVietnamformatStr(time) }}</p>
    <p class="time">
      <span>{{ getTimeStampToDay(time) }}</span>
      <span>{{ timeStampToVietnam(time, 'HH:mm:ss') }}</span>
      <cg-icon width="16" :name="timePeriod" />
      <cg-icon width="28" name="i_country1" />
    </p>
  </div>
</template>

<style lang="scss" scoped>
.date {
  height: 76px;
  width: 223px;
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: var(--cg-color-white);
  font: var(--cg-font-text4);
  .time {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
