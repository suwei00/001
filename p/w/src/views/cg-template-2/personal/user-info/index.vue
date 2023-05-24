<script setup lang="ts">
import { computed, Component } from 'vue';
import { dayjs } from '@/utils/time';
import { getCustomerServeUrl } from '@/utils/common';
import { CgButton } from '@/components/cg-template-2';
import PersonalTitle from '../components/personal-title/index.vue';
import BlueTable from './blue-table.vue';
import DialogZalo from './dialog-zalo.vue';
import DialogEmail from './dialog-email.vue';
import DialogLoginpwd from './dialog-loginpwd.vue';
import DialogAddress from './dialog-address.vue';
import DialogBirthdate from './dialog-birthdate.vue';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { storeToRefs } from 'pinia';
import { useMemRebate } from './useInfoHooks';
import { CgDialogClass } from '@/components/cg-template-2/cg-dialog/function-call'
import DialogPhone from './dialog-phone.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const Dialog = new CgDialogClass()
const userInfoStore = userInfoStateStore();
const { userInfo } = storeToRefs(userInfoStore);

userInfoStore.getUserInfo();

const isBirthValid = computed(() => userInfo.value.birth !== '0' && userInfo.value.birth !== 0 && userInfo.value.birth);
const addressSpan = computed(() => {
  if (userInfo.value.address) {
    let arr = userInfo.value.address.split('|');
    let last = arr.pop();
    return arr.join('|') + '|' + last.slice(0, 10) + '*****';
  }
  return '';
});

const { refundRatesData, commissionRatesData } = useMemRebate();

const showEditDialog = (title: string, comp: Component) => {
  Dialog.showDialog({
    title: title,
    template: 'tmp2',
    showClose: true,
    btns: 0,
    customComponent: comp,
    props: { close: () => Dialog.closeDialog() }
  });
};

const showPhone = () => {
  if (userInfo.value.phone && userInfo.value.phone !== '0' && userInfo.value.phone !== 0) return;
  showEditDialog('XÁC MINH SỐ ĐIỆN THOẠI DI ĐỘNG', DialogPhone);
}

const showZalo = () => {
  if (userInfo.value.zalo && userInfo.value.zalo !== '0') return;
  showEditDialog('ZALO', DialogZalo);
};

const showEmail = () => {
  if (userInfo.value.email && userInfo.value.email !== '0') return;
  showEditDialog('EMAIL', DialogEmail);
};

const showLoginpwd = () => {
  showEditDialog('Mật Khẩu Đăng Nhập', DialogLoginpwd);
};

const showAddress = () => {
  if (userInfo.value.address && userInfo.value.address !== '0') return;
  showEditDialog('ĐỊA CHỈ NHẬN HÀNG', DialogAddress);
};

const showBirthdate = () => {
  if (isBirthValid.value) return;
  showEditDialog('NGÀY THÁNG NĂM SINH', DialogBirthdate);
};

const goBank = () => {
  if (userInfo.value.real_name && userInfo.value.real_name !== '0') return;
  router.push('/personal/banks');
}
</script>

<template>
  <div class="user-info-detail">
    <personal-title title="THÔNG TIN CÁ NHÂN"
      description="Để Đảm Bảo An Toàn Cho Tài Khoản Của Bạn, Vui Lòng Điền Đầy Đủ Thông Tin Cá Nhân Của Bạn" />
    <ul class="info-list">
      <!-- <li class="item">
        <label>Thông Tin Cơ Bản</label>
        <div class="content color-deep">Sửa đổi thông tin cơ bản vui lòng liên hệ <a :href="getCustomerServeUrl()"
            target="_blank">CSKH</a></div>
        <div class="empty"></div>
      </li> -->
      <li class="item required has-btn" :class="{emptyitem: !userInfo.real_name}">
        <label><span v-if="!userInfo.real_name">*</span>Họ Tên Thật</label>
        <div class="content border-deep" @click="goBank">{{ userInfo.real_name || 'Chưa được xác minh' }}</div>
        <cg-button v-if="!userInfo.real_name && userInfo.real_name !== '0'" width="160" height="38" @click="goBank">Điền
          thông tin</cg-button>
        <div v-else class="empty"></div>
      </li>
      <!-- <li class="item">
        <label>An Toàn Tài Khoản</label>
        <div class="content color-deep">Nếu cần sửa đổi vui lòng liên hệ <a :href="getCustomerServeUrl()"
            target="_blank">CSKH</a></div>
        <div class="empty"></div>
      </li> -->
      <li class="item" :class="{emptyitem: !userInfo.phone && userInfo.phone !== '0' && userInfo.phone !== 0}">
        <label>Số Điện Thoại</label>
        <div class="content border-deep" @click="$event => showPhone()">{{ userInfo.phone || 'Chưa được xác minh' }}</div>
        <cg-button v-if="!userInfo.phone && userInfo.phone !== '0' && userInfo.phone !== 0" width="160" height="38" @click="$event => showPhone()">Điền thông
          tin</cg-button>
        <div v-else class="empty"></div>
      </li>
      <li class="item has-btn" :class="{emptyitem: !userInfo.zalo}">
        <label>ZALO</label>
        <div class="content border-deep" @click="$event => showZalo()">{{ userInfo.zalo || 'Chưa được xác minh (Không bắt buộc)' }}</div>
        <cg-button v-if="!userInfo.zalo && userInfo.email !== '0'" width="160" height="38" @click="$event => showZalo()">Điền thông
          tin</cg-button>
        <div v-else class="empty"></div>
      </li>
      <li class="item has-btn" :class="{emptyitem: !userInfo.email}">
        <label>Email</label>
        <div class="content border-deep" @click="$event => showEmail()">{{ userInfo.email || 'Chưa được xác minh (Không bắt buộc)' }}</div>
        <cg-button v-if="!userInfo.email && userInfo.email !== '0'" width="160" height="38" @click="$event => showEmail()">Điền thông tin</cg-button>
        <div v-else class="empty"></div>
      </li>
      <li class="item has-btn">
        <label>Mật Khẩu Đăng Nhập</label>
        <div class="content color-deep" @click="$event => showLoginpwd()">*******</div>
        <cg-button width="160" height="38" @click="$event => showLoginpwd()">Thay đổi</cg-button>
      </li>
      <li class="item has-btn" :class="{emptyitem: !userInfo.address}">
        <label>Địa Chỉ Nhận Hàng</label>
        <div class="content border-deep" @click="$event => showAddress()" :title="userInfo.address ? userInfo.address : ''">{{ userInfo.address ? addressSpan : 'Chưa được xác minh (Không bắt buộc)' }}</div>
        <cg-button v-if="!userInfo.address && userInfo.address !== '0'" width="160" height="38" @click="$event => showAddress()">Điền thông
          tin</cg-button>
        <div v-else class="empty"></div>
      </li>
      <li class="item has-btn" :class="{emptyitem: !isBirthValid}">
        <label>Ngày Tháng Năm Sinh</label>
        <div class="content border-deep" @click="$event => showBirthdate()">{{ isBirthValid? dayjs(Number(userInfo.birth) * 1000).format('DD/MM/YYYY') :
        'Chưa được xác minh (Không bắt buộc)' }}</div>
        <cg-button v-if="!isBirthValid" width="160" height="38" @click="$event => showBirthdate()">Điền thông
          tin</cg-button>
        <div v-else class="empty"></div>
      </li>
    </ul>
    <div class="info-desc"><span class="star">＊</span>Vì sự an toàn của bạn, thông tin không thể được sửa đổi sau khi xác nhận. Nếu bạn cần trợ giúp, vui lòng liên hệ <a :href="getCustomerServeUrl()" target="_blank">CSKH</a></div>
    <personal-title title="TỶ LỆ HOÀN TRẢ" />
    <div class="table-wrap">
      <blue-table :data="refundRatesData" :label-title="'LOẠI TRÒ CHƠI'" :value-title="'TỶ LỆ HOÀN TRẢ'" />
    </div>
    <blue-table :data="commissionRatesData" :label-title="'LOẠI TRÒ CHƠI'" :value-title="'TỶ LỆ HOA HỒNG'" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'UserInfo'
};
</script>

<style lang="scss" scoped>
.user-info-detail {
  .info-desc {
    padding: 7px 0 30px;
    font: var(--cg-font-text);
    line-height: 17px;
    color: var(--cg-color-grey1);
    .star  {
      color: var(--cg-color-red);
    }
    a {
      text-decoration: underline;
      color: var(--cg-color-blue12);
    }
  }
  .info-list {
    padding-bottom: 0px;

    .item:first-child {
      padding-top: 0;
    }

    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 0;

      label {
        font: var(--cg-font-text);
        line-height: 17px;
        color: var(--cg-color-grey1);
        width: 152px;
        position: relative;
        display: inline-block;
      }

      .content {
        height: 38px;
        width: 547px;
        // border: 1px solid var(--cg-color-black5);
        border: 1px solid var(--cg-color-blue8);
        border-radius: 4px;
        font: var(--cg-font-text);
        line-height: 17px;
        color: var(--cg-color-grey1);
        padding: 0 12px;
        line-height: 36px;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        a {
          color: var(--cg-color-blue12);
          text-decoration: underline;
          cursor: pointer;
        }

        &.border-deep {
          border-color: var(--cg-color-blue8);
        }

        &.color-deep {
          color: var(--cg-color-grey1);
        }
      }
        &.emptyitem {
          .content {
            color: var(--cg-color-grey5);
            // border: 1px solid var(--cg-color-black5);
          }
        }

      &.required {
        label span {
          position: absolute;
          color: var(--cg-color-red);
          left: -9px;
          top: 0;
        }
      }

      .empty {
        width: 160px;
      }
    }
  }
}

.table-wrap {
  padding-top: 9px;
  padding-bottom: 24px;
}
</style>
