<script setup lang="ts">
interface CGMessageProps {
  chatMessage?: string
}

withDefaults(defineProps<CGMessageProps>(), {

})



</script>

<template>
  <div>
    <cg-message-text>
      <template #msg>
        <h1>message title</h1>
        <div>cg-message-text {{chatMessage}}</div>
      </template>
    </cg-message-text>


    <div>cg-message-reply</div>
    <cg-message-reply
      :time="1681467930556"
      username="Libra"
      message="以后上下班时间，在远程打卡群 打卡"
      replyContent="最多文字回复最多文字，为了提供更优质的服务和体验,进行网站系统升级维护给您带来的不便,敬请谅解。最多文字回复最多文字，为了提供更优质"
    >
      <template #message>
        以后上下班时间，在远程打卡群 打卡
      </template>
      <template #replyContent>
        最多文字回复最多文字，为了提供更优质的服务和体验,进行网站系统升级维护给您带来的不便,敬请谅解。最多文字回复最多文字，为了提供更优质
      </template>
    </cg-message-reply>
    <cg-message-reply
      username="DJanGo"
    >
      <template #message>
        <cg-image></cg-image>
      </template>
      <template #replyContent>
        最多文字回复最多文字，为了提供更优质的服务和体验,进行网站系统升级维护给您带来的不便,敬请谅解。最多文字回复最多文字，为了提供更优质
      </template>
    </cg-message-reply>


    <cg-message-tip message="时间，置顶，消息读取状态MessageTip"/>


    <p>cg-message-image原尺寸在范围内</p>
    <cg-message-image width="500" height="500" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
    <cg-message-image width="400" height="400" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
    <cg-message-image width="300" height="300" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
    <cg-message-image width="250" height="500" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
    <cg-message-image width="500" height="250" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />

    <p>宽度&&高度 超出范围</p>
    <cg-message-image width="1500" height="750" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
    <cg-message-image width="750" height="1500" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />

    <p>宽度 超出范围</p>
    <cg-message-image width="1000" height="500" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />

    <p>高度 超出范围</p>
    <cg-message-image width="500" height="1000" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />



    <p>cg-message-video原尺寸在范围内</p>
    <cg-message-video width="500" height="250"/>





    <slot name="msg"></slot>


    <div class="send-message">
      <div class="send-message__inner">
        <VanField
          :modelValue="chatMessage"
          @update:modelValue="chatMessage = $event"
          clearable
          left-icon="smile-o"
          placeholder="快来唠两句呗~"
        >
        <template #button>
<!--          <cg-button-->
<!--            type="primary"-->
<!--            size="small"-->
<!--            shape="circular"-->
<!--            :disabled="!chatMessage"-->
<!--            @click="chatMessage = ''"-->
<!--          >-->
<!--            发送-->
<!--          </cg-button>-->
          <VanButton
            type="primary"
            size="small"
            :disabled="!chatMessage"
            @click="chatMessage = ''"
          >
            发送
          </VanButton>
        </template>
        </VanField>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.send-message {
  width: 100%;
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  &__inner {

  }
}
</style>
