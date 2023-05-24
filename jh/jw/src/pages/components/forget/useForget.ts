import { ElMessage } from 'element-plus'

export default function useForget(ty: 1 | 2) {
  const step = ref(1)
  const disabledBtn1 = ref(true)
  const disabledBtn2 = ref(true)

  const username = ref('')
  const phone = ref('')
  const withdraw_pwd = ref('')
  const password = ref('')
  const repassword = ref('')

  // 设置密码接口
  const counter = ref(3)
  const { run: runForgetPassword } = useRequest(() => forgetPassword(
    {
      username: username.value,
      phone: phone.value,
      withdraw_pwd: withdraw_pwd.value,
      password: password.value,
      ty,
    },
  ), {
    manual: true,
    onSuccess() {
      step.value = 3
      const t = setInterval(() => {
        counter.value--
        if (counter.value === 0) {
          clearInterval(t)
          router.push('/entry/login')
        }
      }, 1000)
    },
  })

  // 校验手机、安全密码、密码
  const isPhone = computed(() => phoneRegx.test(phone.value))
  const isSecurePwd = computed(() => verifyCodeRegx.test(withdraw_pwd.value))
  const isPwd = computed(() => {
    if (!password.value)
      return true

    else
      return passwordRegx.test(password.value)
  })
  const isPwdSame = computed(() => {
    if (!repassword.value)
      return true
    return password.value === repassword.value
  },
  )

  // 提交
  const submit = () => {
    if (!isPwd.value) {
      ElMessage.error('密码格式错误，请输入8-20位英文字母与数字')
      return
    }

    if (!isPwdSame.value) {
      ElMessage.error('前后密码不一致，请重新输入')
      return
    }

    runForgetPassword()
  }

  return {
    step,
    disabledBtn1,
    disabledBtn2,
    username,
    phone,
    withdraw_pwd,
    password,
    repassword,
    isPhone,
    isSecurePwd,
    isPwd,
    isPwdSame,
    submit,
    counter,
  }
}
