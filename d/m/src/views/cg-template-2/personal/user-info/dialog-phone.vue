<script setup lang="ts">
// import { getCustomerServeUrl } from '@/utils/common';
import { CgInput, CgButton } from '@/components/cg-template-2';
import { useEditPhone } from './useInfoHooks';
const props = defineProps<{ close: () => void }>();
const { formref, formdata, rules, submitForm, getPhoneCodeClick, loading, allseconds, counting, isPhoneValid, isCodeValid } = useEditPhone();

const confirmFunc = async () => {
  const success = await submitForm();
  if (success) {
    props.close();
  }
};
</script>

<template>
  <div class="dialog-inner-content">
    <!-- <div class="grey-desc">
      Vì sự an toàn của bạn, thông tin không thể được sửa đổi sau khi xác nhận. Nếu bạn cần trợ giúp, vui lòng liên hệ <a :href="getCustomerServeUrl()" target="_blank">CSKH</a>
    </div> -->

    <el-form :model="formdata" :rules="rules" ref="formref" label-width="90px" label-position="left">
      <el-form-item label="Số Điện Thoại" prop="phone">
        <cg-input v-model="formdata.phone" class="input-box" maxlength="9" type="number" :clear="true" placeholder="Vui Lòng Nhập 9 Chữ Số, Không Bắt Đầu Bằng Số 0" />
      </el-form-item>
      <el-form-item label="Mã Xác Nhận" prop="code">
        <cg-input v-model="formdata.code" class="input-box code-input" maxlength="4" type="number" :clear="true" placeholder="Vui lòng nhập mã xác nhận" />
        <div class="extra">
          <cg-button :disabled="counting || !isPhoneValid" :white-style="true" width="146" height="40" :custom-style="true" @click.prevent="$event => getPhoneCodeClick()">{{
            counting ? `${allseconds} GIÂY` : 'LẤY MÃ XÁC NHẬN'
          }}</cg-button>
        </div>
      </el-form-item>
    </el-form>

    <!-- <div class="cg-form-item">
      <label>Số Điện Thoại</label>
      <cg-input class="input-box" placeholder="Vui Lòng Nhập 9 Chữ Số, Không Bắt Đầu Bằng Số 0" />
    </div>
    <div class="cg-form-item">
      <label>Mã Xác Nhận</label>
      <cg-input class="input-box" placeholder="Vui lòng nhập mã xác nhận" />
      <div class="extra"><cg-button :white-style="true" width="146" height="40" :custom-style="true" @click="">LẤY MÃ XÁC NHẬN</cg-button></div>
    </div> -->
    <div class="btn-box">
      <cg-button :disabled="!isCodeValid || !isPhoneValid" small @click="confirmFunc">XÁC NHẬN</cg-button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DialogPhone'
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
    padding-right: 8px;
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
