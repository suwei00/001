<template>
    <!-- 唯一父元素class命名规则 页面:cg-p-pageName 组件cg-c-componentName -->
    <div class='cg-c-collapse'>
        <div class="cg-c-collapse-title" @click="changeVal(!open)">
            <cg-icon name="icon_symbol" width="28" height="34" class="cg-c-collapse-icon_symbol"
            :class="{
                openStyele:!open
            }"
            />
            <span class="font_30">{{ title }}</span>
        </div>
        <Transition>
            <div  v-show="open">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue';
export interface cgCollapseProps {
    title?: string,
    open: boolean,
}
const props = withDefaults(
    defineProps<cgCollapseProps>(), {
    title: '这是title',
    })
const emit = defineEmits(['update:open','change'])
const changeVal = (val: boolean ) => {
      emit('update:open', val);
      emit('change', val);
    };
</script>
<style lang='scss' scoped>
.cg-c-collapse {
    &-title{
        display: flex;
        align-items: center;
        padding: 24px 34px;
    }
    &-icon_symbol{
        transition: all 0.2s;
        margin-right:13.21px;
    }
    .openStyele{
        transform: rotate(-.25turn);
    }
    .v-enter-active,
    .v-leave-active {
        transition: all 0.2s ease;
    }

    .v-enter-from,
    .v-leave-to {
        transform: translateY(-25px);
        opacity: 0;
    }

}
</style>