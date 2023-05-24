## 空状态

基础用法

```javascript
<cg-empty />
```
```javascript
<cg-empty :is-img="false"/>
```
```javascript
<cg-empty :margin-top="20" text="自定义文字">
  <img src="https://pic1.zhimg.com/v2-3b4fc7e3a1195a081d0259246c38debc_720w.jpg?source=172ae18b" alt="自定义图片"
            style="width:50px" />
</cg-empty>
```
### Props

| 参数     | 说明                 | 类型    | 可选值                    | 默认值  |
| -------- | -------------------- | ------- | ------------------------- | ------- |
| margin-top     | 距离上边距离  | string｜number  | 0-750  | 200 |
| is-img     | 是否展示图片  | boolean  | true｜false  | true |
| text     | 缺省文案  | string  | 自定义  | Chưa có nội dung |


### Slots

| name    | 说明                                     |
| ------- | ---------------------------------------- |
| default | 自定义图片下方的内容 |