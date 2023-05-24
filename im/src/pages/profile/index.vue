
<template>
  <div class="cg-p-profile">
    <div class="profile-user-info flex ai-c" @click="$router.push('profile/user_info')">
      <cg-avatar size="120" src="https://pic1.zhimg.com/v2-3b4fc7e3a1195a081d0259246c38debc_720w.jpg?source=172ae18b" />
      <div class="profile-user-info-detail">
        <div class="font_40 profile-user-info-title">{{ 'wwwwwwwwwwwwwwww' }}</div>
        <div class="flex ai-c profile-user-info-identity">
          <cg-icon name="vip_vip1" width="127" />
          <div class="font_28">Chat ID：34805825</div>
        </div>
      </div>
      <cg-icon name="icon_arrowright" width="41" />
    </div>
    <div class="profile-user-info-menu font_32">
      <cg-list-item title="点我进demo" :border="'full'" is-link height="112" to="/demo" v-for="item of 3"
        :key="item">
        <template #icon>
          <cg-icon name="icon_notice" />
        </template>
      </cg-list-item>
      <cg-list-item :title="item.title" :border="'full'" is-link height="112" v-for="(item, index) of setList" :key="index"
        @click="enterSetItem(item.popupType)">
        <template #icon>
          <cg-icon :name="item.iconName" width="44" />
        </template>
      </cg-list-item>
    </div>
    <!-- 设置vip弹窗部分 -->
    <cg-bottom-sheet   select-text="Cấp VIP" is-bold-seledt-text
      v-model="isOpen">
      <template #content >
        <div class="vip-content flex ai-c jc-c fw-w">
          <div span="8" v-for="item of 9" :key="item" class="vip-content-item pos-r" :class="[activeVip===item&&'active-item']"
          @click="activeVip = item"
          > 
            <cg-icon :name="`vip_vip${item+1}`" width="125" class="pos-center" />
          </div>
        </div>
        <cg-button shape="square" type="primary" class="vip-btn" @click="isOpen=false">Hủy</cg-button>
      </template>
    </cg-bottom-sheet>
    
  </div>
</template>
<script setup lang="ts">
import ProgressImage from "./ProgressImage.vue"
import { ref } from "vue";
import { useRouter } from "vue-router";
const setList = [
  {
    iconName: 'icon_suggest',
    title: 'Thông tin mới',
    popupType: 'feedback'
  },
  {
    iconName: 'icon_setvip',
    title: 'Cấp VIP của tôi',
    popupType: 'setVip'
  },
]
const progress = ref(0);
let timer = setInterval(()=>{
  progress.value+=10
  if(progress.value<=0){
    clearInterval(timer);
  }
},1000)
const isOpen = ref<boolean>(false)
const activeVip = ref<number>(1);
const router = useRouter();
const enterSetItem = (type: string) => {
  switch (type) {
    case 'feedback':
    router.push('profile/feedback')
      break;
    case 'setVip':
    isOpen.value =true;
      break;
    default:
      break;
  }
}
</script>
<style lang="scss" scoped>
.cg-p-profile {
  .profile-user-info {
    padding: 48px 32px;
    background-color: var(--cg-color-bg-white);

    &-detail {
      margin-left: 32px;
      margin-right: auto;
      padding-top: 8.5px;
    }

    &-identity {
      margin-top: 20px;

      &>div:last-of-type {
        margin-left: 8px;
        color: var(--cg-color-text-4);
      }
    }

    &-menu {
      padding-bottom: 100px;
    }
  }
}
.vip-content{
  margin: 32px 33px;
  .vip-content-item{
    width: 33.33%;
    height: 80px;
    line-height: 80px;
  }
  .active-item{
    background: url("src/assets/image/profile/avtivevip.png")  no-repeat;
    background-size: 100% auto;
    border-radius: 8px;
    overflow: hidden;
  }
}
.vip-btn{
  margin: 0 auto;
}
</style>  
