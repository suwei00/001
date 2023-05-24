<script lang="ts" setup>
interface Props {
  err?: any
}
withDefaults(defineProps<Props>(), {
  err: '',

})
</script>

<template>
  <div class="entryInputWarp">
    <div class="entryInputMain" :class="err ? 'entryInputMainErr' : ''">
      <div class="entryInputIcon">
        <slot name="entryInputIcon" />
      </div>
      <div class="entryInput">
        <slot name="entryInput" />
      </div>
      <div class="entryRight">
        <slot name="entryRight" />
      </div>
    </div>
    <div class="entryInputTipWarp" :class="err ? 'entryInputTipErr' : ''">
      <div class="entryInputTip">
        {{ err }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.entryInputWarp {
  width: 100%;
  padding-bottom: 10px;

  .entryInputMain {
    width: 100%;
    display: flex;
    align-items: center;
    height: 45px;
    padding: 0 11px;
    border-radius: 22px;
    border: 1px solid transparent;
    background: rgba(255, 255, 255, 0.2);

    .entryInputIcon {
      width: 17px;
      height: 17px;
      margin-right: 11px;
    }

    .entryInput {
      flex: 1;
      width: 100%;
    }
    .entryRight{
      height: 100%;
      margin-left: 11px;
      display: flex;
      align-items: center;
    }

    &.entryInputMainErr {
      border-color: #FF001E;
    }
  }

  .entryInputTipWarp {
    width: 100%;
    min-height: 0;
    max-height: 0;
    overflow: hidden;
    transition: all ease 0.3s;

    .entryInputTip {
      width: 100%;
      padding-top: 8px;
      line-height: 14px;
      // 超出换行
      word-break: break-all;
      color: #FF001E;
      font-size: 10px;
    }

    &.entryInputTipErr {
      min-height: 22px;
      max-height: 66px;
    }
  }
}
</style>
