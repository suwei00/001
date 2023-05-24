# NavHeader 页面顶部导航栏

基础用法

```javascript
  <cg-nav-header title="Chat" left-arrow left-text="前进" />
```

### Props

| 参数     | 说明                 | 类型    | 可选值                    | 默认值  |
| -------- | -------------------- | ------- | ------------------------- | ------- |
| title    | 页面标题 | string |  |  |
| leftText | 左边文字 | string |  |  |
| rightText | 右边文字 | string |  |  |
| leftArrow | 左边箭头 | boolean |  |  |
| border    | 底部边框 | boolean |  |  |
| fixed     | 固定到顶部 | boolean |  |  |
| placeholder | 生成占位盒子 | boolean |  |  |
| zIndex      | 元素层级    ｜ number string |  |  |
| clickable   | 左右点击opacity变化效果 ｜ boolean |  |  |
| background  | 背景色 ｜ string |  |  |
| titleColor  | 标题字颜色 ｜ string |  |  |
| textColor  | 左右字颜色 ｜ string |  |  |

### Slots

| name    | 说明                                     |
| ------- | ---------------------------------------- |
| left | 左边部分 |
| right | 右边部分 |
