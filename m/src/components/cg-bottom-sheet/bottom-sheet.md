## 空状态

基础用法

```javascript
<cg-bottom-sheet v-model="isOpen" @on-ok=""/>
```
```javascript
<cg-bottom-sheet select-left-text="Hủy" select-right-text="Ok" select-text="自定义标加粗题栏" is-bold-seledt-text v-model="isOpen"/>
```
```javascript
<cg-bottom-sheet select-right-text="Ok" v-model="isOpen" :is-title-border="false" />
```
```javascript
<cg-bottom-sheet bottom-cancel-btn="底部取消➕中间面板" v-model="isOpen">
  <template #content>
    中间面板
  </template>
</cg-bottom-sheet>
```
### Props

| 参数     | 说明                 | 类型    | 可选值                    | 默认值  |
| -------- | -------------------- | ------- | ------------------------- | ------- |
| v-model  | 是否显示弹出层  | boolean  |  true｜false  | false |
| select-left-text     | 左边文字  | string  |  自定义  | 空 |
| select-text     | 中间文字内容  | string  |  自定义  | 空 |
| is-bold-seledt-text  | 中间的文字是否加粗  | boolean  | true｜false  | false |
| select-right-text     | 右边文字  | string  |  自定义  | 空 |
| bottom-cancel-btn     | 底部按钮  | string  |  自定义  | 空 |
| radius     | 圆角的弧度 | string｜number  |  自定义  | 30 |
| is-title-border | 是否显示标题下边框 | boolean  |  true｜false  | true |




### Events
|     name    | 说明                                     |
| ------------  | ---------------------------------------- |
| on-ok | 点击确定时触发 |

### Slots

| name    | 说明                                     |
| ------- | ---------------------------------------- |
| content | 弹出层内容面板 |