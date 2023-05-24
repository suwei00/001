<script lang="ts" setup>
import { Toast } from 'vant'
// component
import Header from '~/components/Header.vue'
import CustomizeInput from '~/components/customizeInput.vue'
import CustomizeCountdown from '~/components/customizeCountdown/index.vue'
import bgImage from '~/components/bgImage.vue'

// utils
import useRouterBack from '~/hooks/routerBackHooks'
import { Session } from '~/utils/help'

// 背景图
import arrowBgSrc from '~/assets/images/entry/finish.png?preset=full'

const { goBack } = useRouterBack()

const route = useRoute()
const router = useRouter()
const pathName = route.params.pathName

const scheduleList = [
  {
    label: '身份验证',
    value: '1',
  },
  {
    label: '修改密码',
    value: '2',
  },

  {
    label: '完成',
    value: '3',
  },
]
const scheduleRef: any = ref(null)
const schedule = ref('1')

const params = ref({
  username: Session.getItem('forgetpassword')?.username ?? '',
  ty: Session.getItem('forgetpassword')?.ty ?? '1',
  phone: Session.getItem('forgetpassword')?.phone ?? '',
  withdraw_pwd: Session.getItem('forgetpassword')?.withdraw_pwd ?? '',
  password: '',
  confirmPassword: '',
})

const loading1 = ref(false)
const loading2 = ref(false)

const disabled1 = computed(() => {
  if (params.value.ty === '1')
    return !(params.value.username.length && params.value.phone.length)

  else
    return !(params.value.username.length && params.value.withdraw_pwd.length)
})

const disabled2 = computed(() => {
  if (params.value.password.length === 0 || params.value.confirmPassword.length === 0)
    return true
})

const onTab = (item: any) => {
  params.value.ty = item.name
  params.value.phone = ''
  params.value.withdraw_pwd = ''
}

const nextSubmit1 = () => {
  if (!isUserName(params.value.username))
    return Toast('账号错误，请重新输入')

  if (params.value.ty === '1') {
    if (!isPhone(params.value.phone))
      return Toast('手机号错误，请重新输入')
  }
  else if (!isPhoneVirtualCode(params.value.withdraw_pwd)) {
    return Toast('安全密码错误，请重新输入')
  }

  if (loading1.value)
    return
  loading1.value = true
  Session.setItem('forgetpassword', params.value)

  if (params.value.ty === '1') {
    memberCheckPhoneRequest({
      username: params.value.username.toLowerCase(),
      phone: params.value.phone,
    }).then((res: any) => {
      if (res.status) {
        if (res.data) {
          schedule.value = '2'
          scheduleRef.value.style.width = '66.66%'
          router.replace({
            path: '/entry/forget-pass/2',
            query: {
              ...route.query,
            },
          })
        }
        else {
          Toast('手机号与该账号绑定的手机号不一致')
        }
      }
    }).finally(() => {
      loading1.value = false
    })
  }
  else {
    memberCheckWithdrawpwdRequest({
      username: params.value.username.toLowerCase(),
      password: params.value.withdraw_pwd.toLowerCase(),

    }).then((res: any) => {
      if (res.status) {
        if (res.data) {
          schedule.value = '2'
          scheduleRef.value.style.width = '66.66%'
          router.replace({
            path: '/entry/forget-pass/2',
            query: {
              ...route.query,
            },
          })
        }
        else {
          Toast('安全密码与该账号绑定的安全密码不一致')
        }
      }
    }).finally(() => {
      loading1.value = false
    })
  }
}

const nextSubmit2 = () => {
  if (!isPassword(params.value.password))
    return Toast('密码格式错误，请输入8-20位英文字母与数字')

  else if (params.value.password.toLowerCase() !== params.value.confirmPassword.toLowerCase())
    return Toast('前后密码不一致，请重新输入')

  loading2.value = true

  forgetpasswordRequest(params.value).then((res: any) => {
    if (res.status) {
      schedule.value = '3'
      scheduleRef.value.style.width = '100%'
      router.replace({
        path: '/entry/forget-pass/3',
        query: {
          ...route.query,
        },
      })
    }
  }).finally(() => {
    loading2.value = false
  })
}

const nextSubmit3 = () => {
  Session.removeItem('forgetpassword')
  goBack()
}

onMounted(() => {
  let crrPathName: any = pathName ?? '1'
  let crrWidth = '33.33%'
  switch (pathName) {
    case '1':
      crrWidth = '33.33%'
      break
    case '2':
      crrWidth = '66.66%'
      break
    case '3':
      crrWidth = '100%'
      break
    default: // 错误路由
      crrPathName = '1'
      router.replace({
        path: '/entry/forget-pass/1',
        query: {
          ...route.query,
        },
      })
      break
  }
  schedule.value = crrPathName
  scheduleRef.value.style.width = crrWidth
})

// 离开页面时，清除session
onUnmounted(() => {
  Session.removeItem('forgetpassword')
})
</script>

<template>
  <div class="entryWarp">
    <Header title="找回密码" />
    <div class="scheduleViewWarp">
      <div class="scheduleView">
        <div class="bar">
          <div ref="scheduleRef" class="barIn" />
        </div>
        <ol>
          <li v-for="(item, index) in scheduleList" :key="index" :class="{ active: schedule >= item.value }">
            <span>{{ item.value }}</span>
            <p>{{ item.label }}</p>
          </li>
        </ol>
      </div>
    </div>

    <div v-if="schedule === '1'" class="schedule1">
      <div class="transitionHead">
        <van-tabs animated @click-tab="onTab">
          <van-tab title="通过手机号码找回" name="1" />
          <van-tab title="通过安全密码找回" name="2" />
        </van-tabs>
      </div>
      <dl>
        <dt>
          <div class="fromItemMain">
            <p class="label">
              账号
            </p>
            <div class="value">
              <CustomizeInput
                v-model="params.username" :maxlength="14" input-type="account"
                placeholder="请输入您的账号"
                :clear="false"
              />
            </div>
          </div>
        </dt>
        <dt v-if="params.ty === '1'">
          <div class="fromItemMain">
            <p class="label">
              手机号码
            </p>
            <div class="value">
              <CustomizeInput
                v-model="params.phone" :maxlength="11" input-type="number"
                placeholder="请输入您的手机号码"
                :clear="false"
              />
            </div>
          </div>
        </dt>
        <dt v-else>
          <div class="fromItemMain">
            <p class="label">
              安全密码
            </p>
            <div class="value">
              <CustomizeInput
                v-model="params.withdraw_pwd" :maxlength="6" input-type="number"
                placeholder="请输入您的安全密码"
                :clear="false"
              />
            </div>
          </div>
        </dt>
      </dl>
      <div class="submitWarp">
        <van-button
          class="customizeConfirm" :disabled="disabled1" :loading="loading1" loading-type="spinner"
          loading-text="提交中..." @click="nextSubmit1()"
        >
          下一步
        </van-button>
      </div>
    </div>

    <div v-else-if="schedule === '2'" class="schedule2">
      <dl>
        <dt>
          <div class="fromItemMain">
            <p class="label">
              新密码
            </p>
            <div class="value">
              <CustomizeInput
                v-model="params.password" :maxlength="20" :eye="true" :clear="false" input-type="password"
                placeholder="8-20位小写英文字母与数字"
              />
            </div>
          </div>
        </dt>
        <dt>
          <div class="fromItemMain">
            <p class="label">
              确认密码
            </p>
            <div class="value">
              <CustomizeInput
                v-model="params.confirmPassword" :maxlength="20" :eye="true" :clear="false" input-type="password"
                placeholder="请再次输入新密码"
              />
            </div>
          </div>
        </dt>
      </dl>
      <p class="scheduleHint">
        *请避免使用与其他网站相同或容易被他人猜到的密码
      </p>
      <div class="submitWarp">
        <van-button
          class="customizeConfirm" :disabled="disabled2" :loading="loading2" loading-type="spinner"
          loading-text="提交中..." @click="nextSubmit2()"
        >
          下一步
        </van-button>
      </div>
    </div>

    <div v-else class="schedule3">
      <bgImage :image="arrowBgSrc" />
      <p class="title">
        您已成功找回密码
      </p>
      <van-button class="customizeConfirm" @click="nextSubmit3()">
        返回登录
      </van-button>
      <p class="hint">
        <CustomizeCountdown :time="3000" :start="schedule === '3'" count-down-name="forgetpass" @on-finish="nextSubmit3" />
        <span>s</span>
        自动返回登录
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.entryWarp {
  width: 100%;
  height: 100%;
  background-color: #F5F5F9;
  color: #000000;

  .scheduleViewWarp {
    width: 100%;
    height: 103px;
    border-top: 1px solid #E5E5E5;
    background-color: #fff;
    padding: 0 37px;
    display: flex;
    align-items: center;
    font-size: 11px;

    .scheduleView {
      width: 100%;
      height: 43px;
      position: relative;

      .bar {
        width: 100%;
        height: 5px;
        background-color: #EDEDED;
        border-radius: 4px;
        margin-top: 7.5px;

        .barIn {
          height: 100%;
          width: calc(100%/3);
          border-radius: 4px;
          background-color: #597EF7;
        }
      }

      ol {
        width: 100%;
        display: flex;
        position: absolute;
        left: 0;
        top: 0;

        li {
          flex: 1;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;

          span {
            display: block;
            width: 20px;
            height: 20px;
            background-color: #EDEDED;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            color: #696E7B;
            margin-bottom: 8px;
          }

          p {
            width: 100%;
            text-align: center;
            line-height: 15px;
            height: 15px;
            color: #B1B1B1;
          }

          &.active {
            span {
              background-color: #587EF7;
              color: #fff;
            }

            p {
              color: #4F73F6;
            }
          }
        }
      }
    }
  }

  .transitionHead {
    width: 100%;
    border-bottom: 1px solid #EEEEEE;

    .van-tabs {
      height: 100%;
    }

    :deep(.van-tabs__wrap) {
      height: 50px;
    }

    :deep(.van-tab--line) {
      font-size: 14px;
      color: #CCCFD9;
    }

    :deep(.van-tab--active) {
      color: #414655;
    }

    :deep(.van-tabs__line) {
      background: #597EF7;
      height: 2px;
      width: 82px;
    }

    :deep(.van-tabs__content) {
      height: 0;
    }

    :deep(.van-tab__panel) {
      height: 0;
    }
  }

  .schedule1 {
    width: 100%;
    background-color: #fff;
    margin-top: 8px;
  }

  .schedule2 {
    width: 100%;
    background-color: #fff;

  }

  .schedule3 {
    width: 100%;
    padding: 48px 18px 0 18px;

   img{
      width: 88px;
      height: 88px;
      margin: auto;
      margin-bottom: 11px;
    }

    .title {
      text-align: center;
      height: 20px;
      font-size: 14px;
      color: #597EF7;
      line-height: 20px;
      margin-bottom: 17px;
    }

    .hint {
      text-align: center;
      height: 16px;
      line-height: 16px;
      margin-top: 15px;
      color: #A5A9B3;

      span {
        color: #000000;
      }
    }
  }

  dl {
    width: 100%;
    padding-top: 38px;

    dt {
      width: 100%;
      min-height: 76px;
      background-color: #fff;
      padding: 0 18px;

      .error {
        width: 100%;
        min-height: 12px;
        padding-top: 10px;
        font-size: 9px;
        color: #FF0000;
      }

      .fromItemMain {
        width: 100%;
        min-height: 76px;
        padding: 11px 0 15px 0;
        border-bottom: 1px solid #F3F3F3;
        display: flex;
        flex-direction: column;

        .label {
          width: 100%;
          height: 20px;
          font-size: 14px;
          line-height: 20px;
        }

        .value {
          flex: 1;
          width: 100%;
          height: 100%;
          padding-top: 6px;
        }
      }
    }
  }

  .submitWarp {
    width: 100%;
    padding: 20px 18px;
  }

}
</style>
