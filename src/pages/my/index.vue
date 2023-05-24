<script lang="ts" setup>
import jian from '../../assets/image/chat/jian.png?preset=full'
const user = useUserStore()
const { avatar, setVipId, chatId } = storeToRefs(useUserStore())

const jianUrl = getSupportImage(jian)
const pops = $ref({
  visible: false,
  popType: '',
})
const showPopVip = (type: string) => {
  pops.visible = true
  pops.popType = type
}
// 是否有权限修改vip等级  true 可以 false不是
const { data: isShowVip } = useRequest(getMemberCanuvRequest)
</script>

<template>
  <FooterLayout>
    <ChatHeader title="我的" :is-back="false" />
    <div class="my_info">
      <div class="info_cont flex ai-c jc-s ">
        <cg-avatar :src="avatar.toString()" size="50px" />
        <div class="flex ai-c jc-sb flex1">
          <div class="info_text ">
            <div class="info_name">
              {{ user.username }}
            </div>
            <div class="chat_id">
              久聊ID：{{ chatId }}
            </div>
          </div>
          <cg-vip :level="Number(setVipId)" width="72px" class="info_vip" />
        </div>
      </div>
      <div v-show="isShowVip" class="myvip_list flex ai-c jc-sb" @click="showPopVip('ShowVip')">
        我的VIP等级
        <img class="righ_icon" :src="jianUrl">
      </div>
      <!-- 底部弹窗 -->
      <pop-up-bottom v-model="pops.visible" :pop-type="pops.popType" />
    </div>
  </FooterLayout>
</template>

<style lang="scss" scoped>
.my_info {
  padding: 18px 0;

  .info_cont {
    // height: 68px;
    background: linear-gradient(180deg, $color-white-1 0%, $color-white-3 65%, $color-white-4 85%, $color-white-5 100%);
    box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.06);
    padding: 10px 16px;

    .cg-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      // border: 2px solid #E5C69D;
    }

    .info_text {
      margin-left: 8px;
      overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      .info_name {
        font-size: 14px;
        color: $color-gray-2;
        height: 20px;

      }

      .chat_id {
        height: 19px;
        font-size: 13px;
        font-weight: 400;
        color:$color-gray-2;
      }

      .info_vip {
        height: 25px;
        width: 72px;
        vertical-align: top;

      }
    }

  }

  .myvip_list {
    height: 44px;
    background: linear-gradient(180deg, $color-white-1 0%, $color-white-3 65%, $color-white-4 85%, $color-white-5 100%);
    box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.06);
    border-radius: 0px 0px 0px 0px;
    opacity: 1;
    font-size: 14px;
    font-weight: 400;
    color: $color-gray-2;
    padding: 0 16px;
    margin-top: 14px;

  }
}
</style>
