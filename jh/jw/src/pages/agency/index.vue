<script setup lang="ts" name="agency">
import bg from '@images/agency/bg.png?preset=full'
import banner1 from '@images/agency/banner1.png?preset=full'
import banner1Thumb from '@images/agency/banner1.png?preset=thumbnail&src'
import banner2 from '@images/agency/banner2.png?preset=full'
import banner2Thumb from '@images/agency/banner2.png?preset=thumbnail&src'
import banner3 from '@images/agency/banner3.png?preset=full'
import banner3Thumb from '@images/agency/banner3.png?preset=thumbnail&src'
import pic1 from '@images/agency/pic2-1.png?preset=full'
import pic1Thumb from '@images/agency/pic2-1.png?preset=thumbnail&src'
import pic2 from '@images/agency/pic2-2.png?preset=full'
import pic2Thumb from '@images/agency/pic2-2.png?preset=thumbnail&src'
import icon1 from '@images/agency/icon1.png?preset=full'
import icon1Thumb from '@images/agency/icon1.png?preset=thumbnail&src'
import icon2 from '@images/agency/icon2.png?preset=full'
import icon2Thumb from '@images/agency/icon2.png?preset=thumbnail&src'
import btnBg from '@images/common/btn.png?preset=full'

const router = useRouter()
</script>

<template>
  <div :style="getBackgroundImgObj(bg)" class="part1">
    <div class="body">
      <img src="@images/agency/title1.png" alt="" h-60px mb-28px>
      <p mb-39px>
        久赢独家代理模式，业界最高无限代理福利政策！诚邀您一同携手共同发展，合作共赢，实现您的财富自由！
      </p>
      <jl-image :src="banner1" :thumb="banner1Thumb" w-719px h-578px mb-132px />
    </div>
  </div>
  <div :style="getBackgroundImgObj(bg)" class="part2">
    <div class="body">
      <img src="@images/agency/title2.png" alt="" h-60px mb-38px>
      <div class="setion2" w-1300px flex>
        <div class="lfet" mr-20px>
          <div class="youshi1">
            <h5>产品优势一：</h5>
            <h6>下级返水</h6>
            <p>
              所有下级代理有效投注最高<span class="blue">0.5%</span>返水，次日中午12点自动派送至您的账户，只需1倍流水即可提现。APP操作流畅，代理报表详细，您可以看到您收入的每一分钱。
            </p>
            <jl-image :src="pic1" :thumb="pic1Thumb" w-200px h-132px class="pic1" />
          </div>
          <div class="youshi2">
            <h5>产品优势二：</h5>
            <h6>下级返点</h6>
            <p>
              1.所有下级娱乐<span class="blue">CG彩票-快3、PK10、时时彩、六合彩、11选5、幸运28</span>，有效投注最高<span
                class="blue"
              >9</span>返点，实时返到您的账户，无需流水直接提款。APP操作流畅，代理报表详细，您可以看到您收入的每一分钱。<br><br>
              2.您可以通过代理线设置与下级的赔率差。下级投注无论输赢，您都可以获得平台奖励您的返点差；下级代理每次投注，同步实时返点至您的账户中，无需流水即可提现！
            </p>
            <jl-image :src="pic2" :thumb="pic2Thumb" w-200px h-210px class="pic2" />
          </div>
        </div>
        <div class="right" pt-34px>
          <jl-image :src="banner2" :thumb="banner2Thumb" w-650px h-588px mb-150px />
        </div>
      </div>
    </div>
  </div>
  <div :style="getBackgroundImgObj(bg)" class="part3">
    <div class="body">
      <img src="@images/agency/title3.png" alt="" h-60px mb-33px>
      <jl-image :src="banner3" :thumb="banner3Thumb" w-884px h-643px mb-134px />
      <div class="pinpai">
        <jl-image :src="icon1" :thumb="icon1Thumb" w-100px h-100px mb-22px />
        <h5>品牌优势</h5>
        <p>
          久赢娱乐诚信运营至今十年，拥有菲律宾政府竞猜委员会（PAGCOR）、欧洲马耳他和英国博彩委员会等多国颁发的合法执照。是受国际行业协会认可的合法公司。在业界已拥有超高的品牌知名度及品牌价值，让您放心推荐！
        </p>
      </div>
      <div class="fuwu">
        <jl-image :src="icon2" :thumb="icon2Thumb" w-100px h-100px mb-22px />
        <h5>服务优势</h5>
        <p>24小时在线客服教您操作、查看数据，随时为您提供服务。我们更有代理专员服务，引导您如何快速开发代理。真正0投入，0风险，躺着都能赚钱！</p>
      </div>
      <div class="btn-box">
        <button :style="getBackgroundImgObj(btnBg)" @click="router.push('/personal/link')">
          马上加入！
        </button>
        <span>点此生成代理链接发送给您的好友完成注册</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.part1,
.part2,
.part3 {
  width: 100%;
  background-size: 100% 100%;
  padding-top: 130px;
}

.part1 {
  .body {
    width: 1300px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      font-size: 24px;
      font-family: $jl-font;
      font-weight: bold;
      color: #515B7C;
      line-height: 36px;
    }
  }
}

.part2 {
  .body {
    width: 1300px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    .youshi1 {
      width: 630px;
      height: 225px;
      background: linear-gradient(137deg, #DFECF7 0%, #F2F7FB 29%, #F2F7FB 46%, #FFFFFF 70%, #EBF5FD 100%);
      box-shadow: 0px 3px 20px 1px rgba(86, 122, 254, 0.3);
      border-radius: 20px;
      border: 2px solid #FFFFFF;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding-left: 40px;
      padding-top: 38px;
      margin-bottom: 38px;

      h5 {
        font-size: 15px;
        font-family: $jl-font;
        font-weight: 400;
        color: #597EF7;
        margin-bottom: 10px;
      }

      h6 {
        font-size: 24px;
        font-family: $jl-font;
        font-weight: 600;
        color: #515B7C;
        margin-bottom: 12px;
      }

      p {
        width: 360px;
        font-size: 13px;
        font-family: $jl-font;
        font-weight: 400;
        color: #515B7C;
        line-height: 20px;
        text-align: left;
      }

      .pic1 {
        position: absolute;
        top: 71px;
        left: 410px;
      }
    }

    .youshi2 {
      width: 630px;
      height: 347px;
      background: linear-gradient(137deg, #DFECF7 0%, #F2F7FB 29%, #F2F7FB 46%, #FFFFFF 70%, #EBF5FD 100%);
      box-shadow: 0px 3px 20px 1px rgba(86, 122, 254, 0.3);
      border-radius: 20px;
      border: 2px solid #FFFFFF;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding-left: 40px;
      padding-top: 38px;
      margin-bottom: 38px;

      h5 {
        font-size: 15px;
        font-family: $jl-font;
        font-weight: 400;
        color: #597EF7;
        margin-bottom: 11px;
      }

      h6 {
        font-size: 24px;
        font-family: $jl-font;
        font-weight: 600;
        color: #515B7C;
        margin-bottom: 12px;
      }

      p {
        width: 360px;
        font-size: 13px;
        font-family: $jl-font;
        font-weight: 400;
        color: #515B7C;
        line-height: 20px;
        text-align: left;
      }

      .pic2 {
        position: absolute;
        top: 106px;
        left: 410px;
      }
    }
  }
}

.part3 {
  .body {
    width: 1300px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    .pinpai,
    .fuwu {
      position: absolute;
      top: 122px;
      left: 0;
      width: 310px;
      height: 353px;
      background: linear-gradient(137deg, #DFECF7 0%, #F2F7FB 29%, #F2F7FB 46%, #FFFFFF 70%, #EBF5FD 100%);
      box-shadow: 0px 3px 20px 1px rgba(86, 122, 254, 0.3);
      border-radius: 20px;
      border: 2px solid #FFFFFF;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 39px;

      h5 {
        font-size: 24px;
        font-family: $jl-font;
        font-weight: 600;
        color: #515B7C;
        margin-bottom: 15px;
      }

      p {
        width: 230px;
        font-size: 13px;
        font-family: $jl-font;
        font-weight: 400;
        color: #515B7C;
        line-height: 20px;
        text-align: left;
      }
    }

    .fuwu {
      left: 990px;
    }

    .btn-box {
      width: 1300px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: -185px;
      margin-bottom: 106px;
      z-index: 1;

      button {
        width: 180px;
        height: 52px;
        background-size: 100% 100%;
        font-size: 18px;
        font-family: $jl-font;
        font-weight: 400;
        color: #FFFFFF;
        margin-bottom: 16px;
        transition: all 0.5s ease;
        box-shadow: 0px 2px 5px 4px rgba(86, 122, 254, 0.3);
        border-radius: 50px;

        &:hover {
          scale: 1.1;
        }
      }

      span {
        font-size: 18px;
        font-family: $jl-font;
        font-weight: 400;
        color: #515B7C;
      }
    }
  }
}

.blue {
  font-weight: 600;
  color: #597EF7FF;
}
</style>

<route lang="yaml">
meta:
  layout: main
</route>
