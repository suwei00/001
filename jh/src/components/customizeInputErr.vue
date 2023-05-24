<script lang="ts" setup>
interface Props {
  err?: any
  border?: string
  padding?: string
}
withDefaults(defineProps<Props>(), {
  err: '',
  border: '1px solid #979797',
  padding: '0 8px',

})
</script>

<template>
  <div class="errInputWarp">
    <div class="errInputMain" :class="err ? 'errInputMainErr' : ''">
      <slot name="errInputIcon" />
      <div class="errInput">
        <slot name="errInput">
          sfdsefgras
        </slot>
      </div>
    </div>
    <div class="errInputTipWarp" :class="err ? 'errInputTipErr' : ''">
      <div class="errInputTip">
        {{ err }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.errInputWarp {
  width: 100%;
  font-size: 11px;
  line-height: 11px;
  position: relative;

  .errInputMain {
    width: 100%;
    display: flex;
    align-items: center;
    height: 30px;
    border-radius: 6px;
    border: v-bind(border);
    padding: v-bind(padding);

    .errInput {
      flex: 1;
      width: 100%;
    }

    &.errInputMainErr {
      border-color: #FF0000;
    }
  }

  .errInputTipWarp {
    width: 100%;
    min-height: 0;
    max-height: 0;
    overflow: hidden;
    transition: all ease 0.3s;
    position: absolute;
    left: 0;
    top: auto;

    .errInputTip {
      width: 100%;
      padding-top: 4px;
      line-height: 12px;
      // 超出换行
      word-break: break-all;
      color: #FF0000;
      font-size: 9px;
    }

    &.errInputTipErr {
      min-height: 16px;
      max-height: 40px;
    }
  }
}
</style>
