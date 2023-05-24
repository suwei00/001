<script setup lang="ts">
import { CgDivider } from '@/components/cg-template-2';
import { getQrcode } from '@/mixins/qrcode';
const { qrcodeImg } = getQrcode('#000', 190);
</script>
<template>
  <div class="download-page">
    <div class="inner">
      <div class="content">
        <div class="title">
          <app-image src="/download/title_txt.png" width="552" />
          <div class="desc">{{ 'Trải Nghiệm Mượt Và Tốt Hơn'.toUpperCase() }}</div>
        </div>
        <div class="bot">
          <div class="qr-box img_shadow">
            <div class="wrap">
              <div class="qr-div"><img v-if="qrcodeImg" class="qrcode" :src="qrcodeImg" /></div>
              <div class="sub-title">QUÉT MÃ TẢI APP</div>
              <cg-divider />
              <ul>
                <li>
                  <app-image src="/download/ios.png" height="20" />
                  IOS
                </li>
                <li>
                  <app-image src="/download/android.png" width="18" />
                  Android
                </li>
              </ul>
            </div>
          </div>
          <div class="detail">
            Live Casino, Thể Thao, Lô Đề, Nổ Hũ, Game Bài, Bắn Cá, Đá Gà, E-Sports, tất cả những gì bạn cần là P3.com đều có. Ứng dụng cạnh tranh giải trí toàn diện nhất của ngành, <br /><a>P3.com</a>
            mang đến cho bạn trải nghiệm tột đỉnh đầy màu sắc và khác biệt.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Download'
};
</script>

<style lang="scss" scoped>
.download-page {
  height: 760px;
  @include webp($base-img-dir + '/download/download_bg.png');
  background-size: cover;
  background-position: center;

  .inner {
    height: 100%;
    @include webp($base-img-dir + '/download/download_image.png');
    background-size: cover;
    background-position: center;
    min-width: 1200px;
    max-width: 1920px;
    margin: 0 auto;
  }

  .content {
    margin-left: 50%;
    padding-left: 16px;
  }

  .title {
    padding-top: 57px;
    padding-bottom: 14px;
    font: var(--cg-font-text14);
    line-height: 30px;
    color: var(--cg-color-grey1);

    .desc {
      padding-left: 13px;
      position: relative;
      top: -12px;
    }
  }

  .bot {
    display: flex;
    justify-content: space-between;
    width: 552px;
    padding-left: 16px;

    .qr-box {
      margin-top: 6px;
      width: 230px;
      height: 298px;
      @include webp($base-img-dir + '/download/color_bg.png');
      background-size: 100% 100%;
      background-position: center;
      transition: all 0.1s linear;

      &:hover {
        transform: scale(1.05);
      }

      .wrap {
        height: 292px;
        padding: 21px 19px 0 21px;
        @include webp($base-img-dir + '/download/color_border.png');
        background-size: 100% 100%;
        background-position: center;

        .qr-div {
          box-shadow: var(--cg-box-shadow-containter);

          img {
            display: block;
          }
        }

        img {
          max-width: 190px;
        }

        .sub-title {
          padding: 8px 0 6px;
          font: var(--cg-font-text3);
          line-height: 23px;
          text-align: center;
          color: var(--cg-color-blue12);
        }

        ul {
          font: var(--cg-font-text4);
          line-height: 20px;
          color: var(--cg-color-grey1);
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 6px 2px 0;

          li {
            padding: 0 9px;

            img {
              vertical-align: text-bottom;
              margin-right: 2px;
            }
          }
        }
      }
    }

    .detail {
      width: 279px;
      font: var(--cg-font-text13);
      line-height: 34px;
      color: var(--cg-color-grey1);

      a {
        font-weight: 700;
        color: var(--cg-color-blue12);
      }
    }
  }
}</style>
