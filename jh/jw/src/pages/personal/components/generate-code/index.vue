<script setup lang='ts' name="generate-code">
import { ElMessage } from 'element-plus'

const { memberRebate } = defineProps<{
  memberRebate?: {
    uid: string
    parent_uid: string
    zr: string
    qp: string
    ty: string
    dj: string
    dz: string
    by: string
    k3: string
    pk10: string
    ssc: string
    luck28: string
    ll5: string
    lhc: string
    created_at: number
    prefix: string
  }
}>()
const emit = defineEmits(['updateList'])
const { isOpen, open, close } = usePersonalDialog()

const rebateForm = reactive({
  zr: '',
  qp: '',
  ty: '',
  dj: '',
  dz: '',
  by: '',
  k3: '',
  pk10: '',
  ssc: '',
  luck28: '',
  ll5: '',
  lhc: '',
})

// 关闭选项卡
const selectRef: { [text: string]: any } = {
  s1: ref(),
  s2: ref(),
  s3: ref(),
  s4: ref(),
  s5: ref(),
  s6: ref(),
  s7: ref(),
  s8: ref(),
  s9: ref(),
  s10: ref(),
  s11: ref(),
  s12: ref(),
}
const hideSelect = (index: string | boolean) => {
  for (let i = 1; i < 13; i++)
    selectRef[`s${i.toString()}`].value.hide()

  Boolean(index) && selectRef[`s${index}`].value.open()
}

const { run: runCreateLink, loading } = useRequest(() => createMemberLink({
  zr: rebateForm.zr.replace('%', ''),
  qp: rebateForm.qp.replace('%', ''),
  ty: rebateForm.ty.replace('%', ''),
  dj: rebateForm.dj.replace('%', ''),
  dz: rebateForm.dz.replace('%', ''),
  by: rebateForm.by.replace('%', ''),
  k3: rebateForm.k3.replace('%', ''),
  pk10: rebateForm.pk10.replace('%', ''),
  ssc: rebateForm.ssc.replace('%', ''),
  luck28: rebateForm.luck28.replace('%', ''),
  ll5: rebateForm.ll5.replace('%', ''),
  lhc: rebateForm.lhc.replace('%', ''),
}), {
  manual: true,
  onSuccess() {
    ElMessage.success('生成成功！')
    emit('updateList')
    close()
  },
})

// 查看返点赔率表
const router = useRouter()
const goPaytable = () => {
  const { href } = router.resolve('/personal/rebate-paytable')
  const t = setTimeout(() => {
    openLink(href)
    clearTimeout(t)
  }, 10)
}

// 暴露

defineExpose({
  open,
})
</script>

<template>
  <section v-if="isOpen" @click.stop="hideSelect(false)">
    <div class="body">
      <!-- 标题 -->
      <div class="title" mb-20px>
        <h5>生成邀请码</h5>
        <div class="close" @click.stop="close">
          <img src="@icons/personal/finance/close-icon.svg" alt="">
        </div>
      </div>

      <!-- 选项 -->
      <div class="option-wrapper" mb-30px>
        <div class="options">
          <h5>设置下级返水</h5>
          <table>
            <tr>
              <th>游戏种类</th>
              <th>自身返水</th>
              <th>返水比例</th>
            </tr>
            <tr>
              <td>真人</td>
              <td>{{ memberRebate?.zr }}%</td>
              <td>
                <rebate-select
                  :ref="selectRef.s1" v-model="rebateForm.zr" index="1" :self-rebate="memberRebate?.zr"
                  :is-cp="false" @open-select="hideSelect"
                />
              </td>
            </tr>
            <tr>
              <td>体育</td>
              <td>{{ memberRebate?.ty }}%</td>
              <td>
                <rebate-select
                  :ref="selectRef.s2" v-model="rebateForm.ty" index="2" :self-rebate="memberRebate?.ty"
                  :is-cp="false" @open-select="hideSelect"
                />
              </td>
            </tr>
            <tr>
              <td>棋牌</td>
              <td>{{ memberRebate?.qp }}%</td>
              <td>
                <rebate-select
                  :ref="selectRef.s3" v-model="rebateForm.qp" index="3" :self-rebate="memberRebate?.qp"
                  :is-cp="false" @open-select="hideSelect"
                />
              </td>
            </tr>
            <tr>
              <td>电子</td>
              <td>{{ memberRebate?.dz }}%</td>
              <td>
                <rebate-select
                  :ref="selectRef.s4" v-model="rebateForm.dz" index="4" :self-rebate="memberRebate?.dz"
                  :is-cp="false" @open-select="hideSelect"
                />
              </td>
            </tr>
            <tr>
              <td>捕鱼</td>
              <td>{{ memberRebate?.by }}%</td>
              <td>
                <rebate-select
                  :ref="selectRef.s5" v-model="rebateForm.by" index="5" :self-rebate="memberRebate?.by"
                  :is-cp="false" @open-select="hideSelect"
                />
              </td>
            </tr>
            <tr>
              <td>电竞</td>
              <td>{{ memberRebate?.dj }}%</td>
              <td>
                <rebate-select
                  :ref="selectRef.s6" v-model="rebateForm.dj" index="6" :self-rebate="memberRebate?.dj"
                  :is-cp="false" @open-select="hideSelect"
                />
              </td>
            </tr>
          </table>
        </div>
        <div class="options">
          <h5>设置下级返点</h5>
          <table>
            <tr>
              <th>彩票种类</th>
              <th>自身返点</th>
              <th>彩票返点</th>
            </tr>
            <tr>
              <td>快3</td>
              <td>{{ memberRebate?.k3 }}</td>
              <td>
                <rebate-select
                  :ref="selectRef.s7" v-model="rebateForm.k3" index="7" :self-rebate="memberRebate?.k3"
                  :is-cp="true" @open-select="hideSelect"
                />
              </td>
            </tr>
            <tr>
              <td>PK10</td>
              <td>{{ memberRebate?.pk10 }}</td>
              <td>
                <rebate-select
                  :ref="selectRef.s8" v-model="rebateForm.pk10" index="8" :self-rebate="memberRebate?.pk10"
                  :is-cp="true" @open-select="hideSelect"
                />
              </td>
            </tr>
            <tr>
              <td>时时彩</td>
              <td>{{ memberRebate?.ssc }}</td>
              <td>
                <rebate-select
                  :ref="selectRef.s9" v-model="rebateForm.ssc" index="9" :self-rebate="memberRebate?.ssc"
                  :is-cp="true" @open-select="hideSelect"
                />
              </td>
            </tr>
            <tr>
              <td>六合彩</td>
              <td>{{ memberRebate?.lhc }}</td>
              <td>
                <rebate-select
                  :ref="selectRef.s10" v-model="rebateForm.lhc" index="10"
                  :self-rebate="memberRebate?.lhc" :is-cp="true" @open-select="hideSelect"
                />
              </td>
            </tr>
            <tr>
              <td>11选5</td>
              <td>{{ memberRebate?.ll5 }}</td>
              <td>
                <rebate-select
                  :ref="selectRef.s11" v-model="rebateForm.ll5" index="11" :self-rebate="memberRebate?.ll5"
                  :is-cp="true" @open-select="hideSelect"
                />
              </td>
            </tr>
            <tr>
              <td>幸运28</td>
              <td>{{ memberRebate?.luck28 }}</td>
              <td>
                <rebate-select
                  :ref="selectRef.s12" v-model="rebateForm.luck28" index="12"
                  :self-rebate="memberRebate?.luck28" :is-cp="true" @open-select="hideSelect"
                />
              </td>
            </tr>
          </table>
        </div>
      </div>

      <!-- 温馨提示 -->
      <h6>※ 温馨提示：</h6>
      <ul class="tips" pl-25px mb-20px>
        <li><span class="num">1、</span>不同的返点赔率不同，返点越高赔率越高。</li>
        <li>
          <span class="num">2、</span>代理可获得的佣金等于代理自身返点与下级返点的差值，如代理自身返点6，下级返点4，代理可获得下级投注金额的2%，即下级下注100元，代理可获得2元。
        </li>
        <li><span class="num">3、</span><span style="color:#ff0000;">下级返点值设得越低，下级的赔率就越低，建议给下级设置的返点不要过低。</span></li>
        <li><span class="num">4、</span><span class="dot" @click="goPaytable">点击查看返点赔率表。</span></li>
      </ul>
      <button class="create" w-450px h-50px @click="runCreateLink">
        <i v-if="loading" class="i-common-btn-loading" mr-5px w-18px h-18px :class="{ 'refresh-loading': loading }" />
        生成邀请码
      </button>
    </div>
  </section>
</template>

<style lang='scss' scoped>
section {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: hsl(0, 0%, 0%, 0.3);
  z-index: 2000;
  color: #333;
  font-size: 15px;

  .body {
    width: 840px;
    background: #FFFFFF;
    box-shadow: 0px 10px 80px 1px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 32px 35px 0;
    text-align: left;

    .title {
      display: flex;
      justify-content: space-between;

      h5 {
        font-size: 18px;
        font-family: $jl-font;
        font-weight: 600;
      }

      .close {
        padding: 5px;
        cursor: pointer;

        img {
          width: 14px;
          height: 14px;
        }
      }

    }

    .tips {
      width: 100%;
      position: relative;
      font-size: 13px;

      li {
        line-height: 2;
      }

      .num {
        position: absolute;
        left: 0;
      }

      .dot {
        color: #597EF7;
        cursor: pointer;
      }
    }

    button {
      background-color: #597EF7;
      border-radius: 6px;
      font-size: 18px;
      color: #fff;
      margin: 0 auto 50px;
      display: block;
    }

  }
}

.option-wrapper {
  display: flex;
  justify-content: space-between;

  h5 {
    font-family: $jl-font;
    font-weight: 600;
    text-align: center;
    margin-bottom: 14px;
  }
}

.options {
  cursor: pointer;
  table {
    width: 375px;
    table-layout: fixed;

    th {
      background: #F7F9FD;
      font-family: $jl-font;
      font-weight: 600;
    }

    th,
    td {
      height: 40px;
      border: 1px solid #D2D7E3;
      text-align: center;
    }
  }
}
</style>
