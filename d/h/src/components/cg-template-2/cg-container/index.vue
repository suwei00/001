<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  padding?: string;
  type?: 'login' | 'table'  // login:登陆
  radius?: string; // 圆角,
  margin?: string,
  width?: number | string // 宽 单位px
  height?: number | string // 高 单位px
  border?: string // 边框
  isShadow?: boolean//是否有阴影
  bg?: string//背景色
  borderColor?: string//边框颜色
  overflow?: string//是否溢出
}


const props = withDefaults(defineProps<Props>(), {
  padding: '0,0,0,0',
  height: '100%',
  width: '100%',
  margin: '0,0,0,0',
  radius: '16',
  border: '1',
  isShadow: true,
  borderColor: '--cg-color-blue11',
  overflow: 'hidden',
});
const radiusTransform = computed(() => props.radius.split(',').map((s) => `var(--cg-px-${s})`).join(' '));
const paddingTransform = computed(() => props.padding.split(',').map((s) => `var(--cg-px-${s})`).join(' '));
const marginTransform = computed(() => props.margin.split(',').map((s) => `var(--cg-px-${s})`).join(' '));
</script>
<template>
  <!-- 登陆 -->
  <div class='pub_login' v-if="type === 'login'" :style="{
    borderRadius: radiusTransform,
    margin: marginTransform,
    padding: paddingTransform,
  }">
    <slot></slot>
  </div>
  <!-- table -->
  <div class='pub_tables' v-else-if="type === 'table'" :style="{
    margin: marginTransform,
    padding: paddingTransform,
  }">
    <slot></slot>
  </div>
  <div v-else class="cg-container" :class="isShadow ? 'shadow' : ''" :style="{
    borderRadius: radiusTransform,
    width: width && `var(--cg-px-${width})`,
    height: height && `var(--cg-px-${height})`,
    margin: marginTransform,
    padding: paddingTransform,
    border: border && `${border}px solid var(${borderColor})`,
    background: bg ? `var(${props.bg})` : `var(--cg-color-white)`,
    overflow: overflow,
  }">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.cg-container {
  background: var(--cg-color-white);
  border: 2px solid var(--cg-color-blue11);
  border-radius: var(--cg-border-radius);
  height: 100%;
}

.shadow {
  box-shadow: 0px 8px 8px var(--cg-color-blue12);
}

//活动
.pub_active {
  width: 100%;
  height: 328px;
  background: url(link($base-img-dir + '/avatars/avatar-4.png')) no-repeat;
  background-size: 100% 100%;
  background-position: 0 center;

  .act_img {
    width: 100%;
    height: 328px;
  }
}

//login
.pub_login {
  background: var(--cg-gradient-white-blue-login);
  border: 2px solid var(--cg-color-blue11);
  box-shadow: var(--cg-login-shadow);
  border-radius: var(--cg-border-radius);
  height: 100%;
}

.pub_tables {
  border-top: 2px solid var(--cg-color-blue11);
  border-left: 2px solid var(--cg-color-blue11);
  border-right: 2px solid var(--cg-color-blue11);
  overflow: hidden;
  border-radius: var(--cg-conainter-radius);
  height: 100%;
}
</style>
