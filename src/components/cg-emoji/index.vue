<script setup lang='ts'>
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'
const emit = defineEmits(['change'])

const onSelectEmoji = (val: any) => {
  emit('change', val.i)
}
</script>

<template>
  <EmojiPicker class="cg_emoji" :hide-search="true" :hide-group-names="true" :disable-skin-tones="true" :native="true" @select="onSelectEmoji" />
</template>

<style lang='scss' scoped>
.cg_emoji{
    width: 100%;
    height: 200px;
    border-radius: 0;
    :deep(.v3-footer){
        display:none;
    }
}
</style>
