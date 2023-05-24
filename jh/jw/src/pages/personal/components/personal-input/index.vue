<script setup lang='ts' name="personal-input">
// import { ElMessage } from 'element-plus'
// import checkBirth from './check-birth'
import { CodeToText, regionData } from 'element-china-area-data'

const {
  label,
  type,
  placeholder,
  modelValue,
  disabled,
  maxlength,
  isError,
  errorMsg,
  must,
} = defineProps<{
  modelValue: any
  label: string
  type: string
  placeholder: string
  disabled: boolean
  maxlength?: string
  isError?: boolean
  errorMsg?: string
  must?: boolean
}>()
const emit = defineEmits(['update:modelValue'])

// 数据
const onInput = (e: any) => {
  emit('update:modelValue', e.target.value)
}

// 日期选择
const date = ref('')
const datepicker = ref()
function openDatepicker() {
  datepicker.value && datepicker.value.focus()
}
watch(date, (newValue) => {
  // if (!checkBirth(new Date(newValue).getTime())) {
  //   ElMessage.error('您的年龄未满18，无法游戏')
  //   return
  // }
  emit('update:modelValue', format(new Date(newValue), 'yyyy-MM-dd'))
})

let isAddress = $ref(false)
let areaArr = $ref([])
let addressDetail = $ref('')
const address = $computed(() => {
  if (!areaArr?.length)
    return ''
  return areaArr.map(item => CodeToText[item]).join('') + addressDetail
})
const closePopup = () => {
  isAddress = false
  areaArr = []
  addressDetail = ''
}
const submitAddress = () => {
  emit('update:modelValue', address)
  isAddress = false
}
</script>

<template>
  <!-- 日期选择 -->
  <div v-if="type === 'date'" class="input-item date-picker">
    <label>{{ label }}</label>
    <input
      class="date-input" type="text" :placeholder="placeholder" :value="modelValue" disabled
      :style="{ background: disabled ? '#FAFAFA' : '#fff' }"
    >
    <el-date-picker
      ref="datepicker" v-model="date" :disabled="disabled" :teleported="false" type="date" size="small"
      style="margin-left:80px;height: 42px;"
    />
    <img class="dateIcon" src="@images/personal/personal-dateIcon.png">
    <div class="mask" @click="openDatepicker" />
  </div>
  <!-- 地址选择 -->
  <div v-else-if="type === 'address'" class="input-item date-picker" @click="isAddress = true">
    <label>{{ label }}</label>
    <input
      class="date-input" type="text" :placeholder="placeholder" :value="modelValue" disabled
      :style="{ background: disabled ? '#FAFAFA' : '#fff' }"
    >
  </div>
  <div v-else class="input-item">
    <label :class="{ must }">{{ label }}</label>
    <input
      :title="label" :type="type" :placeholder="placeholder" :value="modelValue" :disabled="disabled"
      :maxlength="maxlength" @input="onInput"
    >
    <span v-if="modelValue && isError && !disabled" class="error">{{ errorMsg }}</span>
  </div>
  <template v-if="type === 'address'">
    <div v-show="isAddress && !disabled" class="address-popup">
      <div class="body">
        <div flex justify-between mb-34px>
          <h6>绑定收货地址</h6>
          <div class="close" p-5px cursor-pointer @click="closePopup">
            <img src="@icons/personal/finance/close-icon.svg" alt="">
          </div>
        </div>
        <div flex flex-col items-start mb-26px>
          <label mb-6px>地址信息</label>
          <el-cascader v-model="areaArr" clearable placeholder="请选择省/市/区" style="width:450px;" :options="regionData" />
        </div>
        <div flex flex-col mb-50px>
          <label mb-px>详情地址</label>
          <textarea v-model="addressDetail" maxlength="30" placeholder="请填写详细地址，如道路、小区、单元、门牌号等信息，以免收不到大礼哦！" />
        </div>
        <button :disabled="areaArr.length === 0 || !addressDetail" @click="submitAddress">
          提交
        </button>
      </div>
    </div>
  </template>
</template>

<style lang="scss" scoped>
.input-item {
  width: 477px;
  color: #333;
  font-size: 15px;
  margin-bottom: 12px;
  position: relative;
  display: flex;
  align-items: center;
  height: 42px;

  &:hover{
    input{
      border-color: #96AEFF;
    }
  }

  label {
    width: 77px;
    text-align: left;

  }

  input {
    width: 400px;
    height: 42px;
    border: 1px solid #C5C5C5;
    border-radius: 6px;
    padding: 11px 14px;

    &::-webkit-input-placeholder {
      color: #94A6B7;
    }

    &:disabled {
      background-color: #FAFAFA;
    }

  }

  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }

  &:last-of-type {
    margin-bottom: 0;
  }

}

.must {
  position: relative;

  &::before {
    content: '*';
    color: #FA0513;
    position: absolute;
    top: -5px;
    left: -8px;
    font-size: 15px;
  }
}

.date-picker {
  cursor: pointer;

  .dateIcon {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 12px;
    z-index: 1;
    background-color: #fff;
  }

  input {
    cursor: pointer;
  }

  .date-input {
    position: absolute;
    background-color: #fff;
    right: 0;
    z-index: 1;
  }

  .mask {
    position: absolute;
    width: 400px;
    height: 100%;
    right: 0;
    z-index: 2;
  }
}

.address-popup {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  background-color: rgba(0, 0, 0, 0.3);

  .body {
    width: 550px;
    background-color: #fff;
    color: #333;
    font-size: 15px;
    padding: 50px 50px 58px;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    h6 {
      font-weight: 600;
      font-size: 18px;
    }

    textarea {
      min-height: 120px;
      max-height: 120px;
      width: 450px;
      border: 1px solid #C5C5C5;
      border-radius: 6px;
      padding: 10px 14px;
      outline: none;
    }

    button {
      width: 450px;
      height: 50px;
      background-color: #597EF7;
      margin: 0 auto;
      border-radius: 6px;
      font-size: 18px;
      color: #fff;
      &:disabled{
        background-color: #8E8E8E;
      }
    }
  }
}

.error {
  position: absolute;
  right: -10px;
  color: red;
  font-size: 11px;
  transform: translateX(105%);
  right: 0;
}
</style>

<style lang="scss">
.today {
  .el-date-table-cell__text {
    color: #3678FE !important;
  }
}

.current {
  .el-date-table-cell__text {
    color: #fff !important;
    background-color: #3678FE !important;
  }
}

.el-cascader .el-input.is-focus .el-input__wrapper {
  box-shadow: 0 0 0 1px #3678FE inset !important;
}

.dp__main {
  background-color: red;
  position: absolute;
  right: 0;
  z-index: -1;
}

// div[data-popper-placement] {
//   z-index: 10 !important;
// }
</style>

