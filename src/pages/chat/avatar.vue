<script lang="ts" setup>
import 'vue-advanced-cropper/dist/style.css'
import edit from '../../assets/image/chat/edit.png?preset=full'
import avatar from '../../assets/image/avatar/avatar-14.png?preset=full'

const avatarUrl = getSupportImage(avatar)
const editUrl = getSupportImage(edit)
const show = ref(false)
const copperImg = ref(localStorage.getItem('avatarImg') || '')
const showPopup = () => {
  show.value = true
}
</script>

<template>
  <ChatHeader title="群头像" :is-back="true">
    <template #actions>
      <img class="edit" :src="editUrl" alt="" @click="showPopup">
    </template>
  </ChatHeader>
  <div class="avatar-container">
    <div class="flex-middle img-box">
      <img class="img" :src="copperImg !== '' ? copperImg : avatarUrl">
    </div>
    <van-popup v-model:show="show" position="bottom" :style="{ height: '194px' }">
      <div class="pop-container">
        <div class="upload-del font-style">
          <RouterLink to="/chat/upload-avatar">
            <div class="upload-cont upload-btn">
              上传新头像
            </div>
          </RouterLink>
          <div class="upload-cont">
            删除头像
          </div>
        </div>
        <div class="upload-cont font-style cancle" @click="show = false">
          <div>
            取消
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<style lang="scss" scoped>
:deep(.van-overlay){
    background: rgba(0, 0, 0, .3) !important;
}
:deep(.van-popup){
    background: transparent !important;
}
.height100{
    height: 100vh;
}
.edit {
  width: $size18;
}
.avatar-container {
    height: calc(var(--viewport-height) - $size50);
    width: 100%;
    .img-box{
        height: 100%;
    }
  img{
    width: 100%;
  }
}
.pop-container{
    .font-style{
        margin: 0 $size8 0 $size8;
        border-radius: $size14;
        background: $color-white-1;
        text-align: center;
        color: $color-gray-2;
        font-size: $size18;
        overflow: hidden;
    }
    .font-style{
        .upload-btn{
            border-bottom: 1px solid $color-gray-1;
        }
    }
    .upload-cont{
      height: $size56;
      line-height: $size56;
      background: $color-white-2;
    }
    .cancle{
        margin-top: $size8;
    }
}
.avatar-c{
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
}
.vue-cropper{
    background: #000;
    .cropper-view-box{
        outline: 1px solid #fff !important;
        outline: #fff !important;
    }
}
</style>
