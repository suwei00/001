<template>
  <section class="user-left">
    <CgContainer class="top" type="info" radius="12">
      <template #content>
        <div class="user-info">
          <cg-avatar ref="avatarref" @click="openAvatar" :width="80" :height="80" editable
            :fill-rate="userInfoStore.dataIntegrity * 100" />
          <p class="name">{{ userInfo.username }}</p>
          <p class="bot_liner">
            <cg-divider color="--cg-color-blue8" />
          </p>
          <router-link to="/personal/agent-benefit">
            <div class="hover-class">
              <p class="sign" :style="`padding-bottom: ${userInfo.level < 10 && formattedrate < 1 ? 0 : 5}px`">
                <span v-if="userInfo.level >= 10">Chúc Mừng Bạn Đã Thăng<br />Cấp Cao Nhất!</span>
                <span v-else-if="formattedrate >= 1">Chúc Mừng Bạn Đã Thăng Cấp<br />(Tự Động Sau 02:00 Giờ)</span>
                <span v-else>Số Tiền Cần Nạp Để Thăng Cấp</span>
              </p>
              <div class="content-tip">
                <p v-if="userInfo.level < 10 && formattedrate < 1" class="money-tip">
                  <cg-amount size="13" weight="700" :amount="userInfo.now" :isClick="true" :segmentation="false"
                    @callBack="refreshOrDetail" suffix="K" padding="0" :precision="0"></cg-amount>
                  <span class="line">/</span>
                  <cg-amount size="13" weight="700" :amount="userInfo.next" :isClick="true" :segmentation="false"
                    @callBack="refreshOrDetail" suffix="K" padding="0" :precision="0"></cg-amount>
                </p>
                <div class="progress-wrap">
                  <cg-progress height="6" :rate="(formattedrate * 1000) / 10" position="none"
                    :round="false"></cg-progress>
                  <div class="vips">
                    <cg-icon :name="`i_vip${userInfo.level || 1}`" width="56" />
                    <span class="vip-score">{{ multiply(formattedrate, 100) }}%</span>
                    <cg-icon v-if="userInfo.level < 10"
                      :name="`i_vip${userInfo.next_level > 0 ? userInfo.next_level : userInfo.level + 1}`" width="56"
                      :style="`filter: opacity(${0.3 + formattedrate * 0.7})`" />
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </template>
    </CgContainer>
    <div class="separator"></div>
    <CgContainer class="bot" type="parent" padding="0" radius="12">
      <template #content>
        <div class="wallet">
          <div class="info">
            <cg-use-amount prefix="i_dollar" suffix="i_refresh" amountPadding="0" prefixSize="26" :suffixSize="22"
              segmentation amountSize="18" />
            <!-- <cg-icon name="i_dollar" width="26" height="26" />
            <div class="money">10000<span>K</span></div>
            <cg-icon name="i_refresh" width="14" /> -->
          </div>
          <ul class="deal-money">
            <router-link to="/personal/deposit" custom v-slot="{ navigate, isActive }">
              <li @click="navigate" :class="{ active: isActive || isHover === 'deposit' }"
                @mouseenter="$event => setIsHover('deposit')" @mouseleave="$event => setIsHover('')">
                <div class="icon-wrap"><cg-icon
                    :name="isActive || isHover === 'deposit' ? 'i_deposit_active' : 'i_deposit'"
                    :width="isActive || isHover === 'deposit' ? 48 : 42" /></div>
                <p>NẠP TIỀN</p>
              </li>
            </router-link>
            <router-link to="/personal/transfer" custom v-slot="{ navigate, isActive }">
              <li @click="navigate" :class="{ active: isActive || isHover === 'transfer' }"
                @mouseenter="$event => setIsHover('transfer')" @mouseleave="$event => setIsHover('')">
                <div class="icon-wrap"><cg-icon
                    :name="isActive || isHover === 'transfer' ? 'i_transfer_active' : 'i_transfergrey'"
                    :width="isActive || isHover === 'transfer' ? 48 : 42" /></div>
                <p>CHUYỂN KHOẢN</p>
              </li>
            </router-link>
            <router-link to="/personal/withdraw" custom v-slot="{ navigate, isActive }">
              <li @click="navigate" :class="{ active: isActive || isHover === 'withdraw' }"
                @mouseenter="$event => setIsHover('withdraw')" @mouseleave="$event => setIsHover('')">
                <div class="icon-wrap"><cg-icon
                    :name="isActive || isHover === 'withdraw' ? 'i_withdraw_active' : 'i_withdrawgrey'"
                    :width="isActive || isHover === 'withdraw' ? 48 : 42" /></div>
                <p>RÚT TIỀN</p>
              </li>
            </router-link>
          </ul>
        </div>
        <div class="user-menu">
          <menu-list :menu-list="menuListA" />
          <menu-list :menu-list="menuListB" />
          <menu-list :menu-list="menuListC" />
          <menu-list :menu-list="menuListD" />
        </div>
      </template>
    </CgContainer>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, computed, toRef } from 'vue';
import { storeToRefs } from 'pinia';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { CgContainer, CgAvatar, CgAmount, CgIcon, CgProgress, CgUseAmount, CgDivider } from '@/components/cg-template-2';
import MenuList from './menu-list.vue';
import { floor } from 'lodash';
import { multiply } from 'cg-utils';

const avatarref = ref();

const userInfoStore = userInfoStateStore();
const { userInfo, letterCount } = storeToRefs(userInfoStore);

const formattedrate = computed(() => {
  if (userInfo.value.level === 10) {
    return 1;
  }
  if (Number(userInfo.value.now) > 0 && Number(userInfo.value.next) > 0) {
    const currate = floor(userInfo.value.now / userInfo.value.next, 2);
    return currate >= 1 ? 1 : currate;
  }
  return 0;
});

const isHover = ref('');
const setIsHover = (name: string) => {
  isHover.value = name;
};

const menuListA = reactive([
  { icon: 'i_userdetail', label: 'Thông Tin Cá Nhân', path: '/personal/user-info' },
  { icon: 'i_betrecord', label: 'Lịch Sử Đặt Cược', path: '/personal/bet-record' },
  { icon: 'i_transrecord', label: 'Lịch Sử Giao Dịch', path: '/personal/transaction-minutiae' },
  { icon: 'i_banks', label: 'Liên Kết Rút Tiền', path: '/personal/banks' }
]);

const menuListB = reactive([
  { icon: 'i_agency', label: 'Báo Biểu Đại Lý', path: '/personal/agent-report' },
  { icon: 'i_under', label: 'Báo Biểu Cấp Dưới', path: '/personal/subordinate-report' },
  { icon: 'i_member', label: 'Danh Sách Thành Viên', path: '/personal/member-list' },
  { icon: 'i_gamerecord', label: 'Thông Tin Đặt Cược', path: '/personal/game-record' },
  { icon: 'i_traderecord', label: 'Thông Tin Giao Dịch', path: '/personal/trade-record' },
  { icon: 'i_link', label: 'Đại Lý Marketing', path: '/personal/link' }
]);

const menuListC = reactive([{ icon: 'i_email', label: 'Tin Nhắn', path: '/personal/notice', badge: letterCount }]);

const menuListD = reactive([{ icon: 'i_device', label: 'Thông Tin Thiết Bị', path: '/personal/device' }]);

const refreshOrDetail = () => {
  console.log('刷新或者查看金额');
};

const openAvatar = () => {
  avatarref.value?.openEdit();
};
const isShow = ref(false);
const onMousechange = () => {
  isShow.value = !isShow.value
  console.log(isShow.value)
};

</script>

<script lang="ts">
export default {
  name: 'userLeft'
};
</script>

<style lang="scss" scoped>
:deep(.cg-scroll-bar) {
  .content-box {
    overflow: visible;
  }
}

:deep(.use_amount) {
  justify-content: flex-start;

  .cg_amount {
    margin-left: 6px;
    margin-right: 6px;

    >div {
      color: var(--cg-color-red3) !important;
    }
  }
}

.user-left {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  .top {
    height: 198px;
  }

  :deep(.cg-container.bot) {
    flex: 1;
  }
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 12px 0 10px;
  transition: all 0.3s;

  .name {
    color: var(--cg-color-grey1);
    font: var(--cg-font-text1);
    line-height: var(--cg-font-17);
    padding: 4px 0 7px;
  }

  .bot_liner {
    width: 201px;
    height: 0px;
    margin-bottom: 4px;
  }

  .sign {
    color: var(--cg-color-grey1);
    font: var(--cg-font-text6);
    line-height: var(--cg-font-15);
  }

  .hover-class:hover {
    cursor: pointer;

    .progress-wrap {
      :deep(.cg-progress) {
        .cg-progress-item {
          box-shadow: 0px 0px 12px #1B75F0;
        }
      }
    }

    .money-tip {
      :deep(.cg_amount) {
        .underline {
          font: var(--cg-font-text1) !important;
        }
      }

      .line {
        font: var(--cg-font-text1) !important
      }
    }


    .progress-wrap {
      .vips {
        .vip-score {
          font: var(--cg-font-text1) !important;
        }
      }
    }
  }

  .money-tip {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px 0 4px;
    z-index: 1000;

    .line {
      font: var(--cg-font-text5);
      color: var(--cg-color-blue5);
      display: inline-block;
      padding: 0 6px;
    }

    :deep(.cg_amount) {

      .pointer,
      .underline {
        text-decoration: none;
        border: 0;
      }
    }
  }

  .progress-wrap {
    width: 200px;
    position: relative;

    :deep(.cg-progress) {
      .cg-progress-item {
        background-color: var(--cg-color-grey5);
        border-width: 0.5px;
        box-shadow: 0px 0px 3px rgba(118, 171, 214, 0.4);

        .cg-progress-style-b-slot {
          font: var(--cg-font-text5);
          margin-top: 12px;
        }
      }
    }

    .vips {
      // position: absolute;
      // top: 8px;
      // left: 0;
      padding-top: 4px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font: var(--cg-font-text5);
      line-height: 15px;
      color: var(--cg-color-blue12);
    }
  }

  .progress-wrap:hover .vips .vip-score {
    font: var(--cg-font-text1);
  }

  .progress-wrap:hover {
    :deep(.cg-progress) {
      .cg-progress-item {
        box-shadow: 0px 0px 12px #1B75F0;
      }
    }
  }
}

.user-menu {}

.wallet {
  padding: 11px 20px 16px;

  .info {
    line-height: 21px;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .money {
      padding: 0 7px 0 5px;
      color: var(--cg-color-red3);
      font: var(--cg-font-text7);

      span {
        display: inline-block;
        padding-left: 4px;
      }
    }
  }

  .deal-money {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    text-align: center;
    padding-top: 15px;

    li:last-child,
    li:first-child {
      width: 57px;
      white-space: nowrap;
    }

    li {
      width: 55px;
      display: inline-block;
      font: var(--cg-font-text8);
      color: var(--cg-color-grey1);
      text-align: center;
      cursor: pointer;
      transition: all 300ms;

      .icon-wrap {
        height: 48px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      p {
        line-height: 14px;
        padding-top: 2px;
      }

      &.active {
        p {
          color: var(--cg-color-blue12);
          font-weight: 700;
        }
      }
    }
  }
}

.separator {
  height: 12px;
}
</style>
