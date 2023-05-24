<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { CgTime } from '@/components/cg-template-2';

interface Props {
  type: 'venue' | 'drop' | 'hot' | 'logo' | 'bank' | 'wallet' | 'bankstop'; // 场馆、下拉、热门、场馆游戏、银行、钱包
  time?: number; // 限时维护
}
const props = defineProps<Props>();

const maintainRef = ref();
const list = ['bank', 'logo'];
onMounted(() => {
  maintainRef.value.parentElement.style.position = 'relative';
  list.includes(props.type) ? '' : (maintainRef.value.parentElement.style.overflow = 'hidden');
});
</script>
<template>
  <div ref="maintainRef" @mouseenter.stop @click.stop class="cg-maintain" :class="{ bank: type === 'bank' || type === 'bankstop' }">
    <div class="mask" :class="`mask_${type}`">
      <div class="maintain-box" :class="type">
        <!-- 场馆 -->
        <template v-if="type === 'venue'">
          <div class="icon"></div>
          <span class="title">THÔNG BÁO BẢO TRÌ</span>
          <!-- 定时维护 -->
          <template v-if="time">
            <span class="text">Thời Gian Kết Thúc Bảo Trì:</span>
            <cg-time :time="time" color="var(--cg-color-blue1)" font="var(--cg-font-text2)" />
          </template>
          <!-- 永久维护 -->
          <p class="no-time" v-else>Thời gian kết thúc sẽ thông báo sớm nhất tới quý khách</p>
        </template>
        <!-- 下拉、热门 -->
        <template v-else-if="type === 'drop' || type === 'hot'">
          <div class="icon"></div>
          <span class="title">THÔNG BÁO BẢO TRÌ</span>
          <template v-if="time">
            <span class="text">Thời Gian Kết Thúc Bảo Trì:</span>
            <cg-time :time="time" color="var(--cg-color-blue1)" font="var(--cg-font-text5)" />
          </template>
          <p class="no-time" v-else>Thời gian kết thúc sẽ thông báo sớm nhất tới quý khách</p>
        </template>
        <!-- logo、钱包 -->
        <template v-else-if="type === 'logo' || type === 'wallet'">
          <div class="icon"></div>
          <span class="title">THÔNG BÁO BẢO TRÌ</span>
        </template>
        <!-- 银行 -->
        <template v-else-if="type === 'bank'">
          <div class="icon"></div>
          <div class="right">
            <span class="title">ĐANG BẢO TRÌ</span>
            <p class="text">VUI LÒNG SỬ DỤNG NGÂN HÀNG KHÁC RÚT TIỀN</p>
          </div>
        </template>
        <template v-else-if="type === 'bankstop'">
          <div class="icon"></div>
          <div class="right">
            <span class="title">TÀI KHOẢN ĐÃ BỊ VÔ HIỆU HOÁ</span>
          </div>
        </template>
      </div>
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
  cursor: not-allowed;

  .mask {
    width: 100%;
    height: 100%;
    background-color: var(--cg-color-white3);
    display: flex;
    align-items: center;
    justify-content: center;

    .maintain-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-weight: 700;
      font-size: var(--cg-font-15);
      text-align: center;
      border: 1px solid var(--cg-color-blue8);
      border-radius: var(--cg-border-outer-radius);
      box-shadow: var(--cg-box-shadow-maintainBox);
      background-color: var(--cg-color-white17);

      .icon {
        width: 72px;
        height: 73.93px;
        @include webp($base-img-dir + '/icon/i_maintain.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }

      .title {
        color: var(--cg-color-red1);
      }

      .text {
        color: var(--cg-color-grey1);
      }

      .no-time {
        color: var(--cg-color-grey1);
      }
    }

    .venue {
      width: 300px;
      height: 184px;
      padding-top: 18px;

      .title {
        margin-bottom: 5px;
      }
    }

    .hot {
      padding: 6px 8px 12px;
      font-size: var(--cg-font-12);

      .title {
        font-size: var(--cg-font-13);
      }

      .icon {
        width: 46.75px;
        height: 48px;
      }

      .text {
        padding: 8px 0px 2px;
        width: 90px;
      }

      .no-time {
        padding-top: 8px;
        width: 130px;
      }
    }

    .drop {
      padding: 6px 31px 12px;
      font-size: var(--cg-font-12);

      .title {
        font-size: var(--cg-font-13);
      }

      .icon {
        width: 46.75px;
        height: 48px;
      }

      .text {
        width: 90px;
      }

      .no-time {
        width: 130px;
      }
    }

    .logo {
      width: 100%;
      height: 100%;
      padding: 0;
      border-radius: 50%;
      border-width: 2px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .icon {
        width: 46px;
        height: 46px;
      }

      .title {
        font-size: var(--cg-font-12);
      }
    }

    .wallet {
      width: 100%;
      height: 100%;
      padding: 0;
      justify-content: center;
      border: none;
      border-radius: 0;

      .icon {
        width: 48px;
        height: 48px;
      }

      .title {
        font-size: var(--cg-font-13);
      }
    }

    .bank, .bankstop {
      width: 100%;
      height: 100%;
      padding: 0;
      border: none;
      border-radius: 0;
      flex-direction: row;
      padding-left: 268px;

      .icon {
        width: 64px;
        height: 64px;
        margin-right: 3px;
      }

      .right {
        text-align: left;

        .title {
          font-size: var(--cg-font-15);
        }

        .text {
          font-size: var(--cg-font-13);
        }
      }
    }
  }

  .mask_drop {
    background-color: var(--cg-color-grey13);
  }

  .mask_logo {
    background-color: transparent;
  }
}

.bank {
  width: 862px;
  height: 66px;
  border-radius: 8px;
  overflow: hidden;
  top: -3px;
  left: -4px;
}
</style>
