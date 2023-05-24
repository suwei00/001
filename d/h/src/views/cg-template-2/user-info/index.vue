<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRequest } from 'vue-request';
import { storeToRefs } from 'pinia';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { CgHeader, CgAvatar, CgIcon, CgSelect } from '@/components/cg-template-2';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
import { updateBirth } from '@/http/blue-apis';
import { floor } from 'lodash';
import { Toast } from 'vant';

const router = useRouter();

const userInfoStore = userInfoStateStore();
const { userInfo } = storeToRefs(userInfoStore);

const isBirthValid = computed(() =>
  userInfo.value.birth !== '0' && userInfo.value.birth !== 0 && userInfo.value.birth ? true : false
);

const timepickerref = ref();

const addressSpan = computed(() => {
  if (userInfo.value.address) {
    const arr = userInfo.value.address.split('|');
    const last = arr.pop();
    return arr.join('|') + '|' + last.slice(0, 10) + '*****';
  }
  return '';
});
const menuList = computed(() => [
  {
    key: 'realname',
    title: 'Họ Tên Thật',
    desc: userInfo.value.real_name || 'Vui lòng nhập họ và tên chủ thẻ (Viết hoa không dấu)',
    path: '/banks/add?toast=yes',
    notempty: !!userInfo.value.real_name && userInfo.value.real_name !== '0'
  },
  {
    key: 'phone',
    title: 'Số Điện Thoại',
    desc: userInfo.value.phone || 'Liên kết số điện thoại, đảm bảo tài khoản an toàn',
    path: '/bind-phone',
    notempty: !!userInfo.value.phone && userInfo.value.phone !== '0'
  },
  {
    key: 'zalo',
    title: 'ZALO',
    desc: userInfo.value.zalo || 'Liên kết số điện thoại ZALO (Không bắt buộc) ',
    path: '/bind-zalo',
    notempty: !!userInfo.value.zalo && userInfo.value.zalo !== '0'
  },
  {
    key: 'email',
    title: 'Email',
    desc: userInfo.value.email || 'Liên kết Email, đảm bảo tài khoản an toàn (Không bắt buộc) ',
    path: '/bind-email',
    notempty: !!userInfo.value.email && userInfo.value.email !== '0'
  },
  {
    key: 'address',
    title: 'Địa Chỉ Nhận Hàng',
    desc: userInfo.value.address
      ? addressSpan.value
      : 'Điền địa chỉ và bạn sẽ có cơ hội nhận quà sự kiện (Không bắt buộc) ',
    path: '/bind-address',
    notempty: !!userInfo.value.address && userInfo.value.address !== '0'
  },
  {
    key: 'birthdate',
    title: 'Ngày Tháng Năm Sinh',
    desc: isBirthValid.value
      ? dayjs(Number(userInfo.value.birth) * 1000).format('DD/MM/YYYY')
      : 'Vui lòng điền ngày sinh của bạn, thuận tiện xác minh thông tin (Không bắt buộc) ',
    path: '',
    clickFn: () => {
      showDatePicker.value = true;
      if (timepickerref.value) {
        if (timepickerref.value.setShow) {
          timepickerref.value.setShow(true);
        } else {
          timepickerref.value[0]?.setShow(true);
        }
      }
    },
    notempty: isBirthValid.value
  }
]);

const showDatePicker = ref(false);

const before18 = new Date(dayjs().subtract(18, 'year').toString());
const birthdate = ref(before18);
const minDate = new Date(1900, 0, 1);
const maxDate = before18;

const dateConfirm = (d: any) => {
  submitForm(d);
  showDatePicker.value = false;
};

const dateCancel = (d: any) => {
  showDatePicker.value = false;
};

const itemClick = (item: any) => {
  // if (item.key !== 'email') {
  if (item.notempty) {
    return;
  }
  // }
  if (item.path) {
    router.push(item.path);
  } else if (item.clickFn) {
    item.clickFn();
  }
};

const disabledDate = (d: Date) => {
  return dayjs(d).isAfter(dayjs().subtract(18, 'year'));
};

const { loading, run } = useRequest(updateBirth, {
  manual: true,
  onSuccess: () => {
    Toast('Liên Kết Thành Công');
    userInfoStore.getUserInfo();
  }
});

const submitForm = (d: string) => {
  if (d) {
    d = d.split(' ')[0];
  }
  console.log(d)
  if (loading.value) return;
  //   if (validForm()) {
  run({ birth: d ? d : dayjs(birthdate.value).format('YYYY-MM-DD') });
  //   }
};
</script>
<template>
  <div class="user-info">
    <CgHeader> THÔNG TIN CÁ NHÂN </CgHeader>
    <section>
      <ul class="info flex">
        <li>
          <router-link to="/edit-avatar">
            <cg-avatar :img="userInfo.avatar || '0'" :rate="userInfoStore.infoRate * 100">
              <template #icon>
                <cg-icon name="i_edit_photo" :width="40" />
              </template>
            </cg-avatar>
          </router-link>
        </li>
        <li>
          <h3 class="name">{{ userInfo.username }}</h3>
          <app-image :src="`/icon/i_vip${userInfo.level || '1'}.png`" class="vipimg" />
        </li>
      </ul>
      <div class="">
        <ul class="menu-list">
          <template v-for="item in menuList" :key="item.title">
            <li v-if="item.key !== 'birthdate'" class="item" @click="() => itemClick(item)">
              <div class="left">
                <h3 class="title"><span v-if="item.key === 'realname' && !item.notempty" class="star">*</span>{{ item.title }}</h3>
                <p class="desc">{{ item.desc }}</p>
              </div>
              <div v-if="!item.notempty" class="right">
                <app-image src="/icon/i_arrowright.png" class="arrow-right" />
              </div>
            </li>
            <cg-select
              v-else
              ref="timepickerref"
              v-model="birthdate"
              isPicker
              placeholder=""
              selectLeftText="HỦY BỎ"
              selectRightText="XÁC NHẬN"
              :min-date="minDate"
              :max-date="maxDate"
              selectText=""
              @on-ok="(val: any) => dateConfirm(val)"
              type="noBorder"
              date-format="YYYY-MM-DD"
            >
              <li class="item" @click.stop="() => itemClick(item)">
                <div class="left">
                  <h3 class="title">{{ item.title }}</h3>
                  <p class="desc">{{ item.desc }}</p>
                </div>
                <div v-if="!item.notempty" class="right">
                  <app-image src="/icon/i_arrowright.png" class="arrow-right" />
                </div>
              </li>
            </cg-select>
          </template>
        </ul>
      </div>
      <p class="bot-desc">
        Vì sự an toàn của bạn, thông tin không thể được sửa đổi sau khi xác nhận. Nếu bạn cần trợ
        giúp, vui lòng liên hệ <a @click.prevent="() => router.push('/customer-service')">CSKH</a>
      </p>
    </section>

    <!-- <van-popup v-model:show="showDatePicker" position="bottom" round>
      <van-datetime-picker
        v-model="birthdate"
        type="date"
        cancel-button-text="HỦY BỎ"
        confirm-button-text="HOÀN TẤT"
        :min-date="minDate"
        :max-date="maxDate"
        :columns-order="['day', 'month', 'year']"
        :item-height="itemHeight"
        @confirm="dateConfirm"
        @cancel="dateCancel"
      >
      </van-datetime-picker>
    </van-popup> -->
  </div>
</template>
<script lang="ts">
export default {
  name: 'UserInfo'
};
</script>

<style lang="scss" scoped>
:deep(.van-picker.van-datetime-picker) {
  .van-picker__toolbar {
    background: linear-gradient(180deg, var(--cg-color-blue11) 0%, var(--cg-color-white) 100%);
    height: 100px;
    color: var(--cg-color-blue1);
    .van-picker__confirm,
    .van-picker__cancel {
      color: var(--cg-color-blue1);
      font: var(--cg-font-text7);
      line-height: 26px;
      padding: 0 32px;
    }
  }
  .van-picker-column__item {
    font: var(--cg-font-text6);
    color: var(--cg-color-black1);
  }
  .van-picker-column__item.van-picker-column__item--selected {
    font: var(--cg-font-h4);
    color: var(--cg-color-black1);
  }
  .van-picker__frame {
    background-color: var(--cg-color-blue17);
  }
}

.user-info {
  :deep(.cg-select) {
    height: auto;
  }
  .info {
    padding: 44px 36px;
    li:first-child {
      padding-right: 28px;
    }
    li:last-child {
      padding-top: 32px;
      .name {
        font: var(--cg-font-h4);
        line-height: 30px;
        color: var(--cg-color-blue1);
        padding-bottom: 8px;
      }
      .vipimg {
        width: 114px;
        display: block;
      }
    }
  }
  .menu-list {
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 32px;
      background-color: var(--cg-color-white);
      border-bottom: 1px solid var(--cg-color-blue13);
      height: 150px;
      padding-right: 88px;
      position: relative;
      .title {
        padding-bottom: 18px;
        font: var(--cg-font-text1);
        line-height: 28px;
        color: var(--cg-color-black1);
        position: relative;
        .star {
          position: absolute;
          top: -4px;
          left: -9px;
          font: var(--cg-font-text5);
          color: var(--cg-color-red2);
        }
      }
      .desc {
        font: var(--cg-font-text2);
        line-height: 32px;
        color: var(--cg-color-gray);
        word-break: break-all;
      }
      .right {
        position: absolute;
        right: 0;
        top: 0;
        width: 88px;
        height: 150px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .arrow-right {
        width: 16px;
        display: block;
      }
    }
  }
  .bot-desc {
    padding: 32px 114px;
    font: var(--cg-font-text3);
    line-height: 30px;
    text-align: center;
    color: var(--cg-color-black1);
    a {
      color: var(--cg-color-blue1);
      text-decoration: underline;
    }
  }
}
</style>
