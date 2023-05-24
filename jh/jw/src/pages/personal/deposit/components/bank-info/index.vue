<script setup lang='ts' name="bank-info">
import checkedImg from '@images/personal/deposit/checked.png?preset=full'
import { ElMessage } from 'element-plus'
import type { F } from 'ts-toolbelt'
type dataType = Awaited<F.Return<typeof getPayBank>>
const { data: bankInfo, showBranch = true } = defineProps<{ data?: dataType ;showBranch?: boolean }>()
const usernameRef = ref<Element>()
const accountRef = ref<Element>()
const branchNameRef = ref<Element>()

const copy = (dom: Element) => {
  handleCopy(dom, (text) => {
    ElMessage.success({
      message: '内容已复制',
      duration: 3000,
    })
  })
}
</script>

<template>
  <div class="card">
    <div class="card-item">
      <label>收款银行：</label>
      <transition appear>
        <div v-if="bankInfo?.bank_id" :style="getBackgroundImgObj(checkedImg)" class="bank-info">
          <jl-image :src="getBankLogo(bankInfo?.bank_id!)" w-24px h-24px />
          <span>
            <i />
            {{ bankInfo?.bankName }}</span>
        </div>
      </transition>
    </div>
    <div class="card-item">
      <label>收款户名：</label>
      <span ref="usernameRef">{{ bankInfo?.accountName }}</span>
      <button ml-auto jl-plain-btn w-60px h-24px @click="copy(usernameRef!)">
        复制
      </button>
    </div>
    <div class="card-item">
      <label>收款账号：</label>
      <span ref="accountRef">{{ bankInfo?.bankCardNo }}</span>
      <button ml-auto jl-plain-btn w-60px h-24px @click="copy(accountRef!)">
        复制
      </button>
    </div>
    <div v-if="showBranch" class="card-item">
      <label>开户支行：</label>
      <span ref="branchNameRef">{{ bankInfo?.bankBranch }}</span>
      <button ml-auto jl-plain-btn w-60px h-24px @click="copy(branchNameRef!)">
        复制
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  width: 404px;
  padding: 16px 16px 20px 20px;
  background: linear-gradient(136deg, #FFFFFF 0%, #FAFCFE 79%, #F5FAFD 83%, #F4F9FC 100%);
  box-shadow: 0px 10px 10px 1px rgba(208, 217, 225, 0.22);
  border-radius: 6px 6px 6px 6px;
  opacity: 1;
  border: 1px solid #DFEAF6;

  .card-item {
    display: flex;
    align-items: center;

    label {
      width: 80px;
    }
    span{
      flex: 1;
      padding-right: 10px;
      text-align: left;
    }
    &+.card-item {
      padding-top: 22px;
    }

    .bank-info {
      padding: 0 32px 0 8px;
      margin-left: 9px;
      border-radius: 6px;
      height: 35px;
      box-shadow: 0px 2px 8px 1px rgba(86, 122, 254, 0.3);
      border: 2px solid $color-primary-second;
      background-size: 23px 23px;
      background-repeat: no-repeat;
      background-position: right -1px bottom -1px;
      display: flex;
      align-items: center;

      span {
        font-size: 13px;
        position: relative;
        line-height: 30px;
        color: $text-primary;
        display: flex;
        align-items: center;

        i {
          margin-right: 7px;
          width: 12px;
          height: 12px;
          padding: 3px;
          display: block;
          background-color: $color-primary-second;
          border-radius: 50%;
          opacity: 0.8;
          border: 1px solid #9AA4C2;
          box-sizing: content-box;
          background-clip: content-box;
        }
      }

    }

    .label {
      font-size: 13px;
      font-family: $jl-font;
      font-weight: 400;
      color: $color-black-primary;
      line-height: 21px;
      display: inline-block;
      width: 75px;
    }

    span {
      font-size: 13px;
      padding-left: 10px;
      font-family: $jl-font;
      color: $color-black-primary;
    }
  }
}
</style>
