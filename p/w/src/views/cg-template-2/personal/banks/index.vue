<script setup lang="ts">
import { CgContainer, CgInput, CgSelect, CgButton, CgIcon, CgTab } from '@/components/cg-template-2';
import { insertBank, getMemberTree } from '@/http/blue-apis';
import { reactive, ref, watchEffect, computed, onMounted } from 'vue';
import PersonalTitle from '../components/personal-title/index.vue';
import BindUsdt from './bind-usdt.vue';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { CgDialogClass } from '@/components/cg-template-2/cg-dialog/function-call';
import { storeToRefs } from 'pinia';
import { useOption } from '@/hooks/useOption';
import Toast from '@/components/cg-template-2/toast';
import { useLoading } from '@/hooks/useLoading';
import { useAppStore } from '@/store-pinia';
import APIs from '@/http/blue-apis';
import { getCustomerServeUrl } from '@/utils/common';
import { useRouter } from 'vue-router';

const router = useRouter();

const { startLoading, closeLoading } = useLoading();
const useIn8 = require(`@/language/${globalConfig.LANG}`);
const userInfoStore = userInfoStateStore();
const { userInfo, usdtCardList } = storeToRefs(userInfoStore);
const Dialog = new CgDialogClass();
const appStore = useAppStore();
const tips = ref(true);
const realnameRef = ref();
const bankNumRef = ref();
const phoneRef = ref();
const errbank = ref(false);

const formObj = {
  realname: '',
  bankNum: '',
  bank_id: '',
  phone: ''
};
const bankForm = reactive<any>({
  ...formObj
});

watchEffect(() => {
  bankForm.realname = userInfo.value.real_name;
  bankForm.phone = userInfo.value.phone;
});

// 获取我的银行卡列表
const myBankList: any = ref([]);
const getbankList = () => {
  APIs.getBanksCardList()
    .then((res: any) => {
      if (res) {
        myBankList.value = res ?? [];
      }
    })
    .catch(() => {})
    .finally(() => {});
};
getbankList();
const bankMemList = () => {
  return getMemberTree();
};
const { option } = useOption(bankMemList, 'name', 'id');

// 添加银行卡
const addBank = () => {
  const params = {
    bank_id: bankForm.bank_id,
    bankcard_no: bankForm.bankNum,
    realname: bankForm.realname.trim(),
    phone: bankForm.phone
  };
  const realnameRefs = realnameRef.value.validate();
  const phoneRefs = phoneRef.value.validate();
  const bankNumRefs = bankNumRef.value.validate();
  tips.value = false; //姓名错误提示
  errbank.value = true; //银行卡list 错误提示
  if (userInfo.value.real_name) {
    delete params.realname;
  }
  if (userInfo.value.phone) {
    delete params.phone;
  }
  console.log(params, '添加银行卡参数');
  if (phoneRefs && bankNumRefs && realnameRefs && bankForm.bank_id) {
    insertBank(params)
      .then((res: any) => {
        if (res) {
          getbankList();
          if (!userInfo.value.real_name || !userInfo.value.phone) {
            userInfoStore.getUserInfo();
          }
          bankForm.bankNum = '';
          bankForm.bank_id = '';
          errbank.value = false;
          if (myBankList.value.length === 0) {
            fitPop();
          } else {
            Toast(useIn8.add_suc);
          }
        }
      })
      .finally(() => {
        closeLoading();
      });
  }
};
//只绑定一张卡有弹窗
const fitPop = () => {
  Dialog.showDialog({
    template: 'tmp1',
    title: 'LƯU Ý',
    tmp1Content: 'Liên Kết Thành Công, Khuyến Nghị Quý Khách Liên Kết Thêm Thẻ Ngân Hàng Khác Để Sử Dụng Dự Bị Nhằm Nâng Cao Hiệu Quả Rút Tiền Mỗi Khi Ngân Hàng Bảo Trì!',
    confirmText: 'Tôi Đã Hiểu',
    btns: 1
  });
};
//名字限制 不能输入中文  字母全大写
const handleRealNameInput = () => {
  if (!userInfo.value.real_name) {
    tips.value = false;
    // if (globalConfig.LANG === 'zh' || globalConfig.LANG === 'zh-CN') {
    //   bankForm.realname = bankForm.realname.replace(/[^\u4E00-\u9FA5\uf900-\ufa2d·]/g, '');
    // } else {
    // bankForm.realname = bankForm.realname.replace(/[^\sa-zA-Z0-9]/g, '');
    // bankForm.realname = bankForm.realname.toLocaleUpperCase();
    // }
  }
};

const activeTabIndex = ref((router.currentRoute.value.query.index as string) || '1');
const navList = computed(() => [
  { value: '1', name: `Thẻ rút tiền (${myBankList.value.length}/5)` },
  { value: '2', name: `Quản Lý USDT (${usdtCardList.value.length}/1)` }
]);

const tabChanged = (e: any) => {
  if (+e === 2) {
    if (!myBankList.value || !myBankList.value.length) {
      Dialog.showDialog({
        title: 'LƯU Ý',
        template: 'tmp1',
        tmp1Content: 'Vui Lòng Liên Kết Thẻ Ngân Hàng Trước',
        showClose: false,
        btns: 1,
        onOk: () => {
          activeTabIndex.value = '1';
        }
      });
    }
  }
};

onMounted(() => {
  userInfoStore.getUsdtCardList();
});
</script>
<template>
  <div class="personal_banks">
    <personal-title title="Liên Kết Rút Tiền" description="Liên Kết Tối Đa 5 Thẻ Ngân Hàng" />
    <div>
      <!-- <div class="tab-box">
        <cg-tab padding='27' v-model="activeTabIndex" :list="navList" @on-change="tabChanged"></cg-tab>
      </div> -->
      <div class="tabs-content">
        <Transition name="custom-classes" enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut">
          <div v-show="activeTabIndex === '1'" class="tab-slider">
            <div class="bank_conainter">
              <CgContainer type="bank" radius="12" padding="10,0,0,0">
                <template #content>
                  <div class="bank_list fw-w" v-if="myBankList.length">
                    <ul class="flex fw-w">
                      <li v-for="(bk, index) in myBankList" :key="bk.id" :data-index="index" :class="[{ 'black-card': bk.state != 1 }]">
                        <div class="bank-title flex">
                          <div class="flex-1">{{ bk.bank_branch_name }}</div>
                        </div>
                        <div class="flex bank-text">
                          <div class="bank-info flex-1">
                            <span>{{ bk.realname }}</span>
                            <p>{{ bk.bank_card.replace(/\*+/g, '*') }}</p>
                          </div>
                          <div class="bank-img">
                            <img :src="appStore.getBankLogoByBankId(bk.bank_id)" alt="" />
                          </div>
                        </div>
                      </li>
                      <li v-if="myBankList.length >= 5" class="bg_li">
                        <CgContainer padding="0" height="120" radius="8">
                          <template #content>
                            <div class="flex fdr-c jc-c ai-c no_more">
                              <app-image src="/personal/nomore.png" class="no_more_img" />
                              <div class="customer_service">
                                Thẻ ngân hàng <br />có thể liên kết đã đạt giới hạn,<br />
                                nếu cần thay đổi hãy liên hệ <a :href="getCustomerServeUrl()" target="_blank">CSKH</a>
                              </div>
                            </div>
                          </template>
                        </CgContainer>
                      </li>
                    </ul>
                  </div>
                  <div class="flex-middle" v-else>
                    <app-image class="bank_no" src="/personal/bank_no.png" />
                  </div>
                </template>
              </CgContainer>
            </div>
            <div class="bank_add">
              <el-form label-width="174px" label-position="left" width="490px" :model="bankForm">
                <!-- 真实姓名 -->
                <el-form-item
                  label="Họ Tên Thật"
                  prop="realname"
                  :rules="[
                    {
                      required: userInfo.real_name ? false : true,
                      message: '',
                      trigger: ['change']
                    }
                  ]"
                >
                  <cg-input
                    ref="realnameRef"
                    class="input_item"
                    maxlength="100"
                    autocomplete="off"
                    :limit="/[^A-Z ]+/g"
                    limitType="name"
                    v-model.uppercase="bankForm.realname"
                    placeholder="Vui lòng nhập họ và tên chủ thẻ (Viết hoa không dấu) "
                    @input="handleRealNameInput"
                    :disabled="!!userInfo.real_name"
                    message="Vui lòng nhập họ tên viết hoa không dấu"
                    :pattern="/^[A-Z][A-Z\s]*$/"
                  />
                  <p class="tips" v-if="!userInfo.real_name && tips">Để tiền của bạn đến tài khoản nhanh chóng, vui lòng đảm bảo rằng tên bạn điền phù hợp với tên tài khoản thẻ ngân hàng</p>
                </el-form-item>
                <!-- 银行账户bank_id  -->
                <el-form-item label="Tài Khoản Ngân Hàng" prop="bankNum" :rules="[{ required: false }]">
                  <cg-input
                    ref="bankNumRef"
                    placeholder="Vui lòng nhập tài khoản rút tiền của bạn"
                    type="text"
                    :limit="/[^\d]/g"
                    maxlength="20"
                    :disabled="myBankList.length >= 5"
                    v-model="bankForm.bankNum"
                    message="Tài khoản rút tiền giới hạn 6-20 chữ số"
                    :pattern="/^[0-9]{6,20}$/"
                  />
                </el-form-item>
                <!-- 银行卡名称列表 -->
                <el-form-item label="Tên Ngân Hàng" :required="false">
                  <cg-select
                    v-model="bankForm.bank_id"
                    placeholder="Vui lòng chọn tên ngân hàng"
                    :options="option"
                    filterable
                    :disabled="myBankList.length >= 5"
                    itemHeight="45"
                    :class="{ bank_border: !bankForm.bank_id && errbank }"
                  >
                    <template #selectItem="{ data }">
                      <div class="flex ai-c list_banks">
                        <img :src="appStore.getBankLogoByBankId(data.value)" alt="" class="bank_logo" />
                        <span style="margin-left: 12px; color: var(--cg-color-grey1); font: var(--cg-font-text)">
                          {{ data.label }}
                        </span>
                      </div>
                    </template>
                    <template #prefix v-if="bankForm.bank_id">
                      <img :src="appStore.getBankLogoByBankId(bankForm.bank_id)" alt="" class="bank_logo mrg-12" />
                    </template>
                  </cg-select>
                  <p class="tips" v-if="!bankForm.bank_id && errbank">Vui Lòng Chọn Tên Ngân Hàng</p>
                </el-form-item>
                <!-- 手机号 -->
                <el-form-item label="Số Điện Thoại" prop="phone" :rules="[{ required: false }]">
                  <cg-input
                    ref="phoneRef"
                    placeholder="Vui lòng nhập số điện thoại"
                    maxlength="9"
                    v-model="bankForm.phone"
                    :disabled="!!userInfo.phone"
                    message="Vui Lòng Nhập 9 Chữ Số, Không Bắt Đầu Bằng Số 0"
                    :pattern="!!userInfo.phone ? '' : /^[1-9]{1}[0-9]{8}$/"
                  ></cg-input>
                </el-form-item>
              </el-form>
              <div class="flex-middle add-bank-btn" v-if="myBankList.length < 5">
                <cg-button width="356" class="flex-middle" @click="addBank">
                  <cg-icon width="16" name="i_jia" class="icon_ji"></cg-icon>
                  THÊM THẺ NGÂN HÀNG（{{ myBankList?.length ?? 0 }}/5）
                </cg-button>
              </div>
            </div>
          </div>
        </Transition>
        <Transition name="custom-classes" enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut">
          <div v-show="activeTabIndex === '2'" class="tab-slider">
            <bind-usdt />
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'banks'
};
</script>
<style lang="scss" scoped>
.bg_li {
  justify-content: center !important;

  :deep(.pub_content) {
    background-color: var(--cg-color-blue11);
  }

  .no_more {
    margin-top: 11px;

    .no_more_img {
      height: 46px;
      width: 46px;
    }

    .customer_service {
      line-height: 15px;
      color: var(--cg-color-grey1);
      width: 202px;
      height: 45px;
      text-align: center;
      font: var(--cg-font-text6);
      margin-top: 4px;

      a {
        color: var(--cg-color-blue12);
        text-decoration: underline;
      }
    }
  }
}

.bank_border {
  :deep(.el-input__inner) {
    border-color: var(--cg-color-red);
  }
}

.mrg-12 {
  margin-left: 12px;
  margin-right: 9px;
}

.list_banks {
  margin-top: 5px;
}

.bank_logo {
  width: 70px;
  height: 32px;
}

.personal_banks {
  :deep(.list_bank_img) {
    width: 70px;
    height: 32px;
  }

  .bank_add {
    margin-top: 30px;

    .tips {
      color: var(--cg-color-red);
      font: var(--cg-font-text6);
      line-height: 15px;
      margin-top: 8px;
    }

    .add-bank-btn {
      margin-top: 18px;

      :deep(.icon_ji) {
        display: inline-block;
        margin-right: 10px;
      }
    }

    :deep(.el-select-dropdown__item) {
      height: 50px !important;
    }

    :deep(.el-form-item) {
      margin-bottom: 14px;
    }

    :deep(.el-form-item__label) {
      font: var(--cg-font-text);
      color: var(--cg-color-grey1);
      line-height: 40px;
    }

    :deep(.el-form-item__error) {
      color: var(--cg-color-red);
    }
  }

  .bank_conainter {
    min-height: 140px;

    .bank_list {
      li {
        width: 280px;
        margin-left: 10px;
        height: 120px;
        @include webp($base-img-dir + 'personal/bank_bg.png');
        margin-bottom: 10px;
        background-position: center;
        background-size: cover;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        &.black-card {
          @include webp($base-img-dir + 'personal/errbank.png');
          background-size: cover;

          .bank-img {
            filter: grayscale(1);
          }
        }

        .bank-title {
          padding: 12px 14px 0 14px;
          height: 72px;
          font: var(--cg-font-text9);
          color: var(--cg-color-white);
          text-shadow: 0px 1px 1px var(--cg-color-black3);
        }

        &.black-card {
          opacity: 0.5;
        }

        .bank-text {
          height: 38px;
          margin-bottom: 9px;
          padding-right: 14px;
        }

        .bank-del {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }

        .bank-info {
          padding: 0 14px 0 14px;
          margin-top: 8px;
          font: var(--cg-font-text8);
          color: var(--cg-color-white);
        }

        .bank-img {
          width: 86px;
          height: 38px;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }

    .bank_no {
      height: 135px;
    }
  }
}

.tabs-content {
  position: relative;
  .tab-slider {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
}

.tab-box {
  padding-bottom: 12px;
}
</style>
