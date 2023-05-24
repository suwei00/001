<script setup lang='ts'>
import { computed, ref, watch, queuePostFlushCb } from 'vue'
import { CgIcon } from '@/components/cg-template-2'

interface Props {
  modelValue: string
  list: string[]
}
const emit = defineEmits(['update:modelValue', 'choose'])
const props = defineProps<Props>()
const cgBreadcrumb = ref<HTMLDivElement>()


const currentValue = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value)
})

// 初始化
emit('update:modelValue', props.list[props.list.length - 1])

const choose = (value: string) => {
  emit('choose', value)
  currentValue.value = value
}

const scroll = () => {
  if (cgBreadcrumb.value) {
    const maxScrollLeft = cgBreadcrumb.value.scrollWidth - cgBreadcrumb.value.clientWidth
    cgBreadcrumb.value.scrollLeft = maxScrollLeft
  }
}

watch(() => props.modelValue, (o, n) => {
  setTimeout(() => {
    scroll()
  }, 100)
})

</script>
<template>
  <div ref="cgBreadcrumb" class="cg-breadcrumb">
    <div class="item" v-for="str, i in list">
      <label @click="choose(str)" :class="{ active: currentValue === str }">{{ str }}</label>
      <cg-icon v-show="i !== list.length - 1" width="20" height="16" style="margin: 0 5px;" name="i_blue_arrow" />
    </div>
  </div>
</template>
<script lang='ts'>
export default {
  name: 'CGBreadcrumb'
}
</script>

<style lang='scss' scoped>
.cg-breadcrumb {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  font-size: var(--cg-font-15);
  font-weight: 700;
  color: var(--cg-color-grey1);
  padding-right: 12px;

  .item {
    display: flex;
    align-items: center;
    padding-bottom: 6px;

    label {
      cursor: pointer;


    }

    .active {
      color: var(--cg-color-blue1);
    }

    &:hover {
      text-decoration: underline;
    }
  }


  overflow-x: scroll;
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;

  /* IE 10+ */
  &::-webkit-scrollbar {
    display: none;
    /* Chrome Safari */
  }
}
</style>