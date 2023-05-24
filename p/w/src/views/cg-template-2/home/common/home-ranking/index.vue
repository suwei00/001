<script setup lang="ts">
import { CgIcon, CgAmount, CgDivider, CgBigNumber } from '@/components/cg-template-2';
import APIs from '@/http/blue-apis';
import { useAppStore } from '@/store-pinia';
import { formatNumberToCurrency } from '@/utils/format';
import { desensitization } from '@/utils/helpers';
import { storeToRefs } from 'pinia';
import { ref, watch, nextTick } from 'vue';
import { useRequest } from 'vue-request';

const { onlineCount, awardCount, marquee } = storeToRefs(useAppStore());

const scrollRef = ref();
const { data }: any = useRequest(APIs.getProfit, {
  initialData: { p: [] }
});

let scrollTop = 0;

watch(
  () => marquee.value,
  () => {
    scrollTop = scrollRef.value?.scrollTop;
    nextTick(() => {
      scrollRef.value.scrollTop = scrollTop;
    });
  }
);
</script>

<template>
  <div class="flex jc-sb ranking_main">
    <div class="day_info">
      <div class="flex jc-sb ai-c mb24">
        <cg-icon width="53" name="i_title1" />
        <div class="flex-middle fdr-c">
          <p class="font32">BẢNG XẾP HẠNG</p>
          <p class="font24">TIỀN THẮNG HÔM QUA</p>
        </div>
        <cg-icon class="rotate" width="53" name="i_title1" />
      </div>
      <div class="list_content">
        <div class="list_list">
          <ul class="ul radius">
            <li class="flex jc-sa ai-c title">
              <div class="head_item icon_flst flex-middle">Xếp Hạng</div>
              <span class="name_row">Tài Khoản</span>
              <span class="head_item flex-middle">Số Tiền Thắng</span>
            </li>
            <li class="flex jc-sa ai-c" v-for="(row, index) in data.p" :key="row.name">
              <div class="icon_flst head_item flex-middle">
                <cg-icon width="40" :name="`i_ranking${index}`" />
              </div>
              <span class="name_row">{{ desensitization(row.name) }}</span>
              <cg-amount class="head_item flex-middle" :amount="row.profit" :weight="700" color="blue12" :segmentation="true" suffix="K" padding="2"></cg-amount>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="prize_info">
      <div class="flex jc-sb ai-c mb24">
        <cg-icon width="250" name="i_title2" />
        <div class="flex-middle fdr-c">
          <p class="font24">CẬP NHẬT THÔNG TIN</p>
          <p class="font32">TRÚNG THƯỞNG</p>
        </div>
        <cg-icon class="rotate" width="250" name="i_title2" />
      </div>
      <div class="list_content">
        <div class="list_list">
          <div class="right_title flex jc-sb">
            <div class="left">
              <p class="flex-middle title_text">
                <cg-icon width="25" name="i_online" />
                <span class="pl5">SỐ NGƯỜI ONLINE</span>
              </p>
              <CgBigNumber :money="formatNumberToCurrency(onlineCount, '')" />
            </div>
            <div class="divider">
              <cg-divider direction="vertical" color="--cg-color-white1" />
            </div>
            <div class="right">
              <p class="flex-middle title_text">
                <cg-icon width="25" name="i_ranking" />
                <span class="pl5">SỐ TIỀN THẮNG HÔM NAY (K)</span>
              </p>
              <CgBigNumber :money="formatNumberToCurrency(awardCount, '')" />
            </div>
          </div>
          <div class="mt10">
            <ul class="ul">
              <li class="flex jc-sa ai-c title">
                <span class="name_r1">Tài Khoản</span>
                <span class="head_item flex-middle">Sảnh</span>
                <span class="head_item flex-middle">Trò Chơi</span>
                <span class="head_item flex-middle">Số Tiền Thắng</span>
              </li>
              <div class="scroll global_scroll" ref="scrollRef">
                <li class="flex jc-sa ai-c" v-for="(row, indx) in marquee" :key="row.id" :class="{ animation: indx === 0, bd: row.even }">
                  <span class="name_r1">{{ desensitization(row.list[2]) }}</span>
                  <span class="flex-1 flex-middle">{{ row.list[0] }}</span>
                  <span class="flex-1 flex-middle">{{ row.list[1] }}</span>
                  <cg-amount class="flex-1 flex-middle" :amount="row.list[3]" :weight="700" color="blue12" :segmentation="true" suffix="K" padding="2"></cg-amount>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ranking_main {
  .day_info {
    width: 402px;
  }

  .prize_info {
    width: 778px;
  }

  .list_content {
    width: 100%;
    height: 557px;
    border-radius: 12px;
    background-color: var(--cg-color-blue11);
    box-shadow: inset 0px 6px 12px var(--cg-shadow-color1);
    padding: 20px;
    .list_list {
      width: 100%;
      height: 100%;
      box-shadow: 0px 6px 12px var(--cg-shadow-color1);
      border-radius: 12px;
      background-color: var(--cg-color-white);
      padding: 8px 10px;
    }
  }

  .font24 {
    color: var(--cg-color-blue12);
    font: var(--cg-font-text10);
  }
}

.mb24 {
  margin-bottom: 24px;
}

.mt10 {
  margin-top: 10px;
}

.scroll {
  height: 370px;
  overflow: hidden;
  overflow-y: auto;
}

.right_title {
  .left,
  .right {
    padding: 0 30px;
  }
}

.title_text {
  color: var(--cg-color-blue14);
  font: var(--cg-font-text2);
  margin-bottom: 5px;
}

.radius {
  border-radius: 8px;
}

.icon_flst {
  width: 90px;
}

.ul {
  overflow: hidden;

  li {
    height: 46px;
    border-bottom: 1px solid var(--cg-color-blue8);
    color: var(--cg-color-grey1);
    font: var(--cg-font-text);
    &:last-child {
      border-bottom: none;
    }

    .head_item {
      flex: 1;
    }
  }

  .bd {
    background-color: var(--cg-color-white5);
  }

  .title {
    height: 40px;
    background-color: var(--cg-color-blue13) !important;
    font: var(--cg-font-text1);
    border-bottom: none;
  }
}

.wde {
  width: 98%;
}

.divider {
  height: 80px;
}

.pl5 {
  padding-left: 5px;
}

.name_row {
  width: 100px;
  margin-left: 20px;
}

.name_r1 {
  width: 120px;
  margin-left: 50px;
}

.animation {
  // transform: translateX(100%);
  animation: UD 0.3s linear;
}

@keyframes UD {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
