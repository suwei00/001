<script lang="ts" setup>
// hooks
import amountHooks from '~/hooks/amountHooks'
import bgImage from '~/components/bgImage.vue'

// 背景图
import bgSrc1 from '~/assets/images/my/maintenance.png?preset=full'
import bgSrc2 from '~/assets/images/my/circle.png?preset=full'

interface Props {
  type?: number // 1: 钱包样式 2: 其他样式
  transferIn?: boolean // 是否显示转入按钮 false 不显示 true 显示
}
const props = withDefaults(defineProps<Props>(), {
  type: 1,
  transferIn: false,
})
const { type } = props
const num = type === 1 ? 3 : 4

const { venueWallet, venueTransfer, refreshAmount } = amountHooks()
refreshAmount('2')

const venueWalletMain: any = computed(() => {
  const lists = []
  // venueWallet 几个放一组
  for (let i = 0; i < venueWallet.value.length; i += num)
    lists.push(venueWallet.value.slice(i, i + num))

  return lists
})
</script>

<template>
  <div class="venueAmountExhibitWarp">
    <ol v-if="type === 1" class="venueAmountExhibitWarpA">
      <li v-for="(itemList, index1) in venueWalletMain" :key="index1">
        <dl>
          <dt v-for="(item, index2) in itemList" :key="index2">
            <div class="title">
              {{ item.label }}
            </div>
            <div class="value">
              <template v-if="item.maintain">
                <div class="maintainWarp">
                  <bgImage :image="bgSrc1" />
                  <span>维护中</span>
                </div>
              </template>
              <template v-else>
                <div class="numsWarp">
                  <span v-if="!item.loading">{{ reserveDecimal(item.amount) }}</span>
                  <bgImage v-else :image="bgSrc2" class="refreshAmount" />
                </div>
              </template>
            </div>
          </dt>
        </dl>
      </li>
    </ol>
    <ol v-else class="venueAmountExhibitWarpB">
      <li v-for="(itemList, index1) in venueWalletMain" :key="index1">
        <dl>
          <dt v-for="(item, index2) in itemList" :key="index2">
            <div class="items">
              <div class="title">
                {{ item.label }}
              </div>
              <div class="value">
                <template v-if="item.maintain">
                  <div class="maintainWarp">
                    <bgImage :image="bgSrc1" />
                    <span>维护中</span>
                  </div>
                </template>
                <template v-else>
                  <div class="numsWarp">
                    <span v-if="!item.loading">{{ reserveDecimal(item.amount) }}</span>
                    <bgImage v-else :image="bgSrc2" class="refreshAmount" />
                  </div>
                </template>
              </div>
            </div>
            <div v-if="transferIn" class="transferInBtnWarp">
              <div v-if="!item.maintain && !item.loading" class="transferInBtn" @click="venueTransfer(item.wallet_id, 1)">
                一键转入
              </div>
            </div>
          </dt>
        </dl>
      </li>
    </ol>
  </div>
</template>

<style lang="scss" scoped>
.venueAmountExhibitWarp {
  width: 100%;
  color: #000000;

  .venueAmountExhibitWarpA {
    width: 100%;

    li {
      width: 100%;
      border-top: 1px solid #EFEFEF;

      dl {
        width: 100%;
        display: flex;

        dt {
          width: calc(100% / 3);
          height: 43px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;

          .title {
            font-size: 11px;
            line-height: 15px;
            height: 15px;
          }

          .value {
            font-size: 10px;
            color: #454545;
            line-height: 14px;
            height: 14px;
            display: flex;
            align-items: center;
            margin-top: 3px;

            .numsWarp {
             img{
                width: 10px;
                height: 10px;
              }
            }

            .maintainWarp {
              display: flex;
              align-items: center;

             img{
                width: 12px;
                height: 12px;
              }

              span {
                font-size: 11px;
                line-height: 15px;
                height: 15px;
                margin-left: 2px;
                color: #4080FF;
              }
            }
          }

          &::after {
            content: ' ';
            display: block;
            width: 1px;
            height: 22px;
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            background-color: #EFEFEF;
          }

          &:nth-child(3) {
            &::after {
              display: none;
            }
          }
        }
      }
    }
  }

  .venueAmountExhibitWarpB {
    width: 100%;

    li {
      width: 100%;
      border-top: 1px solid #EFEFEF;

      dl {
        width: 100%;
        display: flex;

        dt {
          width: calc(100% / 4);
          height: 64px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          .items {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;

            &::after {
              content: ' ';
              display: block;
              width: 1px;
              height: 25px;
              position: absolute;
              right: 0;
              top: 0;
              bottom: 0;
              margin: auto;
              background-color: #EFEFEF;
            }

            .title {
              font-size: 11px;
              line-height: 15px;
              height: 15px;
            }

            .value {
              font-size: 10px;
              color: #454545;
              line-height: 14px;
              height: 14px;
              display: flex;
              align-items: center;
              margin-top: 3px;

              .numsWarp {
               img{
                  width: 10px;
                  height: 10px;
                }
              }

              .maintainWarp {
                display: flex;
                align-items: center;

               img{
                  width: 12px;
                  height: 12px;
                }

                span {
                  font-size: 11px;
                  line-height: 15px;
                  height: 15px;
                  margin-left: 2px;
                  color: #4080FF;
                }
              }
            }
          }

          &:nth-child(4) {
            .items::after {
              display: none;
            }
          }

          .transferInBtnWarp {
            height: 15px;

            .transferInBtn {
              width: 76px;
              height: 28px;
              border-radius: 12px;
              border: 1px solid #2674FF;
              font-size: 16px;
              color: #2674FF;
              line-height: 22px;
              display: flex;
              align-items: center;
              justify-content: center;
              // 缩小
              transform: scale(0.5);
              margin: -5px 0;
            }
          }
        }
      }
    }
  }

}

.refreshAmount {
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
