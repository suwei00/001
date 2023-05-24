<script lang="ts" setup>
// v-show="venueActiveIndex === index"
// `${item.activeIcon}?+${new Date().getTime()}`
interface Props {
  src: string
}
const props = withDefaults(defineProps<Props>(), {
  src: '',
})
</script>

<template>
  <img
    style="width: 24px; height: 24px;"
    :src="props.src" alt=""
  >
</template>
