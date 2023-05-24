<script setup lang="ts" name="activity">
import type { BaseTransitionProps } from 'vue'
import bgImg from '@images/home/main-bg.png?preset=full'

// 接口
const { data: promoList } = useRequest(
  getPromotionList,
  {
    onSuccess(res) {
      res.sort((a: any, b: any) => a.sort - b.sort)
    },
  },
)

const { handleItemClick } = useActivityRedirect()
const onBeforeEnter: BaseTransitionProps['onBeforeEnter'] = (el) => {
  el.style.opacity = 0
  el.style.height = 0
}
const onEnter: BaseTransitionProps['onEnter'] = (el, done) => {
  anime({
    targets: el,
    opacity: 1,
    height: 200,
    delay: el.dataset.index * 100,
  }).finished.then(() => done())
}
const onLeave: BaseTransitionProps['onLeave'] = (el, done) => {
  anime({
    targets: el,
    opacity: 0,
    duration: 0,
  }).finished.then(() => done())
}
</script>

<template>
  <div :style="getBackgroundImgObj(bgImg)" class="activity" pt-24px pb-24px>
    <main>
      <transition-group mode="out-in" :css="false" @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave">
        <div
          v-for="(item, index) in promoList" :key="item.id" :data-index="index" class="scale11 banner anime-item"
          @click="handleItemClick(item)"
        >
          <jl-cloud-image w="1300px" h="200px" :src="item.static.list_web" />
        </div>
      </transition-group>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.activity {
  background-size: cover;
  background-repeat: repeat-y;
}

main {
  width: 1300px;
  margin: 0 auto;

  .banner {
    box-shadow: 0 0 12px 3px hsl(219, 89%, 70%, 20%);
    overflow: hidden;
    border-radius: 15px;
    cursor: pointer;
    margin-bottom: 20px;

    &:last-of-type {
      margin-bottom: 0px;
    }
  }
}
</style>

<route lang="yaml">
meta:
  layout: main
</route>
