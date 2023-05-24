<script setup lang="ts">
import { computed } from 'vue';
interface Props {
  padding?: string;
  type?: 'login' | 'smallContainer' | 'popup' | 'parent' | 'info' | 'bank' | 'active'; // 活动：active login:登陆
  url?: string; // 活动图片地址
  radius?: string; // 圆角,
  margin?: string,
  width?: number | string // 宽 单位px
  height?: number | string // 高 单位px
  shadow?: boolean
}

const classobj: any = {
  login: 'pub_login',
  smallContainer: 'pub_small_container', //所有小的这个容器都用这个
  popup: 'pub_pup',
  parent: 'pub_parent', //个人中心 右边最大的父级容器
  info: 'pub_info',
  bank: 'pub_bank'
};

const props = withDefaults(defineProps<Props>(), { padding: '0', url: '', radius: '0', margin: '0', });
const paddingTransform = computed(() => props.padding.split(',').map((s) => `${s}px`).join(' '));
const marginTransform = computed(() => props.margin.split(',').map((s) => `${s}px`).join(' '));
</script>
<template>
  <div class="cg-container" :style="{
    margin: marginTransform,
    width: width && `${width}px`,
    height: height && `${height}px`,
  }">
    <template v-if="type">
      <!-- 活动列表list -->
      <div class="pub_active" v-if="type === 'active'">
        <app-image :src="url" class="act_img" />
      </div>
      <!-- login：登陆、popup：table与弹窗 、smallContainer：个人中心所有的小容器 parent：外外外外层最大的盒子-->
      <div v-else :class="classobj[type]" :style="{
        borderRadius: `${radius}px`,
        width: width && `${width}px`,
        height: height && `${height}px`,
      }">
        <slot name="head"></slot>
        <div :style="{
          padding: paddingTransform,
        }">
          <slot name="content"></slot>
        </div>
      </div>
    </template>
    <!-- 默认 有border-->
    <div class="pub_content" v-else :style="{borderRadius: `${radius}px`, boxShadow: shadow ? 'var(--cg-box-shadow-containter)' : 'none'}">
      <slot name="head"></slot>
      <div :style="{
        borderRadius: `${radius}px`,
        padding: paddingTransform,
        width: width && `${width}px`,
        height: height && `${height}px`,
      }">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'CgContainer'
}
</script>

<style lang="scss" scoped>
.pub_content {
  width: 100%;
  height: 100%;
  background: var(--cg-color-white);
  border: 1px solid var(--cg-color-blue8);
  overflow: hidden;
}

.pub_bank {
  background: var(--cg-color-blue11);
  min-height: 140px;
  border: 1px solid var(--cg-color-blue8);
}

.pub_info {
  width: 240px;
  height: 198px;
  background: url(link($base-img-dir + 'personal/infobg.png')) no-repeat;
  background-size: 100% 100%;
  background-position: 0 center;
  border-radius: var(--cg-border-outer-radius);
  box-shadow: var(--cg-box-shadow-containter);
}

.pub_active {
  width: 100%;
  height: 200px;
  background: url(link($base-img-dir + 'active.png')) no-repeat;
  background-size: 100% 100%;
  background-position: 0 center;
  border-radius: var(--cg-border-outer-radius);

  .act_img {
    width: 100%;
    height: 200px;
  }
}

//login
.pub_login {
  box-shadow: var(--cg-login-shadow);
  background: var(--cg-gradient-white-blue-login);
  border: 1.5px solid var(--cg-color-blue8);
  box-shadow: var(--cg-login-shadow);
}

.pub_small_container {
  height: 100%;
  background: var(--cg-color-white);
  box-shadow: var(--cg-box-shadow-containter);
  overflow: hidden;
  border: 1px solid var(--cg-color-blue8);
}

.pub_pup {
  width: 480px;
  background: var(--cg-color-white);
  overflow: hidden;
}

//站内信
.pub_parent {
  width: 100%;
  height: 100%;
  background: var(--cg-color-white);
  box-shadow: var(--cg-box-shadow-parent);
}
</style>
