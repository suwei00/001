# Button 按钮

基础用法

```javascript
<cg-button>弹窗</cg-button>
```

### Props

| 参数     | 说明                 | 类型    | 可选值                    | 默认值  |
| -------- | -------------------- | ------- | ------------------------- | ------- |
| type     | 按钮类型             | string  | primary / default         | default |
| shape    | 按钮形状             | string  | round / square / circular | round   |
| disabled | 禁用状态             | boolean | -                         | -       |
| badge    | 按钮徽标,大于 0 展示 | number  | -                         | 0       |

### Slots

| name    | 说明                                     |
| ------- | ---------------------------------------- |
| default | 按钮内容，shape 等于 circular 时候不需要 |
