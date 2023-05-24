<script setup lang="ts">
import { ref, computed } from 'vue';
import { CgHeader, CgField, CgDivider, CgButton } from '@/components/cg-template-2';
import { Toast } from 'vant';
import { useRouter } from 'vue-router';
import { useShowCountdown } from './useInfoHooks';
import { useRequest } from 'vue-request';
import { smsOnlineCode, setBindPhone } from '@/http/blue-apis';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { storeToRefs } from 'pinia';
const userInfoStore = userInfoStateStore();
const { userInfo } = storeToRefs(userInfoStore);

const { allseconds, counting, startCount } = useShowCountdown(300 * 1000);

const router = useRouter();

const phoneref = ref();
const coderef = ref();

const formdata = ref({
  phone: '',
  code: ''
});

const phonepattern = /^[1-9][0-9]{8,9}$/;
const isPhoneValid = computed(() => phonepattern.test(formdata.value.phone));

const params = computed(() => {
  return {
      tel: '0' + formdata.value.phone,
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

const phoneBackSid = computed(() => data); // 绑定邮箱发送成功返回id

const submitParams = computed(() => ({
    phone: '0' + formdata.value.phone,
    verify_code: formdata.value.code
}));

const submitForm = async () => {
  const phonevalid = phoneref.value.validate();
  // const codevalid = coderef.value.validate();
  if (phonevalid) {
    //  && codevalid
    let sid: any = '';
    let ts: any = '';
    if (phoneBackSid.value.value !== '0' && phoneBackSid.value.value) {
      sid = phoneBackSid.value.value.split(':')[0];
      ts = phoneBackSid.value.value.split(':')[1];
    } else {
      Toast('Vui Lòng Lấy Mã Xác Minh Trước');
      return;
    }
    if (!counting.value) {
      Toast('Vui Lòng Lấy Mã Xác Minh Trước');
      return;
    }
    setBindPhone({
      ...submitParams.value,
      sid,
      ts
    }).then(() => {
      Toast('Liên Kết Thành Công');
      router.go(-1);
    });
  }
};

const { loading: submitLoading, run: submitRun } = useRequest(() => submitForm(), {
  manual: true
});

const getPhoneCode = () => {
  if (loading.value) return;
  if (phoneref.value && phoneref.value.validate()) {
    runPhoneCode();
  }
};
</script>
<template>
  <div class="phone-info">
    <CgHeader>Số Điện Thoại</CgHeader>
    <section>
      <ul class="form-ul">
        <li>
          <span class="label">Số Điện Thoại</span>
          <cg-field
            v-model="formdata.phone"
            ref="phoneref"
            type="text"
            :width="686"
            maxlength="20"
            placeholder="Vui lòng nhập số điện thoại của bạn"
            :pattern="phonepattern"
            message="Vui lòng nhập chính xác số điện thoại"
            :clear="true"
          ></cg-field>
        </li>
        <li>
          <span class="label">Mã Xác Nhận</span>
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
            <div></div>
            <cg-button
              whiteStyle
              :width="200"
              :height="80"
              class="code-btn"
              :border-radius="'16'"
              :disabled="counting || !isPhoneValid"
              @click.prevent="getPhoneCode"
              >{{ counting ? allseconds + ' GIÂY' : `LẤY MÃ XÁC NHẬN` }}</cg-button
            >
          </div>
        </li>
      </ul>
      <cg-button :disabled="!isPhoneValid || formdata.code.length !== 4" width="686" height="88" center @click="submitRun">XÁC NHẬN</cg-button>
      <div class="bot-desc">
        Vì quyền riêng tư của bạn, thông tin không thể sửa đổi saukhi xác nhận, nếu cần giúp đỡ vui lòng liên hệ bộ phận<a @click.prevent="() => router.push('/customer-service')">CSKH</a>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Phone'
};
</script>

<style lang="scss" scoped>
.form-ul {
  padding: 20px 32px;
  background-color: var(--cg-color-white);
  margin-bottom: 32px;
  border-bottom: 2px solid var(--cg-color-white1);
  :deep(.error_text) {
    font: var(--cg-font-text2);
    line-height: 26px;
    color: var(--cg-color-red2);
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

  .code-btn {
    margin-left: 20px;
    font: var(--cg-font-text8);
  }
}
</style>
