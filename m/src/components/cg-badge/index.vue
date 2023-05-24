<template>
  <!-- 唯一父元素class命名规则 页面:cg-p-pageName 组件cg-c-componentName -->
  <div class="cg-c-badge">
    <slot></slot>
    <div class="cg-badge-icon" :class="[size,location]"
     v-if="showZero||!showZero&&computedContent!='0'" :style="{
      backgroundColor: `var(--cg-color-bg-${color})`,
      color: `var(--cg-color-text-${fontColor})`,
    }">
      <div :class="[size === 'large' ? 'font_28' : 'font_22','cg-ellipsis']"
      >{{ computedContent }}</div>
    </div>
  </div>
</template>
<script setup lang='ts'>
// import {  BadgeProps } from 'vant';
import { computed,} from 'vue'
export interface CgBadgeProps {
  color?: number | string,
  showZero?: boolean,
  size?: "large" | "medium" | "small",
  fontColor?: number | string,
  content?: string | number,
  location?:'top-left'|'top-right'|'bottom-left'|'bottom-right',
  max?:string | number,
}
const props = withDefaults(defineProps<CgBadgeProps>(), {
  color: 4,
  fontColor: 'white',
  size: "medium",
  showZero: false,
})
// 判断展示max
const computedContent = computed(()=>{
  if(props.max && (props.content! >= props.max )){
    return props.max + '+'
  }else{
    return props.content
  }
})
</script>
<style lang='scss' scoped>
@mixin minWidthHeight($width, $height) {
  min-width: $width;
  height: $height;
  line-height: $height;
}

// scale 兼容缩放字体
@mixin FontLineheight($height, $scale: 1) {
  height: calc($height / $scale);
  line-height: calc($height / $scale);
}
@mixin positionTranslate($top,$right,$btotom,$left){
  position: absolute;
  transform-origin: 100%;
  top: $top;
  right: $right;
  bottom: $btotom;
  left: $left;
}
.cg-c-badge {
  img {
    display: block;
  }
  display: inline-block;
  position: relative;

  .cg-badge-icon {
    text-align: center;
    border-radius: 9999px;
    left: 26px;
   img{
    display: block !important;
   }
  }

  .large {
    @include minWidthHeight(76px, 76px);
    padding: 0px 32px;

    >div { 
      max-width: calc(100vw - 152px);
      overflow: hidden;
      @include FontLineheight(76px)
    }
  }

  .medium {
    @include minWidthHeight(36px, 36px);
    padding: 0px 11px;
    >div {
      @include FontLineheight(36px, 0.9166)
    }
  }

  .small {
    @include minWidthHeight(32px, 32px);
    padding: 0px 11px;
    >div {
      @include FontLineheight(32px, 0.9166)
    }
  }
  .top-left{
   @include positionTranslate(0,auto,auto,0);
    transform: translate(-50%,-50%);
  }
  .top-right{
    @include positionTranslate(0,auto,auto,100%);
    transform: translate(-50%,-50%);
  }
  .bottom-left{
    @include positionTranslate(auto,auto,0,0);
    transform: translate(-50%,50%);
  }
  .bottom-right{
    @include positionTranslate(auto,auto,0,100%);
    transform: translate(-50%,50%);
  }
}</style>