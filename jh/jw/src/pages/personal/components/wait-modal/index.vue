<script setup lang='ts' name="wait-modal">
import timeGif from '@images/personal/wait-modal/time.gif'
import timeWebp from '@images/personal/wait-modal/time.webp'

const props = defineProps<{
  modelValue: boolean
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
const visible = $(useVModel(props, 'modelValue', emit))

const handleConfirm = () => { }
</script>

<template>
  <el-dialog
    v-model="visible" :show-close="false" width="550px" align-center
    :close-on-click-modal="false"
    @click="visible = false"
  >
    <template #header>
      <div class="jl-dialog-header" flex justify-center>
        <h3 class="title">
          温馨提示
        </h3>
      </div>
    </template>
    <div pt-34px pb-50px flex justify-center items-center flex-col>
      <img block w-54px :src="canUseWebp() ? timeWebp : timeGif" alt="">
      <p text-15px lh-20px pt-10px color-black-primary>
        场馆钱包回收中，请勿离开此页面
      </p>
    </div>
    <template #footer>
      <jl-button lh-50px h-50px w-450px mx-auto my-0 @click="handleConfirm">
        确定
      </jl-button>
    </template>
  </el-dialog>
</template>
