<script setup lang='ts' name="add-digital">
const router = useRouter()
const appStore = useAppStore()
// 协议模式列表
const walletAgreementsList = [{
  value: 'TRC20',
  label: 'TRC20',
},
// {
//   value: 'ERC20',
//   label: 'ERC20',
// }, {
//   value: 'OMNI',
//   label: 'OMNI',
// }
]
// 币种列表
const currencyList = [{
  value: 'USDT',
  label: 'USDT',
}, {
  value: 'OKpay',
  label: 'OKpay',
}, {
  value: 'GOpay',
  label: 'GOpay',
}, {
  value: 'TOpay',
  label: 'TOpay',
}]
// 别名
const { errorMessage: walletAliasErrMsg, value: wallet_alias } = $(useField<string>('wallet_alias', (value) => {
  if (!value || !value.trim())
    return true
  // if (value.length < 1)
  //   return '请输入地址别名方便区分钱包地址'
  return true
}))
// 数字货币账户
const { errorMessage: walletAddressErrMsg, value: wallet_address } = $(useField<string>('wallet_address', (value) => {
  if (!value || !value.trim())
    return true
  if (!digitalAddressRegx.test(value))
    return '请正确输入数字货币地址'
  return true
}))
// 安全密码
const { errorMessage: passwordErrMsg, value: password } = $(useField<string>('realname', (value) => {
  if (!value || !value.trim())
    return true
  if (value.length !== 6)
    return '请正确输入安全密码'
  return true
}))
// 协议模式index
const walletAgreementsIndex = $ref(0)
// 协议模式
const wallet_agreements = $computed(() => walletAgreementsList[walletAgreementsIndex].value)
// 虚拟币种类index
const currencyIndex = $ref(0)
const currency = $computed(() => currencyList[currencyIndex].value)
// 禁用提交按钮
const disabled = $computed(() => !wallet_alias || !wallet_address || !password || !wallet_agreements || !currency || !!walletAliasErrMsg || !!walletAddressErrMsg || !!passwordErrMsg)
const { run, loading } = useRequest(() => insertDigitalAddress({ wallet_alias, currency, password, wallet_address, wallet_agreements }), {
  manual: true,
  debounceInterval: 500,
  loadingKeep: 1000,
  onSuccess: (res) => {
    // 更新pinia中我的数字货币地址列表
    appStore.runGetMyDigitalList()
    // 添加银行卡成功后跳转到我的钱包页面
    router.push('/personal/wallet?type=digital')
  },
})

// 控制小眼睛
const { showEye, openEye, elPasswordRef, clickEye } = useWithdrawEye()
// 解决浏览器自动填充提现金额问题
const amountReadonly = $ref(true)
</script>

<template>
  <div class="add-digital">
    <personal-title title="添加数字货币" back="/personal/wallet" />
    <div class="validate-wrapper" pt-30px>
      <div class="field-item">
        <div personal-subtitle-horizontal w-110px>
          别名
        </div>
        <el-input v-model="wallet_alias" maxlength="10" style="width:426px" placeholder="请输入地址别名方便区分钱包地址" />
      </div>
      <div validate-error pl-110px>
        {{ walletAliasErrMsg }}
      </div>
    </div>
    <div class="validate-wrapper">
      <div class="field-item">
        <div personal-subtitle-horizontal w-110px>
          数字货币账户
        </div>
        <el-input v-model="wallet_address" maxlength="44" style="width:426px" placeholder="请输入数字货币账户地址" />
      </div>
      <div validate-error pl-110px>
        {{ walletAddressErrMsg }}
      </div>
    </div>
    <div class="field-item" pb-22px>
      <div personal-subtitle-horizontal w-110px>
        虚拟币种类
      </div>
      <personal-tabs v-model="currencyIndex" :list="currencyList">
        <template #tab="{ item, active }">
          <div
            :class="{ 'font-jl-font-bold color-color-primary-second': active }" flex items-center
            justify-center w-126px h-42px
          >
            <span>{{ item.label }}</span>
          </div>
        </template>
      </personal-tabs>
    </div>
    <transition mode="out-in">
      <div v-if="currency === 'USDT'" class="field-item" pb-22px>
        <div personal-subtitle-horizontal w-110px>
          协议模式
        </div>
        <personal-tabs v-model="walletAgreementsIndex" :list="walletAgreementsList">
          <template #tab="{ item, active }">
            <div
              :class="{ 'font-jl-font-bold color-color-primary-second': active }" flex items-center
              justify-center w-126px h-42px
            >
              <span>{{ item.label }}</span>
            </div>
          </template>
        </personal-tabs>
      </div>
    </transition>
    <div class="validate-wrapper">
      <div class="field-item">
        <div personal-subtitle-horizontal w-110px>
          安全密码
        </div>
        <el-input
          ref="elPasswordRef"
          v-model="password"
          :type="openEye ? 'text' : 'password'" maxlength="6" style="width:426px" placeholder="请输入安全密码"
          :readonly="amountReadonly" @input="password = password.replace(/[^0-9]/g, '')"
          @focus="showEye = true" @click="amountReadonly = false"
          @blur="showEye = false"
        >
          <template #suffix>
            <div
              class="icon"
              :style="{ opacity: showEye ? 1 : 0, cursor: showEye ? 'pointer' : '' }"
              py-10px
              px-5px @click="clickEye"
            >
              <img v-show="openEye" src="@icons/personal/finance/eye-open.svg" alt="eye1">
              <img v-show="!openEye" src="@icons/personal/finance/eye-close.svg" alt="eye2">
            </div>
          </template>
        </el-input>
      </div>
      <div validate-error pl-110px pb-8px>
        {{ passwordErrMsg }}
      </div>
    </div>
    <div class="field-item justify-start pl-110px">
      <jl-button h-50px lh-50px w-426px :disabled="disabled" :loading="loading" @click="run">
        添加数字货币地址
      </jl-button>
    </div>
    <div class="tip-message !pl-100px pt-18px">
      <span>如遇到任何问题，请联系<a href="" online-service-link @click="appStore.openService">在线客服</a>。</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '~/pages/personal/index.scss' as *;

.add-digital {
  @include pageCard;

  .field-item {
    display: flex;
    padding-top: 8px;
  }
}
</style>

<route lang="yaml">
meta:
  layout: main
  personal: true
  auth: true
</route>
