<script setup lang='ts' name="jl-avatar">
const { editable = false } = defineProps<{
  editable?: boolean // 头像是否可编辑
}>()
const emit = defineEmits<{
  (e: 'avatarEdit'): void
}>()
const userStore = useUserStore()
const { avatar, fillRate } = $(storeToRefs(userStore))
const { avatarImgSrc } = useAvatar($$(avatar))

const handleEditAvatar = () => {
  emit('avatarEdit')
}
</script>

<template>
  <div class="jl-avatar">
    <el-progress
      :indeterminate="true" color="#597EF7" style="width:100%;height:100%" :duration="5" type="circle"
      :percentage="fillRate" :stroke-width="5"
    >
      <jl-image class="img" :src="avatarImgSrc.src" :thumb="avatarImgSrc.thumb" w-80px h-80px />
    </el-progress>
    <slot v-if="editable">
      <i class="icon-edit" w-20px h-20px @click="handleEditAvatar" />
    </slot>
  </div>
</template>

<style lang="scss" scoped>
.jl-avatar {
  border-radius: 50%;
  box-shadow: 0 2px 4px 1px rgba(113, 124, 147, 0.5000);
  position: relative;

  &::after {
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    border-radius: 50%;
    overflow: hidden;
    width: 100%;
    height: 100%;
    background-color: transparent;
    backdrop-filter: blur(10px);
    z-index: -1;
  }

  .img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }

}

:deep(.el-progress) {
  width: 100%;
  height: 100%;

  .el-progress__text {
    width: 100%;
    height: 100%;
  }

  .el-progress-circle {
    width: 100% !important;
    height: 100% !important;
    position: relative;
    z-index: 2;
  }
}

:slotted(i) {
  position: absolute;
  z-index: 2;
  right: 0;
  bottom: 0;
}
</style>
