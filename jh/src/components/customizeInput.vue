<script lang="ts" setup>
import clearItemBg from '~/assets/images/public/inputClear.png?preset=full'
// import clearItemThumb from '~/assets/images/public/inputClear.png??preset=thumbnail&src'
import eyeShowItemBg from '~/assets/images/public/eyeShow.png?preset=full'
// import eyeShowItemThumb from '~/assets/images/public/eyeShow.png??preset=thumbnail&src'
import eyeHideItemBg from '~/assets/images/public/eyeHide.png?preset=full'
// import eyeHideItemThumb from '~/assets/images/public/eyeHide.png??preset=thumbnail&src'

interface Props {
  style?: string
  modelValue?: any
  maxlength?: number
  placeholder?: string
  placeholderColor?: string
  color?: string
  inputType?: string
  eye?: boolean
  clear?: boolean
  onInput?: any // (oldValue: any, newValue: any, callback) => void; callback必须执行不然不会更新值 暂无更优方法
  onFocus?: any // (value: any, callback) => void;
  onBlur?: any // (value: any, callback) => void;
  autocomplete?: string
}
const props = withDefaults(defineProps<Props>(), {
  style: '',
  modelValue: undefined,
  maxlength: 100,
  placeholder: '',
  placeholderColor: '#6D839A', // placeholder颜色
  color: '#434857', // color颜色
  inputType: '',
  eye: false, // 是否允许显示眼睛 true的情况下请给inputType赋值为password
  clear: true, // 是否允许显示清除按钮
  onInput: undefined,
  onFocus: undefined,
  onBlur: undefined,
})
const emit = defineEmits(['update:modelValue', 'onClear', 'onEye'])

const { inputType, onInput, onFocus, onBlur, placeholderColor, color } = props

const customizeId = `${(new Date()).valueOf()}${Math.floor(Math.random() * 1000000)}`
const inputRef: any = ref(null)
const eleFocus = ref(false)
const currentType = ref(inputType === 'password' ? 'password' : 'text')
const inputFlag = ref(false)

const focusFn = (ele: any) => {
  eleFocus.value = true

  if (onFocus) {
    onFocus(ele.target.value, (newVal: any) => {
      if (newVal !== undefined)
        emit('update:modelValue', newVal)
    })
  }
}

const blurFn = (ele: any) => {
  if (props.inputType === 'amount') {
    const oldVal = ele.target.value
    const oldValLeft = oldVal.split('.')[0]
    const oldValRight = oldVal.split('.')[1]
    if ([undefined, null, '', '0', '00'].includes(oldValRight)) {
      ele.target.value = oldValLeft
      emit('update:modelValue', oldValLeft)
    }
  }

  if (onBlur) {
    onBlur(ele.target.value, (newVal: any) => {
      if (newVal !== undefined)
        emit('update:modelValue', newVal)
    })
  }
}

const onClear = () => {
  emit('update:modelValue', '')
  inputRef.value.focus()
  emit('onClear')
}

const onEye = () => {
  currentType.value = currentType.value === 'password' ? 'text' : 'password'
  emit('onEye', currentType.value)
  inputRef.value.focus()
}

const inputIng = (ele: any) => {
  if (inputFlag.value)
    return

  const values = ele.target.value
  let valuesFilter = ''
  const reg = /[\u4E00-\u9FA5]/g

  switch (props.inputType) {
    case 'account':
      valuesFilter = values.replace(/[^0-9a-zA-Z]/g, '')
      // valuesFilter = valuesFilter.toLowerCase()
      break
    case 'password':
      valuesFilter = values.replace(/[^0-9a-zA-Z]/g, '')
      // valuesFilter = valuesFilter.toLowerCase()
      break
    case 'number':
      valuesFilter = values.replace(/[^0-9]/g, '')
      break
    case 'address':
      valuesFilter = values
      break
    case 'realname':
      valuesFilter = values
      break
    case 'wechat':
      // 微信正则
      valuesFilter = values.replace(/[^-_a-zA-Z0-9]/g, '')
      break
    case 'currency':
      valuesFilter = values.replace(/[^a-zA-Z0-9]/g, '')
      break
    case 'amount':
      // 允许输入两位小数的正则
      valuesFilter = values.replace(/[^0-9.]/g, '').replace(/\.{2,}/g, '.').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
      break
    case 'amount1':
      // 允许输入两位小数的正则
      valuesFilter = values.replace(/[^0-9.]/g, '').replace(/\.{2,}/g, '.').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
      if (Number(valuesFilter) < 1)
        valuesFilter = ''
      break
    case 'amount2':
      // 只允许输入正整数
      valuesFilter = values.replace(/^(0+)|[^\d]+/g, '')
      break
    default:
      valuesFilter = values
      break
  }

  if (onInput) {
    // 传入旧的 和 新的 值，让用户决定怎么处理，若 newVal === undefined 则不处理。
    onInput(ele.target.value, valuesFilter, (newVal: any) => {
      if (newVal !== undefined) {
        ele.target.value = newVal
        emit('update:modelValue', newVal)
      }
      else {
        ele.target.value = valuesFilter
        emit('update:modelValue', valuesFilter)
      }
    })
  }
  else {
    ele.target.value = valuesFilter
    emit('update:modelValue', valuesFilter)
  }
}
// ttttttttttttttttttttttttttttttttttaaaaaaaa
const compositionstartHandler = () => {
  inputFlag.value = true
}

const compositionendHandler = (e: any) => {
  inputFlag.value = false
  inputIng(e)
}

const listener = (ele: any) => { // 决定是否失去焦点的关键函数
  const getParentId = () => {
    try {
      if (ele.target.getAttribute('customizeId') === customizeId)
        return true

      const num = 5 // 循环到第5层父级
      let parentDom = ele.target.parentElement
      let parentId = parentDom.getAttribute('customizeId')
      let flag = false
      for (let i = 0; i < num; i++) {
        if (parentId === customizeId) {
          flag = true
        }
        else {
          parentDom = parentDom.parentElement
          parentId = parentDom.getAttribute('customizeId')
          if (parentId === customizeId)
            flag = true
        }
      }
      return flag
    }
    catch (err) {
      return false
    }
  }

  if (!getParentId())
    eleFocus.value = false
  else
    inputRef.value.focus()
}

onMounted(() => {
  document.addEventListener('click', listener)
})
onUnmounted(() => {
  document.removeEventListener('click', listener)
})
</script>

<template>
  <div class="customize-input-warps-vadfvdsfcadhfacsdfcaf" :style="style">
    <div class="customize-input-vadfvdsfcadhfacsdfcaf" :customizeId="customizeId">
      <div class="before-vadfvdsfcadhfacsdfcaf">
        <slot name="before" />
      </div>
      <input
        ref="inputRef" :value="modelValue" :type="currentType" :placeholder="placeholder" :maxlength="maxlength" :autocomplete="autocomplete" @compositionstart="compositionstartHandler"
        @compositionend="compositionendHandler" @input="inputIng" @focus="focusFn" @blur="blurFn"
      >
      <div
        v-show="clear && eleFocus && modelValue !== null && modelValue !== undefined && modelValue !== ''"
        class="customize-input-clear-vadfvdsfcadhfacsdfcaf" @click.stop="onClear()"
      >
        <slot name="clear">
          
          <img loading="lazy" :src="getSupportImage(clearItemBg)" class="clear-vadfvdsfcadhfacsdfcaf">
        </slot>
      </div>
      <div v-show="eye && eleFocus" class="customize-input-eye-vadfvdsfcadhfacsdfcaf" @click.stop="onEye()">
        <slot v-if="currentType !== 'password'" name="eyeShow">
          
          <img loading="lazy" :src="getSupportImage(eyeShowItemBg)" class="eye-warp-vadfvdsfcadhfacsdfcaf">
        </slot>
        <slot v-else name="eyeHide">
          
          <img loading="lazy" :src="getSupportImage(eyeHideItemBg)" class="eye-warp-vadfvdsfcadhfacsdfcaf">
        </slot>
      </div>
      <div class="after-vadfvdsfcadhfacsdfcaf">
        <slot name="after" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.customize-input-warps-vadfvdsfcadhfacsdfcaf {
  width: 100%;
  height: 20px;
  overflow: hidden;

  .customize-input-vadfvdsfcadhfacsdfcaf {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;

    input {
      flex: 1;
      width: 100%;
      height: 100%;
      background: transparent;
      color: v-bind(color);
      font-size: 13px;

      &::placeholder {
        color: v-bind(placeholderColor);
      }
    }

    .customize-input-clear-vadfvdsfcadhfacsdfcaf {
      width: 20px;
      height: 20px;
      margin-left: 12px;

      .clear-vadfvdsfcadhfacsdfcaf {
        display: block;
        width: 100%;
        height: 100%;
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
      }
    }

    .customize-input-eye-vadfvdsfcadhfacsdfcaf {
      width: 20px;
      // height: 20px;
      margin-left: 12px;

      .eye-warp-vadfvdsfcadhfacsdfcaf {
        display: block;
        width: 100%;
        height: 100%;
        // background-size: 100%;
        // background-repeat: no-repeat;
        // background-position: center;
      }
    }

    .before-vadfvdsfcadhfacsdfcaf {
      height: 100%;
    }

    .after-vadfvdsfcadhfacsdfcaf {
      height: 100%;
    }
  }
}
</style>
