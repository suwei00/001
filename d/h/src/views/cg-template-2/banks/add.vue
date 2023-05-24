<script setup lang="ts">
import {
  CgHeader,
  CgIcon,
  CgButton,
  CgField,
  CgDivider,
  CgSelect
} from '@/components/cg-template-2';
import { insertBank } from '@/http/blue-apis';
import { computed, reactive, ref, watchEffect } from 'vue';
import { isFormReady } from '@/utils/common';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/store-pinia';
import { useI18n } from 'vue-i18n';
import { Toast } from 'vant';
import router from '@/router';
import { useLoading } from '@/hooks/useLoading';
const { startLoading, closeLoading } = useLoading();
const { t } = useI18n();
const userInfoStore = userInfoStateStore();
const { userInfo } = storeToRefs(userInfoStore);
const appStore = useAppStore();
const { bankTree } = storeToRefs(appStore);
const phoneRef = ref();
const bankNumRef = ref();
const realnameRef = ref();
const tips = ref(true); // 名字未输入的时候是否有默认的提示

const form = reactive({
  realname: userInfo.value.real_name,
  bankcard_no: '', // 银行卡号
  bank_id: '', // 下来列表银行list
  phone: userInfo.value.phone
});
watchEffect(() => {
  form.realname = userInfo.value.real_name;
  form.phone = userInfo.value.phone;
});
const actions = computed(() => {
  const bankList: any = [];
  bankTree.value.forEach((item: any) => {
    bankList.push({
      ...item,
      label: item.name,
      value: item.id.toString()
    });
  });
  return bankList;
});

// 添加银行卡
const addBank = () => {
  startLoading()
  const bankNumRefs = bankNumRef.value.validate();
  const realnameRefs = realnameRef.value.validate();
  const phoneRefs = phoneRef.value.validate();

  let params: any = {};
  if (userInfo.value.phone) {
    // 如果已绑定手机，则不传值
    params = JSON.parse(JSON.stringify(form));
    params.realname = params.realname.trim();
    delete params.phone;
  }
  if (bankNumRefs && phoneRefs && realnameRefs && form.bank_id) {
    insertBank(userInfo.value.phone ? params : form).then((res: any) => {
      if (res) {
        closeLoading()
        const onlyOnce = Number(localStorage.getItem('onlyOnce'));
        if (onlyOnce === 0) {
          localStorage.setItem('onlyPop', 'true');
        } else {
          Toast(t('addSuccess'));
        }
        if (router.currentRoute.value.query.toast) {
          Toast(t('addSuccess'));
        }
        userInfoStore.getUserInfo();
        router.back()
      } else {
        Toast(res.data);
      }
    }).finally(() => {
      closeLoading();
    });
  }

};
// 名字限制 不能输入中文  字母全大写
const handleRealNameInput = () => {
  if (!userInfo.value.real_name) {
    tips.value = false;
    // if (globalConfig.LANG === 'zh' || globalConfig.LANG === 'zh-CN') {
    //   form.realname = form.realname.replace(/[^\u4E00-\u9FA5\uf900-\ufa2d·]/g, '');
    // } else {
    //   form.realname = form.realname.replace(/[^\sa-zA-Z0-9]/g, '');
    // form.realname = form.realname.toLocaleUpperCase();
    // }
  }
};
</script>
<template>
  <div class="add_bank">
    <CgHeader> LIÊN KẾT NGÂN HÀNG </CgHeader>
    <div class="banks_content">
      <div class="cont_top">
        <div class="con_tit pos-rel">
          <span class="must_have" v-if="!userInfo.real_name">＊</span> Họ Tên Thật
        </div>
        <cg-field ref="realnameRef" class="user_name" v-model.uppercase="form.realname" maxlength="100"
          :limit="/[^A-Z ]+/g"
          limitType="name"
          :pattern="/^[A-Z][A-Z\s]*$/" message="Vui lòng nhập họ tên viết hoa không dấu" type="text"
          @input="handleRealNameInput" placeholder="Vui lòng nhập họ và tên chủ thẻ (Viết hoa không dấu) "
          :disabled="!!userInfo.real_name" :clear="true">
        </cg-field>
        <p class="bank-tip" v-if="!userInfo.real_name && tips">
          Để tiền của bạn đến tài khoản nhanh chóng, vui lòng đảm bảo rằng tên bạn điền phù hợp với
          tên tài khoản thẻ ngân hàng
        </p>
      </div>
      <CgDivider color="var(--cg-color-white1)"></CgDivider>
      <div class="cont_bot">
        <!-- 银行卡账号 -->
        <div class="con_tit">Tài Khoản Ngân Hàng</div>
          
        <cg-field ref="bankNumRef" class="user_name" v-model="form.bankcard_no" :limit="/[^\d]/g" :pattern="/^[0-9]{6,20}$/"
          message="Tài khoản rút tiền giới hạn 6-20 chữ số" type="text" :clear="true"
          placeholder="Vui lòng nhập tài khoản rút tiền của bạn" maxlength="20">
        </cg-field>
        <!-- 银行卡选择id -->
        <div class="con_tit t_top">Tên Ngân Hàng</div>
        <cg-select v-model="form.bank_id" :data="actions" @onOk="(val: any) => form.bank_id = val.value" isSearch
          :clickActionClose="true" type="customize" placeholder="Vui lòng chọn tên ngân hàng" sheetItemHeight="104" alignClass="align">
          <template #customize v-if="form.bank_id">
            <div class="flex ai-c jc-c select_active">
              <img :src="appStore.getBankLogoByBankId(form.bank_id)" alt="" class="bank_logo" />
              <span>{{ appStore.getBankNameById(form.bank_id) }}</span>
            </div>
          </template>
          <template #item="{ data }">
              <img :src="appStore.getBankLogoByBankId(data.value)" alt="" class="bank_logo" />
            <div class="name">
              {{ data.name }}
            </div>
          </template>
        </cg-select>
        <!-- 手机号码 -->
        <div class="con_tit t_top">Số Điện Thoại</div>
        <cg-field class="mb28" autocomplete="new-password" :pattern="/^[1-9]{1}[0-9]{8}$/" ref="phoneRef"
          message="Vui Lòng Nhập 9 Chữ Số, Không Bắt Đầu Bằng Số 0" maxlength="9" v-model="form.phone"
          placeholder="Vui lòng nhập 9 kí tự số điện thoại" type="text" :disabled="!!userInfo.phone" :clear="true">
        </cg-field>
      </div>
      <CgDivider color="var(--cg-color-white1)"></CgDivider>
    </div>
    <div class="flex-middle add-bank-btn">
      <cg-button width="686" class="flex-middle" :disabled="isFormReady(form)" @click="addBank">
        XÁC NHẬN
      </cg-button>
    </div>
    <p class="customer_service">
      Vì sự an toàn của bạn, thông tin không thể được sửa đổi sau khi xác nhận. Nếu bạn cần trợ
      giúp, vui lòng liên hệ <a @click.prevent="() => router.push('/customer-service')">CSKH</a>
    </p>
  </div>
</template>
<script lang="ts">
export default {
  name: 'add'
};
</script>

<style lang="scss" scoped>
.must_have {
  color: var(--cg-color-red2);
  position: absolute;
  top: -12px;
  left: -22px;
  font: var(--cg-font-text5);
}

.name {
  font: var(--cg-font-text3);
  color: var(--cg-color-black1);
  margin-left: 20px;
}

:deep(.error_text) {
  color: var(--cg-color-red2);
  font: var(--cg-font-text2);
}

.select_active {
  span {
    line-height: 30px !important;
    font: var(--cg-font-text2);
    margin-left: 20px;
    // 换行超出部分省略号
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}

:deep(.van-action-sheet__content) {
  height: 700px;
}

:deep(.select_sheet) {
  height: 700px;
}

.add-bank-btn {
  margin-top: 32px;
}

.bank_logo {
  width: 141px;
  height: 64px;
  image-rendering: -moz-crisp-edges;
  /* Firefox */
  image-rendering: -o-crisp-edges;
  /* Opera */
  image-rendering: -webkit-optimize-contrast;
  /* Webkit (non-standard naming) */
  image-rendering: crisp-edges;
  -ms-interpolation-mode: nearest-neighbor;
  /* IE (non-standard property) */
}

:deep(.tunnel-name) {
  justify-content: flex-start;

  span {
    font: var(--cg-font-text2);
    color: var(--van-field-input-text-color);
    margin-left: 10px;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    white-space: normal !important;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    width: 437px;
  }
}

.add_bank {
  .banks_content {
    .bank-tip {
      color: var(--cg-color-red2);
      font: var(--cg-font-text2);
      margin-top: 20px;
    }

    .con_tit {
      font: var(--cg-font-text7);
      color: var(--cg-color-black1);
      margin-bottom: 20px;
      position: relative;

      .must_have {
        color: var(--cg-color-red2);
        position: absolute;
        top: -10px;
        left: -22px;
      }
    }

    .t_top {
      margin-top: 24px;
    }

    .cont_top,
    .cont_bot {
      background: var(--cg-color-white);
      padding: 24px 32px;
      margin-top: 24px;
    }
  }

}
</style>
