<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { CgHeader, CgField, CgDivider, CgButton, CgSelect } from '@/components/cg-template-2';
import { useAddress } from '@/hooks/useAddress';
import { useRequest } from 'vue-request';
import { bindAddress } from '@/http/blue-apis';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { useRouter } from 'vue-router';
import { Toast } from 'vant';

const router = useRouter();

const userStore = userInfoStateStore();

const formdata = ref({
  region: '',
  province: '',
  city: '',
  area: '',
  detail: ''
});

const isFormValid = computed(() => formdata.value.region && formdata.value.province && formdata.value.city && formdata.value.area && formdata.value.detail);

const { loading, run } = useRequest(bindAddress, {
  manual: true,
  onSuccess: () => {
    Toast('Liên Kết Thành Công');
    userStore.getUserInfo();
    router.go(-1);
  }
});

const validForm = () => {
  return true;
}

const submitForm = () => {
  if (validForm() && !loading.value) {
    const allAddress = `${formdata.value.region}|${formdata.value.province}|${formdata.value.city}|${formdata.value.area}|${formdata.value.detail}`;
    run({ address: allAddress });
  }
};

const { cityObj, regionOptionLot, provinceOptionLot, cityOptionLot, areaOptionLot } = useAddress();

watch(
  () => cityObj,
  () => {
    formdata.value.region = cityObj.region;
    formdata.value.province = cityObj.province;
    formdata.value.city = cityObj.city;
    formdata.value.area = cityObj.area;
  },
  {
    deep: true,
  }
);
</script>
<template>
  <div class="address-info">
    <CgHeader>ĐỊA CHỈ NHẬN HÀNG</CgHeader>
    <section>
      <ul class="form-ul">
        <li>
          <span class="label">Khu Vực</span>
          <cg-select
            :data="regionOptionLot"
            v-model="cityObj.region"
            placeholder="Khu Vực"
            selectLeftText="HỦY BỎ"
            selectRightText="XÁC NHẬN"
            selectText="ĐỊA CHỈ NHẬN HÀNG"
            @onOk="(val: any) => cityObj.region = val.value"
          >
          </cg-select>
        </li>

        <li>
          <span class="label">Tỉnh/Thành Phố</span>
          <cg-select
            :data="provinceOptionLot"
            v-model="cityObj.province"
            placeholder="Tỉnh/Thành Phố"
            selectLeftText="HỦY BỎ"
            selectRightText="XÁC NHẬN"
            selectText="ĐỊA CHỈ NHẬN HÀNG"
            @onOk="(val: any) => cityObj.province = val.value"
          >
          </cg-select>
        </li>

        <li>
          <span class="label">Quận/Huyện</span>
          <cg-select
            :data="cityOptionLot"
            v-model="cityObj.city"
            placeholder="Quận/Huyện"
            selectLeftText="HỦY BỎ"
            selectRightText="XÁC NHẬN"
            selectText="ĐỊA CHỈ NHẬN HÀNG"
            @onOk="(val: any) => cityObj.city = val.value"
          >
          </cg-select>
        </li>

        <li>
          <span class="label">Phường/Xã</span>
          <cg-select
            :data="areaOptionLot"
            v-model="cityObj.area"
            placeholder="Phường/Xã"
            selectLeftText="HỦY BỎ"
            selectRightText="XÁC NHẬN"
            selectText="ĐỊA CHỈ NHẬN HÀNG"
            @onOk="(val: any) => cityObj.area = val.value"
          >
          </cg-select>
        </li>

        <li>
          <span class="label">Địa Chỉ Cụ Thể</span>
          <cg-field
            v-model="formdata.detail"
            type="text"
            :width="686"
            maxlength="100"
            :clear="true"
            placeholder="Ví dụ: Số 123, Đường xxx, Thôn/Ấp xxx"
          ></cg-field>
        </li>
        <li>
          <p class="form-desc">
            <span class="star">＊</span>Địa chỉ chi tiết mà bạn cung cấp chúng tôi tuyệt đối bảo
            mật, bạn cứ yên tâm khi điền!
          </p>
        </li>
      </ul>
      <cg-button :disabled="!isFormValid" width="686" height="88" center @click="submitForm">XÁC NHẬN</cg-button>
      <div class="bot-desc">
        Vì sự an toàn của bạn, thông tin không thể được sửa đổi sau khi xác nhận. Nếu bạn cần trợ
        giúp, vui lòng liên hệ <a @click.prevent="() => router.push('/customer-service')">CSKH</a>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Address'
};
</script>

<style lang="scss" scoped>
.form-ul {
  padding: 20px 32px;
  background-color: var(--cg-color-white);
  margin-bottom: 32px;
  border-bottom: 2px solid var(--cg-color-white1);
  .form-desc {
    padding-top: 20px;
    font: var(--cg-font-text3);
    line-height: 30px;
    color: var(--cg-color-black1);
    .star {
      color: var(--cg-color-red2);
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
</style>
