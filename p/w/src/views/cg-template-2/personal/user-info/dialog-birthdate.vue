<script setup lang="ts">
import { shallowRef, h } from 'vue';
import { CgButton, CgIcon } from '@/components/cg-template-2';
import { useForm } from './useInfoHooks';
import { dayjs } from '@/utils/time';
import { useRequest } from 'vue-request';
import { updateBirth } from '@/http/blue-apis';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { timeToVietnam } from '@/utils/time';
import Toast from '@/components/cg-template-2/toast';

const props = defineProps<{ close: () => void }>();
const userStore = userInfoStateStore();

const time18 = timeToVietnam(dayjs().subtract(18, 'year').format()).format();
const { formref, formdata, rules, validForm } = useForm([
  {
    key: 'birthdate',
    label: 'Sinh Nhật',
    value: time18,
    rule: [
      // {
      //   required: true,
      //   trigger: 'blur',
      //   message: 'Thêm ngày, đảm bảo bạn đã đủ 18 tuổi'
      // }
    ]
  }
]);

const disabledDate = (d: Date) => {
  return dayjs(d).isAfter(dayjs().subtract(18, 'year'));
};

const { loading, run } = useRequest(updateBirth, {
  manual: true,
  onSuccess: () => {
    userStore.getUserInfo();
    props.close();
    Toast('Liên Kết Thành Công');
  }
});

const submitForm = () => {
  if (validForm()) {
    run({ birth: dayjs(formdata.birthdate).format('YYYY-MM-DD') });
  }
};
const customPrefix = shallowRef({
  render() {
    return [h('p', 'pre')];
  }
});
</script>

<template>
  <div class="dialog-inner-content">
    <div class="grey-desc">Vui lòng điền ngày sinh của bạn, dễ dàng xác minh thông tin danh tính</div>

    <el-form :model="formdata" :rules="rules" ref="formref" label-width="88px" label-position="left">
      <el-form-item label="Sinh Nhật" prop="birthdate">
        <el-date-picker
          v-model="formdata.birthdate"
          class="cg-date-picker"
          prefix-icon="idate-picker"
          :disabled-date="disabledDate"
          format="DD/MM/YYYY"
          type="date"
          placeholder="Thêm ngày, đảm bảo bạn đã đủ 18 tuổi"
        >
        </el-date-picker>
      </el-form-item>
    </el-form>

    <!-- <div class="cg-form-item">
      <label>Sinh Nhật</label>
      <el-date-picker v-model="birthdate" :disabled-date="disabledDate" format="DD/MM/YYYY" type="date" placeholder="Thêm ngày, đảm bảo bạn đã đủ 18 tuổi"></el-date-picker>
    </div> -->
    <div class="btn-box">
      <cg-button :disabled="!formdata.birthdate" small @click="submitForm">XÁC NHẬN</cg-button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DialogBirthdate'
};
</script>

<style lang="scss" scoped>
:deep(.cg-date-picker) {
}
:deep(.el-input--prefix .el-input__inner) {
  padding-left: 40px;
  padding-right: 40px;
}
:deep(.el-input__prefix) {
  left: 12px;
  display: flex;
  align-items: center;
}
:deep(.el-input__icon) {
  &.idate-picker {
    width: 19px;
    height: 18px;
    background: url(link($base-img-dir + '/icon/i_datepicker.png')) no-repeat;
    background-size: 100% 100%;
    display: block;
  }
}
:deep(.el-date-editor.el-input) {
  flex: 1 !important;
}

:deep(.el-form-item) {
  align-items: center;
  padding: 6px 0px 6px 0;

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
    padding-right: 8px;
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

.cg-form-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 6px 0;

  label {
    width: 70px;
    line-height: 15px;
    padding-right: 8px;
  }
}

.btn-box {
  padding-top: 24px;
  display: flex;
  justify-content: center;
}
</style>
