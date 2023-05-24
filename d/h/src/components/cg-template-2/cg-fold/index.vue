<script lang="ts" setup>
import { ref, computed, useSlots } from 'vue';
import { useVModel } from '@vueuse/core'
import { CgContainer, CgIcon } from '@/components/cg-template-2';

const props = defineProps<{
  modelValue?: boolean;
  openText: string;
  closeText: string;
}>();
const emit = defineEmits(['update:modelValue']);
const show = useVModel(props, 'modelValue', emit);


const borderColor = computed(() => {
  return show.value ? undefined : '--cg-color-transparent';
});
const bg = computed(() => {
  return show.value ? undefined : '--cg-gradient-white-blue';
});

const toggle = () => {
  show.value = !show.value;
};
</script>

<template>
  <div class="cg-fold" :class="[(useSlots()?.default && show) ? '' : 'is-content']">
    <CgContainer :borderColor="borderColor" :bg="'--cg-color-transparent'">
      <CgContainer class="absolute flex-middle" padding="0,20,0,20" radius="16" @click="toggle" overflow="visible"
        :bg="'--cg-bread-bg'">
        <cg-icon name="i_up" :width="16" class="topicon" :class="[!show ? 'rotate-icon' : '']" />
        <span>{{ show ? props.closeText : props.openText }}</span>
        <app-image src="/line_l.png" class="size1" v-show="!show" />
        <app-image src="/line_r.png" class="size2" v-show="!show" />
      </CgContainer>
      <div v-if="show" class="content">
        <div class="icon">
          <cg-icon name="i_user_2" :width="34" />
          <span class="single">:</span>
        </div>
        <div>
          <slot></slot>
        </div>
      </div>
    </CgContainer>
  </div>
</template>

<style lang="scss" scoped>
.cg-fold {
  position: relative;
  margin-top: 29px;

  .content {
    display: flex;
    justify-content: flex-start;
    margin: 50px 12px 24px 6px;

    img {
      height: 34px;
    }

    .icon {
      display: flex;
      justify-content: flex-start;
      font: var(--cg-font-text8);
    }

    .single {
      margin-top: 4px;
    }
  }

  &.is-content {
    margin-bottom: 25px;
  }

  .absolute {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 56px;
    font-size: var(--cg-font-22);
  }

  .topicon {
    margin-right: 16px;
  }

  .size1 {
    position: absolute;
    left: -168px;
    // top: -2px;
    width: 152px;
  }

  .size2 {
    position: absolute;
    right: -168px;
    width: 152px;
  }

  .rotate-icon {
    transform: rotate(180deg);
  }
}
</style>