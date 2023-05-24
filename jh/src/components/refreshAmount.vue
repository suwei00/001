<script lang="ts" setup>
// component
import bgImage from '~/components/bgImage.vue'
// 背景图
import bgSrc1 from '~/assets/images/my/refresh.png?preset=full'
import bgSrc2 from '~/assets/images/my/greyRefresh.png?preset=full'
// hooks
import amountHooks from '~/hooks/amountHooks'
const props = withDefaults(defineProps<Props>(), {
  refreshType: '1',
  type: '1',
  w: '16px',
  h: '16px',
})

const { refreshAmount: refreshs, loading } = amountHooks()

interface Props {
  refreshType?: string
  type?: string // 1: 蓝色圈圈 2: 灰色圈圈
  w?: string // 宽度
  h?: string // 高度
}
const refreshAmount = () => {
  const { refreshType } = props
  refreshs(refreshType)
}
</script>

<template>
  <div class="refreshAmountIcon" :class="loading ? 'refreshAmountIconOn' : ''" @click="refreshAmount()">
    <slot name="refreshAmountIcon">
      <bgImage v-if="type === '1'" :image="bgSrc1" />
      <bgImage v-else :image="bgSrc2" />
    </slot>
  </div>
</template>

<style lang="scss" scoped>
.refreshAmountIcon {
  width: v-bind(w);
  height: v-bind(h);
}

.refreshAmountIconOn {
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
