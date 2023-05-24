<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { timeToVietnam } from '@/utils/time';
import { CgIcon } from '@/components/cg-template-2';

interface Props {
  type: 'venue1' | 'venue2' | 'venue3' | 'bank' | 'wallet' | 'bankstop' | string; // 场馆、下拉、热门、场馆游戏、银行、钱包
  time?: number; // 限时维护
  small?: boolean; // 场馆钱包3个一行
}
defineProps<Props>();

const maintainRef = ref();
onMounted(() => {
  maintainRef.value.parentElement.style.position = 'relative';
  maintainRef.value.parentElement.style.overflow = 'hidden';
});
</script>
<template>
  <div ref="maintainRef" class="cg-maintain" @click.stop>
    <div class="maintain-box" :class="[type, { small }]">
      <!-- 场馆1 -->
      <template v-if="type === 'venue1'">
        <cg-icon class="icon" width="182" name="i_warn" />
        <span class="title">THÔNG BÁO BẢO TRÌ</span>
        <!-- 定时维护 -->
        <template v-if="time">
          <span class="text">Thời Gian Kết Thúc Bảo Trì:</span>
          <span class="time">{{ timeToVietnam(time * 1000) }}</span>
        </template>
        <!-- 永久维护 -->
        <p class="no-time" v-else>Thời Gian Kết Thúc Sẽ Thông Báo Sớm Nhất Tới Quý Khách</p>
      </template>
      <!-- 场馆2 -->
      <template v-else-if="type === 'venue2'">
        <cg-icon class="icon" width="120" name="i_warn" />
        <span class="title">THÔNG BÁO BẢO TRÌ</span>
        <template v-if="time">
          <span class="text">Thời Gian Kết Thúc Bảo Trì:</span>
          <span class="time">{{ timeToVietnam(time * 1000) }}</span>
        </template>
        <p class="no-time" v-else>Thời Gian Kết Thúc Sẽ Thông Báo Sớm Nhất Tới Quý Khách</p>
      </template>
      <!-- 场馆3 -->
      <template v-else-if="type === 'venue3'">
        <cg-icon class="icon" width="106" name="i_warn" />
        <span class="title">THÔNG BÁO BẢO TRÌ</span>
        <template v-if="time">
          <span class="text">Thời Gian Kết Thúc Bảo Trì:</span>
          <span class="time">{{ timeToVietnam(time * 1000) }}</span>
        </template>
        <p class="no-time" v-else>Thời Gian Kết Thúc Sẽ Thông Báo Sớm Nhất Tới Quý Khách</p>
      </template>
      <!-- 银行 -->
      <template v-else-if="type === 'bank'">
        <div class="top">
          <cg-icon class="icon" width="42" name="i_warn" />
          <span class="title">ĐANG BẢO TRÌ</span>
        </div>
        <span class="text">VUI LÒNG SỬ DỤNG NGÂN HÀNG KHÁC RÚT TIỀN</span>
      </template>
      <!-- 银行卡停用 -->
      <template v-else-if="type === 'bankstop'">
        <div class="top">
          <cg-icon class="icon" width="42" name="i_warn" />
          <span class="title">TÀI KHOẢN ĐÃ BỊ VÔ HIỆU HOÁ</span>
        </div>
      </template>
      <!-- 钱包 -->
      <template v-else-if="type === 'wallet'">
        <cg-icon class="icon" :width="small ? '76' : '96'" name="i_warn" />
        <span class="title" :class="{ 'font-9': small }">THÔNG BÁO BẢO TRÌ</span>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'CGMaintain'
};
</script>

<style lang="scss" scoped>
.cg-maintain {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;

  .maintain-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--cg-color-gray4);
    text-align: center;

    .title {
      color: var(--cg-color-red1);
      font: var(--cg-font-h2);
      margin-bottom: 20px;
    }

    .text {
      color: var(--cg-color-black1);
      font-weight: 700;
      font-size: 24px;
      margin-bottom: 8px;
    }

    .no-time {
      color: var(--cg-color-black1);
      font-weight: 700;
      font-size: 24px;
      margin: 0;
    }

    .time {
      color: var(--cg-color-blue1);
      font: var(--cg-font-text1);
    }
  }

  .venue1 {
    .icon {
      margin-bottom: 12px;
    }

    .no-time {
      width: 460px;
    }
  }

  .venue2 {
    .icon {
      margin-bottom: 12px;
    }

    .title {
      margin-bottom: 16px;
    }

    .no-time {
      width: 260px;
    }
  }

  .venue3 {
    border-radius: 10px;

    .title {
      margin-bottom: 12px;
    }

    .icon {
      margin-bottom: 12px;
    }

    .no-time {
      width: 460px;
    }
  }

  .bank {
    .top {
      display: flex;
      align-items: center;

      .icon {
        margin-right: 14px;
      }

      .title {
        margin: 0;
        font-weight: 700;
        font-size: 24px;
      }
    }
  }
  .bankstop {
    .top {
      display: flex;
      align-items: center;

      .icon {
        margin-right: 14px;
      }

      .title {
        margin: 0;
        font-weight: 700;
        font-size: 24px;
      }
    }
  }

  .wallet {
    .icon {
      margin-bottom: 5px;
    }

    .title {
      margin: 0;
      font: var(--cg-font-text8);
    }
  }

  .small {
    .title {
      white-space: nowrap;
    }
  }
}
</style>
