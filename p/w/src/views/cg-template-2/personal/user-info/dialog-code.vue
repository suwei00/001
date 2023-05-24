<script setup lang="ts">
// import { getCustomerServeUrl } from '@/utils/common';
import { CgInput, CgButton } from '@/components/cg-template-2';
import { useEditCode } from './useInfoHooks';
const props = defineProps<{ close: () => void; data?: any }>();
const { formref, formdata, rules, submitForm, getPhoneCodeClick, loading, allseconds, counting, isCodeValid } = useEditCode();

const confirmFunc = async () => {
  const success = await submitForm();
  if (success) {
    props.close();
  }
};

const cancelClick = () => {
  props.close();
};
</script>

<template>
  <div class="dialog-inner-content">
    <el-form :model="formdata" :rules="rules" ref="formref" label-width="90px" label-position="left">
      <el-form-item label="Mã Xác Nhận" prop="code">
        <cg-input v-model="formdata.code" class="input-box code-input" maxlength="4" type="number" clearable placeholder="Vui lòng nhập mã xác nhận" />
        <div class="extra">
          <cg-button :disabled="counting" :white-style="true" width="146" height="40" :custom-style="true" @click.prevent="$event => getPhoneCodeClick()">{{
            counting ? `${allseconds} GIÂY` : 'LẤY MÃ XÁC NHẬN'
          }}</cg-button>
        </div>
      </el-form-item>
    </el-form>
    <div class="warn-msg">＊Vui lòng sử dụng lưu lượng di động để nhận mã xác nhận, cố gắng tránh sử dụng WiFi</div>
    <div class="btn-box">
      <cg-button whiteStyle small @click="cancelClick">HỦY BỎ</cg-button>
      <cg-button :disabled="!isCodeValid" small @click="confirmFunc">XÁC NHẬN</cg-button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DialogCode'
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

.warn-msg {
  padding-top: 6px;
  font: var(--cg-font-text6);
  line-height: 15px;
  color: var(--cg-color-red);
}

.btn-box {
  padding-top: 24px;
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>
