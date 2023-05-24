## 空状态

基础用法

```javascript
<cg-time :time="1681467930556" />
```
```javascript
自定义颜色、字体：
<cg-time font="5" color="1" :time="1681467930556" />
```
```javascript
带黑色透明背景：
<cg-time :time="1681467930556" format="DD/MM" is-bg color="white" />
```
```javascript
不同时间格式：
<cg-time :time="1681467930556" format="DD/MM" />
<cg-time :time="1681467930556" format="DD/MM/YYYY HH:mm:ss" />
<cg-time :time="1681467930556" format="DD/MM/YYYY" />
```


### Props

| 参数     | 说明   | 类型    | 可选值  | 默认值  |
| -------- | ----- | ----- | ---- | ------ |
| font | 字重、字体大小（只需要传 --cg-font- 的后面部分）  | string｜number | global_size.scss定义范围 | 11 |
| color | 字体颜色（只需要传 --cg-color-text- 的后面部分）  | string｜number | global_color.scss定义范围 | 4 |
| format | 时间展示格式 | 时间戳 | DD/MM｜DD/MM/YYYY HH:mm:ss｜DD/MM/YYYY | HH:mm |
| is-bg | 是否显示黑色圆角透明背景 | boolean | true｜false | false |

