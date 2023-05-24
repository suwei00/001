<script setup lang='ts' name="realname-modal">
import { ElMessage } from 'element-plus'

const props = defineProps<{
  modelValue: boolean
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
let visible = $(useVModel(props, 'modelValue', emit))
const router = useRouter()
const userStore = useUserStore()

const realName = $ref('')
const isName = $computed(() => realName ? nameRegx.test(realName) : true)
const { run, loading } = useRequest(() => updateMemberInfo({ realname: realName }),
  {
    manual: true,
    onSuccess() {
      ElMessage.success('提交成功')
      userStore.runGetMemberInfo()
      const t = setTimeout(() => {
        router.push('/personal/deposit')
        visible = false
        clearTimeout(t)
      }, 0)
    },
  })

const handleClose = () => {
  visible = false
}
</script>

<template>
  <el-dialog
    v-model="visible" :show-close="false" width="550px" align-center
  >
    <template #header>
      <div class="header">
        <h3 class="title">
          温馨提示
        </h3>
        <i i-common-close w-14px h-14px @click="handleClose" />
      </div>
    </template>
    <div pt-34px pl-15px pr-15px>
      <p text-15px lh-20px color-black-primary mb-15px>
        充值前请先填写您的真实姓名，以便我们快速核实上分！
      </p>
      <div class="input-box" mb-27px text-left>
        <label text-15px color-black-primary>真实姓名</label>
        <input v-model.trim="realName" :class="{ error: !isName }" type="text" placeholder="请输入您的真实姓名" maxlength="30">
        <div h-12px>
          <span v-show="!isName" validate-error text-12px>请正确输入真实姓名</span>
        </div>
      </div>
    </div>
    <template #footer>
      <p text-center text-13px color-black-primary mb-8px>
        注:为保障个人隐私安全，提交后无法修改，请确保无误！
      </p>
      <jl-button :loading="loading" :disabled="realName && !isName" class="btn" lh-50px h-50px w-450px @click="run">
        确认填写
      </jl-button>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.header{
  padding: 15px 15px 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title{
    font-size: 18px;
    font-weight: 600;
  }
}
.input-box{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  label{
    margin-bottom: 6px;
  }
  input{
    width: 450px;
    height: 50px;
    border: 1px solid #C5C5C5;
    border-radius: 6px;
    padding: 11px 14px;
    &:focus{
      outline: none;

    }
  }
  .error{
    border-color: #FA0513;
  }
}
.btn{
  margin: 0 auto 25px;
}
</style>
