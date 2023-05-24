<script setup lang="ts">
import { useScroll } from '@vueuse/core';
import { CgButton } from '@/components/cg-template-2';
import { ref } from 'vue';
const el = ref<HTMLElement | null>(null);
const { isScrolling } = useScroll(window);
</script>
<template>
  <div class="agency-view" ref="el">
    <h2>ĐẠI LÝ</h2>
    <div class="agnecy_content">
      <app-image src="/agency/top.png" class="one_img" />
      <div class="agency-headerimg">
        <div class="top_ul">
          <ul class="flex ai-c jc-sb fir_ul">
          <li class="flex fdr-c jc-sb ">
              <div class="title">ƯU THẾ 1</div>
                <div class="cont suo">
                  Tỷ lệ hoa hồng Lô Đề<span class="protrude"> 9.9 </span>cao nhất trong ngành, hoàn trả về ngay tài khoản của bạn, <span class="protrude"> rút tiền trực tiếp không cần vòng cược. </span>
              </div>
            </li>
            <li class="flex fdr-c jc-sb ">
              <div class="title">ƯU THẾ 2</div>
                <div class="cont suo">
                  Không giới hạn nhận cược hoàn trả của tất cả cấp dưới, lên tới 0.5%, <span class="protrude">rút tiền trực tiếp không cần vòng cược.</span>
                
                </div>
            </li>
          </ul>
          <ul class="flex ai-c jc-sb sec_ul">
            <li class="flex fdr-c jc-sb ">
              <div class="title">ƯU THẾ 3</div>
                <div class="cont suo">
                  Hệ thống báo biểu hoàn chỉnh nhất, phân tích chi tiết dữ liệu cấp dưới.
                </div>
            </li>
            <li class="flex fdr-c jc-sb ">
              <div class="title">ƯU THẾ 4</div>
                <div class="cont suo">
                  6 Phúc lợi đại lý, nâng cao thu nhập.
                </div>
            </li>
          </ul>
        </div>
        <div class="flex-middle sec">
          <app-image src="/agency/c.png" class="sec_img" />
        </div>
        <ul class="four_list">
          <li class="flex-middle">
            <div class="lef-icon"></div>
            <div class="flex1">
              <div class="title">THƯƠNG HIỆU</div>
              <div class="cont suo">
                Hoạt động uy tín hơn 10 năm, sở hữu nhiều giấy phép hoạt động cá cược hợp pháp quốc
                tế.
              </div>
            </div>
          </li>
          <li class="flex-middle">
            <div class="lef-icon"></div>
            <div class="flex1">
              <div class="title">DỊCH VỤ</div>
              <div class="cont suo">
                Đội ngũ vận hành và kỹ thuật chuyên nghiệp, dịch vụ CSKH 24/7 chăm sóc chuyên biệt
                1-1.
              </div>
            </div>
          </li>
          <li class="flex-middle">
            <div class="lef-icon"></div>
            <div class="flex1">
              <div class="title">TỐC ĐỘ</div>
              <div class="cont suo">
                Hệ thống thanh toán được phát triển độc quyền, nạp rút tiền nhanh chóng.
              </div>
            </div>
          </li>
          <li class="flex-middle">
            <div class="lef-icon"></div>
            <div class="flex1">
              <div class="title">HỢP TÁC</div>
              <div class="cont suo">
                Lô Đề CG độc quyền, Live Casino và Thể Thao đa dạng phong phú nhất.
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="flex-middle cg_btn" :class="{ cg_btn_stop: !isScrolling }">
        <cg-button @click="$router.push('/link')" height="100">THAM GIA NGAY</cg-button>
      </div>
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
  height: 100%;
  margin: 0 auto;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  .agnecy_content {
    margin-top: 88px;
    @include webp($base-img-dir + 'agency/bg.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  .empty_div {
    height: 150px;
  }

  h2 {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 299;
    width: 100%;
    text-align: center;
    font: var(--cg-font-h2);
    height: 88px;
    line-height: 90px;
    background-color: var(--cg-color-blue16);
    border-bottom: 2px solid var(--cg-color-blue18);
  }

  .one_img {
    margin: 0 auto;
    width: 100%;
  }

  .protrude {
    color: var(--cg-color-red4);
  }

  .sec_img {
    width: 100%;
  }

  .agency-headerimg {
    width: 100%;
    padding: 0 25px 0px 25px;
    margin-top: -35px;
  }

  .title {
    color: var(--cg-color-grey6);
    text-align: center;
    font: var(--cg-font-text8);
    line-height: 28px;
  }

  .cont {
    height: 103px;
    text-align: left;
    color: var(--cg-color-black);
    font: var(--cg-font-text5);
    line-height: 23px;
    margin-top: 10px;
  }

  .top_ul {
    margin: 0 auto;

    ul {
      li {
        width: 350px;
        height: 378px;
        background-repeat: no-repeat;
        background-size: 100%;
        background-position: center center;
        margin: 0 auto;
        padding: 20px 23px;
        image-rendering: -moz-crisp-edges;
        /* Firefox */
        image-rendering: -o-crisp-edges;
        /* Opera */
        image-rendering: -webkit-optimize-contrast;
        /* Webkit (non-standard naming) */
        image-rendering: crisp-edges;
        -ms-interpolation-mode: nearest-neighbor;
        /* IE (non-standard property) */

        .cont {
        font:var(--cg-font-text5);
          text-indent: 0px;
          margin-bottom: 35px;
          padding: 0 10px;
        }
      }
    }

    .fir_ul {
      li {
        &:nth-child(1) {
          @include webp($base-img-dir + 'agency/uu1.png');
        }

        &:nth-child(2) {
          @include webp($base-img-dir + 'agency/uu2.png');
        }
      }
    }

    .sec_ul {
      margin: auto;

      li {
        &:nth-child(1) {
          @include webp($base-img-dir + 'agency/uu3.png');
        }

        &:nth-child(2) {
          @include webp($base-img-dir + 'agency/uu4.png');
        }
      }
    }
  }

  .sec {
    margin: 20px 0 50px 0;
  }

  .four_list {
    padding-bottom: 150px;

    li {
      width: 100%;
      height: 190px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;

      .title {
        text-align: left;
      }

      .lef-icon {
        width: 155px;
        height: 100%;
      }

      &:nth-child(1) {
        @include webp($base-img-dir + 'agency/li1.png');
      }

      &:nth-child(2) {
        @include webp($base-img-dir + 'agency/li2.png');
      }

      &:nth-child(3) {
        @include webp($base-img-dir + 'agency/li3.png');
      }

      &:nth-child(4) {
        @include webp($base-img-dir + 'agency/li4.png');
      }

      .cont {
        height: 70px;
        color: var(--cg-color-black1);
        font: var(--cg-font-text5);
        padding-right: 30px;
      }
    }
  }
}

.cg_btn {
  position: fixed;
  left: 0;
  right: 0;
  transition: all 0.3s;
  transform: translateY(180%);
  opacity: 1;
  bottom: 170px;
  padding: 0 30px;

  :deep(.cg-button) {
    width: 100%;
  }
}

.cg_btn_stop {
  transform: translateY(0%);
}
</style>
