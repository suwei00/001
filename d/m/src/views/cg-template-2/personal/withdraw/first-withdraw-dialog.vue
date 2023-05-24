<script setup lang='ts'>
import { ref, computed } from 'vue'
import APIs from '@/http/blue-apis';
import { useCountDown } from '@vant/use';
import { CgButton, CgInput } from '@/components/cg-template-2'
import Toast from '@/components/cg-template-2/toast';

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
      <div style="width:250px;">
        <CgInput v-model="verify_code" maxlength="4" type="number" placeholder="Vui lòng nhập mã xác nhận" />
      </div>
      <CgButton :disabled="showCountDown" @click="handleSendCode" height="38" fontSize="13" width="160" white-style>
        <span v-if="showCountDown">{{ formattedSeconds }} GIÂY</span>
        <span v-else>LẤY MÃ XÁC NHẬN</span>
      </CgButton>
    </div>
    <span class="tips">＊Vui lòng sử dụng lưu lượng di động để nhận mã xác nhận, cố gắng tránh sử dụng WiFi</span>
    <div style="margin-top: 26px;" class="flex ai-c jc-c">
      <CgButton style="margin-right:10px ;" small white-style @click="close()">HỦY BỎ</CgButton>
      <CgButton small :disabled="!verify_code" @click="onConfirm">XÁC NHẬN</CgButton>
    </div>
  </div>
</template>
<script lang='ts'>
export default {
  name: "FirstWithdrawDialog",
  components: { CgButton }
}
</script>

<style lang='scss' scoped>
.tips {
  font: var(--cg-font-text6);
  color: var(--cg-color-red);
}
</style>