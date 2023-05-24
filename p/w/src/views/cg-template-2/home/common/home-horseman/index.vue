<script setup lang="ts">
import { onBeforeUnmount, onMounted, nextTick, ref } from 'vue';
import { CgIcon, CgAmount } from '@/components/cg-template-2';
import { desensitization } from '@/utils/helpers';
import { useAppStore } from '@/store-pinia';
import { storeToRefs } from 'pinia';

const appStore = useAppStore();
const { copyMarquee } = storeToRefs(appStore);
const animationClass = ref(true);
let marqueeRef: any = ref();
const animationFn = () => {
  marqueeRef.value.classList.remove(`marquee_animation${animationClass.value ? '1' : '2'}`);
  appStore.copyHomeData();
  nextTick(() => {
    marqueeRef.value.classList.add(`marquee_animation${animationClass.value ? '2' : '1'}`);
    animationClass.value = !animationClass.value;
  });
};
onMounted(() => {
  marqueeRef.value?.addEventListener('webkitAnimationEnd', animationFn);
});

onBeforeUnmount(() => {
  marqueeRef.value.removeEventListener('webkitAnimationEnd', animationFn);
});
</script>

<template>
  <div class="horseman flex ai-c">
    <cg-icon shadow class="i_horn" width="60" name="i_horn" />
    <div class="marquee_cont flex ai-c">
      <div class="marquee flex marquee_animation1" ref="marqueeRef" id="marqueeRef">
        <div class="marquee_item flex ai-c font15" v-for="rew in copyMarquee" :key="rew.id">
          {{ desensitization(rew.list[2]) }} <span class="game">{{ rew.list[1] }}</span> Trúng
          <cg-amount :amount="rew.list[3]" class="amount" :weight="700" color="blue12" :segmentation="true" suffix="K" padding="2"></cg-amount>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes marquee1 {
  0% {
    transform: translateX(1120px);
  }

  100% {
    transform: translateX(-100%);
  }
}

@keyframes marquee2 {
  0% {
    transform: translateX(1120px);
  }

  100% {
    transform: translateX(-100%);
  }
}
.horseman {
  position: relative;
  width: 100%;
  height: 40px;
  border-radius: 20px;
  background-color: var(--cg-color-blue11);
  box-shadow: inset 0px 6px 12px var(--cg-shadow-color1);

  .i_horn {
    position: absolute;
    z-index: 20;
    left: 6px;
    top: -15px;
  }

  .marquee_cont {
    width: 1120px;
    height: 40px;
    margin-left: 65px;
    overflow: hidden;
    position: relative;
  }

  .marquee {
    width: 27000px;
    height: 40px;
    line-height: 40px;
    position: absolute;
    white-space: nowrap;
    justify-content: space-between;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
    animation-duration: 300s;
  }

  .marquee_animation1 {
    animation-name: marquee1;
  }

  .marquee_animation2 {
    animation-name: marquee2;
  }

  .marquee_item {
    .game {
      font: var(--cg-font-text1);
      color: var(--cg-color-blue12);
      padding: 0 4px;
    }

    .amount {
      margin-left: 4px;
    }
  }
}
</style>
