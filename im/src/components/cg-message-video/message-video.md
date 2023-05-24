# 视频组件MessageVideo

基础用法

```html
    <cg-message-video
      :videoSrc="videoSrc"
      :coverSrc="coverSrc"
      width="500" 
      height="250"
      
    />
```

### Props

| 参数      | 说明              | 类型    | 可选值            | 默认值  |
| width | 视频宽度 | number｜string  | ------------------------- | ------- |
| height | 视频高度 | number｜string  | ------------------------- | ------- |
| videoSrc | 视频地址 | string  | ------------------------- | ------- |
| coverSrc | 视频封面 | string  | ------------------------- | ------- |
| autoplay | 自动播放 | boolean | ------------------------- | false |
| controls | 视频控件   | boolean | ------------------------- | false |
| muted    | 静音    | boolean  | ------------------------- | false |
| loop     | 循环播放 | boolean  | ------------------------- | false |
