<script setup lang='ts'>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useAppStore } from '@/store-pinia'
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router'

const { isApp } = storeToRefs(useAppStore())
const router = useRouter()
const routeName = computed(() => router.currentRoute.value)

const contentRef = ref()
// watch(routeName, () => {
//   contentRef.value?.scrollTo(0, 0)
// })



const removeInputFocus = () => {
  const input = document.querySelector('input:focus') as HTMLInputElement;
  if (input) {
    input.blur();
  }
};

onMounted(() => {
  try {
    document.querySelector('.with-header-layout__content')?.addEventListener('scroll', removeInputFocus)
  } catch (error) {
    console.log(error)
  }
})

onUnmounted(() => {
  try {
    document.querySelector('.with-header-layout__content')?.removeEventListener('scroll', removeInputFocus)
  } catch (error) {
    console.log(error)
  }
})
</script>
<template>
  <div class='with-header-layout' :style="{ paddingTop: isApp ? '0' : 'var(--cg-px-88)' }">
    <div ref="contentRef" class="with-header-layout__content">
      <router-view />
    </div>
  </div>
</template>
<script lang='ts'>
export default {
  name: 'WithHeaderLayout'
}
</script>

<style lang='scss' scoped>
.with-header-layout {
  // position: absolute;
  // display: flex;
  // flex-direction: column;
  // height: 100%;
  // width: 100%;
  // overflow: hidden;
  // height: calc(100% - var(--cg-px-88));
  // height: 100%;
  // overflow-y: auto;
  background-color: var(--cg-color-blue16);
  color: var(--cg-color-black1);

  .with-header-layout__content {
    // flex: 1;
    overflow: auto;
  }
}
</style>