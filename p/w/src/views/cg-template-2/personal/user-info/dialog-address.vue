<script setup lang="ts">
import { watch, computed } from 'vue';
import { CgInput, CgButton, CgSelect } from '@/components/cg-template-2';
import { useForm } from './useInfoHooks';
import { useAddress } from '@/hooks/useAddress';
import { getCustomerServeUrl } from '@/utils/common';
import { useRequest } from 'vue-request';
import { bindAddress } from '@/http/blue-apis';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import Toast from '@/components/cg-template-2/toast';

const props = defineProps<{ close: () => void }>();
const userStore = userInfoStateStore();

const isFormValid = computed(() => {
  return formdata.area && formdata.province && formdata.district && formdata.wards && formdata.specificAddr;
});

const { formref, formdata, rules, validForm, resetForm } = useForm([
  {
    key: 'area',
    label: 'Khu Vực',
    value: '',
    rule: [
      // {
      //   required: true,
      //   trigger: 'blur',
      //   message: 'Khu Vực'
      // }
    ]
  },
  {
    key: 'province',
    label: 'Tỉnh/Thành Phố',
    value: '',
    rule: [
      // {
      //   required: true,
      //   trigger: 'blur',
      //   message: 'Tỉnh/Thành Phố'
      // }
    ]
  },
  {
    key: 'district',
    label: 'Quận/Huyện',
    value: '',
    rule: [
      // {
      //   required: true,
      //   trigger: 'blur',
      //   message: 'Quận/Huyện'
      // }
    ]
  },
  {
    key: 'wards',
    label: 'Phường/Xã',
    value: '',
    rule: [
      // {
      //   required: true,
      //   trigger: 'blur',
      //   message: 'Phường/Xã'
      // }
    ]
  },
  {
    key: 'specificAddr',
    label: 'Địa Chỉ Cụ Thể',
    value: '',
    rule: [
      // {
      //   required: true,
      //   trigger: 'blur',
      //   message: 'Địa Chỉ Cụ Thể'
      // }
    ]
  }
]);

const { loading, run } = useRequest(bindAddress, {
  manual: true,
  onSuccess: () => {
    userStore.getUserInfo();
    props.close();
    Toast('Liên Kết Thành Công');
  }
});

const submitForm = () => {
  if (validForm() && !loading.value) {
    const allAddress = `${formdata.area}|${formdata.province}|${formdata.district}|${formdata.wards}|${formdata.specificAddr}`;
    run({ address: allAddress });
  }
};

const { addressOptionLot, provinceOptionLot, cityOptionLot, areaOptionLot, cityObj } = useAddress();

watch(
  () => cityObj,
  val => {
    formdata.area = cityObj.address;
    formdata.province = cityObj.province;
    formdata.district = cityObj.city;
    formdata.wards = cityObj.area;
  },
  { deep: true }
);
</script>

<template>
  <div class="dialog-inner-content">
    <!-- <div class="grey-desc">
      Vì sự an toàn của bạn, thông tin không thể được sửa đổi sau khi xác nhận. Nếu bạn cần trợ giúp, vui lòng liên hệ
      <a :href="getCustomerServeUrl()" target="_blank">CSKH</a>
    </div> -->

    <el-form :model="formdata" :rules="rules" ref="formref" label-width="104px" label-position="left">
      <el-form-item label="Khu Vực" prop="area">
        <cg-select v-model="cityObj.address" class="input-box" placeholder="Khu Vực" :options="addressOptionLot" />
      </el-form-item>
      <el-form-item label="Tỉnh/Thành Phố" prop="province">
        <cg-select v-model="cityObj.province" class="input-box" placeholder="Tỉnh/Thành Phố" :options="provinceOptionLot" />
      </el-form-item>
      <el-form-item label="Quận/Huyện" prop="district">
        <cg-select v-model="cityObj.city" class="input-box" placeholder="Quận/Huyện" :options="cityOptionLot" />
      </el-form-item>
      <el-form-item label="Phường/Xã" prop="wards">
        <cg-select v-model="cityObj.area" class="input-box" placeholder="Phường/Xã" :options="areaOptionLot" />
      </el-form-item>
      <el-form-item label="Địa Chỉ Cụ Thể" prop="specificAddr">
        <cg-input v-model="formdata.specificAddr" :clear="true" maxlength="100" class="input-box" :placeholder="'Ví dụ: Số 123, Đường xxx, Thôn/Ấp xxx'" />
      </el-form-item>
    </el-form>

    <!-- <div class="cg-form-item">
      <label>Khu Vực</label>
      <cg-select v-model="formdata.area" class="input-box" placeholder="Khu Vực" />
    </div> -->
    <!-- <div class="cg-form-item">
      <label>Tỉnh/Thành Phố</label>
      <cg-select v-model="formdata.province" class="input-box" placeholder="Tỉnh/Thành Phố" />
    </div> -->
    <!-- <div class="cg-form-item">
      <label>Quận/Huyện</label>
      <cg-select v-model="formdata.district" class="input-box" placeholder="Quận/Huyện" />
    </div> -->
    <!-- <div class="cg-form-item">
      <label>Phường/Xã</label>
      <cg-select v-model="formdata.wards" class="input-box" :options="[{ value: 1, label: 'a' }]" :placeholder="'Phường/Xã'" />
    </div> -->
    <!-- <div class="cg-form-item">
      <label>Địa Chỉ Cụ Thể</label>
      <cg-input class="input-box" :placeholder="'Ví dụ: Số 123, Đường xxx, Thôn/Ấp xxx'" />
    </div> -->
    <div class="warn-msg">＊<span class="grey-txt">Địa chỉ chi tiết mà bạn cung cấp chúng tôi tuyệt đối bảo mật, bạn cứ yên tâm khi điền!</span></div>
    <div class="btn-box">
      <cg-button :disabled="!isFormValid" small @click="submitForm">XÁC NHẬN</cg-button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DialogAddress'
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
  .el-input__inner {
    font-size: 13px;
    // padding: 0 12px;
    padding-left: 12px;
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

  .el-input__suffix {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 40px;
    align-items: center;
    cursor: pointer;
  }
}

.cg-form-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 6px 0;

  label {
    width: 92px;
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

  .icon-suffix {
    height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 10px;
    cursor: pointer;
  }
}

.warn-msg {
  padding-top: 6px;
  font: var(--cg-font-text6);
  line-height: 15px;
  color: var(--cg-color-red);

  .grey-txt {
    color: var(--cg-color-grey1);
  }
}

.btn-box {
  padding-top: 24px;
  display: flex;
  justify-content: center;
}
</style>
