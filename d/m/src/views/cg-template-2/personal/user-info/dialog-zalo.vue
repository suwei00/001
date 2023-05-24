<script setup lang="ts">
import { CgInput, CgButton } from '@/components/cg-template-2';
import { getCustomerServeUrl } from '@/utils/common';
import { useZalo } from './useInfoHooks';

const props = defineProps<{ close: () => void }>();
const { inputref, zalo, valid, isValid, updateZalo } = useZalo();

const confirmFunc = async () => {
  const success = await updateZalo();
  if (success) {
    props.close();
  }
};
</script>

<template>
  <div class="dialog-inner-content">
    <div class="grey-desc">
      Vì sự an toàn của bạn, thông tin không thể được sửa đổi sau khi xác nhận. Nếu bạn cần trợ giúp, vui lòng liên hệ
      <a :href="getCustomerServeUrl()" target="_blank">CSKH</a>
    </div>
    <div class="cg-form-item">
      <label>ZALO</label>
      <cg-input
        v-model="zalo"
        type="number"
        maxlength="9"
        :clear="true"
        :pattern="/^(?!0)\d{9}$/"
        :ref="el => (inputref = el)"
        placeholder="Liên kết số điện thoại ZALO"
        message="Vui lòng nhập 9 chữ số, không bắt đầu bằng số 0"
        @input="valid"
      />
    </div>
    <div class="btn-box">
      <cg-button :disabled="!isValid" small @click="confirmFunc">XÁC NHẬN</cg-button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DialogZalo'
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

:deep(.el-form-item__label) {
  line-height: 15px;
  padding-right: 8px;
  font-size: 13px;
}

:deep(.el-input__inner) {
  padding: 0 12px;
  font-size: 13px;
}

:deep(.el-form-item) {
  align-items: center;
  padding: 6px 0px 6px 0;
  font-size: 13px;
  .el-input__inner {
    padding: 0 12px;
    font-size: 13px;
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
  padding-right: 0px;

  label {
    width: 60px;
    line-height: 15px;
    padding-right: 8px;
    font-size: 13px;
  }
}

.btn-box {
  padding-top: 24px;
  display: flex;
  justify-content: center;
}
</style>
