<script setup lang="ts">
import { getCustomerServeUrl } from '@/utils/common';
import { CgInput, CgButton } from '@/components/cg-template-2';
import { useEmail } from './useInfoHooks';
const props = defineProps<{ close: () => void }>();
const { formref, formdata, rules, submitForm, getEmailCode, loading, allseconds, counting, isEmailValid, isCodeValid } = useEmail();

const confirmFunc = async () => {
  const success = await submitForm();
  if (success) {
    props.close();
  }
};
</script>

<template>
  <div class="dialog-inner-content aa">
    <div class="grey-desc">
      Vì sự an toàn của bạn, thông tin không thể được sửa đổi sau khi xác nhận. Nếu bạn cần trợ giúp, vui lòng liên hệ <a :href="getCustomerServeUrl()" target="_blank">CSKH</a>
    </div>

    <el-form :model="formdata" :rules="rules" ref="formref" label-width="87px" label-position="left">
      <el-form-item label="Địa Chỉ Email" prop="email">
        <cg-input v-model="formdata.email" class="input-box" maxlength="40" placeholder="Vui lòng nhập địa chỉ Email của bạn" :clear="true" />
      </el-form-item>
      <el-form-item label="Mã Xác Nhận Từ Email" prop="code">
        <cg-input v-model="formdata.code" maxlength="4" :clear="true" type="number" class="input-box code-input" placeholder="Vui lòng nhập mã xác nhận" />
        <div class="extra">
          <cg-button :disabled="counting || !isEmailValid" :white-style="true" width="146" height="40" :custom-style="true" @click.prevent="$event => getEmailCode()">{{
            counting ? `${allseconds} GIÂY` : 'LẤY MÃ XÁC NHẬN'
          }}</cg-button>
        </div>
      </el-form-item>
    </el-form>

    <!-- <div class="cg-form-item">
      <label>Địa Chỉ Email</label>
      <cg-input class="input-box" placeholder="Vui Lòng Nhập 9 Chữ Số, Không Bắt Đầu Bằng Số 0" />
    </div>
    <div class="cg-form-item">
      <label>Mã Xác Nhận Từ Email</label>
      <cg-input class="input-box" placeholder="Vui lòng nhập mã xác nhận" />
      <div class="extra"><cg-button :white-style="true" width="146" height="40" :custom-style="true" @click="">LẤY MÃ XÁC NHẬN</cg-button></div>
    </div> -->
    <div class="btn-box">
      <cg-button :disabled="!isCodeValid || !isEmailValid" small @click="confirmFunc">XÁC NHẬN</cg-button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DialogEmail'
};
</script>

<style lang="scss" scoped>
.dialog-inner-content {
  font: var(--cg-font-text6);
  color: var(--cg-color-grey1);
  .grey-desc {
    line-height: 15px;
    padding-bottom: 6px;
  }
  a {
    color: var(--cg-color-blue12);
    text-decoration: underline;
    cursor: pointer;
  }
}
:deep(.el-form-item) {
  align-items: center;
  padding: 6px 0px 6px 0;
  font-size: 13px;
  .el-input__inner {
    padding: 0 12px;
    font-size: 13px;
  }
  .code-input {
    .el-input__inner {
      padding-right: 0;
    }
  }
  &.is-error {
    padding-bottom: 32px;
  }
  .el-form-item__error {
    font: var(--cg-font-text6);
    color: var(--cg-color-red);
    line-height: 11px;
    padding: 0;
    top: auto;
    bottom: -23px;
  }
  .el-form-item__label {
    line-height: 15px;
    padding-right: 0px;
    font-size: 13px;
  }
  .el-form-item__content {
    display: flex;
    .input-box {
      flex: 1;
    }
    .extra {
      padding-left: 6px;
      button {
        font: var(--cg-font-text5);
        line-height: 15px;
      }
    }
  }
}
.cg-form-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 6px 0;
  label {
    width: 88px;
    line-height: 15px;
    padding-right: 0px;
  }
  .input-box {
    flex: 1;
  }
  .extra {
    padding-left: 6px;
    button {
      font: var(--cg-font-text5);
      line-height: 15px;
    }
  }
}
.btn-box {
  padding-top: 24px;
  display: flex;
  justify-content: center;
}
</style>
