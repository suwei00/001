<script setup lang="ts">
interface CGAvatarProps {
  src?: string,// 上传的头像地址
  icon?: string,// 头像类型
  size?: string | number,// 头像大小
  badge?: string,// 右下角类型
  badgeSize?: string | number,// 右下角图标大小
  shape?: string,// 头像形状
}
const props = withDefaults(defineProps<CGAvatarProps>(), {
  size: 80,
  badgeSize: 28,
  badge: '',
  src: '',
  icon: '',
  shape: 'circle',
})
</script>

<template>
  <div :class="['cg_avatar', shape]" :style="`width: var(--cg-px-${props.size});height: var(--cg-px-${props.size})`">
    <img
      :src="src == '' ? props.icon == '' ? getSupportImage(exportImg.avatar_none) : getSupportImage((exportImg as any)[props.icon]) : props.src"
      alt="" />
    <img :class="['sign_img', badge]" :style="`width: var(--cg-px-${props.badgeSize})`"
      :src="getSupportImage((exportImg as any)[props.badge])" alt="" v-if="props.badge" />
  </div>
</template>

<style lang="scss" scoped>
.cg_avatar {
  position: relative;

  &.circle {
    border-radius: 50%;

    >img:nth-of-type(1) {
      border-radius: 50%;
    }
  }

  &.square {
    border-radius: 16px;

    >img:nth-of-type(1) {
      border-radius: 16px;
    }
  }

  >img:nth-of-type(1) {
    width: 100%;
    height: 100%;
  }

  .sign_img {
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
</style>
