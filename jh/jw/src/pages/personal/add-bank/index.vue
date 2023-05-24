<script setup lang='ts' name="add-bank">
// Element UI 中国省市区级联数据
// https://github.com/Plortinus/element-china-area-data
import { CodeToText, regionData } from 'element-china-area-data'
const router = useRouter()
const appStore = useAppStore()
const { myBankList } = $(storeToRefs(appStore))
// 级联选择器的值
const bankAddr = $ref([])
const bank_id = $ref('')

// 获取省市区a
const bank_addr = $computed(() => {
  if (!bankAddr?.length)
    return ''
  return bankAddr.map(item => CodeToText[item]).join('')
})
const { data: memberInfo } = $(useRequest(getMemberInfo))
// 用户信息中的真实姓名
const real_name = $computed(() => memberInfo?.real_name)
const { errorMessage: realnameErrMsg, value: realname, setValue: setRealname, setErrors: setRealnameErrMsg } = $(useField<string>('realname', (value) => {
  if (!value || !value.trim())
    return true
  // 如果已经有了真实姓名
  if (real_name)
    return true
  if (!(chineseRegx.test(value) && value.length >= 2))
    return '请输入2～30位姓名'
  return true
}))
const { errorMessage: bankcardNoErrMsg, value: bankcard_no } = $(useField<string>('bankcard_no', (value) => {
  if (!value || !value.trim())
    return true
  if (value.length < 16)
    return '银行卡号长度16～19位'
  return true
}))
const { errorMessage: passwordErrMsg, value: password } = $(useField<string>('password', (value) => {
  if (!value || !value.trim())
    return true
  if (value.length !== 6)
    return '请正确输入安全密码'
  return true
}))
const { data: bankList } = $(useRequest(() => getBankList('010')))

// 读取pin中用户信息
watchEffect(() => {
  if (real_name) {
    setRealname(real_name)
    // 清空验证信息
    setRealnameErrMsg('')
  }
})
// 禁用提交按钮
const disabled = computed(() => !realname || !bankcard_no || !password || !bank_id || !bank_addr || !!realnameErrMsg || !!bankcardNoErrMsg || !!passwordErrMsg)
// 添加银行卡
const { run: runInsertBank, loading } = useRequest(() => insertBank({ bank_id: +bank_id, bankcard_no, password, bank_addr, realname }), {
  manual: true,
  loadingKeep: 1000,
  onSuccess(res) {
    // 更新pinia中的我的银行卡列表
    appStore.runGetMyBankList()
    // 添加银行卡成功后跳转到我的钱包页面
    router.push('/personal/wallet')
  },

})

// 控制小眼睛
const { showEye, openEye, elPasswordRef, clickEye } = useWithdrawEye()
// 解决浏览器自动填充提现金额问题
const amountReadonly = $ref(true)
</script>

<template>
  <div class="add-bank">
    <personal-title title="添加银行卡" back="/personal/wallet" />
    <div class="validate-wrapper" pt-20px>
      <div class="field-item">
        <div personal-subtitle-horizontal w-110px>
          持卡人姓名:
        </div>
        <el-input
          v-model="realname" maxlength="30" :disabled="!!real_name" style="width:420px"
          placeholder="请输入持卡人姓名"
        />
      </div>
      <div validate-error pl-110px pb-8px :class="{ 'op-0': !!real_name }">
        {{ realnameErrMsg }}
      </div>
    </div>
    <div class="validate-wrapper">
      <div class="field-item">
        <div personal-subtitle-horizontal w-110px>
          银行卡号:
        </div>
        <el-input
          v-model="bankcard_no" maxlength="19" style="width:420px" placeholder="请输入银行卡号"
          @input="bankcard_no = bankcard_no.replace(/[^0-9]/g, '')"
        />
      </div>
      <div validate-error pl-110px pb-8px>
        {{ bankcardNoErrMsg }}
      </div>
    </div>
    <div class="field-item" pb-30px>
      <div personal-subtitle-horizontal w-110px>
        开户银行:
      </div>
      <el-select v-model="bank_id" class="bank-select" clearable style="width:420px" placeholder="请选择开户银行">
        <el-option v-for="item in bankList" :key="item.id" :label="item.name" :value="item.id">
          <div class="bank-item">
            <jl-image :src="getBankLogo(item.id)" w-20px h-20px />
            <span>{{ item.name }}</span>
          </div>
        </el-option>
      </el-select>
    </div>
    <div class="field-item">
      <div personal-subtitle-horizontal w-110px>
        开户地点:
      </div>
      <el-cascader v-model="bankAddr" clearable placeholder="请选择开户银行地址" style="width:420px" :options="regionData" />
    </div>
    <div class="validate-wrapper" pt30px>
      <div class="field-item">
        <div personal-subtitle-horizontal w-110px>
          安全密码:
        </div>
        <el-input
          ref="elPasswordRef" v-model="password" maxlength="6" style="width:420px" placeholder="请输入您的安全密码"
          :type="openEye ? 'text' : 'password'" :readonly="amountReadonly"
          @input="password = password.replace(/[^0-9]/g, '')" @focus="showEye = true"
          @blur="showEye = false"
          @click="amountReadonly = false"
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
      <jl-button
        h-50px lh-50px :disabled="disabled" :loading="loading" w-420px class="jl-submit-btn"
        @click="runInsertBank"
      >
        添加银行卡（ {{ myBankList?.length ?? 0 }}/5 ）
      </jl-button>
    </div>
    <div class="tip-message !pl-100px pt-18px">
      <span>如遇到任何问题，请联系<a online-service-link @click="appStore.openService">在线客服</a>。</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '~/pages/personal/index.scss' as *;

.add-bank {
  @include pageCard;

  .field-item {
    display: flex;
  }

}
</style>

<style lang="scss" scoped>
.bank-item {
  display: flex;
  align-items: center;

  span {
    height: 34px;
    line-height: 34px;
    margin-left: 10px;
  }
}
</style>

<route lang="yaml">
meta:
  layout: main
  personal: true
  auth: true
</route>
