<script setup lang="ts">
import { CgIcon } from '@/components/cg-template-2';
import HomeMeter from '../home-meter/index.vue';
import HomeDesc from '../home-desc/index.vue';

interface Props {
  isVisible: boolean;
}
defineProps<Props>();

const meterList = [
  {
    id: 1,
    num: 60,
    unit: 's',
    title: 'TRUNG BÌNH',
    desc: 'Thời Gian Nạp Tiền',
    icon: 'i_assure1',
    desc1:
      'Độc quyền phát triển, sử dụng công nghệ mã hóa 128-bit và hệ thống quản lý bảo mật nghiêm ngặt, tiền của khách hàng được bảo vệ toàn vẹn nhất, giúp bạn tận hưởng trọn vẹn hoạt động giải trí, đặt cược vào các trận đấu và không cần lo lắng! ',
    title1: 'AN TOÀN HƠN'
  },
  {
    id: 2,
    num: 80,
    unit: 'Nhà',
    title: 'HỢP TÁC',
    desc: 'Hỗ Trợ Trang Web',
    icon: 'i_assure2',
    desc1:
      'Cung cấp cho bạn gần một nghìn môn thể thao thú vị, sự kiện thể thao điện tử mỗi ngày, trải nghiệm thú vị tột đỉnh về cách chơi và nhiều hình thức giải trí khác như live casino, game bài, lô đề, nổ hũ,… tùy ý thích của bạn chọn. ',
    title1: 'CHUYÊN NGHIỆP HƠN'
  },
  {
    id: 3,
    num: 90,
    unit: 's',
    title: 'TRUNG BÌNH',
    desc: 'Thời Gian Rút Tiền',
    icon: 'i_assure3',
    desc1: 'Hệ thống xử lý tài chính được nghiên cứu và phát triển độc lập bằng công nghệ mới nhất, thật sự đạt được hiệu quả kỹ thuật, nạp, rút, chuyển. Công nghệ tối ưu hóa mạng độc quyền.',
    title1: 'TỐC ĐỘ HƠN'
  },
  {
    id: 4,
    num: 19,
    unit: 'Nhà',
    title: 'HỢP TÁC',
    desc: 'Trang Web Trò Chơi ',
    icon: 'i_assure4',
    desc1: 'Ứng dụng gốc tự nghiên cứu phát triển Web, H5, IOS, Android, giúp bạn tùy thích đặt cược mọi lúc mọi nơi! Cung cấp dịch vụ chăm sóc khách hàng 24/7, tận tình chăm sóc.',
    title1: 'THUẬN TIỆN HƠN'
  }
];
</script>

<template>
  <div class="superior">
    <div class="flex jc-sb ai-c">
      <cg-icon width="410" name="i_title3" />
      <div class="flex-middle fdr-c">
        <p class="font32">DỊCH VỤ CHẤT LƯỢNG</p>
        <p class="font15">AN TOÀN ỔN ĐỊNH</p>
      </div>
      <cg-icon class="rotate" width="410" name="i_title3" />
    </div>
    <div class="flex jc-sb meter">
      <div class="meter_item ai-c flex fdr-c" v-for="item in meterList" :key="item.id">
        <home-meter :isVisible="isVisible" :unit="item.unit" :num="item.num" :desc="item.desc" :title="item.title" />
        <home-desc :icon="item.icon" :desc="item.desc1" :title="item.title1" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.meter {
  margin-top: 20px;
  .meter_item {
    width: 285px;
  }
}
</style>
