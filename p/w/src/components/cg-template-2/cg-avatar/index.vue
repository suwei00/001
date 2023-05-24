<script setup lang="ts" name="cg-avatar">
import { ref } from 'vue';
import { CgIcon } from '@cg-template-2-components/index';
import type CgAvatar from './index';
import { storeToRefs } from 'pinia';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { CgDialogClass } from '@/components/cg-template-2/cg-dialog/function-call';
import ChooseAvatar from './choose-avatar.vue';

const userInfoStore = userInfoStateStore();
const { userInfo } = storeToRefs(userInfoStore);
const Dialog = new CgDialogClass();

interface Props extends CgAvatar.Props {
  isJump?: boolean;
  editable?: boolean; // 头像是否可编辑
  width?: number | string; // 头像的宽度
  height?: number | string; // 头像的高度
  fillRate: number;
}
const props = withDefaults(defineProps<Props>(), { editable: true, isJump: true, width: 80, height: 80 });
// const fillRate = ref(50);
const emit = defineEmits<{
  (e: 'avatarEdit'): void;
}>();
const handleEditAvatar = () => {
  emit('avatarEdit');
  if (props.editable && props.isJump) {
    openEdit();
  }
};

const openEdit = () => {
  Dialog.showDialog({
    title: 'CHỈNH ẢNH ĐẠI DIỆN',
    template: 'tmp3',
    showClose: true,
    btns: 0,
    customComponent: ChooseAvatar,
    props: { close: () => Dialog.closeDialog() }
  });
};

defineExpose({ openEdit });
</script>
<template>
  <div class="cg-avatar" :style="`width: var(--cg-px-${props.width});height:var(--cg-px-${props.height})`">
    <el-progress :indeterminate="true" color="var(--cg-color-blue3)" style="width: 100%; height: 100%" :duration="5" type="circle" :percentage="fillRate" :stroke-width="5">
      <app-image class="img" :src="`/avatar/${userInfo.avatar || '0'}.png`" alt="icon-online" />
    </el-progress>
    <div class="i_edit" v-if="props.editable">
      <slot>
        <cg-icon @click.stop="handleEditAvatar" class="icon_hover" name="i_edit" :width="23" :height="23" />
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.cg-scroll-bar) {
  .content-box {
    overflow: visible !important;
  }
}
.cg-avatar {
  border-radius: 50%;
  box-shadow: 0px 1px 2px 0px rgba(118, 171, 214, 0.4);
  position: relative;
  cursor: pointer;
  background-color: transparent;

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

  .i_edit {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 6;
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

::v-deep(.el-progress-bar__outer) {
  background: transparent !important;
}

:slotted(i) {
  position: absolute;
  z-index: 2;
  right: 0;
  bottom: 0;
}
</style>
