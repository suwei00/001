<script setup lang="ts">
import { onMounted, ref } from 'vue';

interface Props {
  list: Array<any>;
}
const props = defineProps<Props>();
const emit = defineEmits(['onClick']);

const activeIndex = ref(0);
let Interval: any = null;

const dynamicIndex = () => {
  clearInterval(Interval);
  Interval = setInterval(() => {
    if (activeIndex.value < props.list.length - 1) {
      activeIndex.value = activeIndex.value + 1;
    } else {
      activeIndex.value = 0;
    }
  }, 5000);
};

const setIndex = (index: number) => {
  activeIndex.value = index;
  dynamicIndex();
};

onMounted(() => {
  dynamicIndex();
});
</script>

<template>
  <div class="carousel_main pointer">
    <app-image class="home-banner" :class="{ banner_active: activeIndex === index }" v-for="(item, index) in list" :is-google-cloud="true" :src="item.img" @click="emit('onClick', item)" />
    <ul class="point flex-middle" v-if="list.length > 1">
      <li class="pointer" v-for="(item, index) in list" @click="setIndex(index)" :key="item.id" :class="{ active: activeIndex === index }"></li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.carousel_main {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  .home-banner {
    height: 100%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    transition: all 0.4s;
    max-width: none;
    margin: 0 auto;
    user-select: none;
    pointer-events: auto;
    width: auto;
    z-index: 1;
  }

  .banner_active {
    opacity: 1;
    z-index: 9;
  }

  .point {
    width: 100%;
    height: 16px;
    position: absolute;
    bottom: 18px;
    // background-color: red;
    z-index: 18;
    li {
      width: 12px;
      height: 12px;
      border-radius: 12px;
      background-color: var(--cg-color-white1);
      box-shadow: inset 0px 2px 2px var(--cg-shadow-color1);
      margin: 0 8px;
    }

    .active {
      width: 16px;
      height: 16px;
      border-radius: 16px;
      background: linear-gradient(180deg, var(--cg-color-blue3) 0%, var(--cg-color-blue12) 100%);
    }
  }
}
</style>
