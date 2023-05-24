<script setup lang='ts' name="user-info">
import { ElMessage } from 'element-plus'

// 基本资料
const appStore = useAppStore()
const userStore = useUserStore()
const { userInfo, userRebate } = $(storeToRefs(userStore))
let real_name = $ref('')
let qq = $ref('')
let wechat = $ref('')
let email = $ref('')
let address = $ref('')
let phone = $ref('')
let birth = $ref<string | null>('')
// 禁用资料修改开关
const NoUpdate = reactive<{ [text: string]: boolean }>({
  real_name: false,
  qq: false,
  wechat: false,
  email: false,
  address: false,
  birth: false,
})
// 获取基本资料
function getBaseInfo() {
  userStore.runGetMemberInfoAsync().then((res) => {
    for (const k in NoUpdate) {
      NoUpdate[k] = Boolean(res[k])
      if (k === 'birth')
        NoUpdate.birth = res.birth === '' || res.birth === '0' ? false : Boolean(res.birth)

      // console.log('k', k, Boolean(res[k]))
    }

    real_name = res.real_name
    qq = res.qq
    wechat = res.wechat
    email = res.email
    address = res.address
    phone = res.phone
    birth = res.birth === '' || res.birth === '0' ? null : format((Number(res.birth) * 1000), 'yyyy-MM-dd')
    sessionStorage.setItem('USERINFO', JSON.stringify(res))
    sessionStorage.setItem('NOUPDATEOBJ', JSON.stringify(NoUpdate))
  }).catch((err) => { console.warn(err) })
}
getBaseInfo()

// 保存
const isComplete = $computed(() => Object.values(NoUpdate).every((i: boolean) => i === true))
const { run: runUpdateMemberInfo, loading } = useRequest(() => updateMemberInfo({
  realname: real_name,
  address,
  birth,
  qq,
  wechat,
  email,
}), {
  manual: true,
  onSuccess() {
    ElMessage.success('设置成功！')
    getBaseInfo()
  },
})
// 修改校验
const isName = $computed(() => nameRegx.test(real_name))
const isQQ = $computed(() => qqRegx.test(qq))
const isWechat = $computed(() => wechatRegx.test(wechat))
const isEmail = $computed(() => emailRegx.test(email))
const isAddress = $computed(() => Boolean(address) && !NoUpdate.address)
const infoObj: { [text: string]: any } = $computed(() => {
  return {
    real_name,
    address,
    birth: birth || '0',
    qq,
    wechat,
    email,
  }
})
const checkField = () => {
  const USERINFO: any = JSON.parse(sessionStorage.getItem('USERINFO') ?? '{}')
  const NOUPDATEOBJ: any = Object.entries(JSON.parse(sessionStorage.getItem('NOUPDATEOBJ') ?? '{}')).filter((item: any) => item[1] === false)

  if (NOUPDATEOBJ.every((item: any) => infoObj[item[0]] === USERINFO[item[0]]))
    return ElMessage.error('资料无更改')

  if (
    (real_name && !isName && !NoUpdate.real_name)
    || (qq && !isQQ && !NoUpdate.qq)
    || (wechat && !isWechat && !NoUpdate.wechat)
    || (email && !isEmail && !NoUpdate.email)
  )
    ElMessage.error('请正确填写个人资料')

  else
    openModal('tip')
}

// 弹窗
const account = ref()
const setSecure = ref()
const updateSecure = ref()
const tipRef = ref()
function openModal(type: string) {
  switch (type) {
    case 'account':
      account.value.open()
      break
    case 'setSecure':
      setSecure.value.open()
      break
    case 'updateSecure':
      updateSecure.value.open()
      break
    case 'tip':
      tipRef.value.open()
      break
    default:
      break
  }
}
const resetSecure = ref()
function openReset() {
  const t = setTimeout(() => {
    resetSecure.value.open()
    clearTimeout(t)
  }, 200)
}

// 返水比例
const zr = computed(() => `${userRebate?.zr}%`)
const ty = computed(() => `${userRebate?.ty}%`)
const qp = computed(() => `${userRebate?.qp}%`)
const dz = computed(() => `${userRebate?.dz}%`)
const by = computed(() => `${userRebate?.by}%`)
const dj = computed(() => `${userRebate?.dj}%`)
const k3 = computed(() => userRebate?.k3)
const pk10 = computed(() => userRebate?.pk10)
const ssc = computed(() => userRebate?.ssc)
const ll5 = computed(() => userRebate?.ll5)
const luck28 = computed(() => userRebate?.luck28)
const lhc = computed(() => userRebate?.lhc)
</script>

<template>
  <div class="user-info">
    <!-- 基本资料 -->
    <personal-title title="基本资料">
      <template #desc>
        <p>为了保护您的账户安全，请填写您的个人信息，若需修改信息，请联系<span online-service-link @click="appStore.openService">在线客服</span>。</p>
      </template>
    </personal-title>
    <section class="base-info">
      <personal-input
        v-model="real_name" :disabled="NoUpdate.real_name" label="真实姓名" type="text" must
        placeholder="姓名需要与银行卡姓名保持一致，否则无法提现" maxlength="30" :is-error="!isName" error-msg="请正确输入真实姓名"
      />
      <personal-input
        v-model="qq"
        :disabled="NoUpdate.qq" label="QQ号码" type="text" placeholder="请输入您的QQ号码（选填）"
        maxlength="11" :is-error="!isQQ" error-msg="请正确输入QQ号码"
      />
      <personal-input
        v-model="wechat" :disabled="NoUpdate.wechat" label="微信号码" type="text" placeholder="请输入您的微信号码（选填）"
        maxlength="20" :is-error="!isWechat" error-msg="请正确输入微信号码"
      />
      <personal-input
        v-model="email" :disabled="NoUpdate.email" label="电子邮箱" type="email" placeholder="请输入您的Email地址（选填）"
        maxlength="30" :is-error="!isEmail" error-msg="请正确输入邮箱地址"
      />
      <personal-input v-model="birth" :disabled="NoUpdate.birth" label="出生日期" type="date" placeholder="请选择您的出生日期（选填）" />
      <personal-input
        v-model="address" :disabled="NoUpdate.address" label="收货地址" type="address"
        placeholder="请输入您的详细地址，将有机会收获大奖（选填）" maxlength="30" :is-error="!isAddress" error-msg="请正确输入收货地址"
      />
      <button v-if="!isComplete" class="save" @click="checkField">
        <i v-if="loading" class="i-common-btn-loading" mr-5px w-18px h-18px :class="{ 'refresh-loading': loading }" />
        保存
      </button>
      <dialog-tip ref="tipRef" @confirm="runUpdateMemberInfo" />

      <!-- 账户安全 -->
      <personal-title title="账户安全" mt-26px />
      <section class="secure">
        <div class="secure-i">
          <label>手机号码</label><span>{{ phone }}</span>
        </div>
        <div class="secure-i">
          <label>账户密码</label><span>******</span>
          <button @click="openModal('account')">
            修改
          </button>
        </div>
        <div class="secure-i">
          <label>安全密码</label>
          <span>
            <span v-if="userInfo?.withdraw_pwd && userInfo?.withdraw_pwd !== 0">******</span>
            <span v-else style="opacity:0.6">未设置</span>
          </span>
          <button v-if="userInfo?.withdraw_pwd === 0" @click="openModal('setSecure')">
            设置
          </button>
          <button v-if="userInfo?.withdraw_pwd && userInfo?.withdraw_pwd !== 0" @click="openModal('updateSecure')">
            修改
          </button>
        </div>

        <!-- 弹窗 -->
        <dialog-acc ref="account" />
        <dialog-set-secure ref="setSecure" />
        <dialog-update-secure ref="updateSecure" @forget="openReset" />
        <dialog-reset-secure ref="resetSecure" />
      </section>

      <!-- 返水比例 -->
      <personal-title title="返水比例" />
      <section class="refund">
        <!-- 返水比例 -->
        <div class="refund-i">
          <!-- <h5>返水比例</h5> -->
          <table>
            <tr>
              <th>游戏类型</th>
              <th>真人</th>
              <th>体育</th>
              <th>棋牌</th>
              <th>电子</th>
              <th>捕鱼</th>
              <th>电竞</th>
            </tr>
            <tr>
              <td>返水比例</td>
              <td>{{ zr }}</td>
              <td>{{ ty }}</td>
              <td>{{ qp }}</td>
              <td>{{ dz }}</td>
              <td>{{ by }}</td>
              <td>{{ dj }}</td>
            </tr>
          </table>
        </div>
        <!-- 彩票返点 -->
        <div class="refund-i">
          <!-- <h5>彩票返点</h5> -->
          <table>
            <tr>
              <th>游戏类型</th>
              <th>快3</th>
              <th>PK10</th>
              <th>时时彩</th>
              <th>六合彩</th>
              <th>11选5</th>
              <th>幸运28</th>
            </tr>
            <tr>
              <td>彩票返点</td>
              <td>{{ k3 }}</td>
              <td>{{ pk10 }}</td>
              <td>{{ ssc }}</td>
              <td>{{ lhc }}</td>
              <td>{{ ll5 }}</td>
              <td>{{ luck28 }}</td>
            </tr>
          </table>
        </div>
      </section>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@use '~/pages/personal/index.scss' as *;

.user-info {
  @include pageCard;
  color: #333;

  .base-info {
    text-align: left;
    width: 100%;
    padding-top: 20px;

    .save {
      width: 400px;
      height: 50px;
      background-color: #597EF7;
      margin: 29px 0 0 77px;
      border-radius: 6px;
      font-size: 18px;
      color: #fff;
    }

    .disable {
      background-color: #8E8E8E;
    }

  }

  .secure {
    text-align: left;
    width: 100%;
    padding-top: 30px;
    margin-bottom: 21px;

    .secure-i {
      font-size: 15px;
      height: 42px;
      margin-bottom: 12px;
      display: flex;
      align-items: center;

      label {
        width: 77px;
        text-align: left;
      }

      span {
        width: 200px;
      }

      button {
        width: 100px;
        height: 42px;
        color: #9AA4C2;
        border: 1px solid #9AA4C2;
        border-radius: 6px;
        margin-left: 100px;
        &:hover{
          color: #3875FF;
          border: 1px solid #3875FF;
        }
      }

    }
  }

  .refund {
    width: 100%;
    text-align: left;
    padding-top: 18px;
    font-size: 15px;

    .refund-i {
      margin-bottom: 16px;
      width: 100%;

      &:last-of-type {
        margin-bottom: 0;
        // width: 856.1px;
      }

      h5 {
        margin-bottom: 10px;
      }

      table {
        width: 100%;
        table-layout: fixed;

        th {
          font-family: $jl-font;
          font-weight: bold;

        }

        td {
          &:first-of-type {
            font-family: $jl-font;
            font-weight: bold;

          }
        }

        th,
        td {
          height: 60px;
          text-align: center;
          border: 1px solid #D2D7E3;
        }

        th {
          background-image: linear-gradient(to bottom, #F8FAFB, #F5F8FF);
        }
      }
    }

  }
}
</style>

<route lang="yaml">
meta:
  layout: main
  personal: true
  auth: true
</route>
