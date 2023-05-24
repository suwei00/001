<script setup lang='ts' name='cg-search'>
import searchImg from '@icon/search.png?preset=full'

const { mask, placeholder = '搜索' } = defineProps<{
  modelValue: string
  mask?: boolean
  placeholder?: string
  disabled?: boolean
}>()
const emit = defineEmits(['search', 'update:modelValue'])

let data = $ref('')
// 遮罩层逻辑
const searchBoxRef = ref()
const searchRef = ref()
const [showSearchMask, toggleSearchMask] = useToggle(true)
const onClickMask = () => {
  toggleSearchMask(false)
  searchRef.value.focus()
}
onClickOutside(searchBoxRef, () => {
  toggleSearchMask(true)
  if (mask)
    data = ''
})

watch($$(data), () => {
  emit('update:modelValue', data)
})
// 搜索事件
const searchHandler = () => {
  emit('search', data)
  onClickMask()
}

// 获取焦点方法
const focus = () => {
  searchRef.value.focus()
}
// 清空值
const clearData = () => {
  data = ''
}

defineExpose({ focus, clearData })
</script>

<template>
  <div ref="searchBoxRef" class="search_content">
    <van-search
      ref="searchRef" v-model="data"
      class="search_input" :placeholder="placeholder" background="transparent" w-full
      :maxlength="20" :disabled="disabled" @search="searchHandler"
    >
      <template #left-icon>
        <div flex items-center mr-5px>
          <img w-17px inline-block :src="getSupportImage(searchImg)" alt="">
        </div>
      </template>
    </van-search>
    <!-- 搜索栏遮罩层 -->
    <template v-if="mask">
      <div v-show="showSearchMask" class="search-mask" @click="onClickMask">
        <img :src="getSupportImage(searchImg)" alt="" w-17px h-17px mr-8px>
        搜索
      </div>
    </template>
  </div>
</template>

<style lang='scss' scoped>
.search_content {
  padding: 0 0 8px 8px;
  position: relative;

  .search_input {
    padding: 0;
    padding-right: 12px;
    border-radius: 4px;
  }
  .search-mask{
    width: 94.6%;
    height: 81%;
    position: absolute;
    top: 0;
    left: 8px;
    background-color: $color-white-6;
    border-radius: 2.5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: $size14;
    color: $color-gray-1;
  }
}
</style>
