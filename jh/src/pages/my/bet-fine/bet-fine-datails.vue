<script lang="ts" setup>
import dayjs from 'dayjs'
import useRouterBack from '~/hooks/routerBackHooks'
const route = useRoute()
const records: any = route.query

const { goBack } = useRouterBack()
// 投注内容
const bet_content = computed(() => records.result.split('|').filter((d: any) => d.includes('投注内容')).map((d: any) => d.replace('投注内容:', '')).join('/'))
const onLeft = () => {
  goBack(records.record)
}
</script>

<template>
  <div class=" cent-bg ">
    <Header title="注单详情" :is-on-left="true" @on-left="onLeft()" />
    <div class=" bet_detail cent-top">
      <ul>
        <li class="flex jc-c jc-sb">
          <p class="bet_tit">
            会员账号
          </p>
          <p class="bet_text">
            {{ records.player_name }}
          </p>
        </li>
        <li class="flex jc-c jc-sb">
          <p class="bet_tit">
            投注时间
          </p>
          <p class="bet_text">
            {{ dayjs(records.api_bet_time ? +records.api_bet_time : 0).format('YYYY-MM-DD HH:mm:ss') }}
          </p>
        </li>

        <li class="flex jc-c jc-sb ">
          <p class="bet_tit">
            投注单号
          </p>
          <p class="bet_text">
            <span>{{ records.bill_no }}</span>
          </p>
        </li>
        <li class="flex jc-c jc-sb">
          <p class="bet_tit">
            游戏场馆
          </p>
          <p class="bet_text">
            {{ records.api_name }}
          </p>
        </li>
        <li class="flex jc-c jc-sb">
          <p class="bet_tit">
            游戏玩法
          </p>
          <p class="bet_text">
            {{ records.game_name }}
          </p>
        </li>
        <li v-if="['2', '6', '8'].includes(records.game_type)" class="flex jc-c jc-sb">
          <p class="bet_tit">
            投注玩法
          </p>
          <p class="bet_text ">
            {{ records.play_type }}
          </p>
        </li>

        <li v-if="['2', '6', '8'].includes(records.game_type)" class="flex jc-c jc-sb">
          <p class="bet_tit min_w">
            投注内容
          </p>
          <p class="bet_text  bet_over">
            {{ !!bet_content ? bet_content : '——' }}
          </p>
        </li>
        <li class="flex jc-c jc-sb">
          <p class="bet_tit">
            投注金额
          </p>
          <p class="bet_text ">
            {{ reserveDecimal(records.bet_amount) }}元
          </p>
        </li>

        <li class="flex jc-c jc-sb">
          <p class="bet_tit">
            游戏输赢
          </p>
          <p class="bet_text " :class="{ customizeColorBlue: Number(records.net_amount) > 0, customizeColorRed: Number(records.net_amount) < 0 }">
            {{ reserveDecimal(records.net_amount) }}
          </p>
        </li>
        <li class="flex jc-c jc-sb  border-no">
          <p class="bet_tit">
            投注状态
          </p>
          <p class="bet_text ">
            {{ records.bet_flag }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bet_detail {
    padding:  18px;

    ul {
        li {
            line-height: 30px;
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #000000;
            border-bottom: 1px solid #F1F1F1;
          .min_w{
            min-width: 60px;
          }
            .bet_text {
                margin-left: 15px;
            }
            .bet_over{
              overflow: hidden;            // 溢出隐藏
              text-overflow: ellipsis;     // 溢出用省略号显示
              display:-webkit-box;         // 作为弹性伸缩盒子模型显示。
              -webkit-box-orient:vertical; // 设置伸缩盒子的子元素排列方式：从上到下垂直排列
              -webkit-line-clamp:2;        // 显示的行数

            }

        }
    }
}
</style>

