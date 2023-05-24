<script lang="ts" setup>
// 客服
import { goTocustomerService } from '~/utils/customerService'
interface Props {
  type?: boolean
}
withDefaults(defineProps<Props>(), {
  type: false,

})
</script>

<template>
  <div class="customer_footer">
    <p v-if="type" class="txt_c ">
      为了您的隐私安全，信息在确认后将无法修改
      
    </p>
    <p class="txt_c ">
      如遇到任何问题，请联系<a class="fs" @click="goTocustomerService()">在线客服</a>。
    </p>
  </div>
</template>

<style lang="scss" scoped>
.customer_footer{
    padding:15px 0;
    .txt_c{
        font-size: 12px;
        font-weight: 400;
        color: #848484;
        line-height: 20px;
        text-align: center;
        .fs{
        color: #4080FF;

        }

    }

}
  </style>

