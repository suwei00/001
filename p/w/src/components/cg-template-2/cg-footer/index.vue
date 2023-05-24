<script setup lang="ts">
import { useRouter } from 'vue-router';

const certificateList = [
  { id: 1, text: 'Giấy phép game cá cược Philippines (PAGCOR)' },
  { id: 2, text: 'Giấy phép cá cược Malta (MGA)' },
  { id: 3, text: 'Giấy phép Quần đảo Virgin Anh (BVI)' },
  { id: 4, text: 'Uỷ ban GC Supervisory của Anh' }
];

const textList = [
  { id: 1, lebal: 'Giúp Đỡ Người Mới', path: '/help/0/0' },
  { id: 2, lebal: 'Trách Nhiệm Cá Cược', path: '/help/2/1' },
  { id: 3, lebal: 'Chính Sách Riêng Tư', path: '/help/2/3' },
  { id: 4, lebal: 'Quy Định Điều Khoản', path: '/help/2/2' },
  { id: 5, lebal: 'Liên Hệ Chúng Tôi', path: '/help/2/5' }
];

const router = useRouter();
const changeMenuChild = (item: any): void => {
  router.push(item);
};
</script>

<template>
  <div class="footer">
    <div class="footer_content">
      <div class="column">
        <app-image class="logo_icon pointer" v-for="index in 17" :key="index" :data="index" :src="`/venueLogo/venueLogo_${index}.png`" />
      </div>
      <div class="describe text pointer">
        P3.COM được cấp 4 giấy phép hợp pháp đạt chuẩn quốc tế được cấp bởi Chính phủ Philippines (PAGCOR), Chính phủ Malta (MGA), Quẩn đảo Virgin Vương quốc Anh (BVI) & HIệp Hội Nhà Cái Anh (GAMBLING
        COMMISSION), là một nhà cái cá cược được Hiệp Hội Cá Cược Quốc Tế công nhận. Trước khi đăng ký tham gia đặt cược, vui lòng đảm bảo bạn đã đủ 18 tuổi.
      </div>
      <div class="certificate pointer">
        <div v-for="item in certificateList" :key="item.id" class="certificate_item">
          <app-image class="certificate_item_img" :src="`/certificate/certificate${item.id}.png`" />
          <div class="text">{{ item.text }}</div>
        </div>
      </div>
      <div class="about">
        <div class="about_item text_w pointer" v-for="item in textList" :key="item.id" @click="changeMenuChild(item.path)">{{ item.lebal }}</div>
      </div>
      <div class="footer_text text pointer">Bản Quyền Được P3 Lưu Trữ</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.text {
  color: var(--cg-color-grey2);
  text-align: center;
  font-size: var(--cg-font-13);
  font-weight: 400;
}

.text_w {
  color: var(--cg-color-white);
  text-align: center;
  font-size: var(--cg-font-12);
  font-weight: 400;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--cg-color-grey);
  min-width: var(--cg-max-width);
  width: 100%;
  padding: 22px 0 36px;

  &_content {
    width: var(--cg-max-width);

    .column {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      padding-bottom: 6px;
      border-bottom: 1px solid var(--cg-color-grey1);
    }

    .logo_icon {
      height: 48px;
      margin-bottom: 14px;
    }

    .describe {
      height: 50px;
      margin-top: 18px;
    }
  }

  .certificate {
    margin-top: 4px;
    margin-bottom: 40px;
    display: flex;

    &_item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &_img {
        height: 64px;
        margin-bottom: 8px;
      }
    }
  }

  .about {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;

    &_item {
      padding: 0 25px;
    }
  }

  &_text {
    font-size: var(--cg-font-12);
  }
}
</style>
