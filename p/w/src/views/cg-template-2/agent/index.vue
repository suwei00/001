<script setup lang="ts">
import { CgButton } from '@/components/cg-template-2';
</script>
<template>
  <div class="agency-view">
    <div class="agency-headerimg">
      <div class="top_ul">
        <div class="flex-middle">
          <app-image src="/agency/tit1.png" style="height: 79px" class="one_img" />
        </div>
        <ul class="flex ai-c jc-c">
          <li class="flex fdr-c jc-sb">
            <div class="title">ƯU THẾ 1</div>
            <div class="cont suo">
              Tỷ lệ hoa hồng Lô Đề <span class="protrude"> 9.9 </span>cao nhất trong ngành, hoàn trả về ngay tài khoản của bạn, <span class="protrude"> rút tiền trực tiếp không cần vòng cược. </span>
            </div>
          </li>
          <li class="flex fdr-c jc-sb">
            <div class="title">ƯU THẾ 2</div>
            <div class="cont suo">Không giới hạn nhận cược hoàn trả của tất cả cấp dưới, lên tới 0.5%, <span class="protrude"> rút tiền trực tiếp không cần vòng cược.</span></div>
          </li>
          <li class="flex fdr-c jc-sb">
            <div class="title">ƯU THẾ 3</div>
            <div class="cont suo">Hệ thống báo biểu hoàn chỉnh nhất, phân tích chi tiết dữ liệu cấp dưới.</div>
          </li>
          <li class="flex fdr-c jc-sb">
            <div class="title">ƯU THẾ 4</div>
            <div class="cont suo">6 Phúc lợi đại lý, nâng cao thu nhập.</div>
          </li>
        </ul>
      </div>
      <div class="flex-middle sec">
        <app-image src="/agency/tit2.png" style="height: 80px" class="sec_img" />
      </div>
      <div class="bot_ul">
        <ul class="flex ai-c jc-sb fir_ul">
          <li class="flex fdr-c jc-e">
            <div class="title">THƯƠNG HIỆU</div>
            <div class="cont suo">Hoạt động uy tín hơn 10 năm,<br> sở hữu nhiều giấy phép hoạt<br> động cá cược hợp pháp quốc tế.</div>
          </li>
          <li class="flex fdr-c jc-e">
            <div class="title">TỐC ĐỘ</div>
            <div class="cont suo">Hệ thống thanh toán được phát<br> triển độc quyền, nạp rút tiền<br> nhanh chóng.</div>
          </li>
        </ul>
        <ul class="flex ai-c jc-sb sec_ul">
          <li class="flex fdr-c jc-e">
            <div class="title">DỊCH VỤ</div>
            <div class="cont suo">Đội ngũ vận hành và kỹ thuật<br> chuyên nghiệp, dịch vụ CSKH <br>24/7 chăm sóc chuyên biệt 1-1.</div>
          </li>
          <li class="flex fdr-c jc-e">
            <div class="title">HỢP TÁC</div>
            <div class="cont suo">Lô Đề CG độc quyền, Live<br> Casino và Thể Thao đa dạng<br> phong phú nhất.</div>
          </li>
        </ul>
      </div>
      <div class="flex-middle cg_btn">
        <cg-button width="300" @click="$router.push('/personal/link')">THAM GIA NGAY</cg-button>
      </div>
      <div class="tips">Nhấp Vào Link Giới Thiệu, Gửi Ngay Tới Bạn Bè!</div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Agent'
};
</script>

<style lang="scss" scoped>
.agency-view {
  min-width: 1200px;
  margin: 0 auto;
  background:var(--cg-color-white5);
  .protrude {
    color: var(--cg-color-red3);
  }

  .agency-headerimg {
    max-width: 1920px;
    padding-bottom: 57px;
    @include webp($base-img-dir + 'agency/bg.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center top;
    margin: 0 auto;
  }

  .title {
    color: var(--cg-color-grey7);
    text-align: center;
    font: var(--cg-font-text2);
    line-height: 28px;
  }

  .cont {
    height: 105px;
    // text-indent: 20px;
    text-align: left;
    color: var(--cg-color-black);
    font: var(--cg-font-text);
    line-height: 17px;
  }

  .top_ul {
    padding-top: 435px;
    max-width: 1120px;
    margin: 0 auto;

    .one_img {
      margin: 0 auto;
      margin-bottom: 15px;
    }

    ul {
      li {
        width: 265px;
        height: 298px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center top;
        margin: 0 auto;
        padding: 15px 23px 0 23px;
        filter: var(--cg-img-shadow);
        &:nth-child(1) {
          @include webp($base-img-dir + 'agency/group1.png');
        }
        &:nth-child(2) {
          @include webp($base-img-dir + 'agency/group2.png');
        }
        &:nth-child(3) {
          @include webp($base-img-dir + 'agency/group3.png');
        }
        &:nth-child(4) {
          @include webp($base-img-dir + 'agency/group4.png');
        }
      }
    }
  }
  .sec {
    margin: 70px 0 50px 0;
  }
  .bot_ul {
    @include webp($base-img-dir + 'agency/tu1.png');
    background-repeat: no-repeat;
    background-size: 559px 538px;
    background-position: center top;
    .sec_ul {
      margin: auto;
      margin-top: 130px;
      width: 1200px;

      li {
        filter: var(--cg-img-shadow);
        &:nth-child(1) {
          @include webp($base-img-dir + 'agency/cg3.png');
        }
        &:nth-child(2) {
          @include webp($base-img-dir + 'agency/cg4.png');
        }
      }
    }
    .fir_ul {
      margin: auto;
      padding-top: 90px;
      width: 1200px;
      li {
        filter: var(--cg-img-shadow);
        &:nth-child(1) {
          @include webp($base-img-dir + 'agency/cg1.png');
        }
        &:nth-child(2) {
          @include webp($base-img-dir + 'agency/cg2.png');
        }
      }
    }
    ul {
      li {
        width: 265px;
        height: 173px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center top;
        padding: 15px 22px 0 22px;

        .cont {
          height: 76px;
          color: var(--cg-color-grey1);
        }
      }
    }
  }
  .cg_btn {
    margin-top: 60px;
  }
  .tips {
    margin-top: 20px;
    color: var(--cg-color-black);
    font: var(--cg-font-text8);
    text-align: center;
  }
}
</style>
