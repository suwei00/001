<script setup lang="ts">
import { ref, computed } from 'vue';
import { CgField, CgButton } from '@/components/cg-template-2';
import { Toast } from 'vant';
import { useShowCountdown } from './useInfoHooks';
import { useRequest } from 'vue-request';
import { smsOnlineCode } from '@/http/blue-apis';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { storeToRefs } from 'pinia';

const props = defineProps<{
  data: any;
  close: () => void;
}>();

const userInfoStore = userInfoStateStore();
const { userInfo } = storeToRefs(userInfoStore);

const { allseconds, counting, startCount } = useShowCountdown(300 * 1000);

const coderef = ref();

const formdata = ref({
  code: ''
});


const params = computed(() => {
  return {
      ty: '5',
      flag: 'text'
  };
});

const {
  loading,
  run: runPhoneCode,
  data
} = useRequest(() => smsOnlineCode(params.value), {
  manual: true,
  onSuccess: (res: any) => {
    //   closeLoading();
    Toast('Gửi Mã Xác Minh Thành Công');
    startCount();
  },
  onError: () => {
    //   closeLoading();
  }
});

const submitParams = computed(() => ({
    verify_code: formdata.value.code
}));

const submitForm = async () => {
  //
};

const { loading: submitLoading, run: submitRun } = useRequest(() => submitForm(), {
  manual: true
});

const getPhoneCode = () => {
  if (loading.value) return;
  runPhoneCode();
};

const cancelClick = () => {
  props.close();
}
</script>
<template>
  <div class="verifycode-info">
    <section>
      <ul class="form-ul">
        <li :class="{'error-item': formdata.code && !(/^[0-9]{4}$/.test(formdata.code))}">
          <div class="code">
            <cg-field
              v-model="formdata.code"
              ref="coderef"
              type="number"
              class="code-input"
              maxlength="4"
              placeholder="Vui lòng nhập mã xác nhận"
              :clear="true"
              :pattern="/^[0-9]{4}$/"
              message="Vui lòng nhập 4 số mã xác nhận"
            ></cg-field>
            <cg-button
              whiteStyle
              :width="200"
              :height="80"
              class="code-btn"
              :border-radius="'16'"
              :disabled="counting"
              @click.prevent="getPhoneCode"
              >{{ counting ? allseconds + ' GIÂY' : `LẤY MÃ XÁC NHẬN` }}</cg-button
            >
          </div>
        </li>
      </ul>
      <div class="warn-msg">＊Vui lòng sử dụng lưu lượng di động để nhận mã xác nhận. Cố gắng tránh sử dụng WiFi</div>
      <div class="bot-btns">
        <cg-button width="212" height="64" whiteStyle @click="cancelClick">HỦY BỎ</cg-button>
        <cg-button :disabled="formdata.code.length !== 4"  width="212" height="64" @click="">XÁC NHẬN</cg-button>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
export default {
  name: 'VerifyCode'
};
</script>

<style lang="scss" scoped>
.form-ul {
  padding: 20px 0px;
  padding-top: 0;
  background-color: var(--cg-color-white);
  li {
    position: relative;
    :deep(.error_text) {
      font: var(--cg-font-text2);
      line-height: 26px;
      color: var(--cg-color-red2);
      position: absolute;
      left: 0;
    }
    :deep(.error_text) {
      display: none;
    }
    &.error-item {
      padding-bottom: 24px;
      :deep(.error_text) {
        display: block;
      }
    }
  }
}
.label {
  display: block;
  margin-top: 20px;
  margin-bottom: 20px;
  color: var(--cg-color-black1);
  font: var(--cg-font-text7);
}
.bot-desc {
  padding: 32px 114px;
  font: var(--cg-font-text3);
  line-height: 30px;
  text-align: center;
  color: var(--cg-color-black1);
  a {
    text-decoration: underline;
    color: var(--cg-color-blue1);
  }
}
.code {
  display: flex;
  align-items: center;
  gap: 20px;
  .w_full {
    width: auto !important;
    flex: 1;
  }
  .code-btn {
    font: var(--cg-font-text8);
  }
}

.warn-msg {
  font: var(--cg-font-text4);
  line-height: 28px;
  color: var(--cg-color-red2);
}
.bot-btns {
  display: flex;
  padding-top: 40px;
  gap: 24px;
  justify-content: center;
  align-items: center;
}
</style>
