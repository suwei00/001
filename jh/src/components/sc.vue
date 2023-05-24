<script lang="ts" setup>
// import routerBackHook from '~/hooks/routerBackHooks'
// 客服
import { goTocustomerService } from '~/utils/customerService'
const props = withDefaults(defineProps<Props>(), {
  color: '#4F73F6',
  scLabel: '',
})
const emit = defineEmits(['onService'])

// const { goTo } = routerBackHook()

interface Props {
  color?: string
  scLabel?: string
}
const { color } = props

// const goToCs = () => {
//   goTo('/sc')
//   console.log('客服')
// }
const onService = () => {
  emit('onService')
  goTocustomerService()
}
</script>

<template>
  <span class="csWarp" @click="onService()">
    <slot name="scLabel">
      <a v-if="scLabel">{{ scLabel }}</a>
      <a v-else>在线客服</a>
    </slot>
  </span>
</template>

<style lang="scss" scoped>
.csWarp {
  a {
    color: v-bind(color);
  }
}
</style>
