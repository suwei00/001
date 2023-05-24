<script setup lang="ts">
interface CGDialogProps {
  title?: string
  avatarUrl?: string
  message?: string
  confirmButtonText?: string
  cancelButtonText?: string
  closeClick?: boolean
  isClose?: boolean
  defaultVlaue?: string | number
  businessCard?: string
  onClose: () => void
  onOk: (data?: any) => void
}
const props = withDefaults(defineProps<CGDialogProps>(), {
  confirmButtonText: 'OK',
  cancelButtonText: 'Hủy',
  closeClick: false
})

const inputVal = ref(props.defaultVlaue)

const onOkThrottle = throttle(() => {
  props.onOk(inputVal.value)
}, 500)
</script>

<template>
  <div class="cg_dialog font_32" @click="() => (closeClick ? onClose() : '')">
    <div class="cg_dialog_content" @click.stop.prevent>
      <div class="dia_content" v-if="defaultVlaue === undefined">
        <div class="dia_avatar_con" v-if="avatarUrl">
          <cg-avatar class="dia_avatar" :src="avatarUrl" />
          <div class="font_38 font-bold text_row">{{ title }}</div>
        </div>
        <div class="font-bold default_title" v-else-if="title">{{ title }}</div>
        <div class="dia_msg_content">
          <div class="dia_msg text_row" v-if="message"
            :class="{ dia_msg_center: !avatarUrl && title, row2: businessCard }">
            {{ message }}
          </div>
          <cg-icon name="icon_arrowright" v-if="businessCard" />
        </div>
        <div class="text_row business" v-if="businessCard">
          {{ businessCard }}
        </div>
      </div>
      <div class="dia_input" v-else>
        <div class="font-bold title text_row">{{ title }}</div>
        <cg-input class="input_dialog_type" placeholder="Tin nhắn..." v-model="inputVal" />
      </div>
      <slot></slot>
      <div class="cg_dialog_footer font-bold">
        <div class="footer_item" v-if="isClose" @click="onClose">
          {{ cancelButtonText }}
        </div>
        <div class="footer_item" @click="onOkThrottle">
          {{ confirmButtonText }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cg_dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  @include transrgba($color-black, 0.6);
  z-index: 2010;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--cg-color-text-3);

  &_content {
    width: 622px;
    background-color: var(--cg-color-bg-white);
    border-radius: 20px;
  }

  &_footer {
    border-top: 2px solid var(--cg-color-border-1);
    display: flex;
    align-items: center;

    >div {
      flex: 1;
      text-align: center;
      height: 96px;
      line-height: 96px;
    }

    >div:first-child {
      border-right: 2px solid var(--cg-color-border-1);
    }

    >div:last-child {
      color: var(--cg-color-text-1);
    }
  }

  .dia_content {
    padding: 32px 48px;

    .dia_avatar_con {
      padding-bottom: 14px;
      display: flex;
      align-items: center;

      .dia_avatar {
        margin-right: 24px;
      }
    }

    .default_title {
      padding: 14px 0;
    }

    .dia_msg_content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .dia_msg {
      margin: 18px 0;
      font-style: normal;
      line-height: 34px;
      text-align: center;
      color: var(--cg-color-text-3);
    }

    .dia_msg_center {
      text-align: left;
    }

    .row2 {
      margin-right: 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }

    .business {
      margin-top: 14px;
      padding: 32px 0 14px;
      color: var(--cg-color-text-4);
      border-top: 1px solid var(--cg-color-border-1);
    }
  }

  .dia_input {
    padding: 50px 32px;

    .title {
      margin-bottom: 32px;
    }
  }
}

.text_row {
  word-break: break-all;
  /* 单词内断行 */
  white-space: pre-wrap;
  /* 保留空格，自动换行 */
}
</style>
