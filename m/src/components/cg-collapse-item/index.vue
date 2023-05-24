<template>
    <!-- 唯一父元素class命名规则 页面:cg-p-pageName 组件cg-c-componentName -->
    <div class='cg-c-collapse-item'>
       <cg-avatar :src="getSupportImage(exportImg[image!])" alt="" class="cg-c-collapse-item-avatar" size="80"/>
       <div class="font_32 cg-ellipsis">
            <cg-high-txt :h-search="lightText" :h-text="name" />
       </div>
    </div>
</template>
<script setup lang='ts'>
import { ref,ComponentCustomProperties } from 'vue';
export interface cgCollapseItemProps {
    name?: string,
    image?:keyof ComponentCustomProperties['exportImg'],
    lightText?:string,
}
const props = withDefaults(
    defineProps<cgCollapseItemProps>(), {
        name: '',
        image:'empty_no'
    })
const emit = defineEmits(['click'])
</script>
<style lang='scss' scoped>
.cg-c-collapse-item {
    display: flex;
    align-items: center;
    padding: 20px 32px;
    &-avatar{
        margin-right: 24px;
        flex-shrink: 0;
    }
}
</style>