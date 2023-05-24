export default function usePersonalDialog(form?: any) {
  const isOpen = ref(false)
  function open() {
    isOpen.value = true
  }

  // 眼睛开关
  const oldRef = ref() // 原密码
  const oldShow = ref(false)
  const oldEye = ref(false)

  const passwordRef = ref() // 新密码
  const pwdShow = ref(false)
  const pwdEye = ref(false)

  const rePasswordRef = ref() // 确认新密码
  const rPwdShow = ref(false)
  const rPwdEye = ref(false)

  function showPwd(ref: string) {
    let el
    switch (ref) {
      case 'old':
        oldShow.value = !oldShow.value
        el = oldRef
        break
      case 'password':
        pwdShow.value = !pwdShow.value
        el = passwordRef
        break
      case 'rePassword':
        rPwdShow.value = !rPwdShow.value
        el = rePasswordRef
        break
      default:
        break
    }

    const { type } = el?.value
    if (el)
      el.value.type = type === 'text' ? 'password' : 'text'
  }

  // 清空字段
  function clearForm() {
    for (const key in form) {
      if (Object.prototype.hasOwnProperty.call(form, key))
        form[key] = ''
    }
  }
  function close() {
    oldShow.value = false
    pwdShow.value = false
    rPwdShow.value = false
    clearForm()
    isOpen.value = false
  }

  // 按钮开关
  const disabledBtn = ref(true)

  return {
    isOpen,
    open,
    close,
    oldRef,
    oldShow,
    passwordRef,
    pwdShow,
    rePasswordRef,
    rPwdShow,
    showPwd,
    clearForm,
    disabledBtn,
    oldEye,
    pwdEye,
    rPwdEye,
  }
}
