<script setup lang='ts'>
import { ref, computed } from 'vue'
import APIs from '@/http/blue-apis';
import { useCountDown } from '@vant/use';
import { Toast } from 'vant'
import { CgButton } from '@/components/cg-template-2'

interface Props {
  onOk: (querys: any) => void
  close: () => void
}
const props = defineProps<Props>()

const { current, start } = useCountDown({
  time: 300 * 1000,
  onFinish() {
    showCountDown.value = false
  }
})
const formattedSeconds = computed(() => Math.floor(current.value.total / 1000));

const hasSend = ref(false)
const verify_code = ref('')
const sid = ref('')
const ts = ref('')

const showCountDown = ref(false)
const handleSendCode = async () => {
  APIs.getPhoneCode({ flag: 'text', ty: 4 })
    .then((res: any) => {
      sid.value = res.split(':')[0]
      ts.value = res.split(':')[1]

      start()
      showCountDown.value = true
      hasSend.value = true
    })
}

// 确认
const onConfirm = () => {
  if (!hasSend.value) {
    return Toast('Vui Lòng Lấy Mã Xác Minh Trước')
  }
  props.onOk({ sid: sid.value, ts: ts.value, verify_code: verify_code.value })
  props.close()
}
</script>
<template>
  <div class="first-withdraw-dialog">
    <div class="flex ai-c jc-sb" style="margin-bottom: 8px;">
      <input v-model="verify_code" maxlength="4" type="number" placeholder="Vui lòng nhập mã xác nhận" />
      <CgButton :disabled="showCountDown" @click="handleSendCode" height="80" width="140" white-style>
        <span class="btn-text" v-if="showCountDown">{{ formattedSeconds }} GIÂY</span>
        <span class="btn-text" v-else>LẤY MÃ XÁC NHẬN</span>
      </CgButton>
    </div>
    <div class="tips">＊Vui lòng sử dụng lưu lượng di động để nhận mã xác nhận, cố gắng tránh sử dụng WiFi</div>
    <div style="margin-top: 26px;" class="flex ai-c jc-c">
      <CgButton style="margin-right:10px ;" small white-style @click="close()">HỦY BỎ</CgButton>
      <CgButton small @click="onConfirm">XÁC NHẬN</CgButton>
    </div>
  </div>
</template>
<script lang='ts'>
export default {
  name: "FirstWithdrawDialog",
}
</script>

<style lang='scss' scoped>
.first-withdraw-dialog {
  input {
    width: 308px;
    height: 80px;
    border-radius: var(--cg-border-radius-input);
    border: 1px solid var(--cg-color-blue11);
    font: var(--cg-font-text3);
    padding-left: 10px;

    &::placeholder {
      font-size: 24px;
      scale: 0.9166;
      display: inline-block;
      line-height: 22px;
    }
  }

  .btn-text {
    font: var(--cg-font-text8);
  }
}

.tips {
  font: var(--cg-font-text4);
  color: var(--cg-color-red2);
}
</style>