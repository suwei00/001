# 回复组件MessageReply

基础用法

```html
    <cg-message-reply
      username="DJanGo"
      :time="1681467930556"
    >
      <template #message>
        <cg-image></cg-image>
      </template>
      <template #replyContent>
        最多文字回复最多文字，为了提供更优质的服务和体验,
      </template>
    </cg-message-reply>
```

### Props

| 参数       | 说明                 | 类型      | 可选值 | 默认值 |
|----------| -------------------- |---------|-----|-----|
| username | 用户名  | string  |     |     |
| time     | 时间戳  | string  |     |     |


### Slots

| name    | 说明       |
| ------- |----------|
| message | 自定义消息内容  |
| replyContent | 自定义回复的内容 |