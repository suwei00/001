<script lang="ts" setup>
// import CustomizePullDownUp from '~/components/customizePullDownUp.vue'
import BgImage from '~/components/bgImage.vue'

// utils
import { getSupportImage } from '~/utils/help'
import useRouterBack from '~/hooks/routerBackHooks'
import { useUserInfoStore } from '~/store/userInfo'

import bgSrc1 from '~/assets/images/acting/text1.png?preset=full'
import bgSrc2 from '~/assets/images/acting/bg1.png?preset=full'
import bgSrc3 from '~/assets/images/acting/text2.png?preset=full'
import bgSrc4 from '~/assets/images/acting/bg2.png?preset=full'
import bgSrc5 from '~/assets/images/acting/text3.png?preset=full'
import bgSrc6 from '~/assets/images/acting/bg3.png?preset=full'
import bgSrc7 from '~/assets/images/acting/bgs.png?preset=full'

const bgSrcs = `url(${getSupportImage(bgSrc7)})`

const { goTo } = useRouterBack()
const { token } = storeToRefs(useUserInfoStore())

const onActing = () => {
  if (token.value)
    goTo('/my/marketing-acting')

  else
    goTo('/entry/login')
}
</script>

<template>
  
  <div class="actingWarp">
    <div class="actingHead">
      代理
    </div>
    <div class="actingMain">
      <CustomizePullDownUp :pull-down="false" :pull-up="false" :is-no-data="false" :list="[]">
        <template #bSContent>
          <div class="actingContent">
            <ol>
              <li>
                <div class="img img1">
                  <BgImage :image="bgSrc1" class="text" />
                  <BgImage :image="bgSrc2" class="bg" />
                </div>
                <dl>
                  <dt>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;久赢独家代理模式，业界最高无限代理福利政策！诚邀您一同携手共同发展，合作共赢，实现您的财富自由！
                  </dt>
                </dl>
              </li>
              <li>
                <div class="img img2">
                  <BgImage :image="bgSrc3" class="text" />
                  <BgImage :image="bgSrc4" class="bg" />
                </div>
                <dl>
                  <dd>
                    产品优势一：下级返水
                  </dd>
                  <dt>
                    所有下级代理有效投注最高<span class="text_t">0.5%</span>返水，次日中午12点自动派送至您的账户，只需1倍流水即可提现。APP操作流畅，代理报表详细，您可以看到您收入的每一分钱。
                  </dt>
                  <dd>
                    产品优势二：下级返点
                  </dd>
                  <dt>
                    1.所有下级娱乐<span class="text_t">CG彩票-快3、PK10、时时彩、六合彩、11选5、幸运28</span>，有效投注最高<span class="text_t">9</span>返点，实时返到您的账户，无需流水直接提款。APP操作流畅，代理报表详细，您可以看到您收入的每一分钱。
                  </dt>
                  <dt>
                    2.您可以通过代理线设置与下级的赔率差。下级投注无论输赢，您都可以获得平台奖励您的返点差；下级代理每次投注，同步实时返点至您的账户中，无需流水即可提现！
                  </dt>
                </dl>
              </li>
              <li>
                <div class="img img3">
                  <BgImage :image="bgSrc5" class="text" />
                  <BgImage :image="bgSrc6" class="bg" />
                </div>
                <dl>
                  <dd>
                    品牌优势：
                  </dd>
                  <dt>
                    久赢娱乐诚信运营至今十年，拥有菲律宾政府竞猜委员会（PAGCOR）、欧洲马耳他和英国博彩委员会等多国颁发的合法执照。是受国际行业协会认可的合法公司。在业界已拥有超高的品牌知名度及品牌价值，让您放心推荐！
                  </dt>
                  <dd>
                    服务优势：
                  </dd>
                  <dt>
                    24小时在线客服教您操作、查看数据，随时为您提供服务。我们更有代理专员服务，引导您如何快速开发代理。真正0投入，0风险，躺着都能赚钱！
                  </dt>
                </dl>
              </li>
            </ol>
            <div class="actingFoot">
              <van-button class="customizeConfirm" @click="onActing()">
                马上加入！
              </van-button>
              <p>
                点此生成代理链接发送给您的好友完成注册
              </p>
            </div>
          </div>
        </template>
      </CustomizePullDownUp>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.actingWarp {
  width: 100%;
  height: 100%;
  padding-bottom: 50px;
  overflow: hidden;
  background-color: #F5F5F9;
  display: flex;
  flex-direction: column;
  color: #000000;
.text_t{
  color: #4975E4;
}
  .actingHead {
    width: 100%;
    height: 48px;
    background: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #5D75A2;
    line-height: 16px;
    font-weight: 800;
  }

  .actingMain {
    flex: 1;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .actingContent {
      width: 100%;

      ol {
        li {
          width: 100%;
          background-color: #E3EBF5;
          margin-top: 10px;
          background-image: v-bind(bgSrcs);
          background-size: 650px;
          background-position: top;
          background-repeat: no-repeat;

          &:first-child {
            margin-top: 0;
          }

          .img {
            width: 100%;
            padding-top: 15px;
            display: flex;
            flex-direction: column;
            align-items: center;

            &.img1 {
              .text {
                width: 260px;
                height: 56px;
              }

              .bg {
                width: 345px;
                height: 277px;
              }
            }

            &.img2 {
              .text {
                width: 80px;
                height: 25px;
              }

              .bg {
                width: 329px;
                height: 298px;
              }
            }

            &.img3 {
              .text {
                width: 166px;
                height: 26px;
              }

              .bg {
                margin-top: -40px;
                width: 375px;
                height: 335px;
              }
            }
          }

          dl {
            width: 100%;
            padding: 15px;
            background: linear-gradient(180deg, #E4EBF4 0%, #FFFFFF 100%);
            line-height: 16px;

            dd {
              height: 20px;
              font-size: 14px;
              font-weight: 800;
              line-height: 20px;
              margin-bottom: 8px;
            }

            dt {
              padding-bottom: 15px;
              font-family: PingFang SC-Regular, PingFang SC;
              &:last-child {
                padding-bottom: 0;
              }
            }
          }
        }
      }

      .actingFoot {
        width: 100%;
        padding: 15px 18px 60px 18px;

        p {
          width: 100%;
          text-align: center;
          padding-top: 15px;
          min-height: 20px;
          font-size: 14px;
          color: #848484;
          line-height: 20px;
        }
      }
    }
  }
}
</style>
