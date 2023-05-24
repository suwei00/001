<script setup lang="ts">
import { ref, computed, onActivated } from 'vue';
import { storeToRefs } from 'pinia';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { floor } from 'lodash';
import { multiply } from 'cg-utils';
import {
  CgAvatar,
  CgIcon,
  CgProgress,
  CgContainer,
  CgContainerHead,
  CgBadge,
  CgUseAmount,
  CgAmount,
} from '@/components/cg-template-2';
import { useAppStore } from '@/store-pinia';
import { getMemberNum, getNoticeNum, } from '@/http/blue-apis';
const appStore = useAppStore();
const { token } = storeToRefs(appStore);
const userInfoStore = userInfoStateStore();
const { userInfo } = storeToRefs(userInfoStore);
const memberCount = ref(0) // 站内信未读数量
const noticeCount = ref(0) // 站内信未读数量


const getLetterCount = () => {
  if (!token.value)
    return
  getMemberNum().then((res: any) => {
    if (res >= 0) memberCount.value = res;
  })
  getNoticeNum().then((res: any) => {
    if (res >= 0) noticeCount.value = res;
  })
}
// 站内信+公告未读
const letterCount = computed(() => {
  return memberCount.value + noticeCount.value
})
getLetterCount()
const formattedrate = computed(() => {
  if (userInfo.value.level === 10) {
    return 1;
  }
  if (Number(userInfo.value.now) > 0 && Number(userInfo.value.next) > 0) {
    const currate = floor((userInfo.value.now) / (userInfo.value.next), 2);
    return currate >= 1 ? 1 : currate;
  }
  return 0;
});

onActivated(() => {
  userInfoStore.getUserInfo();
});
</script>
<script lang="ts">
export default {
  name: 'Personal'
};
</script>
<template>
  <div class="user-info-center">
    <section class="info-box">
      <div class="wrap" :class="{ noprogress: userInfo.level >= 10 }">
        <ul class="top">
          <li>
            <router-link to="/user-info">
              <cg-avatar :img="userInfo.avatar || '0'" :rate="userInfoStore.infoRate * 100">
                <template #icon>
                  <cg-icon name="i_edit_noshadow" :width="40" />
                </template>
              </cg-avatar>
            </router-link>
          </li>
          <li class="right">
            <h3 class="name">{{ userInfo.username }}</h3>
          </li>
        </ul>
        <div class="email-set">
          <div>
            <router-link to="/letter">
              <cg-badge :value="letterCount > 99 ? '99+' : letterCount" v-if="letterCount">
                <cg-icon name="i_email" width="64" />
              </cg-badge>
              <cg-icon v-else name="i_email" width="64" />
            </router-link>
          </div>
          <div>
            <router-link to="/set">
              <cg-icon name="i_setting" width="64" />
            </router-link>
          </div>
        </div>
      </div>
    </section>
    <cg-container :style="'margin-bottom:var(--cg-px-10)'">
      <div class="vip-info" :class="[userInfo.level >= 10 ? 'level-ten' : (formattedrate >= 1 ? 'has-pro rate-full' : 'has-pro rate-normal')]">
        <div class="vip-money">
          <template v-if="userInfo.level >= 10">
              <app-image :src="`/icon/i_vip${userInfo.level}.png`" class="vipimg margin-y" />
              <p class="nopadding sign">Chúc Mừng Bạn Đã Thăng Cấp Cao Nhất!</p>
            </template>
            <template v-else-if="formattedrate >= 1">
              <p class="bold-sign sign">Chúc Mừng Bạn Đã Thăng Cấp</p>
              <p class="blue-sign nopadding sign">(Tự Động Sau 02:00 Giờ)</p>
            </template>
            <template v-else>
              <p class="sign">Số Tiền Cần Nạp Để Thăng Cấp </p>
              <p class="money">
                <cg-amount size="28" weight="700" :amount="userInfo.now" :segmentation="false" suffix="K" padding="0"
                  :precision="0"></cg-amount>
                <span class="line">/</span>
                <cg-amount size="28" weight="700" :amount="userInfo.next" :segmentation="false" suffix="K" padding="0"
                  :precision="0"></cg-amount>
              </p>
            </template>
        </div>
        <div v-if="userInfo.level < 10" class="vip-bar">
          <app-image :src="`/icon/i_vip${+userInfo.level || '1'}.png`" class="vipimg" />
          <div class="flex-1 mid">
            <cg-progress :rate="multiply(formattedrate, 100)" position="center" :height="40" :round="false"></cg-progress>
          </div>
          <app-image :src="`/icon/i_vip${userInfo.next_level > 0 ? userInfo.next_level : (+userInfo.level) + 1}.png`" class="vipimg"
            :style="`filter: opacity(${0.3 + formattedrate * 0.7})`" />
        </div>
      </div>
      <div class="dash-divider"></div>
      <div class="money-info">
        <div class="left">
          <p>VÍ TIỀN CHÍNH</p>
          <div class="refresh-money">
            <cg-use-amount amountSize="28" segmentation :amountColor="'red4'" prefix="i_amount" suffix="i_refresh"
              suffix-size="48" amountPadding="0" />
          </div>
        </div>
        <ul>
          <li>
            <router-link :to="'/deposit'">
              <cg-icon name="i_h_wallet" width="72"/>
              <div class="label">NẠP TIỀN</div>
            </router-link>
          </li>
          <li>
            <router-link :to="'/transfer'">
              <cg-icon name="i_h_change" width="72"/>
              <div class="label">CHUYỂN KHOẢN</div>
            </router-link>
          </li>
          <li>
            <router-link :to="'/withdraw'">
              <cg-icon name="i_h_withdraw" width="72"/>
              <div class="label">RÚT TIỀN</div>
            </router-link>
          </li>
        </ul>
      </div>
    </cg-container>
    <cg-container height="288" :style="'margin-bottom:var(--cg-px-10)'">
      <cg-container-head>
        <template #left>
          <div class="head-left-title">
            <cg-icon name="i_favor" width="52" />
            <div class="label">CHỨC NĂNG THÔNG DỤNG</div>
          </div>
        </template>
      </cg-container-head>
      <ul class="wallet-deals">
        <li>
          <router-link to="/my-wallet">
            <cg-icon name="i_wallet" width="80" />
            <div class="label">Ví Tiền<br />Của Tôi</div>
          </router-link>
        </li>
        <li>
          <router-link to="/bet">
            <cg-icon name="i_recordbet" width="80" />
            <div class="label">Lịch Sử<br />Đặt Cược</div>
          </router-link>
        </li>
        <li>
          <router-link to="/transaction">
            <cg-icon name="i_transrecord" width="80" />
            <div class="label">Lịch Sử<br />Giao Dịch</div>
          </router-link>
        </li>
        <li>
          <router-link to="/vip-progress">
            <cg-icon name="i_vip_progress" width="80" />
            <div class="label">Phúc<br />Lợi Vip</div>
          </router-link>
        </li> 
      </ul>
    </cg-container>
    <cg-container height="452" :style="'margin-bottom:var(--cg-px-10)'">
      <cg-container-head>
        <template #left>
          <div class="head-left-title">
            <cg-icon name="i_agent" width="52" />
            <div class="label">QUẢN LÝ CẤP DƯỚI</div>
          </div>
        </template>
      </cg-container-head>
      <ul class="records">
        <li>
          <router-link to="/agent_report">
            <cg-icon name="i_agencyreport" width="80" />
            <div class="label">Báo Biểu<br />Đại Lý</div>
          </router-link>
        </li>
        <li>
          <router-link to="/subordinate-report">
            <cg-icon name="i_agentrecord" width="80" />
            <div class="label">Báo Biểu<br />Cấp Dưới</div>
          </router-link>
        </li>
        <li>
          <router-link to="/member-list">
            <cg-icon name="i_member" width="80" />
            <div class="label">Danh Sách<br />Thành Viên</div>
          </router-link>
        </li>
        <li>
          <router-link to="/game-record">
            <cg-icon name="i_gamerecord" width="80" />
            <div class="label">Thông Tin<br />Đặt Cược</div>
          </router-link>
        </li>
        <li>
          <router-link to="/trade-record">
            <cg-icon name="i_transaction" width="80" />
            <div class="label">Thông Tin<br />Giao Dịch</div>
          </router-link>
        </li>
        <li>
          <router-link to="/link">
            <cg-icon name="i_link" width="80" />
            <div class="label">Đại Lý<br />Marketing</div>
          </router-link>
        </li>
      </ul>
    </cg-container>
    <cg-container height="264" :style="'margin-bottom:var(--cg-px-10)'">
      <div class="link-box">
        <ul class="list-links">
          <li class="list-link-item">
            <router-link to="/rebate">
              <div class="left">
                <cg-icon name="i_rebate" width="52" />
                <div class="label">TỶ LỆ HOÀN TRẢ</div>
              </div>
              <div class="right">
                <cg-icon name="i_arrowright" width="16" />
              </div>
            </router-link>
          </li>
          <li class="list-link-item">
            <router-link to="/help">
              <div class="left">
                <cg-icon name="i_qna" width="52" />
                <div class="label">TRUNG TÂM GIÚP ĐỠ</div>
              </div>
              <div class="right">
                <cg-icon name="i_arrowright" width="16" />
              </div>
            </router-link>
          </li>
          <li class="list-link-item" @click="appStore.downloadApp">
            <!-- <router-link to="/app-download"> -->
            <div class="left">
              <cg-icon name="i_downlaod" width="52" />
              <div class="label">TẢI APP</div>
            </div>
            <div class="right">
              <cg-icon name="i_arrowright" width="16" />
            </div>
            <!-- </router-link> -->
          </li>
        </ul>
      </div>
    </cg-container>
  </div>
</template>

<style lang="scss" scoped>
.dash-divider {
  border-top: 1px dashed var(--cg-color-blue11);
  margin: 0 24px;
  position: relative;
  &::before, &::after {
    width: 10px;
    height: 10px;
    position: absolute;
    border: 2px solid var(--cg-color-blue11);
    border-radius: 50%;
    content: '';
  }
  &::before {
    top: -8px;
    left: -12px;
  }
  &::after {
    top: -8px;
    right: -12px;
  }
}
.vipimg {
  width: 128px;
  display: block;

  &.margin-y {
    margin: 10px 0;
  }
}

.head-left-title {
  display: flex;
  align-items: center;

  .cg_icon {
    margin-left: 18px;
    margin-right: 14px;
  }
}

.user-info-center {
  padding: 50px 32px 48px;

  .info-box {
    padding-bottom: 14px;

    .wrap {
      position: relative;
      padding-bottom: 16px;

      &.noprogress {
        padding-bottom: 0;
      }

      .top {
        display: flex;
        align-items: center;

        .right {
          padding-left: 18px;
        }

        .name {
          font: var(--cg-font-h4);
          line-height: 30px;
          color: var(--cg-color-blue1);
          padding-top: 12px;
        }

        .sign {
          font: var(--cg-font-text4);
          line-height: 25px;
          padding-top: 22px;
          color: var(--cg-color-black1);

          &.nopadding {
            padding: 0;
          }

          &.bold-sign {
            font-weight: 700;
          }

          &.blue-sign {
            color: var(--cg-color-blue1);
            padding-top: 9px;
          }
        }

        .money {
          font: var(--cg-font-text1);
          line-height: 32px;
          padding-top: 8px;
          color: var(--cg-color-blue1);
          display: flex;

          .line {
            display: inline-block;
            padding-left: 6px;
            padding-right: 6px;
          }
        }
      }

      .email-set {
        position: absolute;
        right: 0;
        top: 0;
        width: 156px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        // >div:first-child {
        //   margin-top: -12px;
        // }
      }
    }
  }

  .vip-info {
    font: var(--cg-font-text10);
    color: var(--cg-color-black1);
    line-height: 25px;
    padding: 24px 24px 32px;
    &.level-ten {
      padding-top: 20px;
      padding-bottom: 26px;
      .vip-money {
        padding-bottom: 0;
        .vipimg {
          margin: 0;
        }
        .sign {
          color: var(--cg-color-black1);
          font: var(--cg-font-text4);
        }
      }
    }
    &.rate-normal {
      font: var(--cg-font-text4);
    }
    .vip-money {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 16px;
    }
    .blue-sign {
      font: var(--cg-font-text4);
      color: var(--cg-color-blue1);
      line-height: 25px;
    }
        .money {
          font: var(--cg-font-text1);
          line-height: 32px;
          // padding-top: 8px;
          color: var(--cg-color-blue1);
          display: flex;

          .line {
            display: inline-block;
            padding-left: 6px;
            padding-right: 6px;
          }
        }
  }

  .vip-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .mid {
        padding: 0 14px;
      }
    }
  .money-info {
    display: flex;
    padding: 24px 20px 24px;
    padding-right: 12px;
    justify-content: space-between;

    .left {
      font: var(--cg-font-text1);
      line-height: 24px;
      color: var(--cg-color-black1);
      min-width: 270px;

      p {
        padding-top: 10px;
        padding-bottom: 30px;
      }
    }

    ul {
      display: flex;
      flex: 1;
      justify-content: space-around;
      font: var(--cg-font-text4);
      line-height: 25px;
      color: var(--cg-color-black1);

      a {
        color: var(--cg-color-black1);
      }

      li {
        min-width: 114px;
        width: 33.33%;
        text-align: center;

        .cg_icon {
          margin: 0 auto;
        }

        .label {
          padding-top: 8px;
          // margin-top: -8px;
        }
      }
    }
  }

  .wallet-deals {
    display: flex;
    padding: 34px 20px 0;
    font: var(--cg-font-text4);
    line-height: 25px;
    text-align: center;

    color: var(--cg-color-black1);

    a {
      color: var(--cg-color-black1);
    }

    li {
      width: 25%;

      .cg_icon {
        margin: 0 auto;
        margin-bottom: 8px;
      }

      .label {
        // padding: 0 14px;
      }
    }
  }

  .records {
    padding: 0 60px;
    font: var(--cg-font-text4);
    line-height: 25px;
    text-align: center;
    color: var(--cg-color-black1);
    display: flex;
    flex-wrap: wrap;
    padding-top: 24px;

    a {
      color: var(--cg-color-black1);
    }

    li {
      width: 33.33%;
      padding-bottom: 26px;

      .label {
        padding-top: 8px;
      }

      .cg_icon {
        margin: 0 auto;
      }
    }
  }

  .link-box {
    padding: 0 26px;
  }

  .list-links {
    font: var(--cg-font-text3);
    line-height: 24px;
    /* identical to box height, or 100% */

    color: var(--cg-color-black1);

    a {
      color: var(--cg-color-black1);
    }

    .list-link-item {
      width: 100%;
      height: 88px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid var(--cg-color-blue11);
      align-items: center;

      >a {
        width: 100%;
        justify-content: space-between;
        display: flex;
        align-items: center;
      }

      .left {
        display: flex;
        align-items: center;

        .label {
          padding-left: 16px;
        }
      }
    }

    .list-link-item:last-child {
      border-bottom: 0;
    }
  }
}
</style>
