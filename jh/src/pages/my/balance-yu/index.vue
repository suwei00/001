<script lang="ts" setup>
import useRouterBack from '~/hooks/routerBackHooks'
// component
import bgImage from '~/components/bgImage.vue'
import RefreshAmount from '~/components/refreshAmount.vue'
// hooks
import amountHooks from '~/hooks/amountHooks'

// 背景图
import bgSrc1 from '~/assets/images/my/yubgimg.png?preset=full'
import bgSrc3 from '~/assets/images/public/whiteLeft.png?preset=full'
import bgSrc5 from '~/assets/images/my/todayIcon.png?preset=full'

import bgSrc6 from '~/assets/images/my/yuone.png?preset=full'
import bgSrc7 from '~/assets/images/my/yutwo.png?preset=full'
import bgSrc8 from '~/assets/images/my/yuthree.png?preset=full'
import bgSrc9 from '~/assets/images/my/yufour.png?preset=full'

const bgImg1 = `url(${getSupportImage(bgSrc1)})`

const { goBack, goTo } = useRouterBack()
const { totalAmount } = amountHooks()
const showPop = ref(false)
const showPopup = () => {
  showPop.value = true
}
</script>

<template>
  <div class="walletWarp">
    <div class="head">
      <div class="headL" @click="goBack()">
        <bgImage :image="bgSrc3" />
      </div>
      <span>余额宝</span>
      <div class="headR" @click="goTo('/my/balance-yu/balance-record')">
        余额宝记录
      </div>
    </div>
    <div class="countAmount">
      <div class="countAmountTitle">
        总金额额
      </div>
      <div class="countAmountNum flex ai-c jc-c">
        <p> <span>¥ </span>{{ reserveDecimal(totalAmount) }}</p>
        <RefreshAmount type="2" refresh-type="2" />
      </div>
      <div class="today_revenue flex ai-c jc-c">
        <bgImage :image="bgSrc5" /> 今日收益：¥ 0.00
      </div>
    </div>
    <div class="walletMainWarp">
      <div class="walletMain">
        <div class="dl bot_dashed first_after">
          <div class="dt">
            <div class="title">
              <bgImage :image="bgSrc6" />
              <span>计息金额</span>
            </div>
            <div class="value">
              ¥ 99,999.00
            </div>
          </div>
          <div class="dt">
            <div class="title">
              <bgImage :image="bgSrc7" />
              <span>待计息金额</span>
            </div>
            <div class="value">
              ¥ 99,999.00
            </div>
          </div>
        </div>
        <div class="dl second_after">
          <div class="dt" @click="showPopup()">
            <div class="title">
              <bgImage :image="bgSrc8" />
              <span>总收益</span>
            </div>
            <div class="value">
              ¥ 99,999.00
            </div>
          </div>
          <div class="dt">
            <div class="title">
              <bgImage :image="bgSrc9" />
              <span>年化率</span>
            </div>
            <div class="value">
              929.99%
            </div>
          </div>
        </div>
        <div class="flex ai-c jc-sb balance_btn">
          <van-button class="" @click="goTo('/my/balance-yu/turn-in', { type: '1' })">
            转出
          </van-button>
          <van-button class="turn_in" @click="goTo('/my/balance-yu/turn-in', { type: '2' })">
            转入
          </van-button>
        </div>
      </div>
    </div>
    <div class="balance_intr">
      <div class="intr_tit">
        余额宝说明：
      </div>
      <div class="intr_list">
        1、可提现的金额才可以转入余额宝。<br>
        2、余额宝收益将直接进入账户余额。<br>
        3、收益结算公式：余额宝余额*年化率 /365 * 1。<br>
        4、收益结算周期：1 天结算一次，每日凌晨4点进行结算派息。<br>
        5、结算前转出余额宝余额，收益结算也会停止。<br>
        6、余额宝余额大于等于100元才会结算收益。<br>
        7、结算周期内转入余额宝的金额，本次结算时间点不会进行结算派息，将在下一个结算点计入余额宝本金结算派息。<br>
        8、派息发放需一定时间，收益如未及时到账，请耐心等待，如有任何疑问，请联系客服。
      </div>
    </div>
    <!-- 余额宝收益弹窗 -->
    <cgDialog v-model="showPop" title="余额宝收益">
      <template #bgBody>
        <div class="bala_content">
          <ul>
            <li>
              <div class="bala_top flex ai-c jc-sa ">
                <div class="toplef_amount border-rig">
                  <div class="amout_tit">
                    计息金额
                  </div>
                  <div class="amout_num">
                    ¥ 99,999.00
                  </div>
                </div>
                <div class="toplef_amount">
                  <div class="amout_tit">
                    年化率
                  </div>
                  <div class="amout_num">
                    929.99%
                  </div>
                </div>
              </div>
              <div class="bala_bottom">
                <div class="bala_income">
                  收益金额：¥ 100.00
                </div>
                <div class="bala_time">
                  2022-08-19 17:45:45
                </div>
              </div>
            </li>
            <li>
              <div class="bala_top flex ai-c jc-sa ">
                <div class="toplef_amount border-rig">
                  <div class="amout_tit">
                    计息金额
                  </div>
                  <div class="amout_num">
                    ¥ 99,999.00
                  </div>
                </div>
                <div class="toplef_amount">
                  <div class="amout_tit">
                    年化率
                  </div>
                  <div class="amout_num">
                    929.99%
                  </div>
                </div>
              </div>
              <div class="bala_bottom">
                <div class="bala_income">
                  收益金额：¥ 100.00
                </div>
                <div class="bala_time">
                  2022-08-19 17:45:45
                </div>
              </div>
            </li>
            <li>
              <div class="bala_top flex ai-c jc-sa ">
                <div class="toplef_amount border-rig">
                  <div class="amout_tit">
                    计息金额
                  </div>
                  <div class="amout_num">
                    ¥ 99,999.00
                  </div>
                </div>
                <div class="toplef_amount">
                  <div class="amout_tit">
                    年化率
                  </div>
                  <div class="amout_num">
                    929.99%
                  </div>
                </div>
              </div>
              <div class="bala_bottom">
                <div class="bala_income">
                  收益金额：¥ 100.00
                </div>
                <div class="bala_time">
                  2022-08-19 17:45:45
                </div>
              </div>
            </li>
            <li>
              <div class="bala_top flex ai-c jc-sa ">
                <div class="toplef_amount border-rig">
                  <div class="amout_tit">
                    计息金额
                  </div>
                  <div class="amout_num">
                    ¥ 99,999.00
                  </div>
                </div>
                <div class="toplef_amount">
                  <div class="amout_tit">
                    年化率
                  </div>
                  <div class="amout_num">
                    929.99%
                  </div>
                </div>
              </div>
              <div class="bala_bottom">
                <div class="bala_income">
                  收益金额：¥ 100.00
                </div>
                <div class="bala_time">
                  2022-08-19 17:45:45
                </div>
              </div>
            </li>
            <li>
              <div class="bala_top flex ai-c jc-sa ">
                <div class="toplef_amount border-rig">
                  <div class="amout_tit">
                    计息金额
                  </div>
                  <div class="amout_num">
                    ¥ 99,999.00
                  </div>
                </div>
                <div class="toplef_amount">
                  <div class="amout_tit">
                    年化率
                  </div>
                  <div class="amout_num">
                    929.99%
                  </div>
                </div>
              </div>
              <div class="bala_bottom">
                <div class="bala_income">
                  收益金额：¥ 100.00
                </div>
                <div class="bala_time">
                  2022-08-19 17:45:45
                </div>
              </div>
            </li>
            <li>
              <div class="bala_top flex ai-c jc-sa ">
                <div class="toplef_amount border-rig">
                  <div class="amout_tit">
                    计息金额
                  </div>
                  <div class="amout_num">
                    ¥ 99,999.00
                  </div>
                </div>
                <div class="toplef_amount">
                  <div class="amout_tit">
                    年化率
                  </div>
                  <div class="amout_num">
                    929.99%
                  </div>
                </div>
              </div>
              <div class="bala_bottom">
                <div class="bala_income">
                  收益金额：¥ 100.00
                </div>
                <div class="bala_time">
                  2022-08-19 17:45:45
                </div>
              </div>
            </li>
          </ul>
        </div>
      </template>
    </cgDialog>
  </div>
</template>

<style lang="scss" scoped>
.bala_content {
  background: #F5F5F9;
  height: 302px;
overflow-y: auto;
padding-right: 9px;
-webkit-overflow-scrolling: touch;
border-radius: 13px;
  ul {
    padding: 5px;

    li {
      background: #FFFFFF;
      border-radius: 6px;
      padding: 0 6px;
      margin-bottom: 5px;

      .bala_top {
        border-bottom: 1px solid #F3F3F3;
        padding: 6px 0;

        .toplef_amount {
          font-size: 11px;
          font-weight: 400;
          color: #000000;
          line-height: 15px;
          flex: 1;
          .amout_tit{
            margin-bottom: 6px;
          }
        }

        .amout_num {
          font-size: 12px;
          font-weight: 400;
          color: #000000;
          line-height: 17px;
        }
      }

      .bala_bottom {
        padding: 6px 0;
        .bala_income {
          height: 19px;
          font-size: 13px;
          font-weight: 600;
          color: #4080FF;
          line-height: 19px;
          margin-bottom: 6px;
        }

        .bala_time {
          font-size: 11px;
          font-weight: 400;
          color: #A4A4A4;
          line-height: 15px;
          text-align: right;
        }
      }
    }
  }
}

.walletWarp {
  width: 100%;
  height: 100%;
  background-color: #F5F5F9;
  background-image: v-bind(bgImg1);
  background-size: 100%;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;

  .head {
    width: 100%;
    height: 43px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    font-size: 13px;
    font-weight: 800;
    position: fixed;
    left: 0;
    top: 0;

    .headL {
      position: absolute;
      left: 21px;
      top: 0;
      height: 100%;
      display: flex;
      align-items: center;

      i {
        width: 11px;
        height: 19px;
      }
    }

    .headR {
      position: absolute;
      right: 19px;
      top: 0;
      height: 100%;
      display: flex;
      align-items: center;
      font-size: 12px;
    }
  }

  .countAmount {
    width: 100%;
    padding: 62px 35px 0 35px;
    color: #FFFFFF;

    .today_revenue {
      margin-bottom: 20px;

      i {
        width: 18px;
        height: 19px;
        margin-right: 4px;
      }

      height: 25px;
      font-size: 15px;
      font-weight: 400;
      color: #FFFFFF;
    }

    .countAmountTitle {
      width: 100%;
      font-size: 14px;
      height: 20px;
      line-height: 20px;
      margin-bottom: 4px;
      text-align: center;
    }

    .countAmountNum {
      font-size: 25px;
      font-weight: 800;
      line-height: 35px;
      width: 100%;
      height: 35px;
      margin: 4px 0 14px 0;

      p {
        margin-right: 10px;

        span {
          font-size: 16px;
        }
      }
    }
  }

  .walletMainWarp {
    width: 100%;
    padding: 0 24px 35px 24px;
    overflow-y: auto;

    .walletMain {
      width: 100%;
      // background: #FFFFFF;
      // background: linear-gradient(180deg, #FDFDFF 80%, #C3DAF1 100%);
      box-shadow: 0px 3px 15px 0px rgba(204, 204, 204, 0.44), inset 0px -3px 32px 0px rgba(255, 255, 255, 0.43), inset 0px -2px 4px 0px rgba(255, 255, 255, 0.82);
      border-radius: 11px;
      backdrop-filter: blur(7px);
      padding: 3px 8px 21px 8px;

      .bot_dashed {
        border-bottom: 2px dashed #DBDBDB;
      }

      .dl {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 18px 12px 22px 12px;

        .dt {
          width: 50%;
          display: flex;
          flex-direction: column;
          align-items: start;

          .title {
            display: flex;
            align-items: center;
            font-size: 11px;
            font-weight: 400;
            color: #000000;
            position: relative;
            padding-left: 8px;

            span {
              line-height: 13px;
            }

            i {
              width: 13px;
              height: 13px;
              margin-right: 4px;
            }
          }

          .value {
            font-size: 16px;
            font-weight: 800;
            color: #4080FF;
            line-height: 15px;
            // height: 31px;
            margin-top: 9px;
          }
        }

        dd {
          width: 1px;
          height: 20px;
          background: #EEEEEE;
        }
      }

      .first_after {
        .dt:nth-child(1) {
          i {
            width: 9px;
            height: 11px;
          }
        }

        .dt:nth-child(2) {
          padding-left: 25px;

          i {
            width: 13px;
            height: 13px;
          }
        }

        .title {

          &::after {
            content: '';
            width: 4px;
            height: 15px;
            background: #009AFF;
            box-shadow: 0px 1px 7px 0px rgba(101, 109, 117, 0.16), 0px 2px 4px 0px rgba(0, 154, 255, 0.26), inset 0px 3px 5px 0px rgba(255, 255, 255, 0.5), inset 2px -6px 10px 0px rgba(112, 198, 255, 1), inset 0px -1px 1px 0px rgba(255, 255, 255, 0.69);
            border-radius: 2px;
            position: absolute;
            left: -5px;
            top: auto;

          }
        }
      }

      .second_after {
        .dt:nth-child(1) {
          .value {
            border-bottom: 2px solid #4080FF;
          }
        }

        .dt:nth-child(2) {
          padding-left: 25px;
        }

        .title {
          i {
            width: 12px;
            height: 13px;
          }

          &::after {
            content: '';
            width: 4px;
            height: 15px;
            background: #E88AF1;
            box-shadow: 0px 1px 7px 0px rgba(101, 109, 117, 0.16), 0px 2px 4px 0px rgba(182, 58, 196, 0.21), inset 0px 7px 12px 0px rgba(255, 255, 255, 0.5), inset 0px -7px 7px 0px rgba(225, 109, 241, 1), inset 0px -1px 1px 0px rgba(255, 255, 255, 0.69);
            border-radius: 2px;
            position: absolute;
            left: -5px;
            top: auto;
          }
        }

      }

      .balance_btn {
        :deep(.van-button) {
          width: 150px;
          height: 32px;
          border-radius: 5px;
          border: 1px solid #597EF7;
          font-size: 14px;
          font-weight: 400;
          color: #597EF7;
        }

        .turn_in {
          width: 150px;
          height: 32px;
          border-radius: 5px;
          color: #FFFFFF;
          background: #597EF7;
        }
      }
    }
  }
}

.balance_intr {
  padding: 0 13px;

  .intr_tit {
    font-size: 12px;
    font-weight: 600;
    color: #000000;
  }

  .intr_list {
    padding: 0 0 0 5px;
    margin-top: 14px;
    font-size: 11px;
    font-weight: 400;
    color: #606060;
    line-height: 15px;
  }
}
</style>
