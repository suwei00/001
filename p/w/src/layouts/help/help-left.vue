<template>
  <section class="user-left">
    <CgContainer class="bot" type="parent" padding="0" radius="12">
      <template #content>
        <div class="user-menu">
          <menu-list :menu-list="menuListA" />
        </div>
      </template>
    </CgContainer>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { CgContainer, CgAvatar, CgAmount, CgIcon, CgProgress, CgUseAmount } from '@/components/cg-template-2';
import MenuList from './menu-list.vue';

const userInfoStore = userInfoStateStore();
const { userInfo } = storeToRefs(userInfoStore);

const isHover = ref('');
const setIsHover = (name: string) => {
  isHover.value = name;
};

const menuListA = reactive([
  { 
    id: 0, 
    icon: 'i_qysw',
    show: false,
    label: 'GIÚP ĐỠ NGƯỜI MỚI', 
    path: '/help/0/0',
    childList: [
      { name: 'Đăng Ký Tài Khoản', pid: 0 },
      { name: 'Nạp Tiền', pid: 0 },
      { name: 'Rút Tiền', pid: 0 },
      { name: 'Chuyển Khoản', pid: 0 },
      { name: 'Đăng Ký Hoạt Động', pid: 0 },
      { name: 'Trình Duyệt Hỗ Trợ', pid: 0 },
      { name: 'Quên Mật Khẩu', pid: 0 },
      { name: 'Cài Đặt DNS', pid: 0 }
    ]
  },
  { 
    id: 1, 
    icon: 'i_yxwt',
    show: false,
    label: 'VẤN ĐỀ VỀ TRÒ CHƠI', 
    path: '/help/1/0',
    childList: [
      { name: 'Vấn Đề Về Lô Đề', pid: 1 },
      { name: 'Thể Loại Trò Chơi', pid: 1 }
    ]
  },
  { 
    id: 2, 
    icon: 'i_xsbz', 
    show: false, 
    label: 'GIỚI THIỆU VỀ P3', 
    path: '/help/2/0',
    childList: [
      { name: 'Giới Thiệu', pid: 2 },
      { name: 'Trách Nhiệm Cá Cược', pid: 2 },
      { name: 'Quy Định Điều Khoản', pid: 2 },
      { name: 'Chính Sách Riêng Tư', pid: 2 },
      { name: 'Hỗ Trợ Kỹ Thuật', pid: 2 },
      { name: 'Liên Hệ Với Chúng Tôi', pid: 2 }
    ]
  },
]);
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
    margin-right: 8px;

    > div {
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
  padding: 16px 0 10px;

  .name {
    color: var(--cg-color-grey1);
    font: var(--cg-font-text1);
    line-height: var(--cg-font-17);
    padding: 4px 0 5px;
  }

  .sign {
    color: var(--cg-color-grey1);
    font: var(--cg-font-text6);
    line-height: var(--cg-font-15);
  }

  .money-tip {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px 0 4px;

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
}

.user-menu {
}

.wallet {
  padding: 14px 20px 16px;

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
    align-items: top;
    justify-content: space-between;
    text-align: center;
    padding-top: 18px;
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

      .cg_icon {
        margin: 0 auto;
      }

      p {
        line-height: 14px;
        padding-top: 9px;
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
