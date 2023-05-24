<script lang="ts" setup>
// import { Toast } from 'vant'
import EntryInput from './entryInput.vue'
import CustomizeInput from '~/components/customizeInput.vue'
import routerBackHooks from '~/hooks/routerBackHooks'
import { Local } from '~/utils/help'
import { loginRequest } from '~/api/index'
import { useUserInfoStore } from '~/store/userInfo'

import accountItemBg from '~/assets/images/entry/login/account.png?preset=full'
// import accountItemThumb from '~/assets/images/entry/login/account.png??preset=thumbnail&src'
import passItemBg from '~/assets/images/entry/login/pass.png?preset=full'
// import passItemThumb from '~/assets/images/entry/login/pass.png??preset=thumbnail&src'
import localCheckedItemBg from '~/assets/images/entry/login/localChecked.png?preset=full'
// import localCheckedItemThumb from '~/assets/images/entry/login/localChecked.png??preset=thumbnail&src'
import entryCsItemBg from '~/assets/images/entry/entryCs.png?preset=full'
// import entryCsItemThumb from '~/assets/images/entry/entryCs.png??preset=thumbnail&src'
import entryHomeItemBg from '~/assets/images/entry/entryHome.png?preset=full'
// import entryHomeItemThumb from '~/assets/images/entry/entryHome.png??preset=thumbnail&src'

const { setToken, getMemberInfo } = useUserInfoStore()
const { goTo } = routerBackHooks()

const router = useRouter()

const params = ref({
  username: '',
  password: '',
})

const verifyTip = ref({
  username: '',
  password: '',
})

const learnPass = ref(false) // 记住密码 默认不记住

const loading = ref(false)

// const disabled = computed(() => {
//   return !(Object.values(params.value).every(item => item) && Object.values(verifyTip.value).every(item => !item))
// })

const verifyParams = (newVal: any, name: string) => {
  switch (name) {
    case 'username':
      if (['', null, undefined].includes(newVal))
        verifyTip.value[name] = '账号不能为空'
      else if (!isUserName(newVal) && newVal.length)
        verifyTip.value[name] = '账号为字母开头，5-14位英文字母与数字组成'
      else
        verifyTip.value[name] = ''

      break
    case 'password':
      if (['', null, undefined].includes(newVal))
        verifyTip.value[name] = '密码不能为空'
      else if (!isPassword(newVal) && newVal.length)
        verifyTip.value[name] = '密码为8-20位英文字母与数字组成'
      else
        verifyTip.value[name] = ''

      break
    default:
      console.log('没有这个参数,我的哥~')
      break
  }
}
const verifyParamsBlur = (newVal: any, name: string) => {
  switch (name) {
    case 'username':
      if (['', null, undefined].includes(newVal))
        verifyTip.value[name] = ''
      break
    case 'password':
      if (['', null, undefined].includes(newVal))
        verifyTip.value[name] = ''

      break
    default:
      console.log('没有这个参数,我的哥~')
      break
  }
}

const verifyBySubmit = (): boolean => {
  verifyParams(params.value.username, 'username')
  if (verifyTip.value.username)
    return true

  verifyParams(params.value.password, 'password')
  if (verifyTip.value.password)
    return true

  return false
}

const submit = () => {
  const isVerify = verifyBySubmit()
  if (isVerify)
    return

  loading.value = true

  loginRequest({
    username: params.value.username.toLowerCase(),
    password: params.value.password.toLowerCase(),
  }).then((res: any) => {
    if (res.status && res.data) {
      setToken(res.data)
      getMemberInfo()

      if (learnPass.value)
        Local.setItem('learnPass', { ...params.value, visible: true })
      else
        Local.setItem('learnPass', { username: params.value.username, visible: false })

      // Toast('登录成功')
      router.replace('/home')
    }
  }).finally(() => {
    loading.value = false
  })
}

const goToForgetpass = () => {
  goTo('/entry/forget-pass/1')
}

const onLearnPass = () => {
  learnPass.value = !learnPass.value
  const learnPassItem: any = Local.getItem('learnPass')
  if (learnPass.value)
    Local.setItem('learnPass', { ...learnPassItem ?? {}, visible: true })

  else
    Local.setItem('learnPass', { username: learnPassItem.username, visible: false })
  // Local.removeItem('learnPass')
}

const goToHome = () => {
  router.replace({
    path: '/home',
  })
}

onMounted(() => {
  const learnPassItem = Local.getItem('learnPass')
  if (learnPassItem) {
    params.value.username = learnPassItem.username ?? ''
    params.value.password = learnPassItem.password ?? ''
    learnPass.value = learnPassItem.visible ?? false
  }
})
</script>

<template>
  <div class="loginWarp">
    <div class="head">
      登录
    </div>
    <div class="inputContentWarp">
      <EntryInput :err="verifyTip.username">
        <template #entryInputIcon>
          <img class="entryInputIcon" loading="lazy" :src="getSupportImage(accountItemBg)">
        </template>
        <template #entryInput>
          <CustomizeInput
            v-model="params.username"
            :maxlength="14"
            placeholder-color="#EFEFEF"
            color="#EFEFEF"
            input-type="account"
            placeholder="账号"
            :on-focus="(oldVal: any) => { verifyParams(oldVal, 'username') }"
            :on-input="(oldVal: any, newVal: any, callback: any) => { verifyParams(newVal, 'username'); callback(); }"
            :on-blur="(newVal: any) => { verifyParamsBlur(newVal, 'username') }"
          />
        </template>
      </EntryInput>
      <EntryInput :err="verifyTip.password">
        <template #entryInputIcon>
          <img class="entryInputIcon" loading="lazy" :src="getSupportImage(passItemBg)">
        </template>
        <template #entryInput>
          <CustomizeInput
            v-model="params.password"
            :maxlength="20"
            placeholder-color="#EFEFEF"
            color="#EFEFEF"
            input-type="password"
            :eye="true"
            :on-focus="(oldVal: any) => { verifyParams(oldVal, 'password') }"
            :on-input="(oldVal: any, newVal: any, callback: any) => { verifyParams(newVal, 'password'); callback(); }"
            :on-blur="(newVal: any) => { verifyParamsBlur(newVal, 'password') }" placeholder="密码"
            :clear="false"
          />
        </template>
      </EntryInput>
    </div>
    <div class="loginFastWarp">
      <div class="learnWarp" @click="onLearnPass()">
        <div v-show="!learnPass" class="learn" />
        <img v-show="learnPass" class="learnimg" loading="lazy" :src="getSupportImage(localCheckedItemBg)">
        记住密码
      </div>
      <span @click="goToForgetpass()">忘记密码？</span>
    </div>
    <div class="submitWarp">
      <van-button
        class="customizeSubmit" :loading="loading" loading-type="spinner"
        loading-text="登录中..." @click="submit()"
      >
        登录
      </van-button>
    </div>
    <ol class="entryFast">
      <li>
        <img loading="lazy" :src="getSupportImage(entryCsItemBg)">
        <Sc sc-label="联系客服" color="#fff" />
      </li>
      <li>
        <img loading="lazy" :src="getSupportImage(entryHomeItemBg)">
        <span @click="goToHome()">先去逛逛</span>
      </li>
    </ol>
  </div>
</template>

<style lang="scss" scoped>
.loginWarp {
  width: 100%;

  .head {
    width: 100%;
    min-height: 24px;
    line-height: 24px;
    padding-top: 24px;
    font-size: 16px;
    text-align: center;
    font-weight: 800;
  }

  .inputContentWarp {
    width: 100%;
    padding-top: 61px;

    .entryInputIcon {
      display: block;
      width: 100%;
      height: 100%;
      background-size: 100%;
      background-position: center;
      background-repeat: no-repeat;
    }
  }

  .loginFastWarp {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .learnWarp {
      display: flex;
      align-items: center;

      .learn {
        width: 13px;
        height: 13px;
        margin-right: 5px;
        border: 1px solid #FFFFFF;
        border-radius: 50%;
        /* overflow: hidden; */

      }

      .learnimg {
        width: 13px;
        height: 13px;
        margin-right: 5px;
        display: block;
        }
    }
  }

  .submitWarp {
    width: 100%;
    padding-top: 35px;
  }
}

.entryFast {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 30px;

  li {
    display: flex;
    align-items: center;

    img {
      display: block;
      width: 12px;
      height: 12px;
      background-size: 100%;
      background-repeat: no-repeat;
      background-position: center;
    }

    span {
      padding-left: 5px;
    }
  }
}
</style>
